import { Loader } from "lucide-react";
import { useCreateGenresMutation, useDeleteGenresMutation, useGetGenresQuery, useUpdateGenresMutation } from "../../../store/services/epicApi"
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useState } from "react";
import ModalContain from "../../../components/ui/ModalContain";
import toast from "react-hot-toast";
import LoaderModal from "../../../components/Admin/LoaderModal";

function Genres() {
    const { data, isLoading } = useGetGenresQuery()
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [updateId , setUpdateID] = useState(null) 
    const [newGenres, { isLoading: genresLoader }] = useCreateGenresMutation()
    const [deleteGenre] = useDeleteGenresMutation()
    const [updateGenres] = useUpdateGenresMutation()
    const handleSave = async () => {
        if (update) {
            await updateGenres({ id : updateId , name})
            toast.success("Genre Updated")
            close()
        }
        else {
            await newGenres(name)
            toast.success("Genre Created")
            close()
        }
    }
    const close = () => {
        setOpen(false)
        setName("")
        update && setUpdate(false)
    }
    const deleteGenres = async (id) => {
        await deleteGenre(id)
        toast.success("Genre deleted")
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
                    <h2 className="mb-4 text-2xl font-semibold leading-tight">Genres</h2>
                    <button onClick={() => setOpen(true)} className="bg-black cursor-pointer text-white px-2 py-3 rounded font-semibold">Create Genres</button>
                </div>
                {open && <ModalContain close={close}>
                    <h2>Name : </h2>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" required placeholder="Actions" className="mb-2 w-full border-b p-2 outline-0" />
                    <button onClick={handleSave} className="bg-black text-center w-full cursor-pointer text-white py-3 rounded font-semibold">
                        {
                            genresLoader ?
                                <Loader className="mx-auto animate-spin" />
                                :
                                "Save"
                        }
                    </button>
                </ModalContain>}
                <div className="overflow-x-auto">
                    {
                        isLoading ? <LoaderModal /> :
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
                                                    <MdDeleteOutline onClick={() => deleteGenres(item?.id)} className="text-xl" />
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

export default Genres