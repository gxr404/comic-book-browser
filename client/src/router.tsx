import { createHashRouter } from 'react-router-dom'
import Home from '@/pages/Home'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/detail/:bookName',
    lazy: async () => {
      const Detail = await import('@/pages/Detail')
      return {Component: Detail.default}
    }
  },
  {
    path: '/detail/:bookName/:chapterName',
    lazy: async () => {
      const Chapter = await import('@/pages/Chapter')
      return {Component: Chapter.default}
    }
  }
])

export default router
