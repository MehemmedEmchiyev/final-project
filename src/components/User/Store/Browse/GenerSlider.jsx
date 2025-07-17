import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import 'swiper/css';
import 'swiper/css/pagination';


import { Navigation, Pagination } from 'swiper/modules';

export default function GenerSlider() {
    const arr = Array.from({ length: 9 }, () => { "" })


    return (
        <>
            <div className='w-full flex items-center justify-between'>
                <h2 className='text-[2rem] text-white font-extrabold mb-3'>Popular Genres</h2>
                <div className='flex items-center gap-1'>
                    <div className="flex items-center justify-center swiper-button-prev p-[2px] rounded-full hover:bg-[#636366] border-transparent border hover:border-white hover:border cursor-pointer bg-[#343437] text-white">
                        <MdOutlineKeyboardArrowLeft className='text-xl' />
                    </div>
                    <div className="flex items-center justify-center swiper-button-next p-[2px] rounded-full hover:bg-[#636366] border-transparent border hover:border-white hover:border cursor-pointer bg-[#343437] text-white">
                        <MdOutlineKeyboardArrowRight className='text-xl' />
                    </div>
                </div>
            </div>
            <Swiper
                slidesPerView={2}
                spaceBetween={30}
                breakpoints={
                    {
                        640 : {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }
                }
                pagination={{
                    el: '.swiper-pagination',
                }}

                navigation={
                    {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                }
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    arr.map((item, index) =>
                        <SwiperSlide key={index} className='bg-[#1F1F23] hover:bg-[#3F3F43] duration-200 px-5 py-6.5 rounded-2xl'>
                            <div className='h-30 bg-gray-500'></div>
                            <p className='text-center text-white mt-3.5 '>Fantasy Games</p>
                        </SwiperSlide>)
                }

            </Swiper >

        </>
    );
}
