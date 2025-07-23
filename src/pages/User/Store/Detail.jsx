import { useParams } from "react-router"
import { useGetProductByIdQuery } from "../../../store/services/epicApi"
import GalerySlider from "../../../components/User/Detail/GalerySlider"
import DetailSkelton from "../../../components/User/Detail/DetailSkelton"


function Detail() {
    const { id } = useParams()
    const { data, isLoading } = useGetProductByIdQuery(id)
    const { name, media } = data ? data : {}
    console.log(data);
    
    return (
        isLoading ? <DetailSkelton /> :
            <div className="text-white py-10">
                <h1 className="text-2xl md:text-4xl font-bold">{name}</h1>
                <div className="flex flex-col lg:flex-row gap-10 mt-5">
                    <div className="w-full lg:w-7/10">
                        <GalerySlider media={media} />
                    </div>
                    <div className="w-full lg:w-3/10">
                        <div className="border w-full border-gray-700 rounded-lg p-3 inline-flex items-center gap-5">
                            <div className="border border-white p-0.5 text-center leading-tight">
                                <div className="px-1 text-[10px] font-bold text-white tracking-widest">I A R C</div>
                                <div className="px-1 text-2xl font-bold text-black bg-white">{data?.ageRestriction}</div>
                            </div>
                            <span className="text-white font-semibold">{data?.ageRestriction}</span>
                        </div>
                        <div className="font-semibold text-white cursor-text !select-text bg-[#2E2E31] py-[2px] px-3 w-max rounded mt-3">Base Game</div>

                    </div>
                </div>
            </div>
    )
}

export default Detail