import { LuLoaderCircle } from "react-icons/lu";
 
function Loader({property}) { 
  property == "" ? "text-black" : property 
  return (
    <div className="w-full text-center"><LuLoaderCircle className={`mx-auto animate-spin ${property}  w-5 h-5`}/></div>
  )
}
export default Loader 