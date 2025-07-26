import { Route, Routes } from "react-router"
import User from "../layout/User"
import Auth from "./Auth"
import Admin from "../layout/Admin"
import AdminLogin from "../pages/Admin/AdminAuth/AdminLogin"
import About from "../pages/User/About"
import Home from "../pages/User/Home"
import Store from "../pages/User/Store/Store"
import Browse from "../pages/User/Store/Browse"
import Discover from "../pages/User/Store/Discover"
import Login from "../pages/User/Auth/Login"
import Register from "../pages/User/Auth/Register"
import VerifyEmail from "../pages/User/Auth/VerifyEmail"
import Dashboard from "../pages/Admin/AdminPages/Dashboard"
import Genres from "../pages/Admin/AdminPages/Genres"
import Features from "../pages/Admin/AdminPages/Features"
import Events from "../pages/Admin/AdminPages/Events"
import Types from "../pages/Admin/AdminPages/Types"
import Platforms from "../pages/Admin/AdminPages/Platforms"
import Subscription from "../pages/Admin/AdminPages/Subscription"
import Wishlist from "../pages/User/Store/Wishlist"
import Basket from "../pages/User/Store/Basket"
import Account from "../pages/User/UserInfos/Account"
import Settings from "../pages/User/UserInfos/Settings"
import Detail from "../pages/User/Store/Detail"
import Security from "../pages/User/UserInfos/Security"
import PaymentSettings from "../pages/User/UserInfos/PaymentSettings"
function Router() {
    return (
        <Routes>
            <Route path="/" element={<User />}>
                <Route index element={<Home />} />
                <Route path="store" element={<Store />}>
                    <Route index element={<Discover />} />
                    <Route path="browse" element={<Browse />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="basket" element={<Basket />} />
                    <Route path="detail/:id" element={<Detail />} />
                </Route>
                <Route path="account" element={<Account />} >
                    <Route index element={<Settings />} />
                    <Route path="security" element={<Security />} />
                    <Route path="payment-settings" element={<PaymentSettings />} />
                </Route>
            </Route>
            <Route path="/admin" element={
                <Auth>
                    <Admin />
                </Auth>
            }>
                <Route index element={<Dashboard />} />
                <Route path="genres" element={<Genres />} />
                <Route path="features" element={<Features />} />
                <Route path="events" element={<Events />} />
                <Route path="types" element={<Types />} />
                <Route path="platforms" element={<Platforms />} />
                <Route path="subscription" element={<Subscription />} />
            </Route>
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
    )
}

export default Router