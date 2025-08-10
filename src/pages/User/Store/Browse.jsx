import { useSelector } from 'react-redux'
import Card from '../../../components/User/Card'
import GenerSlider from '../../../components/User/Store/Browse/GenerSlider'
import AccountDropdown from '../../../components/ui/AccountDropdown'
import CardSkeleton from '../../../components/ui/CardSkeleton'
import { useGetEventsQuery, useGetFeaturesQuery, useGetGenresQuery, useGetPlatformsQuery, useGetProductsQuery, useGetSubscriptionQuery, useGetTypesQuery } from '../../../store/services/epicApi'
import { CiSearch } from "react-icons/ci";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useEffect, useState } from 'react'
import { ImCheckmark } from "react-icons/im";
import { X } from 'lucide-react'
import { IoFilterOutline } from "react-icons/io5";
import Pagination from '../../../components/User/Store/Browse/Pagination'

function Browse() {
  const [path, setPath] = useState([])
  const params = path.join("&")
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, isFetching } = useGetProductsQuery({ page, params })
  const { price } = useSelector(store => store.price)
  const loadArr = Array.from({ length: 4 }, () => "")
  const sortedData = price === 1
    ? [...data?.data].sort((a, b) => b.discountedPrice - a.discountedPrice)
    : price === -1
      ? [...data?.data].sort((a, b) => a.discountedPrice - b.discountedPrice)
      : data?.data;
  const { data: events } = useGetEventsQuery()
  const { data: genre } = useGetGenresQuery()
  const { data: features } = useGetFeaturesQuery()
  const { data: types } = useGetTypesQuery()
  const { data: platforms } = useGetPlatformsQuery()
  const { data: subscription } = useGetSubscriptionQuery()
  const filters = [
    { title: "Events", data: events },
    { title: "Genre", data: genre },
    { title: "Features", data: features },
    { title: "Types", data: types },
    { title: "Platforms", data: platforms },
    { title: "Subscription", data: subscription },
  ]
  const [isOpen, setIsOpen] = useState([]);
  const renderOpen = (index) => {
    if (isOpen.includes(index)) setIsOpen(isOpen.filter(item => item != index))
    else setIsOpen([...isOpen, index])
  }

  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("")

  const toggleEvent = (name, event, id) => {
    const value = name == "Events" ? "eventId" :
      name == "Genre" ? "genreId" :
        name == "Features" ? "featureId" :
          name == "Types" ? "typeId" :
            name == "Platforms" ? "platformId" :
              "subscriptionId"

    const path = `${value}=${id}`

    setPath((prev) =>
      prev.includes(path)
        ? prev.filter((e) => e !== path)
        : [...prev, path]
    )
    setSelected((prev) =>
      prev.includes(event)
        ? prev.filter((e) => e !== event)
        : [...prev, event]
    )
  }
  const getSearchProduct = e => {
    const value = e.target.value
    setSearch(value)

    setPath((prev) => {
      const filtered = prev.filter(p => !p.includes("search="))
      if (value.trim() == "") return filtered
      return [...filtered, `search=${value}`]
    }
    )
  }
  useEffect(() => {
    const params = new URLSearchParams()
    path.forEach(filter => {
      const [key, value] = filter?.split("=")
      params.append(key, value)
    })
    window.history.replaceState(null, "", "?" + params.toString())
  }, [path])

  const reset = () => {
    setSelected([])
    setPath([])
    setSearch("")
  }
  const [mobileFilter, setMobileFilter] = useState(false)

  return (
    <main className='pt-10'>
      <GenerSlider />
      <div className='py-10'>
        <div className='flex pb-3 items-center justify-between '>
          <div className='w-4/5 flex gap-1 items-center'>
            <div className='text-[#ABABAC]'>Show:</div>
            <div><AccountDropdown /></div>
          </div>
          <div onClick={() => setMobileFilter(true)} className='flex items-center justify-between gap-3 lg:hidden bg-[#343437] rounded px-1 py-1'>
            <h2 className='text-white font-bold  whitespace-nowrap'>Filter</h2>
            <IoFilterOutline className='text-white mt-1' />
          </div>
          <div className=' hidden lg:flex items-center justify-between w-1/5'>
            <h2 className='text-white font-bold w-1/5  whitespace-nowrap'>Filters {path.length ? `(${path.length})` : ""}</h2>
            <span onClick={reset} className={`cursor-pointer text-sm text-blue-500 ${path.length ? "inline" : "hidden"}`}>reset</span>
          </div>
        </div>
        <div className='flex gap-6 text-white'>
          <div className='w-full lg:w-4/5'>
            <div className={`${isError ? "" : "grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10"}`}>
              {
                isLoading || isFetching ?
                  loadArr.map((_, index) => <CardSkeleton key={index} />)
                  : isError || sortedData?.length == 0 ?
                    <div className='text-center'>
                      <h2 className='text-3xl md:text-5xl text-white'>No results found</h2>
                      <p className='text-[#ACACAD] pt-2 text-[14px]'>Unfortunately I could not find any results matching your search.</p>
                    </div>
                    :
                    sortedData?.map((item, index) => <Card key={index} item={item} />)
              }
            </div>
          </div>
          <div className={`fixed overflow-auto ${mobileFilter ? "block" : "hidden"} lg:block lg:static top-0 px-3 pt-7 lg:px-0 lg:py-0 left-0 w-full h-full lg:h-max z-100 bg-[#18181C] lg:bg-transparent lg:w-1/5`}>
            <div className='flex flex-col cursor-pointer'>
              <div className='flex lg:hidden items-center justify-between w-full pb-3'>
                <h2 className='text-white font-bold  whitespace-nowrap'>Filters {path.length ? `(${path.length})` : ""}</h2>
                <span className='mt-1' onClick={() => setMobileFilter(false)} ><X /></span>
              </div>
              <div className='bg-[#202024]  mb-3 flex items-center gap-3 py-2 px-3 rounded'>
                <div className='w-5 h-5 flex items-center justify-center'><CiSearch /></div>
                <input type="text" value={search} onChange={getSearchProduct} className='border-0 outline-0 text-sm' placeholder='Keywords' />
              </div>
              {
                filters.map((item, index) => <div key={index} className={`w-full border-b border-[#343437] text-white ${isOpen.includes(index) ? "pt-10 pb-4" : "py-10"} lg:py-4  `}>
                  <div
                    className="flex justify-between items-center cursor-pointer mb-2"
                    onClick={() => renderOpen(index)}
                  >
                    <span className={`${isOpen.includes(index) ? "text-white" : "text-[#ACACAD]"} font-medium text-xl lg:text-sm `}>{item.title}</span>
                    <span className="text-sm">{!isOpen.includes(index) ? <SlArrowDown /> : <SlArrowUp />}</span>
                  </div>

                  {isOpen.includes(index) && (
                    <ul className="space-y-1">
                      {item.data?.map((event, index) => {
                        const isSelected = selected.includes(event?.name)
                        return (
                          <li
                            key={index}
                            onClick={() => toggleEvent(item.title, event?.name, event?.id)}
                            className={`px-3 flex items-center justify-between py-4 rounded cursor-pointer text-[#ACACAD] text-sm transition-all ${isSelected
                              ? 'bg-[#343437] border-white border'
                              : 'hover:bg-[#343437] border border-transparent'
                              }`}
                          >
                            {event?.name} {isSelected && <span className="ml-1">
                              <ImCheckmark />
                            </span>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>)
              }

            </div>
            <div className='lg:hidden block text-white my-10 w-full'>
              <button onClick={reset} className='w-full py-3 text-white border text-xl border-white bg-transparent rounded-xl'>Clear</button>
            </div>
          </div>
        </div>
      </div>
      {data?.totalPages > 1 && (
        <Pagination
          location={"User"}
          page={page}
          path= {path}
          totalPages={data?.totalPages}
          setPage = {setPage}
          onChange={(newPage) => setPage(newPage)}
        />
      )}

    </main>
  )
}

export default Browse