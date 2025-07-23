import { useEffect } from "react";
import { useLazyGetUserByIdQuery } from "../../../../store/services/epicApi"
import * as XLSX from 'xlsx';

function Download() {
    const userId = localStorage.getItem('userId')
    const [getUser, { data: info }] = useLazyGetUserByIdQuery()
    useEffect(() => {
        const userInfo = async () => await getUser(userId)
        userInfo()
    }, [info])
    const downloadExcel = (data) => {
        const formattedData = [{
            "ID": data.id,
            "Name": data.firstname,
            "Surname": data.lastname,
            "User Name": data.username,
            "Email": data.email,
            "Date of Created ": data.createdAt.split("T")[0],
            "Date of Updated ": data.updatedAt.split("T")[0],
            "Balance": data.balance,
            "Acccount ID": data.accountId,
        }];
        const worksheet = XLSX.utils.json_to_sheet(formattedData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'User_Info')
        XLSX.writeFile(workbook, "UserInfo.xlsx")
    }
    return (
        <div className="space-y-4 border-b border-gray-800 pb-8">
            <h2 className="text-2xl font-bold">Download account data</h2>
            <p className="text-gray-400">Download a file containing the data you've shared with us. We'll email you once it's ready, and you'll have 15 days to download it.</p>
            <button onClick={() => downloadExcel(info)} className="bg-sky-500 hover:bg-sky-600 w-full md:w-max duration-300 cursor-pointer text-black font-medium py-2 px-4 rounded">Download file</button>
        </div>
    )
}

export default Download