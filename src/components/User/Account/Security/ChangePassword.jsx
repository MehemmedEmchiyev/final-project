import { useFormik } from "formik"
import { X } from "lucide-react"
import { changePassword } from "../../../../validation/changePassword"
import { useResetPasswordMutation } from "../../../../store/services/epicApi"
import Loader from "../../../ui/Loader"
import toast from "react-hot-toast"

function ChangePassword({ open, setOpen }) {
    const [resetPassword , {isLoading}] = useResetPasswordMutation()
    const { values , errors , handleChange , handleSubmit , resetForm , touched } = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            repeatPassword: ""
        },
        validationSchema : changePassword,
        onSubmit : async () => {
            
            const res = await resetPassword(values)
            if(res?.error) toast.error(res?.error.data.message)
            else toast.success(res.data.message)
            setOpen(false)
            resetForm()
        }
    })
    return (
        <div className={`${open ? 'block' : 'hidden'} flex items-center justify-center fixed w-full h-full top-0 left-0 bg-black/50 z-200 `}>
            <div className="w-100 h-max bg-[#202024] rounded-2xl mt-20 p-6 text-white space-y-4 max-w-md">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Change your password</h2>
                    <button className="cursor-pointer" onClick={() => setOpen(false)}><X /></button>
                </div>
                <p className="text-sm text-gray-400">
                    For your security, we recommend choosing a unique password that you don't use elsewhere.
                </p>
                <form className="space-y-2" onSubmit={handleSubmit}>
                    <h2 className="inline-block pb-2 ">Current Password</h2>
                    <input
                        name="currentPassword"
                        value={values.currentPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-md bg-[#121214] text-white border ${(errors.currentPassword && touched.currentPassword) ? 'border-red-500' : ""} placeholder-gray-500 outline-none`}
                    />
                    {(errors.currentPassword && touched.currentPassword) && <p className="text-red-500">{errors.currentPassword}</p>}
                    <h2 className="inline-block pb-2 ">New Password</h2>
                    <input
                        name="newPassword"
                        value={values.newPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-md bg-[#121214] text-white border ${(errors.newPassword && touched.newPassword) ? 'border-red-500' : ""} placeholder-gray-500 outline-none`}
                    />
                    {(errors.newPassword && touched.currentPassword) && <p className="text-red-500">{errors.newPassword}</p>}

                    <h2 className="inline-block pb-2 ">Repeat Password</h2>
                    <input
                        name="repeatPassword"
                        value={values.repeatPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-md bg-[#121214] text-white border ${(errors.repeatPassword && touched.currentPassword) ? 'border-red-500' : ""} placeholder-gray-500 outline-none`}
                    />
                    {(errors.repeatPassword && touched.currentPassword) && <p className="text-red-500">{errors.repeatPassword}</p>}

                    <button type="submit" className="w-full py-3 mt-2 bg-blue-400 hover:bg-blue-300 cursor-pointer duration-300 text-black font-semibold text-sm rounded-md">
                        {
                            isLoading ? <Loader /> : "Submit"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword