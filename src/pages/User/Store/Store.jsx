import Navbar from '../../../components/User/Store/Navbar'
import { Outlet } from 'react-router'
import BlackUi from '../../../components/ui/BlackUi'

function Store() {
  return (
    <>
      <Navbar />
      <BlackUi />
      <div className='w-full h-screen mx-auto md:w-[70%]'>
        <Outlet />
      </div>
    </>
  )
}

export default Store