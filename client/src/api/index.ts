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

export function comicBookList() {
  return fetch(API.comicBookList)
    .then(response => {
      return response.json() as Promise<CommonResponse<BookInfo[]>>
    }).then(res => {
      if (res.code !== 0) {
        return []
      }
      return res.data
    }).catch(e => {
      console.error('comicBookList - fetch: ', e)
      return []
    })
}

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

export interface ComicBookRes {
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

export interface ComicChapterRes {
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
  }
}

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