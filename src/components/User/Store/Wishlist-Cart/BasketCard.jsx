import { useDeleteCartsMutation } from "../../../../store/services/epicApi"
import toast from "react-hot-toast"
import Loader from "../../../ui/Loader"

function BasketCard({ item, itemId }) {
    const { name, discount, price, id, isFree, discountedPrice, description, media } = item
    const [deleteCarts, { isLoading }] = useDeleteCartsMutation()
    const remove = async () => {
        const res = await deleteCarts(itemId)
        if (res?.error) toast.error(res?.error.data.message)
        else toast.success(res.data.message)
    }
    return (
        <div className="bg-[#202024] text-white rounded-xl p-4 flex gap-4  shadow-lg">

            <div className="w-[100px] h-[140px] bg-black flex items-center justify-center text-white text-3xl font-bold rounded-md">
                <img src={media[0]?.url} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">{name}</h2>
                        <div className="hidden lg:flex items-center gap-4">
                            <span className={`bg-blue-500 text-xs ${discount ? "" : "hidden"} px-2 py-0.5 rounded-2xl text-black`}>-10%</span>
                            <span className={`${discount ? "line-through text-gray-400 text-sm" : "text-white text-lg"}   `}>{isFree ? "Free" : `${price}`}</span>
                            <span className={`${discount ? " " : "hidden"} text-lg font-semibold`}>${discountedPrice}</span>
                        </div>
                    </div>
                    <div className="flex lg:hidden py-2 items-center gap-4">
                        <span className={`bg-blue-500 text-xs ${discount ? "" : "hidden"} px-2 py-0.5 rounded-2xl text-black`}>-10%</span>
                        <span className={`${discount ? "line-through text-gray-400 text-sm" : "text-white text-lg"}   `}>{isFree ? "Free" : `${price}`}</span>
                        <span className={`${discount ? " " : "hidden"} text-lg font-semibold`}>${discountedPrice}</span>
                    </div>
                    <div className="flex items-start gap-3 mt-2 text-sm">
                        <p className="text-gray-400">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="text-yellow-400 text-sm mt-3">
                    Earn a boosted 20% back in Epic Rewards, offer ends Aug 31.
                </div>

                <div className="flex items-center justify-end mt-4">
                    <div className="flex items-center gap-10">
                        <button
                            onClick={() => remove(id)}
                            className="bg-[#22b8f5] cursor-pointer hover:bg-[#1aaae0] text-black px-4 py-2 rounded font-semibold text-sm"
                        >
                            {isLoading ? <Loader /> : "Remove"}
                        </button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default BasketCard