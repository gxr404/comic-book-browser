import { mementoFn } from '@/utils/cache'
import { scanBookFolder } from '@/routes/api/core'
import type { RawChaptersItem } from '@/routes/api/core'
import { excludeProperty } from '@/utils'

type GetComicChapterRes = Omit<RawChaptersItem, 'imageList'|'href'>

type GetComicChapter= (bookPath: string, bookName: string, chapterName: string) => Promise<GetComicChapterRes | null>
const getComicChapter: GetComicChapter = async (bookPath, bookName, chapterName) => {
  const bookInfo = await scanBookFolder(bookPath, bookName)
  if (!bookInfo) return null
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

const cacheGetComicChapter = mementoFn(getComicChapter)

export {
  cacheGetComicChapter as getComicChapter
}
