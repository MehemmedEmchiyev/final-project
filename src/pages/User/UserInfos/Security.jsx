import { useState } from "react"
import ChangePassword from "../../../components/User/Account/Security/ChangePassword"
import NewPassword from "../../../components/User/Account/Security/NewPassword"
import SignOut from "../../../components/User/Account/Security/SignOut"

function Security() {
    const [open , setOpen] = useState(false)
    return (
        <>
            <div>
                <h1 className='text-2xl md:text-4xl font-bold'>Password and security</h1>
                <p className='font-semibold text-sm text-[#ACACAD] pt-3'>Manage password and two-factor authentication settings for your Epic Games account.</p>
            </div>
            <div className='pt-10'>
                <h2 className='text-2xl font-bold'>Two-Factor Authentication</h2>
                <p className='text-[#ACACAD] mt-2'>
                    Two-factor authentication (also known as 2FA) helps protect your account by requiring you to enter an additional code when you log in. <span className="underline text-blue-400 cursor-pointer">Learn more about 2FA.</span>
                </p>
            </div>
            <div className="pt-10">
                <NewPassword setOpen = {setOpen} />
                <SignOut />
                <ChangePassword open={open} setOpen={setOpen} />
            </div>
        </>
    )
}

export default Security