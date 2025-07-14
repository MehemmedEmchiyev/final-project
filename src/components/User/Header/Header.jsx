import { Link } from "react-router";
import { HiMiniBars3 } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { changeFlag } from "../../../store/hamMenuSlice";
import HamMenu from "./HamMenu";
import { useEffect, useState } from "react";
export const menuItems = ["Store", "News", "FAQ", "Help", "About Epic"];

function Header() {
  const { flag } = useSelector(store => store.bars)
  const [scroll , setScroll] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScroll(window.scrollY > 50)
    }
    window.addEventListener("scroll" , onScroll)
    return () => window.removeEventListener("scroll", onScroll);
  },[])

  const dispatch = useDispatch()
  return (

    <div>
      <header className={` fixed top-0 w-full z-100 px-[1rem] md:px-[1.5rem] ${scroll ? "backdrop-blur-md bg-black/50" : "bg-black"} flex items-center justify-between py-5`}>
        <div className="w-12 h-8 ">
          <img src="images/logo.png" className="w-full h-full object-contain" />
        </div>
        <div className="block md:hidden ">
          {
            flag ? <IoCloseOutline onClick={() => dispatch(changeFlag())} className="text-white text-2xl" /> : <HiMiniBars3 onClick={() => dispatch(changeFlag())} className="text-white text-2xl" />
          }
        </div>
        <div className="hidden md:flex items-center justify-between w-full">
          <nav className="ml-4">
            <menu className="text-white" >
              {menuItems.map((item, index) => <Link className="py-2.5 px-3 duration-300 hover:text-[#ffffffa6]" key={index}>{item}</Link>)}
            </menu>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="rounded-[6px] cursor-pointer duration-200 py-1 px-3 bg-[#ffffff26] text-white hover:bg-[#636366]">Sign in</button>
            <button className="bg-[#26bbff] hover:bg-blue-300 px-3 py-1 rounded-[6px] cursor-pointer duration-200">Download</button>
          </div>
        </div>

      </header>
      <HamMenu   />
    </div>
  )
}

export default Header