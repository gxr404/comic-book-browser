import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import * as api from '@/api'
import type { BookInfo } from '@/api'
import BookList from '@/pages/Home/BookList'
import Header from '@/components/Header'
import { CACHE_OPTIONS } from '@/constant'
import Loading from '@/components/Loading'

export default function Home() {
  const [bookInfoList, setBookInfoList] = useState<BookInfo[]>([])
  const { runAsync: runComicBookList } = useRequest(api.comicBookList, CACHE_OPTIONS.comicBookList())
  const [loading, setLoading] = useState(false)

  const init = async function () {
    setLoading(true)
    const newBookInfoList = await runComicBookList()
    setBookInfoList(newBookInfoList)
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  return loading ?
    <Loading />:
    (<>
      <Header bookInfoList={bookInfoList} />
      <main className="max-w-screen-md bg-p-2 rounded-md p-4 sm:p-8 shadow-br m-4 sm:mx-8 md:mx-auto">
        { bookInfoList.length > 0 ?
          (
            <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2">
              <BookList bookInfoList={bookInfoList} />
            </div>
          ) : (
            <div className='h-[50vh] w-full text-center flex flex-col justify-center'>
              <span className='text-[26px] text-gray-600'>Not Found</span>
            </div>
          )
        }
      </main>
    </>)
}