import { mementoFn } from '@/utils/cache'
import { scanBookFolder } from '@/routes/api/core'
import type { RawBookInfo, RawChaptersItem } from '@/routes/api/core'
import { excludeProperty } from '@/utils/index'


type OmitChapterItem = Omit<RawChaptersItem, 'imageList' | 'imageListPath' | 'preChapter'| 'nextChapter'| 'href'>
interface GetComicBookRes extends Omit<RawBookInfo, 'chapters' | 'coverUrl'> {
  chapters: OmitChapterItem[]
}

async function getComicBook(bookPath: string, comicBookName: string): Promise<GetComicBookRes | null> {
  const bookInfo = await scanBookFolder(bookPath, comicBookName)
  if (!bookInfo) return null
  const resBookInfo = excludeProperty(bookInfo, ['chapters', 'coverUrl'])
  resBookInfo.chapters = bookInfo.chapters.map(chapter => {
    return excludeProperty(chapter, ['imageList', 'imageListPath', 'preChapter', 'nextChapter', 'href'])
  })
  return resBookInfo
}

const cacheGetComicBook = mementoFn(getComicBook)

export {
  cacheGetComicBook as getComicBook
}
