import Navbar from '../../../components/User/Store/Navbar'
import { Outlet } from 'react-router'
import BlackUi from '../../../components/ui/BlackUi'

function Store() {
  return (
    <>
      <Navbar />
      <BlackUi />
      <div className='w-full min-h-screen mx-auto lg:w-[75%]'>
        <Outlet />
      </div>
    </>
  )
}

export default Store