import { Navigate } from "react-router"
import { useLazyGetUserByIdQuery } from "../store/services/epicApi"
import { useEffect, useState } from "react"

function Auth({ children }) {
    
    
    let token = localStorage.getItem('accessToken')
    return token ? children : <Navigate to='/adminlogin' />
}

export default Auth