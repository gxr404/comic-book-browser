import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import router from './routes/index'
import mount from 'koa-mount'
import { IOptions } from './cli'
import { logger } from './utils/log'
import { scanFolder } from './routes/api/core'

interface ContextGlobal {
  staticPath: string
}

export function run(config: IOptions) {
  const staticPath = path.resolve(config.bookPath)
  const bookPath = path.join(staticPath, 'comic-book')

  const isExists = fs.existsSync(bookPath)
  if (!isExists) {
    logger.error('× 不存在 comic-book 目录')
    return
  }
  const clientPath = path.join(fileURLToPath(import.meta.url), '../../client-dist')
  const app = new Koa()
  app.context.G = {
    staticPath,
    bookPath: bookPath
  } as ContextGlobal

  app.use(bodyParser())
  app.use(router.routes())
  app.use(mount('/public', serve(staticPath)))
  app.use(mount('/', serve(clientPath)))
  app.listen(config.port, () => {
    logger.info(` \\(^o^)/ 服务已启动 请用浏览器打开 http://127.0.0.1:${config.port}`)
    // 提前扫描目录
    scanFolder(bookPath)
  })

}

