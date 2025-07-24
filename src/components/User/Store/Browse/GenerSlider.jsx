import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useGetGenresQuery, useGetProductsQuery } from '../../../../store/services/epicApi';
import { useRef } from 'react';

export default function GenerSlider() {
    const { data, isLoading } = useGetGenresQuery();
    const { data: products, isLoading: prodLoad } = useGetProductsQuery();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const arr = Array.from({ length: 4 }, () => "");

    return (
        <>
            <div className='w-full flex items-center justify-between mb-3'>
                <h2 className='text-[2rem] text-white font-extrabold'>Popular Genres</h2>
                <div className='flex items-center gap-2'>
                    <button ref={prevRef} className='flex cursor-pointer items-center justify-center w-8 h-8 rounded-full bg-[#343437] hover:bg-[#636366] text-white'>
                        <MdOutlineKeyboardArrowLeft className='text-xl' />
                    </button>
                    <button ref={nextRef} className='flex cursor-pointer items-center justify-center w-8 h-8 rounded-full bg-[#343437] hover:bg-[#636366] text-white'>
                        <MdOutlineKeyboardArrowRight className='text-xl' />
                    </button>
                </div>
            </div>

            {
                isLoading ?
                    <div className='grid gap-7.5 grid-cols-2 md:grid-cols-4'>
                        {arr.map((_, index) => (
                            <div key={index} className='bg-[#1F1F23] animate-pulse hover:bg-[#3F3F43] duration-200 px-5 py-6.5 rounded-2xl'>
                                <div className='h-30 animate-pulse bg-gray-400'></div>
                                <div className="w-full h-6 rounded bg-gray-400 mt-4"></div>
                            </div>
                        ))}
                    </div>
                    :
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={30}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        pagination={{
                            el: '.swiper-pagination',
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {
                            data?.map((item, index) => (
                                <SwiperSlide key={index} className='bg-[#1F1F23] hover:bg-[#3F3F43] duration-200 px-5 py-6.5 rounded-2xl'>
                                    <div className='h-33 flex items-center relative bg-gray-500'> 
                                        <div className='w-full h-full relative'>
                                            <div className='absolute w-full h-full bg-black/30'></div>
                                            <img className='w-full h-full object-cover' src="https://cdn1.epicgames.com/spt-assets/e2c3bc6771dc4524a4730b379f8242c7/ready-or-not-23qyn.png?resize=1&w=360&h=480&quality=medium" alt="" />
                                        </div>
                                        <div className='w-2/4 rounded-md z-15 absolute mx-auto left-0 right-0 overflow-hidden !shadow-2xl h-full'>
                                            <img className='w-full h-full object-cover' src="https://cdn1.epicgames.com/spt-assets/9c94e578b3804a5593e0cf3c056d4ed2/smokestack-saints-the-parkour-game-part-i-t2g00.png?resize=1&w=360&h=480&quality=medium" alt="" />
                                        </div>
                                        <div className='w-full h-full relative'>
                                            <div className='absolute w-full h-full bg-black/30'></div>
                                            <img className='w-full h-full object-cover' src="https://cdn1.epicgames.com/spt-assets/cefb7db3ae7a407ca9b2c991c8c8914d/hymnlight-bazaar-ladder-1b0a4.png?resize=1&w=360&h=480&quality=medium" alt="" />
                                        </div>
                                    </div>
                                    <p className='text-center text-white mt-3.5'>{item?.name}</p>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
            }
        </>
    );
}
