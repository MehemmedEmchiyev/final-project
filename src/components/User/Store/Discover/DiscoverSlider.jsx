import { useEffect, useState } from "react";

function Tabs({ item }) {
    return (
        <div className='text-white relative cursor-pointer duration-300 flex rounded-md items-center py-4 px-3 hover:bg-[#28282C] gap-3'>
            <div className='w-10 h-13 '>
                <img className='w-full rounded-md h-full object-contain' src={item.mini_image} alt="" />
            </div>
            <h2 className='font-semibold tracking-[1px]'>{item.name}</h2>
            <div className=" bg-[#404044] rounded-md z-[-1] absolute w-full h-full top-0 left-0"></div>
        </div>
    )
}

function DiscoverSlider() {
    const [idx, setIdx] = useState(0)
    const games = [
        {
            name: 'Fortnite',
            title: "out now",
            img: "/images/fantasticFour.avif",
            mini_image: "/images/ffmini.avif",
            desc: "Futuristic open-world RPG in Night City.",
        },
        {
            title: "Elden Ring",
            img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg",
            desc: "A fantasy action RPG from the creators of Dark Souls.",
        },
        {
            title: "Hogwarts Legacy",
            img: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_hero.jpg",
            desc: "Live your own adventure in the Wizarding World.",
        },
        {
            title: "Red Dead Redemption 2",
            img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_hero.jpg",
            desc: "An epic tale of life in America’s unforgiving heartland.",
        },
        {
            title: "Ghostrunner",
            img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1139900/library_hero.jpg",
            desc: "Fast-paced brutal combat in a cyberpunk world.",
        },
        {
            title: "The Witcher 3: Wild Hunt",
            img: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_hero.jpg",
            desc: "A story-driven, open world RPG set in a dark fantasy universe.",
        },
    ];

    const change = () => setIdx(prev => prev + 1 >= games.length ? 0 : prev + 1);
    useEffect(() => {
        const interval = setInterval(change, 3000);
        return () => clearInterval(interval)
    }, []);
    return (
        <div className='flex h-[70vh] gap-5'>
            <div className='w-8/10 h-full rounded-2xl overflow-hidden bg-white relative'>

                <img src={games[idx].img} className='w-full h-full absolute top-0 left-0 object-cover' alt="" />
            </div>
            <div className='w-2/10 flex flex-col gap-1'>
                {
                    games.map((item, index) => <Tabs key={index} item={item} />)
                }
            </div>
        </div>
    )
}

export default DiscoverSlider