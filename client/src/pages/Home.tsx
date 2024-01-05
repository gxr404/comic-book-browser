import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import * as api from '@/api'
import type {BookInfo} from '@/api'
import BookList from '@/components/BookList'
import Header from '@/components/Header'
import { CACHE_OPTIONS } from '@/constant'

export default function Home() {
  const [bookInfoList, setBookInfoList] = useState<BookInfo[]>([])
  const { runAsync: runComicBookList } = useRequest(api.comicBookList, CACHE_OPTIONS.comicBookList())

  const init = async function () {
    const newBookInfoList = await runComicBookList()
    setBookInfoList(newBookInfoList)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Header bookInfoList={bookInfoList} />
      <main className="max-w-screen-md bg-p-2 rounded-md p-4 sm:p-8 shadow-br m-4 sm:mx-8 md:mx-auto">
        <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2">
          <BookList bookInfoList={bookInfoList} />
        </div>
      </main>
    </>
  )
}