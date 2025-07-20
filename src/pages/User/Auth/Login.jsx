import { useFormik } from "formik"
import { useNavigate } from "react-router"
import { loginschema } from "../../../validation/loginschema"
import { useState } from "react"
import toast from "react-hot-toast"
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useForgotPasswordMutation, useLoginByGoogleMutation, useLoginMutation } from "../../../store/services/epicApi"
import Loader from "../../../components/ui/Loader"
import { auth, googleProvider } from "../../../store/services/firebaseConfig"
import { signInWithPopup } from "firebase/auth";

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
            console.log(res);

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
    const [loginGoogle] = useLoginByGoogleMutation()
    const handleGoogleLogin = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const token = user.accessToken
        const response = await loginGoogle({token : token})
        
    }
    const [forgotPassword, { isLoading: forgetLoader }] = useForgotPasswordMutation()
    const forgetPassword = async () => {
        const data = {
            "email": values.email,
            "callbackURL": "http://localhost:3000/forget-password.html"
        }
        const res = await forgotPassword(data)
        if (res?.error) toast.error(res?.error.data.message)
        else toast.success(res?.data.message)
    }
    return (
        !paswwordPart ?
            <div className='min-h-screen px-2 flex items-center justify-center text-white'>
                <div className='text-white p-2 md:p-5 rounded-2xl border border-[#303033] bg-[#18181C]'>
                    <h2 className='text-center text-xl font-bold mb-3'>Sign in to Epic Games</h2>
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
                    <div className='w-full md:w-100 text-center text-white p-3 mt-5 rounded-2xl border border-[#303033] bg-[#18181C]'>
                        <p className="text-center font-semibold mb-3 text-[#AEAEB0]">Other ways to sign in</p>
                        <div onClick={handleGoogleLogin} className="flex py-1 px-2  rounded-full bg-[#202024] hover:bg-[#3D3D40] items-center justify-between">
                            <div className="bg-white w-max p-1 rounded-full">
                                <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" className="mui-nok893"><path d="M17.64 9.20483C17.64 8.56665 17.5827 7.95301 17.4764 7.36392H9V10.8453H13.8436C13.635 11.9703 13.0009 12.9235 12.0477 13.5616V15.8198H14.9564C16.6582 14.253 17.64 11.9457 17.64 9.20483Z" fill="#4285F4"></path><path d="M9 17.9999C11.43 17.9999 13.4673 17.194 14.9564 15.8194L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.7099H0.957275V13.0417C2.43818 15.9831 5.48182 17.9999 9 17.9999Z" fill="#34A853"></path><path d="M3.96409 10.7097C3.78409 10.1697 3.68182 9.59292 3.68182 8.99973C3.68182 8.40655 3.78409 7.82973 3.96409 7.28973V4.95792H0.957273C0.347727 6.17292 0 7.54746 0 8.99973C0 10.452 0.347727 11.8266 0.957273 13.0416L3.96409 10.7097Z" fill="#FBBC05"></path><path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92546L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"></path></svg>
                            </div>
                            <h2 className="w-full text-center text-white mr-10">Google</h2>
                        </div>
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