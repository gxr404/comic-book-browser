export default function Loading() {
  return  (
    <div className='h-screen flex items-center justify-center'>
      <p className="text-[30px]">
        <i className="iconfont icon-loading animate-spin inline-block text-p-3 text-[30px] mr-2" />
        <span>Loading . . .</span>
      </p>
    </div>
  )
}