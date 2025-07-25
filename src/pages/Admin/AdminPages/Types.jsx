import { Loader } from "lucide-react";
import { useCreateTypesMutation, useDeleteTypesMutation, useGetTypesQuery, useUpdateTypesMutation } from "../../../store/services/epicApi"
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useState } from "react";
import ModalContain from "../../../components/ui/ModalContain";
import toast from "react-hot-toast";

function Types() {
    const { data, isLoading } = useGetTypesQuery()
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [updateId, setUpdateID] = useState(null)
    const [newFeature, { isLoading: typesLoader }] = useCreateTypesMutation()
    const [deleteTypes] = useDeleteTypesMutation()
    const [updateTypes] = useUpdateTypesMutation()
    const handleSave = async () => {
        if (update) {
            console.log(updateId);
            await updateTypes({ id: updateId, name })
            toast.success("Types Updated")
            close()
        }
        else {
            await newFeature(name)
            toast.success("Types Created")
            close()
        }
    }
    const close = () => {
        setOpen(false)
        setName("")
        update && setUpdate(false)
    }
    const deleteFeature = async (id) => {
        await deleteTypes(id)
        toast.success("Types deleted")
    }
    const handleUpdate = async (item) => {
        setOpen(true)
        setUpdate(true)
        setUpdateID(item?.id)
        setName(item?.name)
    }
    return (
        <div className=''>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                <div className="flex items-center justify-between pb-4">
                    <h2 className="mb-4 text-2xl font-semibold leading-tight">Types</h2>
                    <button onClick={() => setOpen(true)} className="bg-black cursor-pointer text-white px-2 py-3 rounded font-semibold">Create Types</button>
                </div>
                {open && <ModalContain close={close}>
                    <h2>Name : </h2>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" required placeholder="Actions" className="mb-2 w-full border-b p-2 outline-0" />
                    <button onClick={handleSave} className="bg-black text-center w-full cursor-pointer text-white py-3 rounded font-semibold">
                        {
                            typesLoader ?
                                <Loader className="mx-auto animate-spin" />
                                :
                                "Save"
                        }
                    </button>
                </ModalContain>}
                <div className="overflow-x-auto">
                    {
                        isLoading ? <Loader className="animate-spin mx-auto w-10 h-10" /> :
                            <table className="w-full text-xs">
                                <thead className="dark:bg-gray-300">
                                    <tr className="text-left">
                                        <th className="p-3">Id</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.map((item, index) =>
                                            <tr key={index} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                                <td className="p-3">
                                                    <p>{item?.id}</p>
                                                </td>
                                                <td className="font-bold p-3">
                                                    <p>{item?.name}</p>
                                                </td>
                                                <td className="flex justify-end items-center gap-2 p-3">
                                                    <GrUpdate onClick={() => handleUpdate(item)} />
                                                    <MdDeleteOutline onClick={() => deleteFeature(item?.id)} className="text-xl" />
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                    }
                </div>
            </div>
        </div>
    )
}

export default Types