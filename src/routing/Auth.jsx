import { useEffect, useState } from "react"
import { Navigate } from "react-router"
import { useLazyGetUserByIdQuery } from "../store/services/epicApi"
import toast from "react-hot-toast"
import LoaderModal from "../components/Admin/LoaderModal"

function Auth({ children }) {
  const [getUser, { isLoading }] = useLazyGetUserByIdQuery()
  const [userInfo, setUserInfo] = useState(null)

  let token = localStorage.getItem("accessToken")
  let userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(userId).unwrap() 
        setUserInfo(data)
      } catch (err) {
        toast.error(err)
      }
    }
    if (userId) fetchUser()
  }, [userId, getUser])

  if (isLoading || !userInfo) return <LoaderModal />

  return token && userInfo?.role?.name === "ADMIN"
    ? children
    : <Navigate to="/adminlogin" />
}

export default Auth
