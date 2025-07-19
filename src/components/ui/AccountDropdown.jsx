import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { changePriceStatue } from '../../store/priceSlice';

export default function AccountDropdown() {
    const [open, setOpen] = useState(false);
    const { price } = useSelector(store => store.price)
    const dispatch = useDispatch()
    const menuItem = [
        { title: "All", flag: 0 },
        { title: "Price : High to Low", flag: 1 },
        { title: "Price : Low to High", flag: -1 }
    ]

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className=" text-white px-4  py-2 flex items-center"
            >
                {menuItem.find(item => item.flag == price).title}
                <ChevronDown className={`ml-2 w-4 h-4 ${open ? "rotate-[180deg]" : ""} duration-300`} />
            </button>

            {open && (
                <div className="absolute p-1 mt-2 w-56 rounded-md shadow-lg bg-[rgba(48,48,52,1)] text-white z-50">
                    <div className="py-1 max-h-80 space-y-1 overflow-y-auto">
                        {
                            menuItem.map((item, index) => <div key={index} onClick={() => {
                                dispatch(changePriceStatue(item.flag))
                                setOpen(false)
                            }
                            } className={`flex font-semibold justify-between ${price == item.flag ? "bg-[#4F4F52]" : ""} px-4 py-2 rounded-md hover:bg-[#4F4F52] cursor-pointer text-sm`}>
                                <span>{item.title}</span>
                            </div>)
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
