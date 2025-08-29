import { CiSearch } from "react-icons/ci";
import { Link, NavLink, useLocation } from "react-router";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatue } from "../../../store/blackUiSlice";
import { changeSearch } from "../../../store/searchSlice";
import { IoClose } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useGetCartsQuery, useLazyGetUserByIdQuery } from "../../../store/services/epicApi";
import { RiAdminLine } from "react-icons/ri";
import Loader from "../../ui/Loader";

const navbar = [
    { title: 'Discover', href: '' },
    { title: 'Browser', href: 'browse' },
    { title: 'News', href: 'news' },
]

function Navbar() {
    const { data: carts, isError } = useGetCartsQuery()
    const [getUser , {isLoading}] = useLazyGetUserByIdQuery()
    const { pathname } = useLocation()
    const path = pathname == '/store' ? '' : pathname.replace('/store/', '')
    const { statue } = useSelector(store => store.black)
    const { search } = useSelector(store => store.search)
    const dispatch = useDispatch()
    const [scroll, setScroll] = useState(false)
    useEffect(() => {
        statue && dispatch(changeStatue(false))
    }, [pathname])
    useEffect(() => {
        const onScroll = () => { setScroll(window.scrollY > 50) }
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll);
    }, [])
    const [user,setUser] = useState({})
    useEffect(() => {
        const user = async () => {
            const res = await getUser(localStorage.getItem('userId'))
            if(res?.data?.error) return
            else setUser(res?.data)
        }
        user()
    }, [])
    const handleOpenMenu = () => {
        if (statue) dispatch(changeStatue(false))
        else dispatch(changeStatue(true))
        setScroll(true)
    }
    const handleOpenSearch = () => {
        setScroll(true)
        dispatch(changeSearch())
    }

    return (
        <div className={`${scroll || statue ? "sticky top-0 mx-auto z-200010 right-0 left-0" : ""} w-full lg:w-[75%] mx-auto bg-[#18181C] py-4 px-3 lg:px-0 flex items-center ${search ? "" : "justify-between"} lg:justify-start gap-10`}>
            <div className='w-60 h-10 hidden lg:flex items-center gap-3 bg-[#202024] duration-300 rounded-full hover:bg-[#404044] !text-[#B1B1B3]'>
                <div className="m-2"><CiSearch /></div>
                <input type="text" placeholder="Search store" className="pr-3.5 border-0 outline-0" />
            </div>
            <div onClick={handleOpenSearch} className="lg:hidden text-white p-3 rounded-3xl hover:bg-[#404044]">
                {
                    search ?
                        <IoClose className="text-2xl" /> :
                        <CiSearch className="text-xl" />
                }

            </div>
            <div className={`${search ? "block" : "hidden"}`}>
                <input type="text" className="text-white border-0 outline-0" placeholder="Search Store" />
            </div>
            <div className={`lg:hidden block ${search ? "hidden" : ""}`}>
                {
                    path == 'wishlist' || path == 'basket' || path.includes('detail') ?
                        <div onClick={handleOpenMenu} className="relative text-white" >
                            <div className="flex items-center gap-1 p-2.5 cursor-pointer">
                                {navbar[0].title} <MdOutlineKeyboardArrowDown className="mt-[2px]" />
                            </div>
                        </div> :
                        navbar.map((item, index) => <div onClick={handleOpenMenu} className="relative text-white" key={index}>{
                            (path == item.href) ?
                                <div className="flex items-center gap-1 p-2.5 cursor-pointer">
                                    {item.title} <MdOutlineKeyboardArrowDown className="mt-[2px]" />
                                </div> : ""}
                        </div>)
                }
                <div className={`${statue ? "flex" : 'hidden'} flex-col py-7 px-8 bg-[#18181C] w-full h-max absolute top-full left-0`}>
                    {
                        navbar.map((item, index, arr) => <NavLink className={`${path == item.href ? "text-white" : "text-[#9F9FA1]"} ${index == arr.length - 1 ? "" : "border-b border-white"}  hover:text-white py-3 duration-200`} key={index} to={item.href}>{item.title}</NavLink>)
                    }
                </div>
            </div>

            <nav className="hidden lg:flex items-center gap-5 ">
                {
                    navbar.map((item, index) => <NavLink className={`${path == item.href ? "text-white" : "text-[#9F9FA1]"}  hover:text-white duration-200`} key={index} to={item.href}>{item.title}</NavLink>)
                }
            </nav>
            <div className={`${search ? "hidden" : "flex"} lg:flex  space-x-3 items-center  text-sm  text-[#9F9FA1] justify-end lg:w-full`}>
                {
                    isLoading ? <div><Loader property={'text-blue-400'} /></div> :
                    <div className={`${(user?.role?.name == "ADMIN" && localStorage.getItem('userId')) ? "" : "hidden"}`}>
                        <Link to='/admin' className={`hidden lg:inline font-semibold hover:text-white`}>Dashboard</Link>
                        <Link to='/admin' className={`inline font-extrabold text-xl  lg:hidden hover:text-white`}><RiAdminLine /></Link>
                    </div>
                }
                <Link to='wishlist' className={`${path == "wishlist" ? "text-white" : ""} hidden lg:inline font-semibold hover:text-white`}>Wishlist</Link>
                <Link to='wishlist' className={`${path == "wishlist" ? "text-white" : ""} inline font-extrabold text-xl  lg:hidden hover:text-white`}><FaRegCheckCircle /></Link>
                <Link to='basket' className={`${path == "basket" ? "text-white" : ""} hidden lg:inline font-semibold hover:text-white`}>Cart
                    {
                        !isError && carts?.data.length > 0 && (
                            <span className="ml-2 font-semibold bg-blue-400 rounded-2xl text-black px-4 text-sm py-[1px]">
                                {carts?.data.length}
                            </span>
                        )
                    }
                </Link>
                <Link to='basket' className={`${path == "basket" ? "text-white" : ""} relative inline  font-extrabold text-xl lg:hidden  hover:text-white`}><MdOutlineShoppingCart />
                    {
                        !isError && carts?.data.length > 0 && (
                            <span className="absolute left-[30%] -top-full font-semibold bg-blue-400 rounded-2xl text-black px-2 text-sm py-[1px]">
                                {carts?.data.length}
                            </span>
                        )
                    }
                </Link>
            </div>
        </div>
    )
}

export default Navbar