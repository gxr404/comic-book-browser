import { mementoFn } from '@/utils/cache'
import { scanFolder } from '@/routes/api/core'
import type { RawBookInfo } from '@/routes/api/core'
import { excludeProperty } from '@/utils/index'

/** 排除掉 chapters coverUrl, 添加lastChapter最新章节内容 */
interface BookInfo extends Omit<RawBookInfo, 'chapters'|'coverUrl'> {
  lastChapter: {
    rawName: string | undefined
  }
}
type GetComicBookListRes = BookInfo[]

async function getComicBookList(bookPath: string): Promise<GetComicBookListRes> {
  const bookInfoList = await scanFolder(bookPath)
  return bookInfoList.map(bookInfo => {
    const lastChapter = bookInfo.chapters.at(-1)
    const bookInfoItem = excludeProperty(bookInfo, ['chapters', 'coverUrl'])
    bookInfoItem.lastChapter = {
      rawName: lastChapter?.rawName
    }
    return bookInfoItem
  })
}

const cacheGetComicBookList = mementoFn(getComicBookList)

export {
  cacheGetComicBookList as getComicBookList,
}
