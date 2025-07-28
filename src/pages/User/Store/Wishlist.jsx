import { useEffect, useState } from "react";
import Info from "../../../components/ui/Info";
import Emptypart from "../../../components/User/Store/Wishlist-Cart/Emptypart";
import { useClearWishlistMutation, useGetWishlistQuery } from "../../../store/services/epicApi";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import GameCard from "../../../components/User/Store/Wishlist-Cart/GameCard";
function Wishlist() {
  const [emptyData, setEmptyData] = useState(false);
  const { data, isLoading, isError , isFetching } = useGetWishlistQuery();
  console.log(data);
  
  const [clearWishlist , {isLoading : clearLoading}] = useClearWishlistMutation()
  const handlerClear = async() => {
    const res = await clearWishlist()
    if(res?.error) toast.error(res?.error.data.message)
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
      <Info property="py-5 space-y-4 lg:hidden" />
      <div className="border-t lg:border-0 border-[#404044] flex items-center justify-between">
        <h1 className="text-white mt-3 font-extrabold text-[40px]">My Wishlist</h1>
        <Info property="hidden lg:flex" />
      </div>
      {isLoading || isFetching || clearLoading ? (
        <Loader className="w-20 h-20 animate-spin text-white mx-auto mt-10" />
      ) : emptyData || isError ? (
        <Emptypart />
      ) : (
        <div className="w-full space-y-4 mt-6">
          <button onClick={handlerClear} className="text-blue-400 hover:text-blue-300 duration-300 cursor-pointer">Clear Wishlist ({data?.data?.length})</button>
          {data?.data?.map((item, index) => (
            <GameCard key={item.id || index} item={item.product} itemId={item?.id}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
