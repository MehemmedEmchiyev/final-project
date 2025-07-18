import { Navigate } from "react-router"

function Auth({ children }) {
    let token = localStorage.getItem('accessToken')
    return token ? children : <Navigate to='/adminlogin' />
}

export default Auth