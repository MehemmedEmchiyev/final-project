import { useEffect, useState } from 'react';
import { ChevronDown} from 'lucide-react';

export default function AccountDropdown({path,  setPath }) {
    const [open, setOpen] = useState(false)
    const [flag, setFlag] = useState("All")
    const menuItem = [
        { title: "All" },
        { title: 'Alphabetical A-Z', name: 'name', order: 'ASC' },
        { title: 'Alphabetical Z-A', name: 'name', order: 'DESC' },
        { title: "Price : High to Low", name: 'price', order: 'DESC' },
        { title: "Price : Low to High", name: 'price', order: 'ASC' },
        { title: "Newest First", name: 'createdAt', order: 'DESC' },
        { title: "Oldest First", name: 'createdAt', order: 'ASC' },
    ]
    const toggleEvent = (title, name, order) => {
        if (title === "All") {
            setPath(prev => prev.filter(p => !p.startsWith("sortBy=")));
        } else {
            const path = `sortBy=${name}&order=${order}`;
            setPath(prev => [
                ...prev.filter(p => !p.startsWith("sortBy=")),
                path
            ]);
        }
    }
    console.log(path);
    
    useEffect(() => {
        path.length == 0 ? setFlag("All") : "" 
    },[path])

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className=" text-white px-4  py-2 flex items-center"
            >
                {flag}
                <ChevronDown className={`ml-2 w-4 h-4 ${open ? "rotate-[180deg]" : ""} duration-300`} />
            </button>

            {open && (
                <div className="absolute p-1 mt-2 w-56 rounded-md shadow-lg bg-[rgba(48,48,52,1)] text-white z-50">
                    <div className="py-1 max-h-80 space-y-1 overflow-y-auto">
                        {
                            menuItem.map((item, index) => <div key={index} onClick={() => {
                                toggleEvent(item.title, item.name, item.order)
                                setOpen(false)
                                setFlag(item.title)
                            }
                            } className={`flex font-semibold justify-between ${flag == item.title ? "bg-[#4F4F52]" : ""} px-4 py-2 rounded-md hover:bg-[#4F4F52] cursor-pointer text-sm`}>
                                <span>{item.title}</span>
                            </div>)
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
