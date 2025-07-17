import { Outlet, useLocation } from 'react-router'
import Header from '../components/User/Header/Header'
import Footer from '../components/User/Footer'
function User() {
    const {pathname} = useLocation()
    return (
        <>
            <Header />
            <div className={`${pathname.includes('/store') ? "" : "mt-18"}`}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default User