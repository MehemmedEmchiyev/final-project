import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";


function HomeSlider() {
    const products = [
        { image: 'https://tse4.mm.bing.net/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { image: 'https://tse4.mm.bing.net/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { image: 'https://tse4.mm.bing.net/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { image: 'https://tse4.mm.bing.net/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { image: 'https://tse4.mm.bing.net/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { image: 'https://tse4.mm.bing.net/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { image: 'https://tse4.mm.bing.net/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3' },
    ]
    const settings = {
        infinite: true,
        speed: 10000,
        autoplay: true,
        autoplaySpeed: 0 ,
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
        <Slider {...settings} >
            {
                products.map((item, index) =>
                    <div className='w-full overflow-hidden' key={index}>
                        <img src={item.image} className='w-full hover:scale-[1.1] duration-500' alt="" />
                    </div>
                )
            }
        </Slider>
    )
}

export default HomeSlider