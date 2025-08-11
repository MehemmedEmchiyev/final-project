import { useGetNewsQuery } from "../../../store/services/epicApi"
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../../components/ui/Loader";

function NewsPage() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        })
    }, [])
    const info = [
        {
            image: '/images/summernews.jpg',
            title: 'Get some sun and grab some games: The Epic Games Store Summer Sale buyer’s guide',
            desc: 'Prepare for the 2025 Summer Sale in the Epic Games Store with our buyer’s guide. Discover top deals on games, information on sale dates, Epic Rewards, and more!'
        },
        {
            image: '/images/newsimage2.jpg',
            title: 'Wuchang: Fallen Feathers brings color to the muted Soulslike genre',
            desc: '‘What really sets Wuchang: Fallen Feathers apart is how everything in the game is connected through a cultural lens that’s deeply personal to the team’'
        }
    ]
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true);
    const { data } = useGetNewsQuery(page)
    const [newsList, setNewsList] = useState([])
    useEffect(() => {
        if (data && data.data) {
            setNewsList(prev => {
                const existingIds = new Set(prev.map(item => item.id));
                const filteredNew = data.data.filter(item => !existingIds.has(item.id));
                return [...prev, ...filteredNew];
            })
            if (page >= data.totalPages) setHasMore(false);
        }
    }, [data, page]);
    return (
        <div className="py-10">
            <h1 className="text-xl pb-2 font-bold text-white">Epic Games News</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {
                    info.map((item, index) => <div key={index} className="w-full">
                        <div className=" rounded overflow-hidden w-full">
                            <img src={item.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="pt-3 text-white font-semibold">{item.title}</h2>
                            <p className="text-[#ACACAD] text-md">{item.desc}</p>
                        </div>
                    </div>)
                }
            </div>
            <div className="pt-5">
                <InfiniteScroll
                    dataLength={newsList.length}
                    next={() => setPage(prev => prev + 1)}
                    hasMore={hasMore}
                    style={{ overflow: "hidden" }}
                    loader={<Loader property={'text-blue-400'}/>}
                >
                    {
                        newsList.map((item, index) => <div key={index} data-aos={index % 2 ? "fade-right" : "fade-left" } className="py-5 flex flex-col lg:flex-row gap-5 border-t border-[#404043]">
                            <div className="w-full lg:w-60 rounded overflow-hidden lg:h-30">
                                <img src={item?.media.url} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex  flex-col gap-4 w-full ">
                                <h2 className=" text-white font-semibold">{item?.title}</h2>
                                <p className="text-[#ACACAD] text-md">{item?.description}</p>
                            </div>
                        </div>)
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default NewsPage