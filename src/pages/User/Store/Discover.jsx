import DiscountedProduct from "../../../components/User/Store/Discover/DiscountedProduct"
import DiscoverSlider from "../../../components/User/Store/Discover/DiscoverSlider"
import FreeProductSlice from "../../../components/User/Store/Discover/FreeProductSlice"
import ResponsiveSlider from "../../../components/User/Store/Discover/ResponsiveSlider"
import TopSeller from "../../../components/User/Store/Discover/TopSeller"

function Discover() {
  
  return (
    <main className="py-5">
      <DiscoverSlider />
      <ResponsiveSlider />
      <FreeProductSlice />
      <DiscountedProduct />
      <TopSeller />
    </main>
  )
}

export default Discover
