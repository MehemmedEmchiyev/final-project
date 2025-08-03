import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef } from 'react';
import Card from '../../Card';
import CardSkeleton from '../../../ui/CardSkeleton';

export default function Slider({data , isLoading , title}) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const arr = Array.from({ length: 5 }, () => "");
    return (
        <>
            <div className='w-full flex items-center justify-between mb-3'>
                <h2 className='text-[2rem] text-white font-extrabold'>{title}</h2>
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
                    <div className='grid gap-7.5 grid-cols-2 md:grid-cols-5'>
                        {arr.map((_, index) => (
                            <CardSkeleton key={index}/>
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
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                        }}
                        pagination={{
                            el: '.swiper-pagination',
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        modules={[Pagination, Navigation]}
                        className="mySwiper "
                    >
                        {
                            data?.map((item, index) => (
                                <SwiperSlide key={index} className='text-white'>
                                    <Card item={item} />
                                </SwiperSlide>
                                
                            ))
                        }
                    </Swiper>
            }
        </>
    );
}
