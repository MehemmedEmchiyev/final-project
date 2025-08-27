import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useState } from 'react';
import CustomVideoPlayer from '../../ui/CustomVideoPlayer';

export default function MinimalGallery({ media }) {
    console.log(media);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="rounded-xl w-full mx-auto">
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="rounded-xl overflow-hidden"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {media?.map((src, i) => (
                    <SwiperSlide key={i}>
                        {src?.type == 'IMAGE' ? <img
                            src={src.url}
                            className="w-full h-[250px] md:h-[300px] lg:h-[500px] object-cover rounded-xl"
                            alt={`slide-${i}`}
                        /> :
                            <CustomVideoPlayer src={src?.url}/>}
                    </SwiperSlide>
                ))}
            </Swiper>

            {media?.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    watchSlidesProgress={true}
                    freeMode={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mt-4"
                >
                    {media?.map((src, i) => (
                        <SwiperSlide key={i}>
                            {src?.type == 'IMAGE' ?
                                <img
                                    src={src.url}
                                    className={`w-full h-15 lg:h-20 object-cover rounded-md cursor-pointer hover:opacity-100 opacity-50 border 
                                    ${activeIndex === i ? "border-2 opacity-100 border-white" : "border-gray-700"}`}
                                    alt={`thumb-${i}`}
                                /> : <video className={`w-full h-15 lg:h-20 object-cover rounded-md cursor-pointer hover:opacity-100 opacity-50 border 
                                    ${activeIndex === i ? "border-2 opacity-100 border-white" : "border-gray-700"}`}>
                                    <source  src={src?.url} />
                                </video>}
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
