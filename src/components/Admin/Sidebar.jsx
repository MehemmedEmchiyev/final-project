import { Link, useLocation, useNavigate } from "react-router"
import { CgWebsite } from "react-icons/cg";
import { FaUsersCog, FaRegNewspaper, FaChartBar, FaProductHunt } from "react-icons/fa";
import { LuTickets, LuSwords } from "react-icons/lu";
import { MdOutlineTypeSpecimen, MdFeaturedPlayList, MdEmojiEvents } from "react-icons/md";
import { GiPlatform } from "react-icons/gi";
import { SiEpicgames } from "react-icons/si";
import { useState } from "react";

function Sidebar() {
  const menuItems = [
    { title: "Dashboard", href: '', icons: <FaChartBar /> },
    { title: "Products", href: 'products', icons: <FaProductHunt /> },
    { title: "Genres", href: 'genres', icons: <LuSwords /> },
    { title: "Features", href: 'features', icons: <MdFeaturedPlayList /> },
    { title: "Events", href: 'events', icons: <MdEmojiEvents /> },
    { title: "Types", href: 'types', icons: <MdOutlineTypeSpecimen /> },
    { title: "Platforms", href: 'platforms', icons: <GiPlatform /> },
    { title: "Subscription", href: 'subscription', icons: <LuTickets /> },
    { title: "News", href: 'news', icons: <FaRegNewspaper /> },
    { title: "Users", href: 'users', icons: <FaUsersCog /> },
  ]
  const navigator = useNavigate()
  const signOut = () => {
    localStorage.clear()
    navigator('/adminlogin')
  }
  const {pathname} = useLocation()
  const path = pathname.replace("/admin/",'')
  console.log(path);
  
  
  return (
    <>
      <div className="min-h-screen p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800">
        <h1 className="text-2xl flex items-center justify-center gap-3 font-bold text-center">
          <SiEpicgames />
          <span>Admin Panel</span>
        </h1>
        <div className="flex flex-col justify-between h-max divide-y dark:divide-gray-300">
          <ul className=" pt-2 pb-4 space-y-1 text-sm">
            {
              menuItems.map((item, index) => <li key={index} className="dark:bg-gray-100 rounded-md hover:bg-gray-700 hover:text-white duration-300 dark:text-gray-900">
                <Link to={item.href} className={`flex items-center p-2 space-x-3 rounded-md ${path == item.href ? "bg-gray-700 text-white" : ""}`}>
                  {item.icons}
                  <span>{item.title}</span>
                </Link>
              </li>)
            }

          </ul>
          <ul className="pt-4  pb-2 space-y-1 text-sm">
            
            <li>
              <Link rel="noopener noreferrer" to='/store' className="flex items-center p-2 space-x-3 rounded-md">
                <CgWebsite />
                <span>Go To WebSite</span>
              </Link>
            </li>
            <li>
              <button onClick={signOut} className="flex items-center p-2 space-x-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar