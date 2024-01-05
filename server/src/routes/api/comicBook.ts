import { mementoFn } from '@/utils/cache'
import { scanBookFolder } from '@/routes/api/core'
import { excludeProperty } from '@/utils/index'

export interface ChaptersItem {
  name: string,
  href: string,
  path: string,
  rawName: string,
  preChapter?: {
    name: string,
    href: string,
    rawName: string
  },
  nextChapter?: {
    name: string,
    href: string,
    rawName: string
  },
}

export interface FetchComicBookRes {
  name: string,
  pathName: string,
  author: string,
  desc: string,
  coverUrl: string,
  coverPath: string,
  chapters: ChaptersItem[],
  url: string,
  language: string,
  rawUrl: string
}
async function fetchComicBook(bookPath: string, comicBookName: string): Promise<FetchComicBookRes | null> {
  const bookInfo = await scanBookFolder(bookPath, comicBookName)
  if (!bookInfo) return null
  const resBookInfo = excludeProperty(bookInfo, ['chapters', 'coverUrl'])
  resBookInfo.chapters = bookInfo.chapters.map(chapter => {
    return excludeProperty(chapter, ['imageList', 'imageListPath', 'preChapter', 'nextChapter', 'href'])
  })
  return resBookInfo
}

const cacheFetchComicBook = mementoFn(fetchComicBook)

export {
  cacheFetchComicBook as fetchComicBook
}
