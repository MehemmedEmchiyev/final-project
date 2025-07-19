import { useSelector } from 'react-redux'
import Card from '../../../components/User/Card'
import GenerSlider from '../../../components/User/Store/Browse/GenerSlider'
import AccountDropdown from '../../../components/ui/AccountDropdown'
import CardSkeleton from '../../../components/ui/CardSkeleton'
import { useGetProductsQuery } from '../../../store/services/epicApi'
function Browse() {
  const { data, isLoading } = useGetProductsQuery()
  const { price } = useSelector(store => store.price)
  const loadArr = Array.from({ length: 4 }, () => "")
  const sortedData = price === 1
    ? [...data?.data].sort((a, b) => b.price - a.price)
    : price === -1
      ? [...data?.data].sort((a, b) => a.price - b.price)
      : data?.data;
  return (
    <main className='px-6 lg:px-0 pt-10'>
      <GenerSlider />
      <div className='py-10'>
        <div className='flex pb-3 items-center justify-between '>
          <div className='w-4/5 flex gap-1 items-center'>
            <div className='text-[#ABABAC]'>Show:</div>
            <div><AccountDropdown /></div>
          </div>
          <div className='block lg:hidden'>filter</div>
          <h2 className='text-white font-bold w-1/5 hidden lg:block'>Filter</h2>
        </div>

        <div className='flex gap-3 text-white'>
          <div className='w-full lg:w-4/5'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-10'>
              {
                isLoading ?
                  loadArr.map((_, index) => <CardSkeleton key={index} />)
                  :
                  sortedData?.map((item, index) => <Card key={index} item={item} />)
              }
            </div>
          </div>
          <div className='hidden lg:block lg:w-1/5'>filter</div>
        </div>
      </div>
    </main>
  )
}

export default Browse