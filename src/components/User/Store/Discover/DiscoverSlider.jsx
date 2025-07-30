import { useEffect, useState } from "react";

function Tabs({ item, isActive, index }) {
    return (
        <div className={`text-white relative overflow-hidden cursor-pointer duration-300 flex rounded-md items-center py-4 px-3 ${isActive == index ? "bg-[#28282C]" : ""} z-[-2] hover:bg-[#28282C] gap-3`}>
            <div className={`bg-[#404044] ${isActive == index ? "fill" : ""}  z-[-1] absolute h-full top-0 left-0`}></div>
            <div className='w-10 h-13'>
                <img className='w-full rounded-md h-full object-cover' src={item.mini_image} alt="" />
            </div>
            <h2 className='font-semibold w-30'>{item.name}</h2>
        </div>
    )
}

export const games = [
    {
        name: 'Borderlands 4',
        title: "Only on Epic Games Store",
        img: "/images/egs.avif",
        mini_image: "/images/egsxbl4.jpg",
        logo: '/images/borderlands-4-logo.avif',
        desc: "Pre-purchase Borderlands 4 on Epic Games Store and get the Mad Moxxi Bundle in Fortnite!",
    },
    {
        name: 'Summer Sale',
        title: "July 17 - July 31",
        img: "/images/summer-sale.avif",
        mini_image: "/images/en-summer-sale.avif",
        logo: '/images/en-summer-sale-logo.png',
        desc: "Save big and earn 20% back in Epic Rewards on the hottest games of the season with deals that bring the heat.",
    },
    {
        name: 'Genish Impact',
        title: "NEW UPDATE",
        img: "/images/egs-genshin-impact.avif",
        mini_image: "/images/en-egs-genshin-impact-mini.avif",
        logo: '/images/genshin-impact-logo.png',
        desc: "Genshin Impact Version 5.8 brings refreshing summer adventures to Easybreeze Holiday Resort and introduces Nod-Krai’s first character Ineffa.",
    },
    {
        name: 'Dead by Daylight: The Walking Dead',
        title: "UNITE. ENDURE. SURVIVE.",
        img: "/images/egs-dead-by.avif",
        mini_image: "/images/egs-dead-by-daylight-mini.avif",
        logo: '/images/egs-dead-by-daylight-twd-logo.png',
        desc: "The new chapter brings iconic Survivors Rick Grimes and Michonne into The Fog, with Daryl Dixon arriving as a Legendary Outfit.",
    },
    {
        name: 'Terminull Brigade',
        title: "JUMP IN!",
        img: "/images/egs-terminull.jpg",
        mini_image: "/images/egs-terminull-brigade.avif",
        logo: '/images/egs-terminull-brigade.png',
        desc: "The Terminull is now live! Action-Roguelike meets looter shooter: Suit up, crew up, customize your build, and dive into the Nullverse now!",
    },
    {
        name: 'Arena Breakout: Infinite',
        title: "COMING SOON",
        img: "/images/egs-arena-breakout-infinite.avif",
        mini_image: "/images/egs-arena-mini.webp",
        logo: '/images/egs-arena-breakout.png',
        desc: "Arena Breakout: Infinite is an immersive Tactical Extraction Shooter. Shoot and loot your path to fortune!",
    },

];
function DiscoverSlider() {
    const [idx, setIdx] = useState(0)

    const change = () => setIdx(prev => prev + 1 >= games.length ? 0 : prev + 1);
    useEffect(() => {
        const interval = setInterval(change, 5000);
        return () => clearInterval(interval)
    }, []);
    return (
        <div className='hidden lg:flex h-[70vh] overflow-hidden gap-5'>
            {
                games.map((item, index) => <div key={index} className={`w-8/10 ${idx == index ? "fade" : "hidden"} h-full rounded-2xl overflow-hidden  bg-white relative`}>
                    <img src={item.img} className='w-full h-full  absolute top-0 left-0 object-cover' alt="" />
                    <div className="absolute  bg-gradient-to-r from-black/60 to-transparent h-full w-full "></div>
                    <div className="absolute  bottom-10 left-10">
                        <div className="w-50  h-25">
                            <img src={item.logo} className="w-full h-full object-contain mb-3" alt="" />
                        </div>
                        <p className="font-bold text-white text-xl mb-3">{item.title}</p>
                        <p className=" tracking-[0.5px] break-words w-100 text-white">{item.desc}</p>
                    </div>
                </div>)
            }

            <div className='w-2/10 flex flex-col justify-between gap-1'>
                {games.map((item, index) => <Tabs key={index} item={item} isActive={idx} index={index} />)}
            </div>
        </div>
    )
}

export default DiscoverSlider