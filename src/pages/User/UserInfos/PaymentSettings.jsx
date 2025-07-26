import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { MdWarningAmber } from "react-icons/md";
import { MdOutlineCardGiftcard } from "react-icons/md";

function PaymentSettings() {
    const [open, setOpen] = useState(true)
    return (
        <>
            <div>
                <h1 className='text-2xl md:text-4xl font-bold'>Payment settings</h1>
                <p className='font-semibold  text-[#ACACAD] pt-3'>Manage your account balance, transactions, and payment methods. <span className="text-blue-400 cursor-pointer underline">View Privacy Policy.</span></p>
            </div>
            <div className='pt-10'>
                <h2 className='text-2xl font-bold'>Account balance</h2>
                <p className='text-[#ACACAD] mt-2'>
                    Use your account balance to buy games, V-Bucks, and in-game items. Your balance is non-refundable. <span className="text-blue-400 cursor-pointer underline">View Terms</span>
                </p>
            </div>
            {open && <div className="bg-[#2b241b] border border-yellow-600 rounded-2xl mt-4 p-4 text-white w-full">
                <div className="flex items-start gap-2">
                    <MdWarningAmber className="text-yellow-400 text-xl mt-1" />
                    <div>
                        <p className="mb-2">
                            To use your account balance, you’ll need to agree to the terms so that you can add and receive funds.
                        </p>
                        <p>
                            By selecting ‘I agree’, you agree to the{' '}
                            <a href="#" className="underline text-white hover:text-blue-300">
                                Terms
                            </a>.
                        </p>
                        <button onClick={() => setOpen(false)} className="mt-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600">
                            I agree
                        </button>
                    </div>
                </div>
            </div>}
            <div className="mt-4  ">
                <h2 className="text-2xl font-semibold lg:text-3xl">Balance</h2>
                <p className="py-3 text-5xl tracking-[2px]">$0.00</p>
                <div className="flex gap-3 items-center flex-col mt-3 w-full lg:w-max lg:flex-row">
                    <button className="bg-sky-500 flex items-center justify-center gap-3 hover:bg-sky-400 w-full md:w-max duration-300 cursor-pointer text-black font-medium py-3 px-4 rounded-md">
                        <GoPlus />
                        Add Funds
                    </button>
                    <button className="bg-[#343437] flex items-center justify-center gap-3 hover:bg-[#636366] w-full md:w-max duration-300 cursor-pointer text-white font-medium py-3 px-4 rounded-md    ">
                        <MdOutlineCardGiftcard />
                        Redeem gift card
                    </button>
                </div>
            </div>
        </>
    )
}

export default PaymentSettings