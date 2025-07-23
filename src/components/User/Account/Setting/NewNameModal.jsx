import { X } from "lucide-react"
import { useFormik } from "formik"
import { TbPointFilled } from "react-icons/tb";
import toast from "react-hot-toast"
import Loader from "../../../ui/Loader";
import { nameValidation } from "../../../../validation/nameValidation";
import { useUpdateProfileMutation } from "../../../../store/services/epicApi";


function NewNameModal({ open, setOpen, info }) {
    const [update, { isLoading }] = useUpdateProfileMutation()
    const { username, firstname, lastname } = info

    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: nameValidation,
        onSubmit: async () => {
            const data = {
                username: values.name,
                firstname,
                lastname
            }
            const res = await update(data)
            if(res?.error) toast.error(res?.error.data.message)
            else toast.success(res.data.message)
            setOpen(false)
        }
    })
    const handleClose = () => {
        resetForm()
        setOpen(false)
    }
    return (
        <div className={`${open ? "flex " : "hidden"} px-3 w-full h-full bg-black/50 fixed top-0 left-0 items-center justify-center`}>

            <div className="w-100 h-max bg-[#202024] rounded-2xl mt-20 p-6 text-white space-y-4 max-w-md">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Update your display name</h2>
                    <button onClick={() => setOpen(false)}><X /></button>
                </div>
                <p className="text-sm text-gray-400">
                    If you changed your Epic Games Display Name, you can’t change it again for 2 weeks after you confirm this change.
                </p>
                <ul className="p-3 border-[#303034] space-y-2 rounded-xl border bg-[#28282C]">
                    <li className="flex  gap-1"><TbPointFilled className="text-4xl mr-2" /> Never use information that identifies you such as your real name, address, social media handle or phone number</li>
                    <li className="flex  gap-1"><TbPointFilled className="mr-2" /> Display names must be at least 3 characters long</li>
                </ul>
                <p className="text-gray-400">Current display name: <span className="text-white">{username}</span></p>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <label className="text-sm inline-block mb-3 font-medium">
                            New display name
                        </label>
                        <input
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-md bg-[#121214] text-white border ${errors.name ? 'border-red-500' : ""} placeholder-gray-500 outline-none`}
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div className="flex items-center justify-between pt-4 space-x-4">
                        <button onClick={handleClose} className="w-full py-2 bg-[#2e2e30] rounded-md text-white font-medium hover:bg-[#3a3a3d] transition">
                            Cancel
                        </button>
                        <button className={`w-full py-2 ${values.name.length >= 3 ? "bg-blue-400 hover:bg-blue-300 cursor-pointer text-black" : "bg-[#2e2e30] cursor-not-allowed text-gray-500"} rounded-md  font-medium `} disabled={values.name.length >= 3 ? false : true}>
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
        </div>
    )
}

export default NewNameModal