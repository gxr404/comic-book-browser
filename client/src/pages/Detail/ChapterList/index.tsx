import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorageState } from 'ahooks'
import BackTop from '@/components/BackTop'
import { toReversed } from '@/utils'
import { LOCAL_STORAGE_HISTORY } from '@/constant'
import type { ILocalHistoryItem } from '@/constant'
import type { ChapterItem, ComicBookRes } from '@/api'

interface FCProps {
  bookName: string,
  bookInfo: ComicBookRes
}

const ChaptersList: React.FC<FCProps> = ({ bookName, bookInfo }) =>  {
  const [reverse, setReverse] = useState(true)
  const [historyChapterItem, setHistoryChapterItem] = useState<ChapterItem>()
  let chapters = useMemo(()=> bookInfo?.chapters ?? [], [bookInfo])
  const lastChapters = chapters.at(-1)
  if (reverse) {
    chapters = toReversed(chapters)
  }
  const [localHistory] = useLocalStorageState<ILocalHistoryItem[]>(LOCAL_STORAGE_HISTORY, {
    defaultValue: []
  })

  useEffect(() => {
    const localItem = localHistory?.find((item) => item.bookName === bookName)
    if (localItem) {
      const chapterItem = chapters.find((item) => {
        return localItem?.chapterName === item.name
      })
      chapterItem && setHistoryChapterItem(chapterItem)
    }
  }, [localHistory, bookName, chapters])


  return (
    <>
      { historyChapterItem &&
        <>
        <p className="text-2xl mt-8 text-center md:text-left">上次阅读</p>
          <p className="flex items-center">
            {/* <span>继续阅读:&nbsp;&nbsp;</span> */}
            <span className="flex-1 md:max-w-[224px] mt-5">
              <Link className={`truncate px-4 py-3 transition text-center
                block rounded-md border-sky-100
                bg-p-1 hover:bg-p-4/20
                dark:text-white dark:hover:text-p-3
                dark:bg-sky-400/10 dark:hover:bg-sky-400/20
                dark:border-sky-500/15`}
                to={`/detail/${bookName}/${historyChapterItem.name}`}>
                {historyChapterItem.rawName}
              </Link>
            </span>
          </p>
        </>
      }
      <p className="text-2xl mt-8 text-center md:text-left">章节列表</p>
      <div className="flex mt-5 justify-between items-end">
        <div className="overflow-hidden">
          <p className="truncate">
            最新:&nbsp;&nbsp;
            <Link
              className="underline decoration-solid"
              to={`/detail/${bookName}/${lastChapters?.name}`}>
              {lastChapters?.rawName}
            </Link>
          </p>
        </div>
        <button className="flex hover:text-p-3" onClick={() => setReverse(!reverse)}>
          <i className="iconfont icon-sort text-[18px]"></i> &nbsp;
          <span className="underline decoration-solid">{reverse ? '升序': '降序'}</span>
        </button>
      </div>
      <ul className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {
          chapters.map((chapter) => {
            return (
              <li className="flex-1 text-center" key={chapter.name}>
                <Link className={`truncate px-4 py-3 transition
                  block rounded-md border-sky-100
                  bg-p-1 hover:bg-p-4/20
                  dark:text-white dark:hover:text-p-3
                  dark:bg-sky-400/10 dark:hover:bg-sky-400/20
                  dark:border-sky-500/15`}
                  to={`/detail/${bookName}/${chapter.name}`}>
                  {chapter.rawName}
                </Link>
              </li>
            )
          })
        }
      </ul>
      <BackTop visibilityHeight={4000}/>
    </>
  )
}

export default ChaptersList