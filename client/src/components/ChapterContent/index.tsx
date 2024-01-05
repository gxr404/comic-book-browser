import { useContext, useState } from 'react'
import { Empty } from 'antd'
import { BookInfoContext, ChapterInfoContext } from '@/components/Provider'

interface FCProps {
  bookName: string,
  chapterName: string
}

interface ComicImageProps {
  imagePath: string,
  index: number,
  bookName: string
}
function ComicImage(props: Readonly<ComicImageProps>) {
  const {imagePath} = props
  const [loading, setLoading] = useState(true)
  const onLoad = () => {
    setLoading(false)
  }
  return (
    <li key={imagePath} className="flex min-h-[33vh] justify-center items-center relative">
      {
        loading &&
        <div className='flex absolute inset-0 z-0 justify-center items-center'>
          <i className="iconfont icon-loading animate-spin inline-block text-p-3 text-[30px]" />
        </div>
      }
      <img
        className="w-full block min-h-[33vh] pointer-events-none relative z-[1]"
        loading="lazy"
        onLoad={onLoad}
        src={imagePath}
        alt={imagePath}/>
    </li>
  )
}

interface ListProps {
  bookName: string,
  imageListPath: string[]
}
function List({bookName, imageListPath}: Readonly<ListProps>) {
  return (
    <ul>
      {imageListPath.map((imagePath, index) => {
        return <ComicImage key={imagePath} imagePath={imagePath} index={index} bookName={bookName}/>
      })}
    </ul>
  )
}

const ChapterContent: React.FC<FCProps> = ({ bookName }) =>  {
  const bookInfo = useContext(BookInfoContext)
  const chapterInfo = useContext(ChapterInfoContext)
  const imageListPath = chapterInfo.imageListPath
  return (
    <section>
      {(bookInfo && imageListPath.length>0)
        ? <List bookName={bookName} imageListPath={imageListPath} />
        : <Empty
          className='h-lvh flex flex-col justify-center'
          description={
            <span className='dark:text-white'>Not Found</span>
          }/>}
    </section>
  )
}

export default ChapterContent