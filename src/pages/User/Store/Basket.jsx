import Info from "../../../components/ui/Info"
import Emptypart from "../../../components/User/Store/Wishlist-Cart/Emptypart"

function Basket() {
  return (
    <div className="pb-10">
      <Info property='py-5 space-y-4 lg:hidden ' />
      <div className=" border-t lg:border-0 border-[#404044] flex items-center justify-between">
        <h1 className="text-white mt-3 font-extrabold text-[40px] ">My Cart</h1>
        <Info property="hidden lg:flex" />
      </div>
      <Emptypart />
    </div>
  )
}

export default Basket