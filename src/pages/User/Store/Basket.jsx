import { useEffect, useState } from "react";
import Info from "../../../components/ui/Info"
import BasketCard from "../../../components/User/Store/Wishlist-Cart/BasketCard";
import Emptypart from "../../../components/User/Store/Wishlist-Cart/Emptypart"
import { useAddCheckOutMutation, useClearCartsMutation, useGetCartsQuery } from "../../../store/services/epicApi";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import MyLoader  from "../../../components/ui/Loader";
import Checkout from "../../../components/User/Store/Wishlist-Cart/Checkout";

function Basket() {
  const [emptyData, setEmptyData] = useState(false);
  const { data, isLoading, isError, isFetching } = useGetCartsQuery();
  const [clearCarts, { isLoading: clearLoading }] = useClearCartsMutation()
  const [addCheckOut, { isLoading: checkLoad }] = useAddCheckOutMutation()
  const totalPrice = data?.data?.reduce((acc, item) => acc + item?.totalPrice, 0)
  const price = data?.data?.map(item => item?.product).reduce((acc, item) => acc + item?.price, 0)
  const discount = data?.data?.map(item => item?.product).reduce((acc, item) => acc + (item?.price - item?.discountedPrice), 0).toFixed(2)
  const [flag , setFlag] = useState(false)
  const checkOut = async () => {
    const productIds = data?.data?.map(item => item?.product.id)
    const patch = { productIds }
    const res = await addCheckOut(patch).unwrap()
    if (res?.error) toast.error(res?.error.message)
    else toast.success(res?.message)  
    !isLoading && setFlag(true)
  }
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
  useEffect(() => { if (!isLoading && data?.data?.length === 0) setEmptyData(true); }, [data, isLoading]);

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
        <Emptypart location={'cart'}/>
      ) : (
        <div>
          <button onClick={handlerClear} className="text-blue-400 mt-2 hover:text-blue-300 duration-300 cursor-pointer">Clear Carts ({data?.data?.length})</button>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full space-y-4 mt-6">
              {data?.data?.map((item, index) => (
                <BasketCard key={item.id || index} item={item.product} itemId={item?.id} />
              ))}

            </div>
            <div>
              <h2 className="text-3xl text-white font-bold">Games and Apps Summary</h2>
              <div>
                <ul className="text-white border-b py-3 border-[#343437]">
                  <li className="flex py-2 items-center justify-between">
                    <span className="">Price</span>
                    <span className="font-light">$ {price}</span>
                  </li>
                  <li className="flex py-2 items-center justify-between">
                    <span className="">Sale Discount</span>
                    <span className="font-light">-${discount} </span>
                  </li>
                  <li className="flex py-2 items-center justify-between">
                    <span className="">Taxes</span>
                    <span className="font-light">Calculated at Checkout</span>
                  </li>
                </ul>
                <div className="py-3 ">
                  <div className="flex text-white py-2 font-bold items-center justify-between">
                    <span >Subtotal</span>
                    <span >$ {totalPrice}</span>
                  </div>
                </div>
                <button onClick={checkOut} className="w-full font-semibold cursor-pointer duration-300 text-black py-3 rounded-xl bg-blue-400 hover:bg-blue-300 tracking-[0.5px]">
                  {checkLoad ? <MyLoader /> : 'Check Out'}
                </button>
              </div>
            </div>
          </div>
          <Checkout flag={flag} setFlag={setFlag}/>
        </div>

      )}
    </div>
  )
}

export default Basket