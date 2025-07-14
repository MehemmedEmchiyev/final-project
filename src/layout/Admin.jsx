import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/Admin/Sidebar'

function Admin() {
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}

export default Admin