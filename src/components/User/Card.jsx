import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { useAddToWishlistMutation, useGetWishlistQuery } from "../../store/services/epicApi";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function Card({ item }) {
    const navigate = useNavigate();
    const { data: wishlistData } = useGetWishlistQuery();
    const [addWishlist, { isLoading }] = useAddToWishlistMutation();
    const [isInWishlist, setIsInWishlist] = useState(false);
    useEffect(() => {
        const exists = wishlistData?.some(elem => elem.product.id === item?.id);
        setIsInWishlist(exists);
    }, [wishlistData, item?.id]);

    const handleWishlist = async (id) => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
            return;
        }

        const patch = { productId: id };
        const response = await addWishlist(patch);
        if (response?.error) {
            toast.error(response?.error?.data?.message || "Something went wrong");
        } else {
            toast.success(response?.data?.message || "Success");
            setIsInWishlist(prev => !prev);
        }
    };

    return (
        <div className="h-max">
            <div className="w-full h-full group relative">
                <div className="w-full h-[300px] relative rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover" src={item?.media[0]?.url} alt="" />

                    <div
                        onClick={() => handleWishlist(item?.id)}
                        className="absolute hidden md:block z-20 cursor-pointer -right-5 group-hover:right-2 -top-5 group-hover:top-2 duration-300 group/icon"
                    >
                        <AiOutlinePlusCircle
                            className={`
                                text-2xl bg-black rounded-full duration-300 transition-all 
                                absolute top-0 right-0 
                                ${isLoading ? "animate-spin" : ""}
                                ${isInWishlist ? "opacity-0 scale-0" : "opacity-100 scale-100"}
                            `}
                        />

                        <FaRegCheckCircle
                            className={`
                                text-2xl bg-black rounded-full duration-300 transition-all 
                                absolute top-0 right-0
                                ${isInWishlist ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                            `}
                        />

                        <div className="absolute hidden group-hover/icon:block w-max right-0 -bottom-14 px-3 py-1 text-white bg-[#18181C] text-xs">
                            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                        </div>
                    </div>

                    <div className="w-full h-full absolute top-0 left-0 bg-white opacity-0 duration-300 group-hover:opacity-10"></div>
                </div>

                <div className="py-2">
                    <span className="text-[#A5A5A6] text-sm">{item?.genres[0]?.name}</span>
                    <h2 className="text-white text-[17px] h-14 font-semibold line-clamp-2">{item?.name}</h2>

                    <div>
                        {item?.discount ? (
                            <h2 className="space-x-2 flex items-center">
                                <span className="px-2 text-sm flex items-center justify-center w-max text-black bg-[#26BBFF] rounded-full">
                                    - {item?.discount}%
                                </span>
                                <span className="text-[#ACACAD] line-through">
                                    $ {item?.price} *
                                </span>
                                <span className="text-white">${item?.discountedPrice}</span>
                            </h2>
                        ) : item?.isFree ? (
                            <span className="text-white">Free</span>
                        ) : (
                            <span className="text-white">${item?.price}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
