import { Outlet } from 'react-router'
import Header from '../components/User/Header/Header'
import Footer from '../components/User/Footer'
function User() {
    return (
        <>
            <Header />
            <div className='mt-18'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default User