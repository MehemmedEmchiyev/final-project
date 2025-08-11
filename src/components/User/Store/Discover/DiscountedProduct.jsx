import { useGetProductsQuery } from "../../../../store/services/epicApi"
import Slider from "./Slider"

function DiscountedProduct() {
    const { data, isLoading } = useGetProductsQuery({ params : 'isDiscount=true'})

    return (
        <div className='pt-10'>
            <Slider title={'Discounted Games'} data={data?.data.slice(0, 10)} isLoading={isLoading} />
        </div>
    )

}

export default DiscountedProduct