import { useContext, useEffect, useRef, useState } from 'react'
import { useDebounceFn, useEventListener, useLocalStorageState } from 'ahooks'
import { LOCAL_STORAGE_HISTORY } from '@/constant'
import type { ILocalHistoryItem } from '@/constant'
import { BookInfoContext } from '@/components/Provider'
import ChapterFooter from '@/components/ChapterFooter'
import ChapterHeader from '@/components/ChapterHeader'
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
  const bookInfo = useContext(BookInfoContext)
  const chapterInfo = bookInfo.chapters.find(item => item.name === chapterName)

  const onScroll = () => {
    const { scrollTop } = document.documentElement
    // 向上滚显示菜单 向下滚隐藏菜单
    setShowMenu(scrollTop <= tempScrollTop.current)
    tempScrollTop.current = scrollTop
  }
  const {run} = useDebounceFn(onScroll,{wait: 100})
  useEventListener('scroll', run, {passive: true})

  useEffect(() => {
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
      <main
        className="max-w-screen-md mx-auto"
        onClick={() => setShowMenu(!showMenu)}>
        {children}
      </main>
      <ChapterFooter show={showMenu} chapterName={chapterName}/>
      <BackTop show={showMenu} visibilityHeight={4000} />
    </>
  )
}