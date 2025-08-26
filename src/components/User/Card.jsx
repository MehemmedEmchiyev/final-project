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
        const exists = wishlistData?.data?.some(elem => elem.product.id === item?.id);
        setIsInWishlist(exists);
    }, [wishlistData, item?.id]);

    const handleWishlist = async (e, id) => {
        e.stopPropagation()
        if (!localStorage.getItem("accessToken") || !localStorage.getItem('userId')) {
            navigate("/login");
            return;
        }
        const patch = { productId: id };
        const response = await addWishlist(patch);
        if (response?.error) {
            toast.error(response?.error?.data?.message || "Something went wrong");
        } else {
            toast.success(response?.data?.data?.message || "Success");
            setIsInWishlist(prev => !prev);
        }
    };
    const isEA = item?.subscriptions?.some(item => item?.id == 2) || item?.events?.some(item => item?.id == 3)

    
    

    return (
        <div className="h-max">
            <div className="w-full h-full group relative">
                <div onClick={() => navigate(`/store/detail/${item.slug}?id=${item.id}`)} className="w-full cursor-pointer h-[300px] relative rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover" src={item?.coverImage?.url} alt="" />
                    {
                        isEA && <div className="absolute bottom-0 w-full h-max flex items-center justify-center bg-black/80">
                            <span className="mr-2 flex items-center" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63 21" className="w-8 h-8 text-white">
                                    <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M24.8977 2.35666V16.5263H27.6264V11.3644H30.988C33.6967 11.3644 35.7135 9.44169 35.7135 6.83038C35.7135 4.23917 33.7758 2.35666 31.0868 2.35666H24.8977ZM30.7904 8.97614H27.6264V4.84661H30.7904C32.0952 4.84661 33.0049 5.69676 33.0049 6.91143C33.0049 8.12587 32.0952 8.97614 30.7904 8.97614ZM39.5098 1.54724L36.9988 2.35666V16.5263H39.5098V1.54724ZM45.6194 16.6682C46.8455 16.6682 47.9529 16.2026 48.7833 15.4129V16.5263H51.2943V6.42567H48.7833V7.53864C47.9922 6.72912 46.9045 6.26357 45.7186 6.26357C43.1482 6.26357 40.8147 8.44964 40.8147 11.4657C40.8147 14.4817 43.1084 16.6682 45.6194 16.6682ZM46.0546 14.3603C44.5323 14.3603 43.306 13.166 43.306 11.4657C43.306 9.76534 44.5323 8.571 46.0546 8.571C47.5968 8.571 48.8029 9.76534 48.8029 11.4657C48.8029 13.166 47.5968 14.3603 46.0546 14.3603ZM63 6.42567H60.3702L57.5622 12.3767L54.6952 6.42567H51.8876L56.119 15.2509L53.2915 21H56.0202L63 6.42567ZM14.4117 12.3263L13.6055 11.0088H11.2517L12.0591 9.68892H12.8028L11.904 8.21971L9.39655 12.3263H2.70711L4.31771 9.68892H3.13509L3.93908 8.36913H9.1099L8.3055 9.68892H5.83926L5.03307 11.0088H8.68129L11.904 5.7288L15.9314 12.3263H14.4117ZM5.5503 5.7288H10.8544L10.0482 7.04923H4.74464L5.5503 5.7288ZM9.22635 0C4.13101 0 0 4.22928 0 9.44588C0 14.6637 4.13101 18.8911 9.22635 18.8911C14.3216 18.8911 18.4532 14.6637 18.4532 9.44588C18.4532 4.22928 14.3216 0 9.22635 0Z"></path>
                                </svg>
                            </span>
                        </div>
                    }

                    <div
                        onClick={(e) => handleWishlist(e, item?.id)}
                        className="absolute  hidden md:block z-20 cursor-pointer -right-5 group-hover:right-2 -top-5 group-hover:top-2 duration-300 group/icon"
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
