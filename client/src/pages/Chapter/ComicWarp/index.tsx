import { useContext, useEffect, useRef, useState } from 'react'
import { useDebounceFn, useEventListener, useLocalStorageState } from 'ahooks'
import { LOCAL_STORAGE_HISTORY } from '@/constant'
import type { ILocalHistoryItem } from '@/constant'
import { ChapterInfoContext } from '@/pages/Chapter/Provider'
import ChapterFooter from '@/pages/Chapter/ChapterFooter'
import ChapterHeader from '@/pages/Chapter/ChapterHeader'
import BackTop from '@/components/BackTop'

interface ComicWarpProps {
  children: React.ReactNode,
  chapterName: string,
  bookName: string
}

export default function ComicWarp({ children, chapterName, bookName }: Readonly<ComicWarpProps>) {
  const [showMenu, setShowMenu] = useState(true)
  const initRef = useRef(true)
  const [localHistory, setLocalHistory] = useLocalStorageState<ILocalHistoryItem[]>(LOCAL_STORAGE_HISTORY, {
    defaultValue: []
  })
  const tempScrollTop = useRef(0)
  const chapterInfo = useContext(ChapterInfoContext)
  // const chapterInfo = bookInfo.chapters.find(item => item.name === chapterName)

  const onScroll = () => {
    const { scrollTop, scrollHeight,clientHeight } = document.documentElement
    // 滚到底部 快10像素时显示窗口
    const isScrollEnd = clientHeight - (scrollHeight - scrollTop) >= -40
    // 向上滚显示菜单 向下滚隐藏菜单
    setShowMenu(scrollTop <= tempScrollTop.current || isScrollEnd)
    tempScrollTop.current = scrollTop
  }
  const {run} = useDebounceFn(onScroll,{wait: 100})
  useEventListener('scroll', run, {passive: true})

  useEffect(() => {
    if (!chapterInfo.rawName
      && chapterInfo.imageListPath.length === 0){
      return
    }
    const newHistoryItem = {
      bookName,
      chapterName,
      rawChapterName: chapterInfo?.rawName || ''
    }
    if (!initRef.current) return
    initRef.current = false
    if (!localHistory) {
      setLocalHistory([newHistoryItem])
    } else {
      const index = localHistory?.findIndex(item => item.bookName === bookName) ?? -1
      if (index >= 0) {
        localHistory.splice(index, 1)
      }
      setLocalHistory([...localHistory, newHistoryItem])
    }
  }, [bookName, chapterName, localHistory, setLocalHistory, chapterInfo])

  return (
    <>
      <ChapterHeader show={showMenu} chapterName={chapterName}/>
      <div onClick={() => setShowMenu(!showMenu)}>
        <main className="max-w-screen-md mx-auto">
          {children}
        </main>
      </div>
      <ChapterFooter show={showMenu} chapterName={chapterName}/>
      <BackTop show={showMenu} visibilityHeight={4000} />
    </>
  )
}