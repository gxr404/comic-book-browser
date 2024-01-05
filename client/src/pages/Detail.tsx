import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Empty } from 'antd'
import { useRequest, useTitle } from 'ahooks'
import * as api from '@/api'
import Header from '@/components/Header'
import ChapterList from '@/components/ChapterList'
import { CACHE_OPTIONS } from '@/constant'
import type {BookInfo, ComicBookRes} from '@/api'

export default function Detail() {
  const { bookName = '' } = useParams()
  useTitle(`${bookName} - Comic Browser`)
  const [bookInfoList, setBookInfoList] = useState<BookInfo[]>([])
  const [bookInfo, setBookInfo] = useState<ComicBookRes>()

  const { runAsync: runComicBook } = useRequest(api.comicBook, CACHE_OPTIONS.comicBook(bookName))
  const { runAsync: runComicBookList } = useRequest(api.comicBookList, CACHE_OPTIONS.comicBookList())

  async function init() {
    const newBookInfoList = await runComicBookList()
    setBookInfoList(newBookInfoList)

    const newBookInfo = await runComicBook(bookName)
    if (newBookInfo) {
      console.log(newBookInfo, `cache-${bookName}`)
      setBookInfo(newBookInfo)
    }
  }

  useEffect(() => {
    init()
  }, [bookName])
  // const bookName = decodeURI(params.bookName)
  return (
    <>
      <Header bookInfoList={bookInfoList}/>
      <main className="max-w-screen-md bg-p-2 rounded-md p-4 sm:p-8 shadow-br m-4 sm:mx-8 md:mx-auto mt-[160px] md:mt-[140px]">
        {
          bookInfo ?
          <>
            <div className="flex flex-col md:flex-row items-center">
            {/* md:-ml-[120px]  */}
              <div className={`flex align-center justify-center transition
                w-[200px] h-[266px] rounded-md overflow-hidden
                -mt-[140px] bg-p-2
                border border-slate-900/10 dark:border-slate-300/10
                shadow-cover-1 dark:shadow-cover-2`}>
                  <img className="w-[200px] h-[266px] object-cover" src={bookInfo.coverPath} alt={bookInfo.pathName} />
              </div>
              <div className="flex-1 pl-0 md:pl-10 text-gray-400 mt-6 md:mt-0">
                <p className="text-lg truncate pb-2 text-black dark:text-white">{bookName}</p>
                <p className="text-sm truncate pb-2">{bookInfo.author}</p>
                <p className="text-sm line-clamp-3">{bookInfo.desc}</p>
                <p className="text-sm text-right mt-2">
                  <Link to={bookInfo.rawUrl}>
                    <i className="iconfont icon-link"></i>来源
                  </Link>
                </p>

              </div>

            </div>
            <ChapterList bookName={bookName} bookInfo={bookInfo} />
          </> :
          <Empty className='h-[50vh] w-full text-center flex flex-col justify-center'
            description={<span className='dark:text-white'>Not Found</span>}/>
        }
      </main>
    </>

  )
}


// background-image: linear-gradient(-45deg, rgb(255, 203, 71), rgb(227, 75, 169), rgb(54, 158, 255), rgb(149, 243, 217));
// background-size: 400% 400%;
// border-radius: inherit;
// animation: 5s ease 5s infinite normal none running animation-1gj30q7;
// @keyframes animation-1gj30q7{
//   0%{
//     -webkit-background-position:0% 50%;
//     background-position:0% 50%;
//   }
//   50%{
//     -webkit-background-position:100% 50%;
//     background-position:100% 50%;
//   }
//   100%{-webkit-background-position:0% 50%;
//     background-position:0% 50%;
//   }
// }
// pointer-events: none;
// z-index: 0;
// right: -20vw;
// transform: rotate(4deg);
// width: 60vw;
// height: 200px;
// opacity: 0.2;
// filter: blur(100px);
// position: absolute !important;