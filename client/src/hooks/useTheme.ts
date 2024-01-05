import { useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

const LOCAL_THEME_KEY = 'theme'

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark'
}

interface Actions {
  switchTheme: () => void,
}

export function useTheme(): [string, Actions] {
  const [theme, setTheme] = useState<THEME>(THEME.LIGHT)
  const initial = useRef(true)

  useIsomorphicLayoutEffect(() => {
    const newTheme = localStorage.getItem(LOCAL_THEME_KEY) as THEME || THEME.LIGHT
    setTheme(newTheme)
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (initial.current) {
      initial.current = false
    } else {
      document.documentElement.classList.remove(THEME.DARK)
      document.documentElement.classList.remove(THEME.LIGHT)
      document.documentElement.classList.add(theme)
      localStorage.setItem(LOCAL_THEME_KEY, theme)
    }
  }, [theme])

  function switchTheme() {
    const newTheme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    setTheme(newTheme)
  }
  return [
    theme,
    {
      switchTheme
    }
  ]
}
