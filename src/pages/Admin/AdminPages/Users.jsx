import { Loader } from "lucide-react";
import { useDeleteUserMutation, useGetRolesQuery, useGetUsersQuery, useUserRoleUpdateMutation } from "../../../store/services/epicApi"
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useState } from "react";
import ModalContain from "../../../components/ui/ModalContain";
import toast from "react-hot-toast";
import MyLoader from "../../../components/ui/Loader";

function Users() {
    const [flag, setFlag] = useState(false)
    const { data, isLoading } = useGetUsersQuery()
    const [update, { isLoading: updateLoader }] = useUserRoleUpdateMutation()
    const [delet, { isLoading: deleteUserLoader }] = useDeleteUserMutation()

    const { data: roles } = useGetRolesQuery()
    const [value, setValue] = useState(0)
    const [userID, setUserID] = useState(null)

    const setUserRole = (userId, id) => {
        setUserID(userId)
        setValue(id)
        setFlag(true)
    }
    const close = () => setFlag(false)
    const handleSave = async () => {
        const patch = { role: Number(value) }
        const res = await update({ id: userID, patch })
        if (res?.error) toast.error(res?.error.data.message)
        else {
            setFlag(false)
            toast.success(res?.data.message)
        }
    }
    const deleteUsers = async (id) => {
        const res = await delet(id)
        console.log(res);

    }
    return (
        <div className=''>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                <div className="flex items-center justify-between pb-4">
                    <h2 className="mb-4 text-2xl font-semibold leading-tight">Users</h2>
                </div>
                {
                    flag ? <ModalContain close={close}>
                        <select value={value} className="w-full" onChange={e => setValue(e.target.value)}>
                            {roles?.map((item, index) => <option selected={item?.id == value} key={index} value={item?.id}>{item?.name}</option>)}
                        </select>
                        <button onClick={handleSave} className="bg-black text-center w-full cursor-pointer text-white py-1 mt-3 rounded font-semibold">
                            {
                                updateLoader ?
                                    <Loader className="mx-auto animate-spin" />
                                    :
                                    "Save"
                            }
                        </button>
                    </ModalContain> : ""
                }

                <div className="overflow-x-auto">
                    {
                        isLoading || deleteUserLoader ? <Loader className="animate-spin mx-auto w-10 h-10" /> :
                            <table className="w-full text-xs">
                                <thead className="dark:bg-gray-300">
                                    <tr className="text-left">
                                        <th className="p-3">Id</th>
                                        <th className="p-3">User Name</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Role</th>
                                        <th className="p-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.map((item, index) => <tr key={index} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                            <td className="p-3">
                                                <p>{item?.id}</p>
                                            </td>
                                            <td className="font-bold p-3">
                                                <p>{item?.username}</p>
                                            </td>
                                            <td className="font-bold p-3">
                                                <p>{item?.email}</p>
                                            </td>

                                            <td className="font-bold p-3">
                                                <p>{item?.role?.name}</p>
                                            </td>
                                            <td className="flex justify-end cursor-pointer items-center gap-2 p-3">
                                                <GrUpdate onClick={() => setUserRole(item?.id, item?.role?.id)} />
                                                <MdDeleteOutline onClick={() => deleteUsers(item?.id)} className="text-xl" />

                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                    }
                </div>
            </div>
        </div>
    )
}

export default Users