import { Link } from 'react-router'
import ParticleNetwork from '../components/ui/Particles'

function NotFound() {

    return (
        <div className='flex items-center justify-center h-screen text-white'>
            <ParticleNetwork />
            <div className='relative z-10 flex items-center justify-center flex-col gap-3'>
                <img src="../../../../public/images/epic.png" className='w-50 h-50 object-cover' alt="" />
                <h2 className='text-7xl font-bold pb-10'>Comming Soon...</h2>
                <Link to={'/'} className='w-50 h-10 rounded bg-gradient-to-r from-black to-gray-700 hover:to-gray-900 flex items-center justify-center  transition duration-300 font-semibold'>Go back home</Link>
            </div>
        </div>
    )
}

export default NotFound