import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/Admin/Sidebar'
import Contain from '../components/ui/Contain'

function Admin() {
    return (
        <div className='flex text-white'>
            <Sidebar />
            <Contain>
                <Outlet />
            </Contain>
        </div>
    )
}

export default Admin