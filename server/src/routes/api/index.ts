import Router from '@koa/router'
import { STATUS_CODE } from '@/constant'
import { fetchComicBookList } from './comicBookList'
import { fetchComicBook } from './comicBook'
import { fetchComicChapter } from './comicChapter'
import { cleanCache } from '@/utils/cache'

const router = new Router()

router.get('/comicBookList',async (ctx) => {
  const data = await fetchComicBookList(ctx.G.bookPath)
  ctx.body = {
    code: STATUS_CODE.SUCCESS,
    data
  }
})

router.get('/comicBook',async (ctx) => {
  const { bookPath } = ctx.G
  const { name } = ctx.query
  if (!bookPath || !name || Array.isArray(name)) {
    ctx.body = {
      code: STATUS_CODE.MISSING_PARAM
    }
    return
  }
  const data = await fetchComicBook(bookPath, name)
  ctx.body = {
    code: STATUS_CODE.SUCCESS,
    data
  }
})

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
  const data = await fetchComicChapter(bookPath, name, chapter)
  ctx.body = {
    code: STATUS_CODE.SUCCESS,
    data
  }
})

router.get('/cleanCache', (ctx) => {
  cleanCache()
  ctx.body = {
    code: STATUS_CODE.SUCCESS
  }
})

export default router