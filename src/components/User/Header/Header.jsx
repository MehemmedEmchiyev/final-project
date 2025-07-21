import { Link, useLocation, useNavigate } from "react-router";
import { HiMiniBars3 } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { changeFlag } from "../../../store/hamMenuSlice";
import HamMenu from "./HamMenu";
import { useEffect, useState } from "react";
import { useLazyGetUserByIdQuery } from "../../../store/services/epicApi";
import toast from "react-hot-toast";
import { SiEpicgames } from "react-icons/si";

export const menuItems = [
  { title: "Store", href: "/store", location: 'store' },
  { title: "News", href: "/news", location: '' },
  { title: "FAQ", href: "/faq", location: '' },
  { title: "Help", href: "/help", location: '' },
  { title: "About Epic", href: "/about", location: '' }
];

function Header() {
  const { flag } = useSelector(store => store.bars)
  const dispatch = useDispatch()
  const [scroll, setScroll] = useState(false)
  const [user, setUser] = useState({})
  const { pathname } = useLocation()
  const [getUser, { isLoading }] = useLazyGetUserByIdQuery()
  useEffect(() => {
    const onScroll = () => {
      !pathname.includes('/store') && setScroll(window.scrollY > 50)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const navigator = useNavigate()
  const goToLogin = () => {
    navigator('/login')
  }
  const userId = localStorage.getItem('userId') || false
  useEffect(() => {
    const checkUser = async () => {
      if (userId) {
        const res = await getUser(userId)
        setUser(res?.data)
      }
    }
    checkUser()
  }, [])
  const [open , setOpen] = useState(false)
  const signOut = () => {
    localStorage.clear()
    toast.success("Succesfully Sign Out!")
    navigator('/store/browse')
    setUser({})
  }
  
  
  return (

    <div>
      <header className={`${pathname.includes('store') ? "relative" : "fixed"} top-0 w-full z-100 px-[1rem] md:px-[1.5rem] ${scroll ? "backdrop-blur-md bg-black/50" : "bg-black"} flex items-center justify-between ${pathname.includes("store") ? "py-5 md:py-0" : "py-5"}`}>
        <div className="w-12 h-8 ">
          <Link to='/'>
            <SiEpicgames className="text-2xl text-white w-full h-full"/>
          </Link>
        </div>
        <div className="order-2 block md:hidden ">
          {
            flag ? <IoCloseOutline onClick={() => dispatch(changeFlag())} className="text-white text-2xl" /> : <HiMiniBars3 onClick={() => dispatch(changeFlag())} className="text-white text-2xl" />
          }
        </div>
        <div className="hidden md:flex items-center justify-between w-full">
          <nav className="ml-4">
            <menu className="text-white" >
              {(pathname.includes('/store') ? menuItems.filter(item => item.location == 'store') : menuItems).map((item, index) => <Link to={item.href} className="py-2.5 px-3 duration-300 hover:text-[#ffffffa6]" key={index}>{(item.title == 'Store' && pathname.includes('store')) ?
                <img width={54} height={32} src="/images/LogoEpic.svg" /> :
                item.title
              }</Link>)}
            </menu>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {
              userId && user ?
                <div className="">
                  {
                    isLoading ?
                      <div className="animate-pulse w-20 h-5 rounded dark:bg-gray-300"></div>
                      :
                      <div className="flex items-center gap-3">
                        <div onClick={() => setOpen(!open)} className="w-8 cursor-pointer uppercase h-8 flex items-center justify-center bg-[#404044] text-white rounded-full">
                          {user?.username?.at(0)}
                        </div>
                        <h2 className="text-white">{user?.username}</h2>
                        <div className="relative inline-block text-left">
                          {open && (
                            <ul className="absolute right-full top-full mt-6 w-64 rounded-xl shadow-lg bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-white z-50">
                              <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">My Achievements</li>
                              <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Epic Rewards</li>
                              <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Account Balance</li>
                              <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Coupons</li>
                              <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Account</li>
                              <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Redeem Code</li>
                              <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Redeem Fortnite Gift Card</li>
                              <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Wishlist</li>
                              <li onClick={signOut} className="px-4 py-2 hover:bg-white/10 cursor-pointer">Sign Out</li>
                            </ul>
                          )}
                        </div>
                      </div>
                  }
                </div>
                :
                <button onClick={goToLogin} className="rounded-[6px] cursor-pointer duration-200 py-1 px-3 bg-[#ffffff26] text-white hover:bg-[#636366]">Sign in</button>
            }
            <button className="bg-[#26bbff] hover:bg-blue-300 px-3 py-1 rounded-[6px] cursor-pointer duration-200">Download</button>
          </div>
        </div>

      </header>
      <HamMenu />
    </div>
  )
}

export default Header