import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { BookInfoContext } from '@/pages/Chapter/Provider'

interface ChapterHeaderProps {
  show: boolean,
  chapterName: string
}

export default function ChapterHeader(props: Readonly<ChapterHeaderProps>) {
  const { show, chapterName } =  props
  const [, {switchTheme}] = useTheme()
  const bookInfo = useContext(BookInfoContext)
  const chapterInfo = bookInfo.chapters.find(item => item.name === chapterName)
  return (
    <header className={
      `fixed top-0 z-40 w-full transition duration-500
      border-b border-slate-900/10 dark:border-slate-300/10
      backdrop-blur supports-backdrop-blur:bg-white/60
      bg-p-1/95 dark:bg-p-1/80 shadow-bottom dark:shadow-gray-900
      ${!show ? '-translate-y-full' : ''}`
    }>
      <div className="max-w-[90rem] mx-auto">
        <div className="py-2 lg:px-8 mx-4 lg:mx-0 text-s-1">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <Link to={`/detail/${bookInfo.pathName}`}>
                <i className="iconfont icon-logout text-[26px]"></i>
              </Link>
            </div>
            <p className="truncate px-[10px]">
              {chapterInfo?.rawName}
            </p>
            <div>
              <button className="p-1" onClick={switchTheme}>
                <i className="iconfont icon-sun hover:text-p-3 font-bold text-[20px] dark:hidden"></i>
                <i className="iconfont icon-moon hover:text-p-3 font-bold text-[20px] hidden dark:inline"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
