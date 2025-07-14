import { useSelector } from "react-redux"
import { menuItems } from "./Header"
import { Link } from "react-router"

function HamMenu() {
    const { flag } = useSelector(store => store.bars)
    return (
        <div className={`${flag ? "top-0 mt-[74px] py-5" : "-top-[100%]"}   transform duration-700 flex flex-col justify-between bg-[#101014] md:hidden fixed z-50 w-full h-full  left-0 `}>
            <div>
                <div className="px-4 text-end">
                    <button className="rounded-[6px] cursor-pointer duration-200 py-1 px-3 bg-[#ffffff26] text-white hover:bg-[#636366]">Sign in</button>
                </div>
                <div className="p-4">
                    <h2 className="text-[32px] px-2 text-white font-bold mb-[20px] tracking-[1.12px]">Menu</h2>
                    <ul className="flex flex-col ">
                        {
                            menuItems.map((item, index) => <Link className="py-3 px-2 text-white" key={index}>{item}</Link>)
                        }
                    </ul>
                </div>
            </div>
            <div className="p-4 mb-15">
                <button className="bg-[#26bbff] w-full  hover:bg-blue-300 px-3 py-3 rounded-[6px] cursor-pointer duration-200">Download</button>
            </div>
        </div>
    )
}

export default HamMenu