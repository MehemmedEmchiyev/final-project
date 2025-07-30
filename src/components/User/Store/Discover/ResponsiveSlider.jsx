import { games } from "./DiscoverSlider"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
function ResponsiveSlider() {
    return (
        <div className="w-full block lg:hidden max-w-6xl mx-auto py-10">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1.2}
                breakpoints={{
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2.5 },
                    1024: { slidesPerView: 3.5 },
                }}
                pagination={{ clickable: true }}
                navigation
                loop
            >
                {games.map((game, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-black rounded-2xl overflow-hidden shadow-lg relative h-[500px]">
                            <img
                                src={game.img}
                                alt={game.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70  to-transparent text-white p-4">
                                <img src={game.logo} alt="logo" className="w-40 h-20 object-contain" />
                                <p className="text-xs font-semibold mb-3 text-white">{game.title}</p>
                                <p className="text-sm mb-3">{game.desc}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ResponsiveSlider