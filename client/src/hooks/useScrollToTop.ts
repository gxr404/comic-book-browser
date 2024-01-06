import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScrollToTop(callback: () => void) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof callback === 'function') {
      callback()
    }
    window.scrollTo({
      top: 0
    })
  }, [pathname, callback])
}