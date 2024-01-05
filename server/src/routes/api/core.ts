import {readdir, stat, readFile} from 'node:fs/promises'
import { join } from 'node:path'
import pLimit from 'p-limit'
import { notEmpty } from '@/utils/index'
import { mementoFn } from '@/utils/cache'

export interface RawChaptersItem {
  name: string,
  href: string,
  path: string,
  imageList: string[],
  imageListPath: string[],
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

export interface RawBookInfo {
  name: string,
  pathName: string,
  author: string,
  desc: string,
  coverUrl: string,
  coverPath: string,
  chapters: RawChaptersItem[],
  url: string,
  language: string,
  rawUrl: string
}

async function scanBookFolder(bookPath: string, bookName: string) {
  const curBookPath = join(bookPath, bookName)
  let bookInfo: RawBookInfo|null = null
  try {
    const bookInfoStr = await readFile(`${curBookPath}/bookInfo.json`, {encoding: 'utf-8'})
    bookInfo = JSON.parse(bookInfoStr)
    if (bookInfo) {
      bookInfo.coverPath = join('/public/comic-book/', bookName, bookInfo.coverPath)
      bookInfo.chapters.forEach(item => {
        item.imageListPath = item.imageListPath.map((imgPath) => {
          return join('/public/comic-book/', bookName, imgPath)
        })
      })
    }
  } catch (e) {
    return null
  }
  return bookInfo
}

const cachesScanBookFolder = mementoFn(scanBookFolder)

async function scanFolder(bookPath: string): Promise<RawBookInfo[]> {
  const dirContentList = await readdir(bookPath)
  const limit = pLimit(10)
  const promiseList = dirContentList.map((item) => {
    // return limit()
    return limit(async () => {
      const curBookPath = join(bookPath, item)
      const itemStat = await stat(curBookPath)
      if (!itemStat.isDirectory()) return null
      return await cachesScanBookFolder(bookPath, item)
    })
  })
  const tempBookInfoList = await Promise.all(promiseList)
  const bookInfoList = tempBookInfoList.filter(notEmpty)
  return bookInfoList
}

const cachesSanFolder = mementoFn(scanFolder)

export {
  cachesSanFolder as scanFolder,
  cachesScanBookFolder as scanBookFolder
}
