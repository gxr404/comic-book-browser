import { useState } from 'react'
import { Link } from 'react-router-dom'
import Search from '@/components/Search'
import { useTheme } from '@/hooks/useTheme'
import type { ComicBookListRes } from '@/api'

import Logo from '@/assets/logo.png'
import LogoDark from '@/assets/logo-dark.png'
import { useEventListener } from 'ahooks'

interface HeaderProps {
  bookInfoList: ComicBookListRes
}

export default function Header(props: Readonly<HeaderProps>) {
  const { bookInfoList = [] } = props
  const [, {switchTheme}] = useTheme()
  const [isOpaque, setIsOpaque] = useState(false)
  const offset = 20
  function onScroll() {
    if (!isOpaque && window.scrollY > offset) {
      setIsOpaque(true)
    } else if (isOpaque && window.scrollY <= offset) {
      setIsOpaque(false)
    }
  }
  useEventListener('scroll', onScroll, {passive: true})

  return (
    <header className={
      `sticky top-0 z-40 w-full transition duration-500
      backdrop-blur supports-backdrop-blur:bg-white/60
      border-b border-slate-900/10 dark:border-slate-300/10
      bg-p-1/95 dark:bg-p-1/80
      ${isOpaque ?
        'bg-p-1 dark:bg-p-1/75 shadow-lg':
        'bg-p-1/95 '
      }`
    }>
      <div className="max-w-[90rem] mx-auto">
        <div className="py-2 lg:px-8 mx-4 lg:mx-0 text-s-1">
          <div className="relative flex items-center justify-between">
            <div className="leading-15">
              <Link to="/">
                <img className="object-cover dark:hidden w-[40px] h-[40px]" src={Logo} alt="logo" />
                <img className="object-cover hidden dark:block w-[40px] h-[40px]" src={LogoDark} alt="logo" />
              </Link>
            </div>
            {
              bookInfoList?.length > 0 &&
              <Search bookInfoList={bookInfoList}/>
            }
            <div>
              <button className="rounded-full p-1 font-bold" onClick={switchTheme}>
                <i className="iconfont icon-sun hover:text-p-3 text-[20px] dark:hidden"></i>
                <i className="iconfont icon-moon hover:text-p-3 text-[20px] hidden dark:inline"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
