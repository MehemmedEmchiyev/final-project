import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { SiEpicgames } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { useIncreasBalanceMutation, useLazyGetUserByIdQuery } from "../../../../store/services/epicApi";
import Loader from "../../../ui/Loader";
import PaymentMethods from "./PaymentMethods";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function IncreasBalance({ flag, setFlag }) {
    const navigator = useNavigate()
    const [selectedAmount, setSelectedAmount] = useState(false);
    const { valid } = useSelector(store => store.payment)
    const userId = localStorage.getItem('userId')
    const [getUser, { data, isLoading }] = useLazyGetUserByIdQuery()
    useEffect(() => {
        const user = async () => await getUser(userId)
        user()
    }, [isLoading])
    const maxBalance = 150;
    const handleSelect = (amount) => setSelectedAmount(amount)
    const [addBalance, { isLoading: payLoad }] = useIncreasBalanceMutation()
    const increasBalance = async () => {
        const value = { balance: selectedAmount }
        const res = await addBalance(value).unwrap()
        
        if (res?.error) toast.error(res?.message)
        else {
            toast.success(res?.message)
            navigator('/account')
        }
    }
    return (
        <div className={`fixed text-black top-0 flex items-center justify-center left-0 w-full h-full bg-black/50 z-500 ${flag ? "block" : 'hidden'}`}>
            <div className="h-screen w-full lg:w-[80%] overflow-auto bg-white">

                {
                    isLoading ? <div className="w-full h-full flex items-center justify-center "><Loader /></div> :
                        <div className="flex flex-col  lg:flex-row  gap-6">
                            <div className="w-full lg:w-2/3  p-6 ">
                                <div className="flex items-center text-sm">
                                    <div className={`w-full ${selectedAmount ? "hidden" : ""} lg:block font-semibold border-b-4 border-blue-400 pb-2 mb-4`}>FUNDING METHOD</div>
                                    <div className={`${!selectedAmount ? "hidden" : ""} lg:flex w-full  items-center border-b border-[#D9D9D9] pb-2 mb-4 justify-between `}>
                                        <h2 className=" w-full uppercase font-semibold">Add Funds</h2>
                                        <div className="flex  uppercase text-blue-400 items-center gap-3">
                                            <FaUser />{data?.username}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-100 p-6 rounded" >
                                    <div className="mb-4 ">
                                        <div className="flex items-center gap-3">
                                            <SiEpicgames className="text-2xl" />
                                            <h3 className="text-md font-medium">CURRENT ACCOUNT BALANCE <span className="text-gray-600 ml-1 text-md font-light">(Max. ${maxBalance.toFixed(2)})</span></h3>
                                        </div>
                                        <p className="text-3xl font-light  mt-2">${data?.balance?.toFixed(2)}</p>
                                    </div>

                                    <p className="mt-6 font-medium">SELECT A FUNDING AMOUNT</p>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                        {[5, 10, 20, 50, 100].map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => handleSelect(amount)}
                                                className={` rounded px-3 py-5 cursor-pointer text-center font-semibold  ${selectedAmount === amount ? 'bg-blue-400 text-white' : 'bg-transparent hover:border-blue-400  border hover:text-blue-400 duration-300 '
                                                    }`}
                                            >
                                                ${amount.toFixed(2)}
                                            </button>
                                        ))}
                                    </div>

                                </div>
                                {true ? <PaymentMethods propety={'bg-white'} /> : ""}
                            </div>
                            <div className="w-full order-[-1] lg:order-1  lg:w-1/3 bg-[#F2F2F2] p-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold mb-4">SUMMARY</h2>
                                    <X className="cursor-pointer" onClick={() => {
                                        setFlag(false)
                                        setSelectedAmount(null)
                                    }
                                    } />
                                </div>
                                <img
                                    src="/images/wallet.png"
                                    alt="Epic Games"
                                    className="w-full h-64 object-cover rounded mb-4"
                                />

                                <div className="space-y-2 text-sm">
                                    <p className="font-semibold">Account Balance</p>
                                    <span className="text-sm text-[#515151] inline-block ">By Epic Games</span>

                                    <p className="flex justify-between text-[#515151]">
                                        <span>Current account balance</span>
                                        <span>${data?.balance?.toFixed(2)}</span>
                                    </p>
                                    <p className="flex justify-between text-[#515151]">
                                        <span>Funding Amount</span>
                                        <span>{selectedAmount ? `$${selectedAmount.toFixed(2)}` : <span className="inline-block bg-gray-800 animate-pulse w-10 h-5"></span>}</span>
                                    </p>
                                    <p className="flex justify-between border-b border-t border-[#CECECE]  py-2 text-sm text-[#515151]">
                                        <span>Account Balance After Funding</span>
                                        <span>
                                            {selectedAmount !== null
                                                ? `$${(data?.balance + selectedAmount)?.toFixed(2)}`
                                                : <span className="inline-block bg-gray-800 animate-pulse w-10 h-5"></span>}
                                        </span>
                                    </p>
                                </div>

                                <button
                                    disabled={!(selectedAmount && valid)}
                                    onClick={increasBalance}
                                    className="w-full mt-6 bg-gray-700 cursor-pointer text-white py-2 font-semibold rounded disabled:opacity-50"
                                >
                                    {payLoad ? <Loader /> : "PAY NOW"}
                                </button>

                                <p className="mt-4 text-sm text-center">
                                    Need Help?{' '}
                                    <a href="#" className="text-blue-600 underline">
                                        Contact Us
                                    </a>
                                </p>
                            </div>

                        </div>}
            </div>
        </div>
    )
}

export default IncreasBalance