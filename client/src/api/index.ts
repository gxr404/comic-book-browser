const API = {
  comicBookList: '/api/comicBookList',
  comicBook: '/api/comicBook',
  comicChapter: '/api/comicChapter',
  cleanCache: '/api/cleanCache'
}

interface CommonResponse<T = any> {
  code: number,
  data: T
}

interface RawChaptersItem {
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

interface RawBookInfo {
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

export interface BookInfo extends Omit<RawBookInfo, 'chapters'|'coverUrl'> {
  lastChapter: {
    rawName: string | undefined
  }
}
export type ComicBookListRes = BookInfo[]
export function comicBookList() {
  return fetch(API.comicBookList)
    .then(response => {
      return response.json() as Promise<CommonResponse<ComicBookListRes>>
    }).then(res => {
      if (res.code !== 0) {
        return [] as BookInfo[]
      }
      return res.data
    }).catch(e => {
      console.error('comicBookList - fetch: ', e)
      return [] as BookInfo[]
    })
}

export type ChapterItem = Omit<RawChaptersItem, 'imageList'|'imageListPath'|'preChapter'|'nextChapter'|'href'>
export interface ComicBookRes extends Omit<RawBookInfo, 'chapters'|'coverUrl'> {
  chapters: ChapterItem[]
}
export function comicBook(bookName: string) {
  if (!bookName) return Promise.resolve(null)
  const params = new URLSearchParams()
  params.append('name', bookName)
  return fetch(`${API.comicBook}?${params.toString()}`)
    .then(response => {
      return response.json() as Promise<CommonResponse<ComicBookRes>>
    }).then(res => {
      if (res.code !== 0) {
        return null
      }
      return res.data
    }).catch(e => {
      console.error('comicBook - fetch: ', e)
      return null
    })
}


export type ComicChapterRes = Omit<RawChaptersItem, 'imageList'|'href'>
export function comicChapter(bookName: string, chapterName: string) {
  if (!bookName || !chapterName) return Promise.resolve(null)
  const params = new URLSearchParams()
  params.append('name', bookName)
  params.append('chapter', chapterName)
  return fetch(`${API.comicChapter}?${params.toString()}`)
    .then(response => {
      return response.json() as Promise<CommonResponse<ComicChapterRes>>
    }).then(res => {
      if (res.code !== 0) {
        return null
      }
      return res.data
    }).catch(e => {
      console.error('comicChapter - fetch: ', e)
      return null
    })
}


export function cleanCache() {
  return fetch(API.cleanCache)
    .then(response => {
      return response.json() as Promise<CommonResponse>
    })
    .then(res => {
      return res.code !== 0
    })
}