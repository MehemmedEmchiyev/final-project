import { useGetProductsQuery } from "../../../../store/services/epicApi"
import Slider from "./Slider"

function TopSeller() {
    const {data , isLoading} = useGetProductsQuery('isTopSeller=true')
    
    return (
        <div className={`pt-10 ${data?.length > 0 ? "" : "hidden"}`}>
            <Slider title={'Top Seller'} data={data?.data.slice(0,10)} isLoading={isLoading}/>
        </div>
    )
}

export default TopSeller