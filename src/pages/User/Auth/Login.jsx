import { useFormik } from "formik"
import { useNavigate } from "react-router"
import { loginschema } from "../../../validation/loginschema"
import { useState } from "react"
import toast from "react-hot-toast"
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useForgotPasswordMutation, useLoginMutation } from "../../../store/services/epicApi"
import Loader from "../../../components/ui/Loader"
function Login() {
    const [login, { isLoading }] = useLoginMutation()
    const navigator = useNavigate()
    const [paswwordPart, setPasswordPart] = useState(false)
    const goToRegister = () => {
        navigator('/register')
    }
    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginschema,
        onSubmit: async () => {
            const res = await login(values)


            if (res.error) {
                toast.error(res?.error?.data?.message)
            }
            else {
                toast.success(res?.data?.message)
                const payload = JSON.parse(atob(res?.data?.token.accessToken.split('.')[1]));
                localStorage.setItem("userId", payload.userId)
                navigator('/store')
                localStorage.setItem("accessToken", res?.data?.token.accessToken)
                localStorage.setItem('refreshToken', res?.data?.token.refreshToken)
            }

        }
    })
    const checkPassword = () => {
        if (values.email == "" || errors.email) {
            toast.error(errors.email ? errors.email : "Email is empty")
            return ""
        }
        else {
            setPasswordPart(true)
        }
    }
    
    const [forgotPassword, { isLoading: forgetLoader }] = useForgotPasswordMutation()
    const forgetPassword = async () => {
        const data = {
            "email": values.email,
            "callbackURL": "https://epic-games.ramazanismayilovh.me/forget-password.html"
        }
        const res = await forgotPassword(data)
        if (res?.error) toast.error(res?.error.data.message)
        else toast.success(res?.data.message)
    }
    return (
        !paswwordPart ?
            <div className='min-h-screen px-2 flex items-center justify-center text-white'>
                <div className='text-white p-2 md:p-5 rounded-2xl border border-[#303033] bg-[#18181C]'>
                    <h2 className='text-center text-xl font-bold mb-3 py-3'>Sign in to Epic Games</h2>
                    <div className='w-full md:w-100 text-white p-5 rounded-2xl border border-[#303033] bg-[#18181C]'>
                        <h2 className='text-[#AEAEB0] pb-4 text-center'>Played on PC or mobile ?</h2>
                        <div>
                            <label className='text-[#AEAEB0] '>Sign in with email</label>
                            <input value={values.email} onChange={handleChange} id="email" name="email" type="text" className={`py-2 w-full px-2 mt-2 border outline-0 rounded-xl bg-[#242428] ${errors.email ? "border-red-500" : "border-[#3A3A3E]"}`} />
                            {errors.email && <p className="text-red-500 flex items-center gap-3">
                                {errors.email}
                            </p>}
                            <button onClick={checkPassword} className='w-full text-black h-11 duration-200 cursor-pointer mt-5 hover:bg-[#61CDFF] rounded-xl font-semibold bg-[#22A8E5]'>Continue</button>
                        </div>
                    </div>
                    <div className='w-full md:w-100 text-center text-white p-3 mt-5 rounded-2xl border border-[#303033] bg-[#18181C]'>
                        <p>New here? <span onClick={goToRegister} className='underline text-[#22A8E5] '>Create an account</span></p>
                    </div>
                    
                </div>
            </div>
            :
            <div className="min-h-screen flex items-center justify-center  px-4">
                <div className="w-full md:w-150 border-[#303033] border bg-[#18181C] rounded-2xl p-6 md:p-8 ">
                    <button onClick={() => setPasswordPart(false)} className="cursor-pointer text-shadow-md text-white mb-4 flex items-center gap-2 hover:underline">
                        <MdKeyboardArrowLeft className="text-2xl" /> Back
                    </button>

                    <h2 className="text-2xl font-bold text-white mb-2">Enter your password</h2>
                    <p className="text-sm text-gray-400 mb-6">
                        You're signing in with <span className="font-semibold text-white">{
                            values.email.replace("@gmail.com", "")[0] + "***" + values.email.replace("@gmail.com", "")[values.email.replace("@gmail.com", "").length - 1] + "@gmail.com"
                        }</span>
                    </p>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="password" className="flex items-center gap-3 text-md font-semibold text-white mb-1">
                            Password
                            {errors.password && <span className="text-red-500 flex items-center gap-3">
                                *
                            </span>}
                        </label>
                        <div className="relative text-white mb-4">
                            <input value={values.password} onChange={handleChange} id="password" name="password" type="password" className={`py-3 w-full px-2 mt-2 border outline-0 rounded-xl bg-[#242428] border-[#3A3A3E]`} />

                        </div>

                        <div className="mb-6">
                            <span onClick={forgetPassword} className="cursor-pointer text-md underline text-blue-400 hover:underline">
                                {forgetLoader ? <Loader /> : "Forgot password"}
                            </span>
                        </div>
                        <button

                            disabled={errors.password}
                            className={`w-full text-black h-11 duration-200 ${errors.password ? "bg-gray-700 cursor-not-allowed opacity-50" : "cursor-pointer bg-[#22A8E5]  hover:bg-[#61CDFF]"} mt-5  rounded-xl font-semibold  `}
                        >
                            {isLoading ? <Loader /> : "Sign in"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-sm underline text-blue-400 hover:underline">
                            Privacy Policy
                        </span>
                    </div>
                </div>
            </div>
    );

}

export default Login