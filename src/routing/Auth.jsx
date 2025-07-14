import { Navigate } from "react-router"

function Auth({ children }) {
    let token = localStorage.getItem('token')
    return token ? children : <Navigate to='/login' />
}

export default Auth