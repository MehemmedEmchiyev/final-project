import { useEffect, useState } from "react";
import Info from "../../../components/ui/Info"
import BasketCard from "../../../components/User/Store/Wishlist-Cart/BasketCard";
import Emptypart from "../../../components/User/Store/Wishlist-Cart/Emptypart"
import { useClearCartsMutation, useGetCartsQuery } from "../../../store/services/epicApi";
import { Loader } from "lucide-react";

function Basket() {
  const [emptyData, setEmptyData] = useState(false);
  const { data, isLoading, isError, isFetching } = useGetCartsQuery();
  const [clearCarts , {isLoading : clearLoading}] = useClearCartsMutation()

  const handlerClear = async () => {
    const res = await clearCarts()
    if (res?.error) toast.error(res?.error.data.message)
    else toast.success(res?.data.message)
  }
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setEmptyData(true);
      toast.error("Please login!");
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data?.length === 0) setEmptyData(true);
  }, [data, isLoading]);

  return (
    <div className="pb-10">
      <Info property='py-5 space-y-4 lg:hidden ' />
      <div className=" border-t lg:border-0 border-[#404044] flex items-center justify-between">
        <h1 className="text-white mt-3 font-extrabold text-[40px] ">My Cart</h1>
        <Info property="hidden lg:flex" />
      </div>
      {isLoading || clearLoading || isFetching ? (
        <Loader className="w-20 h-20 animate-spin text-white mx-auto mt-10" />
      ) : emptyData || isError ? (
        <Emptypart />
      ) : (
        <div className="w-full space-y-4 mt-6">
          <button onClick={handlerClear} className="text-blue-400 hover:text-blue-300 duration-300 cursor-pointer">Clear Wishlist ({data?.length})</button>
          {data?.map((item, index) => (
            <BasketCard key={item.id || index} item={item.product} itemId={item?.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Basket