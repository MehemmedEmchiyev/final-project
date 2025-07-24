function DetailSkelton() {
    const divs = Array.from({ length: 3 }, () => "")
    return (
        <div>
            <div className="text-white animate-pulse py-10">
                <div className="w-full lg:w-1/3 h-10  bg-gray-800 rounded" />
                <div className="flex gap-10 mt-5">
                    <div className="w-full lg:w-7/10">
                        <div className="h-[500px] bg-gray-800 animate-pulse w-full"></div>
                        <div className="mx-auto mt-3 flex items-center justify-center gap-3">
                            {divs.map((_, index) => <div key={index} className="w-40 h-20 bg-gray-800"></div>)}
                        </div>
                        <p className="bg-gray-800 mt-3 animate-pulse w-full h-6"></p>
                        <div className="py-4 flex pt-3">
                            {
                                divs.map((_, index) => <div key={index} className={`w-1/2 px-3 ${index == 2 ? "" : "border-r"} border-[#343437]`}>
                                    <h2 className="bg-gray-800 animate-pulse w-full h-3"></h2>
                                    <div className="pt-2 flex items-center gap-2 flex-wrap">
                                        <div className="rounded-md bg-gray-800 animate-pulse w-full"></div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="w-3/10">
                        <div className="mb-4 h-[200px] bg-gray-800 animate-pulse"></div>
                        <div className="border w-full border-gray-700 rounded-lg p-3 inline-flex items-center gap-5">
                            <div className=" bg-gray-800 rounded w-12 h-12 p-0.5 text-center leading-tight "></div>
                            <span className="w-1/3 h-5 bg-gray-800 text-white font-semibold"></span>
                        </div>
                        <div className=" bg-gray-800 rounded mt-3 w-1/3 h-5  text-center leading-tight animate-pulse"></div>
                        <div className=" bg-gray-800 rounded mt-3 w-1/5 h-5  text-center leading-tight animate-pulse"></div>
                        <div className="pt-4 space-y-2">
                            {divs.map((_, index) => <button key={index} className="w-full bg-gray-800 py-3 animate-pulse h-13 rounded-xl "></button>)}
                        </div>
                        <div className="pt-2">
                            {
                                divs.map((_, index) => <div key={index} className="py-2 w-full flex items-center justify-between border-b border-[#343437]">
                                    <span className="w-20 h-3 animate-pulse bg-gray-800"></span>
                                    <span className="w-20 h-3 animate-pulse bg-gray-800"></span>
                                </div>)
                            }
                        </div>
                        <div className="pt-2 flex items-center gap-3">
                            <button className="w-full bg-gray-800 animate-pulse py-4   rounded-md"></button>
                            <button className="w-full bg-gray-800 animate-pulse py-4   rounded-md"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailSkelton