import { mementoFn } from '@/utils/cache'
import { scanFolder } from '@/routes/api/core'
import { excludeProperty } from '@/utils/index'

export interface BookInfo {
  name: string,
  pathName: string,
  author: string,
  desc: string,
  coverUrl: string,
  coverPath: string,
  url: string,
  language: string,
  rawUrl: string,
  lastChapter: {
    rawName: string | undefined
  }
}

async function fetchComicBookList(bookPath: string): Promise<BookInfo[]> {
  const bookInfoList = await scanFolder(bookPath)
  return bookInfoList.map(bookInfo => {
    const lastChapter = bookInfo.chapters.at(-1)
    const bookInfoItem: any = excludeProperty(bookInfo, ['chapters', 'coverUrl'])
    bookInfoItem.lastChapter = {
      rawName: lastChapter?.rawName
    }
    return bookInfoItem as BookInfo
  })
}


const cacheFetchComicBookList = mementoFn(fetchComicBookList)

export {
  cacheFetchComicBookList as fetchComicBookList,
}
