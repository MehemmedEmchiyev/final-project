import { Loader } from "lucide-react";
import { useCreateGenresMutation, useCreateProductMutation, useDeleteProductMutation, useGetEventsQuery, useGetFeaturesQuery, useGetGenresQuery, useGetPlatformsQuery, useGetProductsQuery, useGetSubscriptionQuery, useGetTypesQuery, useUpdateGenresMutation, useUpdateProductMutation, useUploadMediaMutation } from "../../../store/services/epicApi"
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useState } from "react";
import ModalContain from "../../../components/ui/ModalContain";
import toast from "react-hot-toast";

function Dashboard() {
    const { data, isLoading } = useGetProductsQuery()
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
    const { data: types } = useGetTypesQuery()
    const { data: events } = useGetEventsQuery()
    const { data: genres } = useGetGenresQuery()
    const { data: features } = useGetFeaturesQuery()
    const { data: platforms } = useGetPlatformsQuery()
    const { data: subscriptions } = useGetSubscriptionQuery()
    const [uploadMedia, { isLoading: mediaLoader }] = useUploadMediaMutation()
    const checkedImages = async (e) => {
        const files = Array.from(e.target.files)
        if (!files.length) return

        const res = await uploadMedia(files)
        if (res?.error) toast.error(res?.error.data.message)
        else toast.success(res?.data?.message)

        setMedias([...medias, res?.data[0]?.id])
    }
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [updateId, setUpdateID] = useState(null)
    const [newProduct, { isLoading: loadProduct }] = useCreateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()
    const [updateProducts , {isLoading : updateLoad}] = useUpdateProductMutation()
    const handleSave = async () => {
        if (update) {
            const data = {
                mediaId: medias,
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
            await updateProducts({ id: updateId, patch : data }).unwrap()
            toast.success("Product Updated")
            close()
        }
        else {
            await newProduct({
                mediaId: medias,
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
            }).unwrap()
            toast.success("Product Created")
            close()
        }
    }
    const close = () => {
        setOpen(false)
        setName("")
        setMedias([])
        update && setUpdate(false)
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
    }
    return (
        <div className='w-full'>
            <div className="w-full p-2 mx-auto sm:p-4 dark:text-gray-800">
                <div className="flex items-center justify-between pb-4">
                    <h1 className="mb-4 text-2xl font-bold leading-tight">Products</h1>
                    <button onClick={() => setOpen(true)} className="bg-black cursor-pointer text-white px-2 py-3 rounded font-semibold">Create Product</button>
                </div>
                {open && <ModalContain close={close} location={'product'}>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="mb-2">
                            <h2>Name : </h2>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" required placeholder="Actions" className="mb-2 w-full border-b py-2 outline-0" />
                        </div>
                        <div className="mb-2">
                            <h2>Description : </h2>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} type="text" required placeholder="Lorem ipsum" className="mb-2 h-10 w-full border-b py-2 outline-0" ></textarea>
                        </div>
                        <div className="mb-2 flex items-center gap-3">
                            <h2>IsFree : </h2>
                            <select value={isFree} onChange={e => setIsFree(e.target.value)} required >
                                <option value={true}>true</option>
                                <option value={false}>false</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <h2>Price : </h2>
                            <input value={price} onChange={e => setPrice(e.target.value)} type="number" min={0} required placeholder="$500" className="mb-2 w-full border-b py-2 outline-0" />
                        </div>
                        <div className="mb-2">
                            <h2>Discount : </h2>
                            <input value={discount} onChange={e => setDiscount(e.target.value)} type="number" min={0} required placeholder="10%" className="mb-2 w-full border-b py-2 outline-0" />
                        </div>
                        <div className="mb-2">
                            <h2>Developer : </h2>
                            <input value={developer} onChange={e => setDeveloper(e.target.value)} type="text" required placeholder="string" className="mb-2 w-full border-b py-2 outline-0" />
                        </div>
                        <div className="mb-2">
                            <h2>Publisher : </h2>
                            <input value={publisher} onChange={e => setPublisher(e.target.value)} type="text" required placeholder="string" className="mb-2 w-full border-b py-2 outline-0" />
                        </div>
                        <div className="mb-2">
                            <h2>AgeRestriction : </h2>
                            <input value={age} onChange={e => setAge(e.target.value)} type="text" required placeholder="3+" className="mb-2 w-full border-b py-2 outline-0" />
                        </div>
                        <div className="mb-2 flex items-center gap-3">
                            <h2>IsSilder : </h2>
                            <select value={isSilder} onChange={(e) => setIsSilder(e.target.value)} required >
                                <option value={true}>true</option>
                                <option value={false}>false</option>
                            </select>
                        </div>
                        <div className="mb-2 flex-col flex gap-3">
                            <h2>Events : </h2>
                            <select
                                multiple
                                size={2}
                                value={eventsId}
                                onChange={e => {
                                    const selected = Array.from(e.target.selectedOptions, opt => Number(opt.value));
                                    setEventsId(selected);
                                }}
                                className="w-full h-15 border   outline-0 border-gray-300 rounded-md px-2 py-1"
                            >
                                {events?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-2 flex-col flex gap-3">
                            <h2>Genres : </h2>
                            <select
                                multiple
                                size={2}
                                value={genresId}
                                onChange={e => {
                                    const selected = Array.from(e.target.selectedOptions, opt => Number(opt.value));
                                    setGenresId(selected);
                                }}
                                className="w-full h-15 border   outline-0 border-gray-300 rounded-md px-2 py-1"
                            >
                                {genres?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-2 flex-col flex gap-3">
                            <h2>Types : </h2>
                            <select
                                multiple
                                size={2}
                                value={typesId}
                                onChange={e => {
                                    const selected = Array.from(e.target.selectedOptions, opt => Number(opt.value));
                                    setTypeId(selected);
                                }}
                                className="w-full h-15 border   outline-0 border-gray-300 rounded-md px-2 py-1"
                            >
                                {types?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>

                        <div className="mb-2 flex-col flex gap-3">
                            <h2>Features : </h2>
                            <select
                                multiple
                                size={2}
                                value={featuresId}
                                onChange={e => {
                                    const selected = Array.from(e.target.selectedOptions, opt => Number(opt.value));
                                    setfeaturesId(selected);
                                }}
                                className="w-full h-15 border   outline-0 border-gray-300 rounded-md px-2 py-1"
                            >
                                {features?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-2 flex-col flex gap-3">
                            <h2>Platforms : </h2>
                            <select
                                multiple
                                size={2}
                                value={platformsId}
                                onChange={e => {
                                    const selected = Array.from(e.target.selectedOptions, opt => Number(opt.value));
                                    setplatformsId(selected);
                                }}
                                className="w-full h-15 border   outline-0 border-gray-300 rounded-md px-2 py-1"
                            >
                                {platforms?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-2 flex-col flex gap-3">
                            <h2>Subscriptions : </h2>
                            <select
                                multiple
                                size={2}
                                value={subscriptionsId}
                                onChange={e => {
                                    const selected = Array.from(e.target.selectedOptions, opt => Number(opt.value));
                                    setsubscriptionsId(selected);
                                }}
                                className="w-full h-15 border   outline-0 border-gray-300 rounded-md px-2 py-1"
                            >
                                {subscriptions?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <h2>Medias : </h2>
                            <input required onChange={checkedImages} type="file" />
                        </div>
                    </div>

                    <button onClick={handleSave} disabled={mediaLoader} className="bg-black text-center w-full cursor-pointer text-white py-3 rounded font-semibold">
                        {
                            loadProduct || mediaLoader || updateLoad  ?
                                <Loader className="mx-auto animate-spin" />
                                :
                                "Save"
                        }
                    </button>
                </ModalContain>}
                <div className="overflow-x-auto w-full md:w-[700px] lg:w-[1200px]">
                    {
                        isLoading ? <Loader className="animate-spin mx-auto w-10 h-10" /> :
                            <table className="overflow-x-scroll w-full text-xs">
                                <thead className="dark:bg-gray-300">
                                    <tr className="text-left">
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Description</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Discount</th>
                                        <th className="p-3">Discounted Price</th>
                                        <th className="p-3">Is Discount</th>
                                        <th className="p-3">Developer</th>
                                        <th className="p-3">Publisher</th>
                                        <th className="p-3">Sold Count</th>
                                        <th className="p-3">Top Seller</th>
                                        <th className="p-3">Slider</th>
                                        <th className="p-3">Age</th>
                                        <th className="p-3">Media</th>
                                        <th className="p-3">Events</th>
                                        <th className="p-3">Genres</th>
                                        <th className="p-3">Types</th>
                                        <th className="p-3">Features</th>
                                        <th className="p-3">Platforms</th>
                                        <th className="p-3">Subscriptions</th>
                                        <th className="p-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data?.map((item, index) => (
                                        <tr key={index} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50 align-top">
                                            <td className="p-3">{item.id}</td>
                                            <td className="font-bold p-3">{item.name}</td>
                                            <td className="p-3 max-w-10 truncate">{item.description}</td>
                                            <td className="p-3">${item.price}</td>
                                            <td className="p-3">{item.discount}%</td>
                                            <td className="p-3">${item.discountedPrice}</td>
                                            <td className="p-3">{item.isDiscount ? "Yes" : "No"}</td>
                                            <td className="p-3">{item.developer}</td>
                                            <td className="p-3">{item.publisher}</td>
                                            <td className="p-3">{item.soldCount}</td>
                                            <td className="p-3">{item.isTopSeller ? "Yes" : "No"}</td>
                                            <td className="p-3">{item.isSlider ? "Yes" : "No"}</td>
                                            <td className="p-3">{item.ageRestriction}</td>
                                            <td className="p-3 space-y-1">
                                                <img src={item?.media[0]?.url} className="w-10 h-10 object-cover rounded" />

                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                {item.events?.map(e => e.name).join(", ") || "—"}
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                {item.genres?.map(g => g.name).join(", ") || "—"}
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                {item.types?.map(t => t.name).join(", ") || "—"}
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                {item.features?.map(f => f.name).join(", ") || "—"}
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                {item.platforms?.map(p => p.name).join(", ") || "—"}
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                {item.subscriptions?.map(s => s.name).join(", ") || "—"}
                                            </td>
                                            <td className="p-3 text-right flex justify-end items-center gap-2">
                                                <GrUpdate onClick={() => handleUpdate(item)} className="cursor-pointer" />
                                                <MdDeleteOutline onClick={() => deleteProducts(item.id)} className="text-xl cursor-pointer" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard