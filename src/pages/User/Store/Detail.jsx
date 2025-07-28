import { useLocation, useNavigate, useParams } from "react-router"
import { useAddToCartMutation, useAddToWishlistMutation, useGetCartsQuery, useGetProductByIdQuery, useGetWishlistQuery } from "../../../store/services/epicApi"
import GalerySlider from "../../../components/User/Detail/GalerySlider"
import DetailSkelton from "../../../components/User/Detail/DetailSkelton"
import { IoShareSocialOutline } from "react-icons/io5";
import { TbFlag3 } from "react-icons/tb";
import Loader from "../../../components/ui/Loader";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
function Detail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading } = useGetProductByIdQuery(id)
    const { data: wishlist } = useGetWishlistQuery()
    const { data: carts , isError} = useGetCartsQuery()
    const [addWish, { isLoading: addLoad }] = useAddToWishlistMutation()
    const [addCart, { isLoading: cardLoad }] = useAddToCartMutation()
    const [inWishList, setIsInWishlist] = useState(wishlist?.data?.some(item => item.product.id == id))
    const [inCarts, setInCart] = useState(false)
    const {pathname} = useLocation()
    useEffect(() => {
        if(isError) {
            setInCart(false)
            return
        }
        else setInCart(carts?.data?.some(item => item?.product?.id == id) || false)
    }, [carts, id , pathname])
    console.log(inCarts);
    
    const addWishlist = async () => {
        if (!localStorage.getItem("accessToken") || !localStorage.getItem('userId')) {
            navigate("/login");
            return;
        }
        const patch = { productId: id };
        const response = await addWish(patch);
        if (response?.error) {
            toast.error(response?.error?.data?.message || "Something went wrong");
        } else {
            toast.success(response?.data?.message || "Success");
            setIsInWishlist(!inWishList)
        }
    }
    const addToCart = async () => {

        if (!localStorage.getItem("accessToken") || !localStorage.getItem('userId')) {
            navigate("/login");
            return;
        }
        if (inCarts) navigate('/store/basket')
        else {
            const patch = { productId: id };
            const response = await addCart(patch);
            if (response?.error) {
                toast.error(response?.error?.data?.message || "Something went wrong");
            } else {
                toast.success(response?.data?.message || "Success");
                setIsInWishlist(!inWishList)
            }
        }
    }

    const { name, media, description, genres, features, ageRestriction, discount, discountedPrice, isFree, price, platforms, developer, updatedAt, publisher } = data ? data : {}
    const gameInfo = [
        { title: "Epic Rewards", value: "Earn 20% Back" },
        { title: "Refund Type", value: "Self-Refundable" },
        { title: "Developer", value: developer },
        { title: "Publisher", value: publisher },
        { title: "Release Date", value: updatedAt?.split("T")[0].replaceAll('-', '/') },
        { title: "Platform", value: platforms?.map(item => item.name).join(",") }
    ];
    const detailInfo = [
        { title: 'Genre', data: genres },
        { title: 'Features', data: features },
    ]
    return (
        isLoading ? <DetailSkelton /> :
            <div className="text-white py-10">
                <h1 className="text-2xl md:text-4xl font-bold">{name}</h1>
                <div className="flex flex-col lg:flex-row gap-10 mt-5">
                    <div className="order-2 lg:order-0 w-full lg:w-7/10">
                        <GalerySlider media={media} />
                        <p className="text-xl">{description}</p>
                        <div className="py-4 flex ">
                            {
                                detailInfo.map((item, index) => <div key={index} className={`w-1/2 px-3 ${index == 1 ? "" : "border-r"} border-[#343437]`}>
                                    <h2 className="text-[#888]">{item.title}</h2>
                                    <div className="pt-2 flex items-center gap-2 flex-wrap">
                                        {
                                            item.data?.map((elem, key) => <div key={key} className="w-max py-[2px] px-4 rounded-md bg-[#2A2A2D]">{elem?.name}</div>)
                                        }
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="w-full lg:w-3/10">
                        <div className="pb-4 h-[200px]">
                            <img className="w-full h-full object-contain" src={media[1]?.url ? media[1]?.url : media[0]?.url} alt="" />
                        </div>
                        <div className="border w-full border-gray-700 rounded-lg p-3 inline-flex items-center gap-5">
                            <div className="border border-white p-0.5 text-center leading-tight">
                                <div className="px-1 text-[10px] font-bold text-white tracking-widest">I A R C</div>
                                <div className="px-1 text-2xl font-bold text-black bg-white">{ageRestriction}</div>
                            </div>
                            <span className="text-white font-semibold">{ageRestriction}</span>
                        </div>
                        <div className="font-semibold mx-auto lg:mx-0 text-white cursor-text !select-text bg-[#2E2E31] py-[2px] px-3 w-max rounded mt-3">Base Game</div>
                        <div className="pt-4">
                            {data?.discount ? (
                                <h2 className="space-x-2 justify-center lg:justify-start flex items-center">
                                    <span className="px-2 text-sm flex items-center justify-center w-max text-black bg-[#26BBFF] rounded-full">
                                        - {discount}%
                                    </span>
                                    <span className="text-[#ACACAD] line-through">
                                        $ {price} *
                                    </span>
                                    <span className="text-white">${discountedPrice}</span>
                                </h2>
                            ) : isFree ? (
                                <span className="text-white text-center lg:text-start">Free</span>
                            ) : (
                                <span className="text-white text-center lg:text-start">${price}</span>
                            )}
                        </div>
                        <div className="pt-4 space-y-2">
                            <button className="w-full bg-blue-400 py-3 cursor-pointer rounded-xl hover:bg-blue-300 text-black font-semibold">Buy Now</button>
                            <button onClick={addToCart} className={`w-full bg-[#343437] py-3  rounded-xl hover:bg-[#636366] text-white font-semibold cursor-pointer`}>{cardLoad ? <Loader /> : inCarts ? "View in cart" : "Add To Cart"}</button>
                            <button onClick={addWishlist} className="w-full bg-[#343437] py-3 cursor-pointer rounded-xl hover:bg-[#636366] text-white font-semibold">{addLoad ? <Loader /> : inWishList ? "In Wishlist" : "Add to Wishlist"}</button>
                        </div>
                        <div className="pt-2">
                            {
                                gameInfo.map((item, index) => <div key={index} className="py-2 w-full font-semibold    flex items-center justify-between border-b border-[#343437]">
                                    <span className="text-[#ACACAD]">{item.title}</span>
                                    <span className="text-end whitespace-break-spaces">{item.value}</span>
                                </div>)
                            }
                        </div>
                        <div className="pt-2 flex items-center gap-3">
                            <button className="w-full bg-[#343437] py-1 flex items-center justify-center gap-2 cursor-pointer rounded-md hover:bg-[#636366] text-sm text-white font-semibold"><IoShareSocialOutline /> Share</button>
                            <button className="w-full bg-[#343437] py-1 flex items-center justify-center gap-2 cursor-pointer rounded-md hover:bg-[#636366] text-sm text-white font-semibold"><TbFlag3 /> Report</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Detail