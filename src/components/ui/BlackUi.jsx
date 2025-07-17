import { useSelector } from "react-redux"

function BlackUi() {
    const {statue} = useSelector(store => store.black)
    const {search} = useSelector(store => store.search)
  return (
    <div className={`${statue || search ? "block" : "hidden"} lg:hidden z-98 w-full h-full fixed bg-black/50 top-0 left-0`}></div>
  )
}

export default BlackUi