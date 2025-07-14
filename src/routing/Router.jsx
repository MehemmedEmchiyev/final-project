import { Route, Routes } from "react-router"
import User from "../layout/User"
import Auth from "./Auth"
import Admin from "../layout/Admin"
import AdminLogin from "../pages/Admin/AdminLogin"
import About from "../pages/User/About"
import Home from "../pages/User/Home"
import Store from "../pages/User/Store"

function Router() {
    return (
        <Routes>
            <Route path="/" element={<User />}>
                <Route index element={<Home />}/>
                <Route path="/store" element={<Store />}/>
                <Route path="about" element={<About />}/>
            </Route>
            <Route path="/admin" element={
                <Auth>
                    <Admin />
                </Auth>
            }>
                
            </Route>
            <Route path="/login" element={<AdminLogin />}/>
        </Routes>
    )
}

export default Router