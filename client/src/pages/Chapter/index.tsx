import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest, useTitle } from 'ahooks'
import { BookInfoProvider, ChapterInfoProvider } from '@/pages/Chapter/Provider'
import ChapterContent from '@/pages/Chapter/ChapterContent'
import ComicWarp from '@/pages/Chapter/ComicWarp'
import * as api from '@/api'
import type {ComicBookRes, ComicChapterRes} from '@/api'
import { CACHE_OPTIONS } from '@/constant'
import Loading from '@/components/Loading'

export default function Chapter() {
  const { bookName = '', chapterName = '' } = useParams()
  useTitle(`${bookName} - ${chapterName} - Comic Browser`)
  const [loading, setLoading] = useState(false)
  const [bookInfo, setBookInfo] = useState<ComicBookRes | null>(null)
  const [chapterInfo, setChapterInfo] = useState<ComicChapterRes| null>()

  const { runAsync: runComicChapter } = useRequest(
    api.comicChapter,
    CACHE_OPTIONS.comicChapter(bookName, chapterName)
  )
  const { runAsync: runComicBook } = useRequest(
    api.comicBook,
    CACHE_OPTIONS.comicBook(bookName)
  )

  async function init() {
    setLoading(true)

    const bookInfo = await runComicBook(bookName)
    setBookInfo(bookInfo)
    const chapterInfo = await runComicChapter(bookName, chapterName)
    setChapterInfo(chapterInfo)

    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [bookName, chapterName])

  return (
    loading ?
    <Loading /> :
    <BookInfoProvider bookInfo={bookInfo}>
      <ChapterInfoProvider chapterInfo={chapterInfo}>
        <ComicWarp
          bookName={bookName}
          chapterName={chapterName}>
          <ChapterContent
            bookName={bookName}
            chapterName={chapterName}/>
        </ComicWarp>
      </ChapterInfoProvider>
    </BookInfoProvider>
  )
}