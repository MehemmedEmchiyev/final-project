import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import ModalContain from '../../../components/ui/ModalContain';
import { useState } from 'react';
import { useCreateNewsMutation, useDeleteNewsMutation, useGetNewsQuery, useUpdateNewsMutation, useUploadMediaMutation } from '../../../store/services/epicApi';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { GrUpdate } from 'react-icons/gr';
import { MdDeleteOutline } from 'react-icons/md';

const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     flex: 1,
    // },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     flex: 1,
    //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError } = useGetNewsQuery(page)
    const [create, { isLoading: newsLoader }] = useCreateNewsMutation()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [medias, setMedias] = useState()
    const [uploadMedia, { isLoading: mediaLoader }] = useUploadMediaMutation()
    const [updateId, setUpdateID] = useState(null)
    const [update, setUpdate] = useState(false)
    const checkedImages = async (e) => {

        const files = Array.from(e.target.files)
        console.log(files);
        if (!files.length) return
        const res = await uploadMedia(files)
        if (res?.error) toast.error("Somethigs went wrong")
        else toast.success('Succes')
        setMedias(res?.data[0]?.id)
    }
    const [updateNews, { isLoading: updateLoad }] = useUpdateNewsMutation()
    const createNews = async () => {
        if (update) {
            const patch = { title, mediaId: medias, description }
            await updateNews({ id: updateId, patch })
            toast.success("News Updated")
            close()
        }
        else {
            const patch = {
                mediaId: medias,
                title, description
            }
            const res = await create(patch)
            if (res?.error) toast.error(res?.error.data.message)
            else {
                toast.success(res?.data?.message)
                close()
            }
            setOpen(false)
        }
    }

    const [open, setOpen] = useState(false)
    const close = () => {
        setOpen(false)
        setMedias('')
        setTitle('')
        setDescription('')
        update && setUpdate(false)
    }
    const handleUpdate = async (item) => {
        setOpen(true)
        setUpdate(true)
        setUpdateID(item?.id)
        setMedias(item?.media?.id)
        setTitle(item?.title)
        setDescription(item?.description)
    }
    const [delet, { isLoading: deletLoader }] = useDeleteNewsMutation()
    const deleteNews = async (id) => {
        await delet(id)
        toast.success("News deleted")
    }
    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                <div className="flex items-center justify-between pb-4">
                    <h2 className="mb-4 text-2xl font-semibold leading-tight">News</h2>
                    <button onClick={() => setOpen(true)} className="bg-black cursor-pointer text-white px-2 py-3 rounded font-semibold">Create News</button>
                </div>
                {open && <ModalContain close={close}>
                    <h2>Image :</h2>
                    <input onChange={checkedImages} type="file" className='py-3' />
                    <h2>Name : </h2>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" required placeholder="Actions" className="mb-2 w-full border-b p-2 outline-0" />
                    <h2>Description</h2>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} type="text" required placeholder="Lorem ipsum..." className="mb-2 w-full h-10 border-b p-2 outline-0" ></textarea>
                    <button disabled={newsLoader || mediaLoader || updateLoad} onClick={createNews} className="bg-black text-center w-full cursor-pointer text-white py-3 rounded font-semibold">
                        {
                            newsLoader || mediaLoader || updateLoad ?
                                <Loader className="mx-auto animate-spin" />
                                :
                                "Save"
                        }
                    </button>
                </ModalContain>}
            </div>
            {
                isLoading || deletLoader ? <Loader className="animate-spin mx-auto w-10 h-10" /> :
                    isError ? <p className='text-center text-2xl font-bold'>News Not Fount</p> :
                        <table className="w-full text-xs">
                            <thead className="dark:bg-gray-300">
                                <tr className="text-left">
                                    <th className="p-3">Id</th>
                                    <th className="p-3">Image</th>
                                    <th className="p-3">Title</th>
                                    <th className="p-3">Description</th>
                                    <th className="p-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.data?.map((item, index) =>
                                        <tr key={index} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                            <td className="p-3">
                                                <p>{item?.id}</p>
                                            </td>
                                            <td className="w-10 h-full p-3">
                                                <img src={item?.media.url} className='w-full h-full object-cover' alt="" />
                                            </td>
                                            <td className="font-bold p-3">
                                                <p>{item?.title}</p>
                                            </td>
                                            <td className="font-bold p-3">
                                                <p className='line-clamp-1'>{item?.description}</p>
                                            </td>
                                            <td className="flex justify-end items-center gap-2 p-3">
                                                <GrUpdate className='cursor-pointer' onClick={() => handleUpdate(item)} />
                                                < MdDeleteOutline onClick={() => deleteNews(item?.id)} className="cursor-pointer text-xl" />
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>}
            <div className="flex justify-center mt-4 gap-2">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                {
                    Array.from({ length : data?.totalPages || 1 }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-black text-white' : 'bg-gray-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))
                }
                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, data?.totalPages || 1))}
                    disabled={page === data?.meta?.totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div >
    )
}   
