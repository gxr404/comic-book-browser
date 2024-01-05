
import Router from '@koa/router'
import api from './api/index'

const router = new Router()

router.use('/api', api.routes())

export default router