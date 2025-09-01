import { Loader, Trash } from "lucide-react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { RiUnpinFill } from "react-icons/ri";

import { useCreateProductMutation, useDeleteMediaFromAllMediasMutation, useDeleteProductMutation, useGetAllMediasQuery, useGetEventsQuery, useGetFeaturesQuery, useGetGenresQuery, useGetPlatformsQuery, useGetProductsQuery, useGetSubscriptionQuery, useGetTypesQuery, useUpdateProductMutation, useUploadMediaMutation } from "../../../store/services/epicApi"
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useState } from "react";
import ModalContain from "../../../components/ui/ModalContain";
import toast from "react-hot-toast";
import Pagination from "../../../components/User/Store/Browse/Pagination";
import { RiFileExcel2Fill } from "react-icons/ri";
import XLSX from 'xlsx-js-style';
import { GiSpeaker } from "react-icons/gi";
import { IoMdMore } from "react-icons/io";

import LoaderModal from "../../../components/Admin/LoaderModal";

function Products() {
    const [page, setPage] = useState(1)
    const [path, setPath] = useState([])
    const params = path.join('')
    const { data, isLoading, isFetching } = useGetProductsQuery({ page, params })
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [isFree, setIsFree] = useState(false)
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [developer, setDeveloper] = useState("")
    const [publisher, setPublisher] = useState("")
    const [age, setAge] = useState("")
    const [isSilder, setIsSilder] = useState(false)
    const [eventsId, setEventsId] = useState([])
    const [genresId, setGenresId] = useState([])
    const [typesId, setTypeId] = useState([])
    const [featuresId, setfeaturesId] = useState([])
    const [platformsId, setplatformsId] = useState([])
    const [subscriptionsId, setsubscriptionsId] = useState([])
    const [medias, setMedias] = useState([])
    const [coverImage, setCoverImage] = useState('')
    const [logo, setLogo] = useState('')
    const { data: types } = useGetTypesQuery()
    const { data: events } = useGetEventsQuery()
    const { data: genres } = useGetGenresQuery()
    const { data: features } = useGetFeaturesQuery()
    const { data: platforms } = useGetPlatformsQuery()
    const { data: subscriptions } = useGetSubscriptionQuery()
    const [uploadMedia, { isLoading: mediaLoader }] = useUploadMediaMutation()
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [updateId, setUpdateID] = useState(null)
    const [newProduct, { isLoading: loadProduct }] = useCreateProductMutation()
    const [deleteProduct, { isLoading: deletLoader }] = useDeleteProductMutation()
    const [updateProducts, { isLoading: updateLoad }] = useUpdateProductMutation()

    const { data: mediasData, isLoading: mediasLoader } = useGetAllMediasQuery()
    const filteredMedias = mediasData?.filter(item => medias?.includes(item.id))
    const filterCoverImage = mediasData?.find(item => item?.id == coverImage)
    const filterLogo = mediasData?.find(item => item?.id == logo)


    const checkedImages = async (arg, e) => {
        const files = Array.from(e.target.files)
        if (!files.length) return
        const res = await uploadMedia(files)
        if (res?.error) toast.error(res?.error.data.message)
        else toast.success(res?.data?.message || 'Succes')
        arg == 'media' ? setMedias([...medias, res?.data[0]?.id]) : arg == 'cover' ? setCoverImage(res?.data[0]?.id) : setLogo(res?.data[0]?.id)
    }
    const [deleteImg, { isLoading: deletMediaLoader }] = useDeleteMediaFromAllMediasMutation()

    const deletImage = async (id) => {
        const res = await deleteImg(id)
        if (res?.error) {
            toast.error(res?.error.data?.message)
        }
        else {
            toast.success(res?.data?.message)
            setMedias(medias.filter(item => item != id))
        }
    }
    const handleSave = async () => {
        if (!validateForm()) {
            toast.error("Please fix validation errors.")
            return
        }
        if (update) {
            const data = {
                detailImageId: medias,
                coverImageId: coverImage,
                productLogoId: logo,
                name,
                description,
                isFree,
                price,
                discount,
                developer,
                publisher,
                ageRestriction: age,
                isSilder,
                eventsId,
                genresId,
                typesId,
                featuresId,
                platformsId,
                subscriptionsId,
            }
            await updateProducts({ id: updateId, patch: data }).unwrap()
            toast.success("Product Updated")
            close()
        }
        else {
            const res = await newProduct({
                detailImageId: medias,
                coverImageId: coverImage,
                productLogoId: logo,
                name,
                description,
                isFree,
                isPin: false,
                price,
                discount,
                developer,
                publisher,
                ageRestriction: age,
                isSilder,
                eventsId,
                genresId,
                typesId,
                featuresId,
                platformsId,
                subscriptionsId,
            })
            if (res.error) toast.error(res?.error.data.message[0])
            else {
                toast.success("Product Created")
                close()
            }
        }
    }

    const [errors, setErrors] = useState({})
    const close = () => {
        setOpen(false)
        setName("")
        setMedias([])
        update && setUpdate(false)
        setUpdateID(null)
        setName("");
        setDescription("");
        setIsFree(false);
        setIsTopSeller(false);
        setPrice(0);
        setDiscount(0);
        setDeveloper("");
        setPublisher("");
        setAge("");
        setIsSilder(false);
        setEventsId([]);
        setGenresId([]);
        setTypeId([]);
        setfeaturesId([]);
        setplatformsId([]);
        setsubscriptionsId([]);
        setMedias([])
        setCoverImage('')
        setLogo('')
        setErrors({})
    }
    const deleteProducts = async (id) => {
        await deleteProduct(id)
        toast.success("Product deleted")
    }
    const handleUpdate = async (item) => {
        setOpen(true)
        setUpdate(true)
        setUpdateID(item?.id)
        setName(item?.name || "");
        setDescription(item?.description || "");
        setIsFree(item?.isFree || false);
        setIsTopSeller(item?.isTopSeller || false);
        setPrice(item?.price || 0);
        setDiscount(item?.discount || 0);
        setDeveloper(item?.developer || "");
        setPublisher(item?.publisher || "");
        setAge(item?.ageRestriction || "");
        setIsSilder(item?.isSlider || false);
        setEventsId(item?.events?.map(event => event.id) || []);
        setGenresId(item?.genres?.map(genre => genre.id) || []);
        setTypeId(item?.types?.map(type => type.id) || []);
        setfeaturesId(item?.features?.map(feature => feature.id) || []);
        setplatformsId(item?.platforms?.map(platform => platform.id) || []);
        setsubscriptionsId(item?.subscriptions?.map(sub => sub.id) || []);
        setMedias(item?.detailImage.map(item => item.id))
        setCoverImage(item?.coverImage?.id)
        setLogo(item?.productLogo.id)
    }
    const { data: products, isLoading: productsLoader } = useGetProductsQuery({ page: 1, limit: 1000 })
    const exportExcel = async () => {
        const formattedData = products?.data?.map(data => ({
            "ID": data.id,
            "Name": data?.name,
            "Description": data?.description,
            "Developer": data?.developer,
            "Discount": data?.discount,
            "Discounted Price": data?.discountedPrice,
            "Price": data?.price,
            "Date of Created ": data?.createdAt.split("T")[0],
            "Events": data?.events?.map(item => item.name).join(','),
            "Features": data?.features?.map(item => item.name).join(','),
            "Genres": data?.genres?.map(item => item.name).join(','),
            "Platforms": data?.platforms?.map(item => item.name).join(',')
        }))

        const worksheet = XLSX.utils.json_to_sheet(formattedData)
        const range = XLSX.utils.decode_range(worksheet['!ref'])
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = XLSX.utils.encode_cell({ r: 0, c: C })
            if (!worksheet[cell_address]) continue
            worksheet[cell_address].s = {
                fill: { fgColor: { rgb: "4F81BD" } },
                font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
                alignment: { horizontal: "center", vertical: "center" }
            }
        }
        const colWidths = Object.keys(formattedData[0]).map(key => ({ wch: Math.max(key.length, 20) }))
        worksheet['!cols'] = colWidths

        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products_Info')
        XLSX.writeFile(workbook, "ProductInfo.xlsx")
    }

    const pin = async (id, isPin) => {
        const patch = { isPin: !isPin }
        const res = await updateProducts({ id, patch })
        if (res?.error) toast.error(res?.error?.data?.message)
        else toast.success(res?.data?.message)
    }
    const [lang, setLang] = useState('en-US')
    const handleSpeak = (arg) => {
        const text = new SpeechSynthesisUtterance(arg)
        text.lang = lang,
            window.speechSynthesis.speak(text)
    }
    const [menuStatue, setMenuStatue] = useState(false)
    const [priceStatue, setPriceStatue] = useState(false)
    const menuItem = [
        { title: "All", elem: 'name' },
        { title: 'Alphabetical A-Z', name: 'name', order: 'ASC', elem: "name" },
        { title: 'Alphabetical Z-A', name: 'name', order: 'DESC', elem: "name" },
        { title: "Price : High to Low", name: 'price', order: 'DESC', elem: 'price' },
        { title: "Price : Low to High", name: 'price', order: 'ASC', elem: 'price' },
    ]
    const filterTable = (title, name, order) => {
        if (title == "All") {
            setPath([])
            setMenuStatue(false)
        }
        else {
            const path = `sortBy=${name}&order=${order}`;
            setPath(prev => [...prev.filter(item => !item.startsWith("sortBy=")), path])
            menuStatue ? setMenuStatue(false) : priceStatue ? setPriceStatue(false) : ''
        }
    }

    const validateForm = () => {
        let newErrors = {}
        if (!name || name.trim().length < 3) {
            newErrors.name = "Name is required and must be at least 3 characters."
        }
        if (!description || description.trim().length < 3) {
            newErrors.description = "Description is required and must be at least 3 characters."
        }
        if (!age) {
            newErrors.age = "Age restriction is required "
        }
        if (!developer || developer.trim().length < 3) {
            newErrors.developer = "Developer is required and must be at least 3 characters."
        }
        if (!publisher || publisher.trim().length < 3) {
            newErrors.publisher = "Publisher is required and must be at least 3 characters."
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-[1800px] mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-white">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
                            <p className="text-gray-600 mt-1">Manage all your products in one place</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={exportExcel}
                                className="bg-black hover:bg-black/90 cursor-pointer text-white px-4 py-2.5 rounded-md font-medium transition-colors flex items-center gap-2"
                            >
                                <RiFileExcel2Fill />
                                Export Excel
                            </button>
                            <button
                                onClick={() => setOpen(true)}
                                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2.5 rounded-md font-medium transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Create Product
                            </button>
                        </div>
                    </div>
                </div>
                {open && <ModalContain close={close} location={'product'}>
                    {(mediasLoader || loadProduct || mediaLoader || updateLoad || deletMediaLoader) && <div className="w-full h-full top-0 left-0  flex items-center justify-center bg-gray-900/50 z-10 absolute">
                        <Loader className="animate-spin h-20 w-20 text-white" />
                    </div>}
                    <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {update ? "Update Product" : "Create New Product"}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto p-2">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    type="text"
                                    required
                                    placeholder="Product name"

                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                    placeholder="Product description"
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Is Free</label>
                                <select
                                    value={isFree}
                                    onChange={e => setIsFree(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    type="number"
                                    min={0}
                                    required
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 `}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Discount</label>
                                <input
                                    value={discount}
                                    onChange={e => setDiscount(e.target.value)}
                                    type="number"
                                    min={0}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Developer</label>
                                <input
                                    value={developer}
                                    onChange={e => setDeveloper(e.target.value)}
                                    type="text"
                                    required
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.developer ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.developer && <p className="text-red-500 text-sm">{errors.developer}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Publisher</label>
                                <input
                                    value={publisher}
                                    onChange={e => setPublisher(e.target.value)}
                                    type="text"
                                    required
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.publisher ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.publisher && <p className="text-red-500 text-sm">{errors.publisher}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Age Restriction</label>
                                <input
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                    type="text"
                                    placeholder="3+"
                                    required
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Is Slider</label>
                                <select
                                    value={isSilder}
                                    onChange={e => setIsSilder(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>

                            {[
                                { label: "Events", data: events, selected: eventsId, setter: setEventsId },
                                { label: "Genres", data: genres, selected: genresId, setter: setGenresId },
                                { label: "Types", data: types, selected: typesId, setter: setTypeId },
                                { label: "Features", data: features, selected: featuresId, setter: setfeaturesId },
                                { label: "Platforms", data: platforms, selected: platformsId, setter: setplatformsId },
                                { label: "Subscriptions", data: subscriptions, selected: subscriptionsId, setter: setsubscriptionsId },
                            ].map((field, index) => (
                                <div key={index} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                                    <select
                                        multiple
                                        size={3}
                                        value={field.selected}
                                        onChange={e => {
                                            const selected = Array.from(e.target.selectedOptions, opt => Number(opt.value));
                                            field.setter(selected);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {field.data?.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            <div className="space-y-2">
                                <div className="w-full flex items-center flex-wrap gap-3">
                                    {
                                        filteredMedias?.map((item, index) => <div key={index} className="w-15 h-15 relative">
                                            {item?.type == "IMAGE" ? <img className="w-full h-full  object-cover" src={item?.url} /> : <video className="w-full h-full object-cover" controls><source src={item?.url} /> </video>}
                                            <Trash onClick={() => deletImage(item?.id)} className="absolute bottom-[80%] left-[80%] w-5 h-5 bg-black p-1 rounded-full text-red-600" />
                                        </div>)
                                    }
                                </div>
                                <label className="block text-sm font-medium text-gray-700">Product Images</label>
                                <input
                                    required
                                    onChange={(e) => checkedImages('media', e)}
                                    type="file"
                                    multiple
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>

                            <div className="space-y-2">
                                {filterCoverImage &&
                                    <div className="w-15 h-15 relative">
                                        <img className="w-full h-full  object-cover" src={filterCoverImage?.url} />
                                        <Trash onClick={() => deletImage(filterCoverImage?.id)} className="absolute bottom-[80%] left-[80%] w-5 h-5 bg-black p-1 rounded-full text-red-600" />
                                    </div>
                                }
                                <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                <input
                                    required
                                    onChange={(e) => checkedImages('cover', e)}
                                    type="file"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>

                            <div className="space-y-2">
                                {filterLogo &&
                                    <div className="w-15 h-15 relative">
                                        <img className="w-full h-full  object-cover" src={filterLogo?.url} />
                                        <Trash onClick={() => deletImage(filterLogo?.id)} className="absolute bottom-[80%] left-[80%] w-5 h-5 bg-black p-1 rounded-full text-red-600" />
                                    </div>
                                }
                                <label className="block text-sm font-medium text-gray-700">Logo</label>
                                <input
                                    required
                                    onChange={(e) => checkedImages('logo', e)}
                                    type="file"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={mediaLoader}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors flex items-center gap-2"
                            >
                                {loadProduct || mediaLoader || updateLoad ? (
                                    <>
                                        <Loader className="animate-spin h-4 w-4" />
                                        Processing...
                                    </>
                                ) : update ? "Update Product" : "Create Product"}
                            </button>
                        </div>
                    </div>
                </ModalContain>}
                <div className="p-4 overflow-x-auto">
                    {isLoading || isFetching || deletLoader || updateLoad ? (
                        <div className="flex justify-center items-center py-12">
                            <LoaderModal />
                        </div>
                    ) : (
                        <div className="shadow overflow-hidden border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 w-full ">
                                    <tr className="w-full">
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th scope="col" className="relative  flex items-center justify-between px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <span onClick={() => setSearch(true)}>Name</span>
                                            <IoMdMore onClick={() => setMenuStatue((prev) => !prev)} className="text-[18px] cursor-pointer hover:bg-[#eee] rounded-full " />
                                            {
                                                menuStatue && <ul className="absolute shadow-md bg-white border-1 border-[#eee] p-2 rounded top-full right-0">
                                                    {
                                                        menuItem.filter(elem => elem.elem == "name").map((item, index) => <li onClick={() => filterTable(item.title, item.name, item.order)} className="cursor-pointer rounded-md hover:bg-[#eee] p-1" key={index}>{item.title}</li>)
                                                    }
                                                </ul>
                                            }
                                        </th>
                                        <th scope="col" className=" relative px-6 py-3 text-xs font-medium text-gray-500 text-start uppercase tracking-wider">
                                            <span>Price</span>

                                            <IoMdMore onClick={() => setPriceStatue((prev) => !prev)} className="text-[18px]   inline-block mt-[-5px] ml-3 cursor-pointer hover:bg-[#eee] rounded-full " />
                                            {
                                                priceStatue && <ul className="absolute shadow-md bg-white border-1  border-[#eee] p-2 rounded top-full right-0">
                                                    {
                                                        menuItem.filter(elem => elem.elem == 'price').map((item, index) => <li onClick={() => filterTable(item.title, item.name, item.order)} className="cursor-pointer whitespace-nowrap rounded-md hover:bg-[#eee] p-1" key={index}>{item.title}</li>)
                                                    }
                                                </ul>
                                            }
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Free</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data?.data?.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                                            <td className="px-6  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                <span>{item.name}</span>
                                                <select
                                                    className=" rounded ml-2 border border-gray-300 bg-white p-1 text-gray-800 
                                            shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                                            transition ease-in-out duration-200 cursor-pointer" value={lang} onChange={e => setLang(e.target.value)}>
                                                    <option value='az-AZ'>AZ</option>
                                                    <option value='en-US'>EN</option>
                                                    <option value='ru-RU'>RU</option>
                                                </select>
                                                <button onClick={() => handleSpeak(item?.name)} className="pl-1 cursor-pointer text-red-500 text-xl"><GiSpeaker /></button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.discount}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isFree ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {item.isFree ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img src={item?.coverImage?.url} className="w-10 h-10 object-cover rounded" alt="Cover" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => pin(item?.id, item?.isPin)}
                                                        className=" p-1 cursor-pointer rounded hover:bg-blue-50"
                                                        title="Pip"
                                                    >
                                                        {
                                                            item?.isPin ? <RiUnpinFill className="h-5 w-5" /> :
                                                                <BsFillPinAngleFill className="h-5 w-5" />
                                                        }
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdate(item)}
                                                        className="text-blue-600 cursor-pointer hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                        title="Edit"
                                                    >
                                                        <GrUpdate className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteProducts(item.id)}
                                                        className="text-red-600 cursor-pointer hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                        title="Delete"
                                                    >
                                                        <MdDeleteOutline className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Pagination
                page={page}
                location={"Admin"}
                totalPages={data?.totalPages}
                setPage={setPage}
                onChange={(newPage) => setPage(newPage)} />
        </div>
    )
}

export default Products