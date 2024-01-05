import { createContext } from 'react'
import type { ComicBookRes, ComicChapterRes } from '@/api/index'

interface BookInfoProviderProps {
  children: React.ReactNode
  bookInfo: ComicBookRes | null
}

const defaultBookInfo = {
  name: '',
  pathName: '',
  author: '',
  desc: '',
  coverUrl: '',
  coverPath: '',
  chapters: [],
  url: '',
  language: '',
  rawUrl: ''
}
const BookInfoContext = createContext<ComicBookRes>(defaultBookInfo)

function BookInfoProvider ({ children, bookInfo }: Readonly<BookInfoProviderProps>) {
  if (bookInfo) {
    return (
      <BookInfoContext.Provider value={bookInfo}>
      {children}
      </BookInfoContext.Provider>
    )
  }
  return <>{children}</>
}


interface ChapterInfoProviderProps {
  children: React.ReactNode
  chapterInfo: ComicChapterRes | undefined
}

const defaultComicChapter = {
  name: '',
  href: '',
  path: '',
  imageList: [],
  imageListPath: [],
  rawName: '',
}

const ChapterInfoContext = createContext<ComicChapterRes>(defaultComicChapter)

function ChapterInfoProvider ({ children, chapterInfo }: Readonly<ChapterInfoProviderProps>) {
  if (chapterInfo) {
    return (
      <ChapterInfoContext.Provider value={chapterInfo}>
        {children}
      </ChapterInfoContext.Provider>
    )
  }
  return <>{children}</>
}

export {
  BookInfoContext,
  BookInfoProvider,
  ChapterInfoContext,
  ChapterInfoProvider
}