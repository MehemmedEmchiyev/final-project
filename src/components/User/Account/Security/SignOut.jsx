import toast from "react-hot-toast"
import { useNavigate } from "react-router"

function SignOut() {
    const navigator = useNavigate()
    const handleSignOut = () => {
        navigator('/')
        localStorage.clear()
        toast.success('Sign Out is Succesfully')
    }
    return (
        <div className="space-y-4  border-t  border-gray-800 py-8">
            <h2 className="text-2xl font-bold">Sign out everywhere</h2>
            <p className="text-gray-400">Sign out everywhere else your Epic Games account is being used, including all other browsers, phones, consoles, or any other devices except this page.</p>
            <button onClick={handleSignOut} className="bg-[#343437] hover:bg-[#636366] w-full md:w-max duration-300 cursor-pointer text-white font-medium py-3 px-4 rounded-md    ">Sign Out</button>
        </div>
    )
}

export default SignOut