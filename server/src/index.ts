import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import qrcode from 'qrcode-terminal'
import router from './routes/index'
import { IOptions } from './cli'
import { logger } from './utils/log'
import { scanFolder } from './routes/api/core'
import { getIPAdress } from './utils'

export function run(config: IOptions) {
  const staticPath = path.resolve(config.bookPath)
  const bookPath = path.join(staticPath, 'comic-book')

  const isExists = fs.existsSync(bookPath)
  if (!isExists) {
    logger.error('× 不存在 comic-book 目录')
    return
  }

  const clientPath = path.join(
    fileURLToPath(import.meta.url),
    '../../client-dist'
  )

  const app = new Koa()
  // 设置全局上下文 后续路由可取
  app.context.G = {
    staticPath,
    bookPath: bookPath
  }
  app.use(router.routes())
  // 挂载静态资源目录
  app.use(mount('/public', serve(staticPath)))
  // 挂载客户端目录
  app.use(mount('/', serve(clientPath)))
  app.listen(config.port, () => {
    logger.info('(つ•̀ω•́)つ 欢迎star: https://github.com/gxr404/comic-book-browser')
    const ip = getIPAdress()
    let internalNetwork = ''
    const localNetwork = `http://127.0.0.1:${config.port}`
    let infoStr = '√ 服务已启动,请用浏览器打开'
    if (ip !== '127.0.0.1') {
      internalNetwork = `http://${ip}:${config.port}`
      infoStr += `${internalNetwork} or`
    }
    infoStr += ` ${localNetwork}`
    logger.info(infoStr)
    echoQRcode(internalNetwork || localNetwork)
    // 提前扫描目录
    scanFolder(bookPath)
  })
}

export function echoQRcode(url: string) {
  return new Promise((resolve, reject) => {
    try {
      qrcode.generate(url, { small: true }, (qrcode: string) => {
        console.log(qrcode)
        resolve(qrcode)
      })
    } catch(e) {
      reject(e)
    }
  })
}
