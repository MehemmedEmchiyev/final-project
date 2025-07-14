import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { IoMdClose } from "react-icons/io";

function HomeSlider() {
    const products = [
        {
            title: 'FORTNITE',
            image: '/images/fortnite.webp'
        },
        {
            title: 'Rocket League',
            image: '/images/rocket.webp'
        },
        {
            title: 'Store',
            image: '/images/store.jpg'
        },
        {
            title: 'Robo Recall',
            image: '/images/image.jpg'
        },
        {
            title: 'Unreal  Tournament',
            image: '/images/unrealtournamet.jpg'
        },
        {
            title: 'Unreal Engin',
            image: '/images/unrealengin.avif'
        },
    ]
    const settings = {
        infinite: true,
        speed: 12000,
        autoplay: true,
        autoplaySpeed: 10,
        cssEase: "linear",

        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };
    const [fullScreen, setFullScreen] = useState(null)
    const handleOpen = (index) => {
        if(window.innerWidth < 760) return
        setFullScreen(index + 1)
    }
    return (
        fullScreen ? 
        <div className="w-full h-screen hidden md:block">
            <img src={products[fullScreen - 1].image} className="w-full h-full object-cover" alt="" />
            <div className="absolute transform translate-x-[-50%] md:translate-x-0 bottom-20 md:bottom-0 text-center md:text-start  md:top-[50%] left-[50%]">
                <h2 className="uppercase text-[52px] font-bold md:text-[100px] text-white">{products[fullScreen - 1].title}</h2>
                <button className="border-1 border-white w-full md:w-max  px-7 py-3 text-white bg-transparent hover:bg-white hover:text-black duration-300 cursor-pointer">EXPLORE</button>
            </div>
            <div className=" absolute right-8 top-[15%]">
                <IoMdClose onClick={() => setFullScreen(null)} className="shadow-2xl text-black md:text-white text-3xl cursor-pointer font-bold"/>
            </div>
        </div>
        : 
        <Slider {...settings} className="h-[90vh] md:!h-screen" >
            {
                products.map((item, index) =>
                    <div onClick={() => handleOpen(index)} className='w-full h-[90vh] md:h-screen group overflow-hidden relative' key={index}>
                        <img src={item.image} className='w-full h-full object-cover object-left scale-[1.1] group-hover:scale-[1.2] duration-500' alt="" />
                        <div className="text-white uppercase text-[32px] text-center font-bold md:text-[40px] text-2xl absolute bottom-[30%] z-111 transform translate-x-[-50%] md:translate-x-0 left-[50%] md:left-[10%]">{item.title}</div>
                        <div className="group-hover:opacity-0 hidden md:block duration-500 bg-black/50 absolute w-full h-full top-0 left-0 z-110"></div>
                    </div>
                )
            }
        </Slider>
        
    )
}

export default HomeSlider