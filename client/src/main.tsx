import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import router from './router'

import './assets/iconfont/iconfont.css'
import './globals.css'

const antTheme = {
  components: {
    Message: {
      contentBg: 'rgba(0,0,0,0.8)'
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="bg-p-1 min-h-svh">
    <React.StrictMode>
      <ConfigProvider theme={antTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  </div>
)
