import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { IoMdClose } from "react-icons/io";

function HomeSlider() {
    const products = [
        {
            id : 1,
            title: 'FORTNITE',
            image: '/images/fortnite.webp'
        },
        {
            id : 2,
            title: 'Rocket League',
            image: '/images/rocket.webp'
        },
        {
            id : 3,
            title: 'Store',
            image: '/images/store.jpg'
        },
        {
            id : 4,
            title: 'Robo Recall',
            image: '/images/image.jpg'
        },
        {
            id : 5,
            title: 'Unreal  Tournament',
            image: '/images/unrealtournamet.jpg'
        },
        {
            id : 6,
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
    return ( 
        <Slider {...settings} className= "overflow-hidden h-[90vh] md:!h-screen" >
            {
                 
                products.map((item, index) =>
                    <div onClick={() => handleOpen(item.id)} className='w-full h-[90vh] md:h-screen group overflow-hidden relative' key={index}>
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