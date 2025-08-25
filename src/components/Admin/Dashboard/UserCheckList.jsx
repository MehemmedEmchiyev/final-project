import { useState } from "react"
import { useCheckOutByUserQuery, useGetUsersQuery } from "../../../store/services/epicApi"
import LoaderModal from "../LoaderModal"

function UserCheckList() {
    const { data, isLoading } = useGetUsersQuery()

    const [selectedUser, setSelectedUser] = useState(null)
    const { data: userCheckList, isLoading: checkListLoader, isError } = useCheckOutByUserQuery(selectedUser)

    return (
        <>
            {isLoading || checkListLoader || checkListLoader && <LoaderModal />}

            <h2 className='py-3 font-semibold text-2xl'>User Check List</h2>
            <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
                <div className="relative">
                    <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} className="block w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-8 text-gray-700 focus:border-blue-500 focus:ring-blue-500">
                        <option selected={true} disabled={true}>Please select user</option>
                        {
                            data?.map((item, index) => <option value={item?.id} key={index}>{item?.username}</option>)
                        }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 6a7 7 0 1114 0H3z" />
                        </svg>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.657a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                        </svg>
                    </div>
                </div>
            </div>
            {
                !selectedUser ? "" : isError ? <div className="text-gray-500 text-center p-6">
                    No order has been selected yet
                </div> :
                    <div className="bg-white shadow rounded-lg p-6">

                        <div className="flex justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold mb-1">
                                    {userCheckList?.at(0)?.user?.username}
                                </h2>
                            </div>
                        </div>


                        <div className="flex flex-col gap-3">
                            {userCheckList?.map((item) => (
                                <div
                                    key={item.id}
                                    className="border border-[#eee] rounded p-4 flex flex-col hover:shadow-lg transition-shadow duration-200"
                                >
                                    <div className="flex flex-col gap-3">
                                        {
                                            item?.items?.map((elem, index) => <div key={index} className="flex items-center gap-3">
                                                <img

                                                    src={elem.product.coverImage?.url}
                                                    alt={elem.product.name}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                                <div>
                                                    <h2 className="font-semibold">{item?.status}</h2>
                                                    <h3 className="mt-3 font-semibold">{elem.product.name}</h3>

                                                </div>
                                            </div>)
                                        }
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>}
        </>

    )
}

export default UserCheckList