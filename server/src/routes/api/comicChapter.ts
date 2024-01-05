import { mementoFn } from '@/utils/cache'
import { RawChaptersItem, scanBookFolder } from '@/routes/api/core'
import { excludeProperty } from '@/utils'

async function fetchComicChapter(bookPath: string, comicBookName: string, chapterName: string): Promise<RawChaptersItem | null> {
  const bookInfo = await scanBookFolder(bookPath, comicBookName)
  if (!bookInfo) return null
  // imageList
  let res = bookInfo.chapters.find(chapter => {
    return chapter.name == chapterName
  }) ?? null
  if (res) {
    res = excludeProperty(res, ['imageList', 'href'])
    if (res?.nextChapter) {
      res.nextChapter = excludeProperty(res.nextChapter, ['href'])
    }
    if (res?.preChapter) {
      res.preChapter = excludeProperty(res.preChapter, ['href'])
    }
  }
  return res
}

const cacheFetchComicChapter = mementoFn(fetchComicChapter)

export {
  cacheFetchComicChapter as fetchComicChapter
}
