import { useFormik } from "formik"
import { X } from "lucide-react"
import { newEmail } from "../../../validation/newEmail"
import { useNewEmailMutation, useVerifyNewEmailMutation } from "../../../store/services/epicApi";
import toast from "react-hot-toast";
import Loader from "../../ui/Loader";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

function NewEmail({ open, setOpen }) {
    const navigator = useNavigate()
    const [oldEmail, setOldEmail] = useState("")
    const [verifyEmail, { isLoading: verifyLoader }] = useVerifyNewEmailMutation()
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);
    const handlerChange = (e, index) => {
        const value = e.target.value.slice(-1);
        const updatedCode = [...code];
        updatedCode[index] = value;
        setCode(updatedCode);
        if (value && index < 5) inputsRef.current[index + 1].focus();
    }
    const handleKeyDown = (e, index) => { if (e.key === "Backspace" && !code[index] && index > 0) inputsRef.current[index - 1].focus(); }
    const isComplete = code.every((digit) => digit !== "");
    const handlerSubmit = async () => {
        const res = await verifyEmail({
            email: oldEmail,
            otpCode: Number(code.join(""))
        })
        if (res?.error) toast.error(res?.error.data.message)
        else {
            toast.success(res?.data.message)
            navigator('/login')
        }
    }
    const [first, setFirst] = useState(false)
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
    const [accessEmail, { isLoading }] = useNewEmailMutation()
    const { values, errors, handleSubmit, handleChange, resetForm } = useFormik({
        initialValues: { email: '' },
        validationSchema: newEmail,
        onSubmit: async () => {
            setOldEmail(values.email)
            const res = await accessEmail({
                email: values.email
            })
            if (res?.error) toast.error(res?.error.data.message)
            else {
                toast.success(res?.data.message)
                setFirst(true)
            }
        },
    })
    const handleClose = () => {
        resetForm()
        setOpen(false)
        setFirst(false)
    }
    return (
        <div className={`${open ? "flex " : "hidden"} px-3 w-full h-full bg-black/50 fixed top-0 left-0 items-center justify-center`}>
            {
                first ?
                    <div className="w-100 h-max bg-[#202024] rounded-2xl p-6 text-white space-y-4 max-w-md">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-semibold">Enter security code</h2>
                            <button onClick={() => setOpen(false)}>
                                <X />
                            </button>
                        </div>

                        <p className="text-sm text-gray-400">
                            To continue changing your email address, please enter the security
                            code that was sent to <span className="font-bold">{oldEmail}</span>.
                        </p>

                        <div className="flex justify-between gap-2 mt-2">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handlerChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-12 text-center rounded-md bg-[#121214] text-white text-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            ))}
                        </div>

                        <div className="pt-2">
                            <button className="text-sm text-blue-400 hover:underline">
                                Resend security code
                            </button>
                        </div>

                        <div className="flex items-center justify-between pt-4 space-x-4">
                            <button
                                onClick={handleClose}
                                className="w-full py-2 bg-[#2e2e30] rounded-md text-white font-medium hover:bg-[#3a3a3d] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlerSubmit}
                                disabled={!isComplete}
                                className={`w-full py-2 ${isComplete
                                    ? "bg-blue-400 hover:bg-blue-300 cursor-pointer text-black"
                                    : "bg-[#2e2e30] cursor-not-allowed text-gray-500"
                                    } rounded-md font-medium`}
                            >
                                {verifyLoader ? <Loader /> : "Continue"}
                            </button>
                        </div>
                    </div>
                    :
                    <div className="w-100 h-max bg-[#202024] rounded-2xl p-6 text-white space-y-4 max-w-md">
                        <button onClick={() => setOpen(false)}><X /></button>
                        <h2 className="text-xl font-semibold">Add your new email address</h2>
                        <p className="text-sm text-gray-400">
                            After you confirm this change, please note that you won't be able to change your email address again for the next 90 days.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-sm font-medium">
                                    New email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-md bg-[#121214] text-white border ${errors.email ? 'border-red-500' : ""} placeholder-gray-500 outline-none`}
                                    placeholder="Enter your new email"
                                />
                                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                            </div>

                            <div className="flex items-center justify-between pt-4 space-x-4">
                                <button onClick={handleClose} className="w-full py-2 bg-[#2e2e30] rounded-md text-white font-medium hover:bg-[#3a3a3d] transition">
                                    Cancel
                                </button>
                                <button className={`w-full py-2 ${validateEmail(values.email) ? "bg-blue-400 hover:bg-blue-300 cursor-pointer text-black" : "bg-[#2e2e30] cursor-not-allowed text-gray-500"} rounded-md  font-medium `} disabled={validateEmail(values.email) ? false : true}>
                                    {isLoading ? <Loader /> : "Continue"}
                                </button>
                            </div>
                        </form>
                        <div className="pt-2">
                            <span className="text-sm text-blue-400 hover:underline">
                                Privacy Policy
                            </span>
                        </div>
                    </div>
            }

        </div>
    )
}

export default NewEmail