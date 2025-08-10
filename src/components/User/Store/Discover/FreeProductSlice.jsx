import { useGetProductsQuery } from "../../../../store/services/epicApi"
import Slider from "./Slider"

function FreeProductSlice() {
    const {data , isLoading} = useGetProductsQuery({params : "isFree=true"})
    return (
        <div className='pt-10'>
            <Slider title={'Free Games'} data={data?.data.slice(0,10)} isLoading={isLoading}/>
        </div>
    )
}

export default FreeProductSlice