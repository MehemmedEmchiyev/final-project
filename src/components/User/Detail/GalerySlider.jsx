import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useState } from 'react';

export default function MinimalGallery({ media }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const medias = media?.length > 1 ? [...media || []] : media
    const sliderItems = media?.length > 1 && medias.splice(0,1)
    console.log(medias);
    
    
    return (
        
        <div className=" rounded-xl w-full mx-auto">
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="rounded-xl overflow-hidden"
            >
                {medias?.map((src, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={src.url}
                            className={`w-full h-[250px] lg:h-[500px] ${media?.length > 1 ? "object-cover" : "object-contain"} rounded-xl`}
                            alt={`slide-${i}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            {media?.length > 1 && <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress={true}
                freeMode={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mt-4"
            >
                {medias?.map((src, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={src.url}
                            className="w-full h-15 lg:h-20 object-cover rounded-md border border-gray-700 cursor-pointer hover:opacity-80"
                            alt={`thumb-${i}`}
                        />

                    </SwiperSlide>
                ))}
            </Swiper>}
        </div>
    );
}
