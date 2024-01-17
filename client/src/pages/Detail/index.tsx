import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useRequest, useTitle } from 'ahooks'
import * as api from '@/api'
import { CACHE_OPTIONS } from '@/constant'
import type {BookInfo, ComicBookRes} from '@/api'
import ChapterList from '@/pages/Detail/ChapterList'
import Header from '@/components/Header'
import Loading from '@/components/Loading'

export default function Detail() {
  const { bookName = '' } = useParams()
  useTitle(`${bookName} - Comic Browser`)
  const [bookInfoList, setBookInfoList] = useState<BookInfo[]>([])
  const [bookInfo, setBookInfo] = useState<ComicBookRes | null>()
  const [loading, setLoading] = useState(false)

  const { runAsync: runComicBook } = useRequest(api.comicBook, CACHE_OPTIONS.comicBook(bookName))
  const { runAsync: runComicBookList } = useRequest(api.comicBookList, CACHE_OPTIONS.comicBookList())

  async function init() {
    setLoading(true)
    const newBookInfoList = await runComicBookList()
    setBookInfoList(newBookInfoList)

    const newBookInfo = await runComicBook(bookName)
    setBookInfo(newBookInfo)
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [bookName])

  return loading ?
    <Loading /> :
    <>
      <Header bookInfoList={bookInfoList} />
      <main className="max-w-screen-md bg-p-2 rounded-md p-4 sm:p-8 shadow-br m-4 sm:mx-8 md:mx-auto mt-[160px] md:mt-[140px]">
        {
          bookInfo ?
          <>
            <div className="flex flex-col md:flex-row items-center">
              <div className={`flex align-center justify-center transition
                w-[200px] min-w-[200px] h-[266px] rounded-md overflow-hidden
                -mt-[140px] bg-p-2
                border border-slate-900/10 dark:border-slate-300/10
                shadow-cover-1 dark:shadow-cover-2`}>
                  <img className="w-[200px] h-[266px] object-cover" src={bookInfo.coverPath} alt={bookInfo.pathName} />
              </div>
              <div className="pl-0 md:pl-10 text-gray-400 mt-6 md:mt-0 w-full overflow-x-auto">
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
          <div className='h-[50vh] w-full text-center flex flex-col justify-center'>
            <span className='text-[26px] text-gray-600'>Not Found</span>
          </div>
        }
      </main>
    </>
}