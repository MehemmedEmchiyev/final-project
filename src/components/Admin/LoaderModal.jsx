import '../../style/loader.css'
function LoaderModal() {
  return (
    <div className='flex w-full h-full z-[9999999] bg-black items-center justify-center fixed  top-0 left-0 '>
        <div className='spinner'></div>
    </div>
  )
}

export default LoaderModal