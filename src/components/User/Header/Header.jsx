import { Link, useLocation, useNavigate } from "react-router";
import { HiMiniBars3 } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { changeFlag } from "../../../store/hamMenuSlice";
import HamMenu from "./HamMenu";
import { useEffect, useState } from "react";
export const menuItems = [
  { title: "Store", href: "/store", location: 'store' },
  { title: "News", href: "/news", location: '' },
  { title: "FAQ", href: "/faq", location: '' },
  { title: "Help", href: "/help", location: '' },
  { title: "About Epic", href: "/about", location: '' }
];

function Header() {
  const { flag } = useSelector(store => store.bars)
  const [scroll, setScroll] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      !pathname.includes('/store') && setScroll(window.scrollY > 50)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const dispatch = useDispatch()
  const navigator = useNavigate()
  const goToLogin = () => {
    navigator('/login')
  }
  return (

    <div>
      <header className={`${pathname.includes('store') ? "relative" : "fixed"} top-0 w-full z-100 px-[1rem] md:px-[1.5rem] ${scroll ? "backdrop-blur-md bg-black/50" : "bg-black"} flex items-center justify-between ${pathname.includes("store") ? "" : "py-5"}`}>
        <div className="w-12 h-8 ">
          <Link to='/'>
            <img src="images/logo.png" className="w-full h-full object-contain" />
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
                <img width={54} height={32} src="https://cms-assets.unrealengine.com/AVzjeqAbLRKi3W5jq0CAvz/cmb81xhnx3wl407o5wzb06x28" /> :
                item.title
              }</Link>)}
            </menu>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={goToLogin} className="rounded-[6px] cursor-pointer duration-200 py-1 px-3 bg-[#ffffff26] text-white hover:bg-[#636366]">Sign in</button>
            <button className="bg-[#26bbff] hover:bg-blue-300 px-3 py-1 rounded-[6px] cursor-pointer duration-200">Download</button>
          </div>
        </div>

      </header>
      <HamMenu />
    </div>
  )
}

export default Header