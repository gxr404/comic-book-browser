import { lazy, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { BookInfo } from '@/api'

interface SearchProps {
  bookInfoList?: BookInfo[]
}

const AutoComplete = lazy(() => import('antd/lib/auto-complete'))

const renderItem = (bookInfo: BookInfo, text: string) => {
  text = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const textReg = new RegExp(`${text}`, 'g')
  const showNameEl = bookInfo.name.replace(textReg, `<span class="text-p-3">${text}</span>` )
  const lastChapter = bookInfo.lastChapter
  return (
    <div className="flex text-white group justify-between">
      <div className="overflow-hidden rounded-sm">
        <img
          className="object-cover group-hover:scale-110 transition w-[45px] h-[60px]"
          src={bookInfo.coverPath} alt={bookInfo.name} />
      </div>
      <div className="pl-4 overflow-hidden flex flex-col justify-between">
        <p className="truncate text-black dark:text-white group-hover:text-p-3 text-sm text-right transition-all"
          dangerouslySetInnerHTML={{__html: showNameEl}}>
        </p>
        <p className="text-sm truncate text-gray-400 text-right">最新: {lastChapter?.rawName}</p>
      </div>
    </div>
  )
}


interface OptionsItem {
  label: JSX.Element,
  value: string
}

export default function Search(props: Readonly<SearchProps>) {
  const { bookInfoList = [] } = props
  const [options, setOptions] = useState<OptionsItem[]>([])
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()
  function onSearch(text: string) {
    setSearchText(text)
    if (!text.trim()) {
      setOptions([])
      return
    }
    const textReg = new RegExp(`${text}`, 'g')
    const findList = bookInfoList.filter(bookInfo => textReg.test(bookInfo.name))
    const newOptions: OptionsItem[] = []
    findList.forEach(bookInfo => {
      newOptions.push({
        label: renderItem(bookInfo, text),
        value: bookInfo.pathName
      })
    })
    setOptions(newOptions)
  }

  function onSelect(data: any) {
    window.scrollTo({
      top: 0
    })
    navigate(`/detail/${data}`)
  }
  return (
    <div className="h-[38px] px-4 w-full md:w-1/3 md:ml-auto max-w-[300px]">
      <AutoComplete
        onSearch={onSearch}
        onSelect={onSelect}
        options={options}
        style={{ width: '100%' }}
        popupClassName={`fixed bg-p-1/95 dark:bg-p-1/80 backdrop-blur supports-backdrop-blur:bg-white/60  ${!searchText ? 'hidden' : ''}`}
        notFoundContent={<div className="text-center text-gray-400">-- Not Found --</div>}
      >
          {/* bg-p-1/95 dark:bg-p-1/80 backdrop-blur supports-backdrop-blur:bg-white/60 */}
        <div className="relative">
          <i className="iconfont icon-search absolute left-[10px] top-[7px] text-black/30 dark:text-gray-50/20" />
          <input className="h-[38px] rounded-full outline-0 px-4 pl-[34px] transition-all
            dark:caret-white dark:text-white text-[14px]
            border border-slate-900/10 dark:border-slate-300/10
            placeholder:text-black/30 dark:placeholder:text-gray-50/20
            bg-transparent w-full dark:hover:bg-slate-700/20 dark:focus:bg-slate-700/20"
            placeholder="请输入书名..."
            />
        </div>
      </AutoComplete>
    </div>
  )
}

