import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookInfoProvider, ChapterInfoProvider } from '@/components/Provider'
import ChapterContent from '@/components/ChapterContent'
import ComicWarp from '@/components/ComicWarp'
import * as api from '@/api'
import type {ComicBookRes, ComicChapterRes} from '@/api'
import { useRequest, useTitle } from 'ahooks'
import { CACHE_OPTIONS } from '@/constant'

export default function Chapter() {
  const { bookName = '', chapterName = '' } = useParams()
  useTitle(`${bookName} - ${chapterName} - Comic Browser`)
  const [bookInfo, setBookInfo] = useState<ComicBookRes | null>(null)
  const [chapterInfo, setChapterInfo] = useState<ComicChapterRes>()

  const { runAsync: runComicChapter } = useRequest(
    api.comicChapter,
    CACHE_OPTIONS.comicChapter(bookName, chapterName)
  )
  const { runAsync: runComicBook } = useRequest(
    api.comicBook,
    CACHE_OPTIONS.comicBook(bookName)
  )


  async function init() {
    const bookInfo = await runComicBook(bookName)
    if (bookInfo) {
      setBookInfo(bookInfo)
    }
    const chapterInfo = await runComicChapter(bookName, chapterName)
    if (chapterInfo) {
      setChapterInfo(chapterInfo)
    }
  }

  useEffect(() => {
    init()
  }, [bookName, chapterName])
  return (
    <BookInfoProvider bookInfo={bookInfo}>
      <ChapterInfoProvider chapterInfo={chapterInfo}>
        <ComicWarp
          bookName={bookName}
          chapterName={chapterName}>
          {chapterInfo &&
            <ChapterContent
              bookName={bookName}
              chapterName={chapterName}/>
          }
        </ComicWarp>
      </ChapterInfoProvider>
    </BookInfoProvider>
  )
}