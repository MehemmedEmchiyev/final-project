import { LuUser, LuShare2 } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { PiNotePencilLight } from "react-icons/pi";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { BsCreditCard, BsClock, BsTicket } from "react-icons/bs";
import { PiTagLight } from "react-icons/pi";
import { FaCoins } from "react-icons/fa";
import { TbGift } from "react-icons/tb";
import { useEffect, useState } from "react";

function Account() {
    const [flag, setFlag] = useState(false)
    const navigator = useNavigate()
    const { pathname } = useLocation()
    const path = (pathname == "/account") ? "account" : pathname.replaceAll('/account/', "")
    useEffect(() => {
        if (!localStorage.getItem('accessToken')) navigator('/')
    }, [])
    const links = [
        { title: 'Settings', href: '', icon: <LuUser /> },
        { title: 'Linked accounts', href: 'linked-accounts', icon: <LuShare2 /> },
        { title: 'Communication preferences', href: 'communication', icon: <MdOutlineMail /> },
        { title: 'Password and security', href: 'security', icon: <RiShieldKeyholeLine /> },
        { title: 'EULA history', href: 'eula', icon: <PiNotePencilLight /> },
    ];

    const paymentLinks = [
        { title: 'Payment settings', href: 'payment-settings', icon: <BsCreditCard /> },
        { title: 'Transactions', href: 'transactions', icon: <BsClock /> },
        { title: 'Subscriptions', href: 'subscriptions', icon: <PiTagLight /> },
        { title: 'In-game currency', href: 'in-game-currency', icon: <FaCoins /> },
        { title: 'Epic Rewards', href: 'rewards', icon: <TbGift /> },
        { title: 'Redeem code', href: 'redeem', icon: <BsTicket /> },
    ];
    const activPage = pathname == '/account' ? links[0] : (links.find(item => item.href == path) || paymentLinks.find(item => item.href == path))

    return (
        <div>
            <div className="w-full relative lg:hidden  px-5 py-3 text-white bg-[#101014] flex items-center justify-between">
                <div className="flex rounded items-center gap-3 py-2 px-3">
                    <div className="text-[#26BBFF] text-xl">{activPage?.icon}</div>
                    <span>{activPage.title}</span>
                </div>
                <div className="text-2xl" onClick={() => setFlag(!flag)}>
                    {flag ? <MdOutlineClose /> : <MdOutlineKeyboardArrowDown />}
                </div>
            </div>
            {
                flag && <div className='block  w-full text-white lg:hidden bg-[#202024] px-5 py-4'>
                    <h2 className='font-semibold text-xl px-4 pb-3'>Account</h2>
                    <div className="pb-3">
                        {
                            links.map((item, index) => <Link key={index} to={item.href === "account" ? "/" : item.href} className={`${path == item.href ? "bg-[#303034]" : ""} flex rounded items-center gap-3 hover:bg-[#303034] py-2 px-3`}>
                                <div className="text-[#26BBFF] text-xl">{item.icon}</div>
                                <span>{item.title}</span>
                            </Link>)
                        }
                    </div>
                    <div className="border-t border-gray-500 pt-3">
                        <h2 className='font-semibold text-xl px-4 pb-3'>Payment and rewards</h2>
                        <div>
                            {
                                paymentLinks.map((item, index) => <Link key={index} to={item.href === "account" ? "/" : item.href} className={`${path == item.href ? "bg-[#303034]" : ""} flex rounded items-center gap-3 hover:bg-[#303034] py-2 px-3`}>
                                    <div className="text-[#7371FF] text-xl">{item.icon}</div>
                                    <span>{item.title}</span>
                                </Link>)
                            }
                        </div>
                    </div>
                </div>
            }
            <div className='w-full  px-3 md:px-0 flex gap-10 mx-auto py-15 md:w-[70%] text-white'>
                <div className='hidden h-max lg:block lg:w-1/3 rounded-2xl bg-[#202024] px-2 py-4'>
                    <h2 className='font-semibold text-xl px-4 pb-3'>Account</h2>
                    <div className="pb-3">
                        {
                            links.map((item, index) => <Link key={index} to={item.href} className={`${path == item.href ? "bg-[#303034]" : ""} flex rounded items-center gap-3 hover:bg-[#303034] py-2 px-3`}>
                                <div className="text-[#26BBFF] text-xl">{item.icon}</div>
                                <span>{item.title}</span>
                            </Link>)
                        }
                    </div>
                    <div className="border-t border-gray-500 pt-3">
                        <h2 className='font-semibold text-xl px-4 pb-3'>Payment and rewards</h2>
                        <div>
                            {
                                paymentLinks.map((item, index) => <Link key={index} to={item.href === "account" ? "/" : item.href} className={`${path == item.href ? "bg-[#303034]" : ""} flex rounded items-center gap-3 hover:bg-[#303034] py-2 px-3`}>
                                    <div className="text-[#7371FF] text-xl">{item.icon}</div>
                                    <span>{item.title}</span>
                                </Link>)
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full  lg:w-2/3'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Account