import {readdir, stat, readFile} from 'node:fs/promises'
import { join } from 'node:path'
import pLimit from 'p-limit'
import { notEmpty } from '@/utils/index'
import { mementoFn } from '@/utils/cache'

export interface RawChaptersItem {
  /** 章节名(ps: 处理过的:index_原始章节名) */
  name: string,
  /** 原始章节名 */
  rawName: string,
  /** 排序索引 */
  index: number
  /** 章节url */
  href: string,
  /** 图片url列表 */
  imageList: string[],
  /** 图片path列表 */
  imageListPath: string[],
  /** 上一话内容 */
  preChapter?: {
    name: string,
    href: string,
    rawName: string
  },
  /** 下一话内容 */
  nextChapter?: {
    name: string,
    href: string,
    rawName: string
  },
}

export interface RawBookInfo {
  /** 原始漫画名 */
  name: string,
  /** 漫画名(ps: 处理过 不符合path的特殊字符使用"_"替换) */
  pathName: string,
  /** 作者名 */
  author: string,
  /** 漫画描述 */
  desc: string,
  /** 封面url */
  coverUrl: string,
  /** 封面path */
  coverPath: string,
  /** 章节列表 */
  chapters: RawChaptersItem[],
  /** 漫画的url(ps: 处理过 如果www重定向改为cn/tw) */
  url: string,
  /** 漫画的原始url */
  rawUrl: string,
  /** 语言(简/繁) */
  language: string,
}

/**
 * 扫描某本漫画目录，获取bookInfo.json内容
 * @param bookPath 漫画目录路径
 * @param bookName 漫画名
 * @returns 特定某本漫画的bookInfo.json
 */
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

/**
 * 扫描整个漫画目录所有漫画
 * @param bookPath 漫画目录路径
 * @returns 返回整个漫画目录所有漫画bookInfo.json
 */
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
