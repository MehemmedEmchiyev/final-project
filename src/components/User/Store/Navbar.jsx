import { CiSearch } from "react-icons/ci";
import { NavLink, useLocation } from "react-router";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatue } from "../../../store/blackUiSlice";
import { changeSearch } from "../../../store/searchSlice";
import { IoClose } from "react-icons/io5";

const navbar = [
    { title: 'Discover', href: '' },
    { title: 'Browser', href: 'browse' },
    { title: 'News', href: 'news' },
]
function Navbar() {
    const { pathname } = useLocation()

    const path = pathname == '/store' ? '' : pathname.replace('/store/', '')
    const { statue } = useSelector(store => store.black)
    const { search } = useSelector(store => store.search)
    const dispatch = useDispatch()
    const [scroll, setScroll] = useState(false)
    useEffect(() => {
        statue && dispatch(changeStatue())
    }, [pathname])
    useEffect(() => {
        const onScroll = () => {
            setScroll(window.scrollY > 50)

        }
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll);
    }, [])
    const handleOpenMenu = () => {
        if (statue) dispatch(changeStatue())
        else dispatch(changeStatue())
        setScroll(true)
    }
    const handleOpenSearch = () => {
        setScroll(true)
        dispatch(changeSearch())
    }


    return (
        <div className={`${scroll || statue ? "sticky top-0 mx-auto z-99 right-0 left-0" : ""} w-full lg:w-[75%] mx-auto bg-[#18181C] py-4 px-3 lg:px-0 flex items-center gap-10`}>
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
            <div className={`lg:hidden ${search ? "hidden" : ""}`}>
                {
                    navbar.map((item, index) => <div onClick={handleOpenMenu} className="relative text-white" key={index}>{path == item.href ? <div className="flex items-center gap-1 p-2.5 cursor-pointer
                        ">{item.title} <MdOutlineKeyboardArrowDown className="mt-[2px]" /></div> : ""}
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

        </div>
    )
}

export default Navbar