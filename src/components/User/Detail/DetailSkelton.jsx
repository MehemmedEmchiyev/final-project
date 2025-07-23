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
                            {
                                divs.map((_, index) => <div key={index} className="w-40 h-20 bg-gray-800"></div>)
                            }
                        </div>
                    </div>
                    <div className="w-3/10">
                        <div className="border w-full border-gray-700 rounded-lg p-3 inline-flex items-center gap-5">
                            <div className=" bg-gray-800 rounded w-12 h-12 p-0.5 text-center leading-tight "></div>
                            <span className="w-1/3 h-5 bg-gray-800 text-white font-semibold"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailSkelton