import HomeSlider from '../../components/User/Home/HomeSlider'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger, SplitText } from 'gsap/all'
function Home() {
  useGSAP(() => {
    gsap.registerPlugin(SplitText)
    gsap.registerPlugin(ScrollTrigger)

    let split = SplitText.create("#title", { type: "words, chars" });
    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '#box',
        start: 'top 50%',
        end: 'bottom 30%',
        scrub: 1,
        snap: false,
      }
    })
    tl2.to('#box', {
      duration: 1,
      width: '100%',
      height: '100vh',
    })
    ScrollTrigger.matchMedia({
      "(min-width: 992px)": function () {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: '#epic',
            start: 'top 10%',
            end: 'bottom 10%',
            scrub: 1,
            snap: false,
          }
        })
        tl.to('#epic', {
          rotateY: 360,
          y: 400,
          x: '-50vw',
          duration: 1,
          rotate: -6
        })
        tl.to('#epic', {
          delay: 1.5,
          rotateY: 0,
          y: 800,
          x: '150px',
          duration: 1,
          rotate: 0,
        })
      },
    });
    gsap.from(split.chars, {
      duration: 1,
      y: 100,
      autoAlpha: 0,
      stagger: 0.05
    });
    gsap.fromTo('#epic', {
      opacity: 0,
      duration: 2,
    }, {
      opacity: 1,
      duration: 2,
      rotate: 6
    })
  })
  const epicGamesAwards = [
    {
      award: "BAFTA Special Award",
      description: "Honored by the British Academy of Film and Television Arts for major contributions to game development, especially Unreal Engine and Fortnite."
    },
    {
      award: "The Game Awards 2023",
      description: "Fortnite was nominated for Best Ongoing Game, celebrating its continuous updates and community engagement."
    },
    {
      award: "D.I.C.E. Awards 2024",
      description: "Alan Wake 2, published by Epic Games, won Outstanding Achievement in Art Direction, highlighting its artistic excellence."
    }
  ];

  return (
    <div>
      <div className='relative bg-[url(/images/home-bg.jpg)] bg-fixed bg-center bg-cover'>
        <div className='absolute w-full h-full bg-black/60'></div>
        <div className=' py-10 w-8/10 flex flex-col lg:flex-row items-center justify-between mx-auto '>
          <h1 id='title' className='text-center lg:text-start font-bold text-white text-[3rem] lg:text-[5rem] uppercase '>Welcome to Epic Games</h1>
          <div className='!w-full  lg:w-[400px] h-[400px]'>
            <img src="/images/epic.png" id='epic' className='w-full relative z-99 h-full object-cover' />
          </div>
        </div>
      </div>
      <div className='bg-[url(/images/R.jpeg)] bg-center bg-cover bg-fixed relative'>
        <div className='absolute z-5 w-full h-full  bg-black/70'></div>
        <div className='w-full relative z-10 px-2  lg:w-8/10 mx-auto flex items-center justify-between h-max lg:h-[50vh] py-10'>
          <div className='lg:w-1/3'></div>
          <div id='text' className=' text-white flex-col flex items-start justify-center  w-full'>
            <h2 className='text-4xl pb-2 font-bold'>Epic History</h2>
            <p className='pt-2'>
              Epic Games is a leading video game and software company founded by Tim Sweeney. They are famous for creating Unreal Engine, a powerful game development tool, and Fortnite, a global gaming phenomenon. Epic also runs the Epic Games Store, offering games directly to players. They continue to innovate in gaming technology and digital distribution.
            </p>
          </div>
        </div>
      </div>
      <div className='bg-[url(/images/B.jpg)] bg-center bg-cover bg-fixed relative'>
        <div className='absolute z-5 w-full h-full  bg-black/70'></div>
        <div className='w-full  relative z-10  px-2 lg:w-8/10 mx-auto flex items-center justify-between h-max lg:h-[50vh] py-10'>
          <div id='text' className=' text-white flex-col flex items-start justify-center  w-full'>
            <h2 className='text-4xl pb-2 font-bold'>Epic Awards</h2>
            <p className='pt-2'>
              <ul>
                {
                  epicGamesAwards.map((item, index) => <li className='pb-2' key={index}>
                    <span className='font-bold text-xl inline-block'> {item.award}</span>
                    <p className='pl-1'>{item.description}</p>
                  </li>)
                }
              </ul>
            </p>
          </div>
          <div className='lg:w-1/3'></div>
        </div>
      </div>
      <HomeSlider />
    </div>  
  )
}

export default Home