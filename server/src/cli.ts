import { readFileSync } from 'node:fs'
import { cac } from 'cac'
import { run } from './index'
import { logger } from './utils/log'

const cli = cac('comic-book-browser')

export interface IOptions {
  bookPath: string
  port: number
}

const { version } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url)).toString(),
)

cli
  .option('-d, --bookPath <dir>', '漫画目录(comic-book所在的目录) eg: -d .', {
    default: '.',
  })
  .option('-p, --port <port>', '服务启动的端口号 eg: -p 3000', {
    default: 3000
  })

cli.help()
cli.version(version)

try {
  const {options} = cli.parse()
  run(options as IOptions)
} catch (err: any) {
  logger.error(err.message || 'unknown exception')
  process.exit(1)
}
