import { useCallback, useEffect, useState } from 'react'
import { useDebounceFn, useEventListener } from 'ahooks'

interface BackTopProps {
  /** 是否显示(show 优先判断) */
  show?: boolean;
  /** 距离多少高度显示 */
  visibilityHeight?: number
}

export default function BackTop(props: Readonly<BackTopProps>) {
  const {
    show: propShow = true,
    visibilityHeight = 2000
  } = props
  const [show, setShow] = useState(false)

  const checkShow = useCallback(() => {
    const { scrollTop } = document.documentElement
    setShow(scrollTop >= visibilityHeight && propShow)
  }, [propShow, visibilityHeight])

  useEffect(() => {
    checkShow()
  }, [propShow, checkShow])

  const onScroll = checkShow
  const {run} = useDebounceFn(onScroll,{wait: 100})
  useEventListener('scroll', run, {passive: true})

  const backTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button className={
      `fixed bottom-20 transition-all duration-500
      w-12 h-12 flex items-center justify-center rounded-full
      backdrop-blur supports-backdrop-blur:bg-white/60
      bg-p-1/95 dark:bg-p-1/80 md:dark:bg-p-2 shadow-bottom dark:shadow-gray-900 z-[1]
      hover:text-p-3 font-bold
      ${ show ? 'right-2' : '-right-16'}`
    } onClick={backTop}>
      <i className="iconfont icon-back-top text-[20px]"></i>
    </button>
  )
}