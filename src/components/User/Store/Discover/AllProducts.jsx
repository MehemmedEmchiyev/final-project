import { useNavigate } from "react-router"
import CardSkeleton from "../../../ui/CardSkeleton"
import Card from "../../Card"
import { useGetProductsQuery } from "../../../../store/services/epicApi"
import Aos from "aos"
import "aos/dist/aos.css";
import { useEffect } from "react"

function AllProducts() {
    const navigator = useNavigate()
    const { data, isLoading } = useGetProductsQuery()
    const arr = Array.from({ length: 4 }, () => {})
    console.log(arr);
    useEffect(() => {
        Aos.init ({
            duration : 1000,
            once : true
        })
    },[])
    return (
        <div data-aos="fade-up" className="">
            {isLoading ?
                <div className="grid grid-cols-2 gap-3 pt-10 text-white md:grid-cols-3 lg:grid-cols-4">
                    {arr.map((_, index) => (<CardSkeleton key={index} />))}
                </div> :
                <div  className="grid grid-cols-2 gap-3 pt-10 text-white md:grid-cols-3 lg:grid-cols-4">
                    {data?.data?.map((item, index) => <Card item={item} key={index} />)}
                </div>
            }
            <button onClick={() => navigator('/store/browse')} className="bg-blue-400 px-4 rounded-md cursor-pointer mt-5 duration-500 font-semibold hover:bg-blue-300 text-black py-2 ">More</button>
        </div>
    )
}

export default AllProducts