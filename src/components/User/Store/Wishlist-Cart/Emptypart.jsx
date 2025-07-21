import { useNavigate } from "react-router"
function Emptypart() {
  const navigator = useNavigate()
    return (
        <div>
            <div className="flex items-center justify-center py-10 border-b border-[#343437]">
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-15 h-15">
                        <svg xmlns="http://www.w3.org/2000/svg" className="svg css-uwwqev" viewBox="0 0 45 52"><g fill="none" ><path d="M4.058 0C1.094 0 0 1.098 0 4.075v35.922c0 .338.013.65.043.94.068.65-.043 1.934 2.285 2.96 1.553.683 7.62 3.208 18.203 7.573 1.024.428 1.313.529 2.081.529.685.013 1.137-.099 2.072-.53 10.59-4.227 16.66-6.752 18.213-7.573 2.327-1.23 2.097-3.561 2.097-3.899V4.075C44.994 1.098 44.13 0 41.166 0H4.058z" fill="#404044"></path><path stroke="#FFF"  d="M14 18l4.91 2.545-2.455 4M25.544 28.705c-1.056-.131-1.806-.14-2.25-.025-.444.115-1.209.514-2.294 1.197M29.09 21.727L25 19.5l2.045-3.5"></path></g></svg>
                    </div>
                    <p className="text-[32px] text-center pt-5 md:text-[40px] line-clamp-2 text-white font-extrabold">You haven't added anything to <br /> your wishlist yet.</p>
                    <button onClick={() => navigator('/store')} className="w-max py-1 cursor-pointer px-4 bg-blue-400 hover:bg-blue-300 text-black rounded font-semibold mt-5">Shop for Games & Apps</button>
                </div>
            </div>
            <p className="text-sm text-white pt-5 ">* The lowest price offered on The Epic Games Store in the last 30 days before discount</p>
        </div>
    )
}

export default Emptypart