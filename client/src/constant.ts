export const LOCAL_STORAGE_HISTORY = 'local_history'

export interface ILocalHistoryItem {
  bookName: string,
  chapterName: string,
  rawChapterName: string
}

// 请求缓存30s
export const REQUEST_CACHE_TIME = 1000 * 30

// 请求缓存的key
export const CACHE_KEY = {
  comicBookList: () => 'cache-comic-book-list',
  comicBook: (bookName: string) => `cache-${bookName}`,
  comicChapter: (bookName: string, chapterName: string) => `cache-${bookName}-${chapterName}`,
}

export const CACHE_OPTIONS = {
  comicBookList() {
    return {
      cacheKey: CACHE_KEY.comicBookList(),
      staleTime: REQUEST_CACHE_TIME,
      manual: true
    }
  },
  comicBook(bookName: string) {
    return {
      cacheKey: CACHE_KEY.comicBook(bookName),
      staleTime: REQUEST_CACHE_TIME,
      manual: true
    }
  },
  comicChapter(bookName: string, chapterName: string) {
    return {
      cacheKey: CACHE_KEY.comicChapter(bookName, chapterName),
      staleTime: REQUEST_CACHE_TIME,
      manual: true
    }
  }
}