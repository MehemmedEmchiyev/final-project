function NewPassword({setOpen}) {
    return (
        <div className="space-y-4 border-b border-t  border-gray-800 py-8">
            <h2 className="text-2xl font-bold">Change your password</h2>
            <p className="text-gray-400">For your security, we highly recommend that you choose a unique password that you don't use for any other online account.</p>
            <button onClick={() => setOpen(true)} className="bg-sky-500 hover:bg-sky-400 w-full md:w-max duration-300 cursor-pointer text-black font-medium py-3 px-4 rounded-md">Change Password</button>
        </div>
    )
}

export default NewPassword