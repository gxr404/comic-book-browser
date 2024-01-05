import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { clearCache, useLocalStorageState } from 'ahooks'
import { LOCAL_STORAGE_HISTORY, CACHE_KEY } from '@/constant'
import * as api from '@/api/index'
import type { BookInfo } from '@/api/index'
import type { ILocalHistoryItem } from '@/constant'

interface BookListProps {
  bookInfoList: BookInfo[]
}
interface HistoryItemProps {
  bookInfoName: string,
  localHistory: ILocalHistoryItem[] | undefined
}
function HistoryItem(props: Readonly<HistoryItemProps>) {
  const {bookInfoName, localHistory = []} = props
  const exist = localHistory.find(item => item.bookName === bookInfoName)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    isClient && exist ? (
      <p className="text-sm truncate">
        <i className="iconfont icon-history1 font-bold"></i>
        &nbsp;
        {exist.rawChapterName}
      </p>
    ) : <></>
  )
}

export default function BookList({bookInfoList}: Readonly<BookListProps>) {
  const [localHistory] = useLocalStorageState<ILocalHistoryItem[]>(LOCAL_STORAGE_HISTORY, {
    defaultValue: []
  })
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  let msgExist = false
  async function fetchCleanCache(){
    if (msgExist) return
    await api.cleanCache()
    clearCache(CACHE_KEY.comicBookList())
    messageLog('已清理缓存')
    navigate('/')
  }

  function messageLog(msg: string) {
    if (msgExist) return
    msgExist = true
    messageApi.open({
      content: msg,
      className: 'mt-[30vh] text-white',
      onClose:() => {
        msgExist = false
      }
    })
  }

  return (
    <>
      {contextHolder}
      {
        bookInfoList.map((bookInfo) => {
          return (
            <div key={bookInfo.name}>
              {/* className="block hover:bg-p-4/20 dark:hover:text-p-3" */}
              <Link to={`/detail/${bookInfo.pathName}`} className="group">
                <div className="flex">
                  <div className={
                  `rounded-md flex align-center justify-center relative
                  transition border border-slate-900/10 dark:border-slate-300/10 overflow-hidden
                  min-w-[135px] basis-[135px] h-[180px]`}>
                    <img
                      className="w-[135px] h-[180px] object-cover group-hover:scale-110 transition"
                      loading="lazy" src={bookInfo.coverPath} alt={bookInfo.name} />
                      <p className="text-sm truncate absolute inset-x-0 bg-black/60 bottom-0 text-white text-center leading-7 px-2">
                        {bookInfo.lastChapter.rawName}
                      </p>
                  </div>
                  <div className="flex-1 w-0 flex flex-col text-gray-400 pl-4 justify-between">
                    <div>
                      <p className="text-lg truncate pb-2 text-black group-hover:text-p-3 dark:text-white dark:group-hover:text-p-3 transition">
                        {bookInfo.name}
                      </p>
                      <p className="text-sm truncate pb-2">{bookInfo.author}</p>
                      <p className="text-sm line-clamp-2 overflow-hidden">{bookInfo.desc}</p>
                    </div>
                    <HistoryItem
                      bookInfoName={bookInfo.name}
                      localHistory={localHistory} />
                  </div>
                </div>
              </Link>
            </div>
          )
        })
      }
      <button className="fixed bottom-20 transition-all duration-500
      w-12 h-12 flex items-center justify-center rounded-full
      backdrop-blur supports-backdrop-blur:bg-white/60
      bg-p-1/95  dark:bg-p-1/80 md:dark:bg-p-2 shadow-bottom dark:shadow-gray-900 z-[1]
      hover:text-p-3 font-bold right-2" onClick={fetchCleanCache}>
        <i className="iconfont icon-clean text-[26px] inline-block -indent-[2px]" />
      </button>
    </>
  )
}