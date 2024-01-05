import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(key: string, initStorage: T): [T, (arg: T) => void] {
  const [storage, setStorage] = useState<T>(initStorage)

  function updateStorage(data: T) {
    const dataStr = JSON.stringify(data)
    setStorage(data)
    localStorage.setItem(key, dataStr)
  }

  useEffect(() => {
    const dataStr = localStorage.getItem(key) ?? '{}'
    try {
      const data = JSON.parse(dataStr)
      setStorage(data)
    } catch(e) {
      console.log(e)
    }
  }, [key])

  return [storage, updateStorage]
}