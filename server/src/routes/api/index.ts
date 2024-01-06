import Router from '@koa/router'
import { STATUS_CODE } from '@/constant'
import { cleanCache } from '@/utils/cache'
import { getComicBookList } from './comicBookList'
import { getComicBook } from './comicBook'
import { getComicChapter } from './comicChapter'

const router = new Router()

// 获取漫画列表
router.get('/comicBookList',async (ctx) => {
  const data = await getComicBookList(ctx.G.bookPath)
  ctx.body = {
    code: STATUS_CODE.SUCCESS,
    data
  }
})

// 获取某本漫画(含 Chapter章节内容 不含imageList)
router.get('/comicBook',async (ctx) => {
  const { bookPath } = ctx.G
  const { name } = ctx.query
  if (!bookPath || !name || Array.isArray(name)) {
    ctx.body = {
      code: STATUS_CODE.MISSING_PARAM
    }
    return
  }
  const data = await getComicBook(bookPath, name)
  ctx.body = {
    code: STATUS_CODE.SUCCESS,
    data
  }
})

// 获取漫画某章节具体内容(含imageList)
router.get('/comicChapter',async (ctx) => {
  const { bookPath } = ctx.G
  const { name, chapter } = ctx.query

  if (!bookPath ||
    !name || Array.isArray(name) ||
    !chapter || Array.isArray(chapter)) {
    ctx.body = {
      code: STATUS_CODE.MISSING_PARAM
    }
    return
  }
  const data = await getComicChapter(bookPath, name, chapter)

  ctx.body = {
    code: STATUS_CODE.SUCCESS,
    data
  }
})

// 清理服务端扫描文件缓存
router.get('/cleanCache', (ctx) => {
  cleanCache()
  ctx.body = {
    code: STATUS_CODE.SUCCESS
  }
})

export default router