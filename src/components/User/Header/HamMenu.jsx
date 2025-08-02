import { useDispatch, useSelector } from "react-redux"
import { menuItems } from "./Header"
import { Link, useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { changeFlag } from "../../../store/hamMenuSlice"
import { useLazyGetUserByIdQuery } from "../../../store/services/epicApi"
import { ArrowLeft } from "lucide-react"
import toast from "react-hot-toast"

function HamMenu() {
    const { flag } = useSelector(store => store.bars)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const navigator = useNavigate()
    useEffect(() => {
        dispatch(changeFlag(false))
    }, [pathname])
    const goToLogin = () => navigator('/login')
    const signOut = () => {
        localStorage.clear()
        toast.success("Succesfully Sign Out!")
        navigator('/store/browse')
        setUser({})
        setOpen(false)
    }
    const [getUser, { isLoading }] = useLazyGetUserByIdQuery()
    const userId = localStorage.getItem('userId') || false
    const [user, setUser] = useState({})

    useEffect(() => {
        const checkUser = async () => {
            if (userId) {
                const res = await getUser(userId)
                setUser(res?.data)
            }
        }
        checkUser()
    }, [])

    return (
        <div className={`${flag ? "top-0 mt-15 py-5" : "-top-[100%]"}   transform duration-700 flex flex-col justify-between bg-[#101014] md:hidden fixed z-300 w-full h-full  left-0 `}>
            {
                open ?
                    <div className="p-3 text-white">
                        <div onClick={() => setOpen(false)} className="flex items-center gap-4 py-2 px-2">
                            <ArrowLeft />
                            <span>Back</span>
                        </div>
                        <ul className="">
                            <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">My Achievements</li>
                            <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Epic Rewards</li>
                            <Link className="block px-4 py-2 hover:bg-white/10 cursor-pointer" to="account/payment-settings">Account Balance</Link>
                            <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Coupons</li>
                            <Link className="block px-4 py-2 hover:bg-white/10 cursor-pointer" to="account">Account</Link>
                            <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Redeem Code</li>
                            <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Redeem Fortnite Gift Card</li>
                            <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Wishlist</li>
                            <li onClick={signOut} className="px-4 py-2 hover:bg-white/10 cursor-pointer">Sign Out</li>
                        </ul>
                    </div> :
                    <>
                        <div>
                            <div className="px-4 text-end">
                                {
                                    userId && user ?
                                        <div className="">
                                            {
                                                isLoading ?
                                                    <div className="animate-pulse w-20 h-5 rounded dark:bg-gray-300"></div>
                                                    :
                                                    <div onClick={() => setOpen(!open)} className="flex items-center justify-end gap-3">
                                                        <div className="w-8 cursor-pointer uppercase h-8 flex items-center justify-center bg-[#404044] text-white rounded-full">
                                                            {user?.username?.at(0)}
                                                        </div>
                                                        <h2 className="text-white">{user?.username}</h2>
                                                    </div>
                                            }
                                        </div>
                                        :
                                        <button onClick={goToLogin} className="rounded-[6px] cursor-pointer duration-200 py-1 px-3 bg-[#ffffff26] text-white hover:bg-[#636366]">Sign in</button>
                                }
                            </div>
                            <div className="p-4">
                                <h2 className="text-[32px] px-2 text-white font-bold mb-[20px] tracking-[1.12px]">Menu</h2>
                                <ul className="flex flex-col ">
                                    {menuItems.map((item, index) => <Link to={item.href} className="py-3 px-2 text-white" key={index}>{item.title}</Link>)}
                                </ul>
                            </div>
                        </div>
                        <div className="p-4 mb-15">
                            <button className="bg-[#26bbff] w-full  hover:bg-blue-300 px-3 py-3 rounded-[6px] cursor-pointer duration-200">Download</button>
                        </div>
                    </>}
        </div>
    )
}

export default HamMenu