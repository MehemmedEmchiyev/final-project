import { Route, Routes } from "react-router"
import User from "../layout/User"
import Auth from "./Auth"
import Admin from "../layout/Admin"
import AdminLogin from "../pages/Admin/AdminLogin"
import About from "../pages/User/About"
import Home from "../pages/User/Home"
import Store from "../pages/User/Store/Store"
import Browse from "../pages/User/Store/Browse"
import Discover from "../pages/User/Store/Discover"
import Login from "../pages/User/Auth/Login"
import Register from "../pages/User/Auth/Register"
import VerifyEmail from "../pages/User/Auth/VerifyEmail"

function Router() {
    return (
        <Routes>
            <Route path="/" element={<User />}>
                <Route index element={<Home />}/>
                <Route path="store" element={<Store />}>
                    <Route index element={<Discover />} />
                    <Route path="browse" element={<Browse />} />
                </Route>
                <Route path="about" element={<About />}/>
            </Route>
            <Route path="/admin" element={
                <Auth>
                    <Admin />
                </Auth>
            }>
                
            </Route>
            <Route path="/adminlogin" element={<AdminLogin />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/verify-email" element={<VerifyEmail />}/>
        </Routes>
    )
}

export default Router