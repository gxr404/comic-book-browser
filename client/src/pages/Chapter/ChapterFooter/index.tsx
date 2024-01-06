import { lazy, useCallback, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { Virtuoso } from 'react-virtuoso'
import { BookInfoContext, ChapterInfoContext } from '@/pages/Chapter/Provider'
import useScrollToTop from '@/hooks/useScrollToTop'

interface Props {
  show: boolean,
  chapterName: string
}

const Drawer = lazy(() => import('antd/lib/drawer'))

export default function ChapterFooter(props: Readonly<Props>) {
  const {show} = props
  const bookInfo = useContext(BookInfoContext)
  const chapterInfo = useContext(ChapterInfoContext)
  const { nextChapter, preChapter } = chapterInfo ?? {}

  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const [showCatalog, setShowCatalog] = useState(false)
  const openCatalog = () => setShowCatalog(true)
  const closeCatalog = () => setShowCatalog(false)

  let msgExist = false

  function messageLog(msg: string) {
    if (!msgExist) {
      msgExist = true
      messageApi.open({
        content: msg,
        className: 'mt-[30vh] text-white',
        onClose:() => {
          msgExist = false
        }
      })
    }
  }

  useScrollToTop(useCallback(() => {
    closeCatalog()
  }, []))


  const goHome = () => {
    navigate('/')
  }

  const onPreChapter = () => {
    if (preChapter) {
      navigate(`/detail/${bookInfo.pathName}/${preChapter.name}`)
      return
    }
    messageLog('没有上一话了 (╥﹏╥)')
  }
  const onNextChapter = () => {
    if (nextChapter) {
      navigate(`/detail/${bookInfo.pathName}/${nextChapter.name}`)
      return
    }
    messageLog('已是最新一话了 (╥﹏╥)')
  }

  return (
    <>
      {contextHolder}
      <footer className={`fixed -bottom-1 z-40 w-full transition duration-500
        backdrop-blur supports-backdrop-blur:bg-white/60
        border-t border-slate-900/10 dark:border-slate-300/10
        bg-p-1/95 dark:bg-p-1/80 shadow-top dark:shadow-gray-900
        ${!show ? 'translate-y-full' : ''}
      `}>
        <div className="flex items-center justify-between py-2">
          <button className="flex flex-col items-center flex-1 hover:text-p-3 active:text-p-4" onClick={onPreChapter}>
            <i className="iconfont icon-left text-[20px] font-bold leading-[26px]"/>
            <span className="text-sm">上一话</span>
          </button>
          <button className="flex flex-col items-center flex-1 hover:text-p-3 active:text-p-4" onClick={openCatalog}>
            <i className="iconfont icon-catalog text-[20px] font-bold leading-[26px]"/>
            <span className="text-sm">目录</span>
          </button>
          <button className="flex flex-col items-center flex-1 hover:text-p-3 active:text-p-4" onClick={goHome}>
            <i className="iconfont icon-home text-[22px] font-bold leading-[26px]"/>
            <span className="text-sm">首页</span>
          </button>
          <button className="flex flex-col items-center flex-1 hover:text-p-3 active:text-p-4" onClick={onNextChapter}>
            <i className="iconfont icon-right text-[20px] font-bold leading-[26px]"/>
            <span className="text-sm">下一话</span>
          </button>
        </div>
        <Drawer
          title={<p className="dark:text-white text-center">目录</p>}
          placement="right"
          onClose={closeCatalog}
          open={showCatalog}
          closeIcon={<i className="iconfont icon-close dark:text-white text-[20px]"/>}
          classNames={{
            header: 'border-b border-slate-900/10 dark:border-slate-300/10',
            body: 'p-0',
            content: 'backdrop-blur supports-backdrop-blur:bg-white/80 bg-p-1/95 bg-white dark:bg-p-1/80 dark:text-white',
          }}
          width={ typeof window !== 'undefined' && document.body.clientWidth < 768 ? '70vw': '30vw'}>
            <Virtuoso
              style={{ height: '100%' }}
              data={bookInfo?.chapters}
              itemContent={(index,item) => (
                <Link
                  className="border-b border-slate-900/10 dark:border-slate-300/10 truncate text-[14px] leading-[40px] block mx-[20px]"
                  key={`${index}${item.name}`}
                  to={`/detail/${bookInfo.name}/${item.name}`}
                >
                {item.rawName}
              </Link>
            )}/>
        </Drawer>
      </footer>
    </>
  )
}