import Swal from "sweetalert2";
import { useDeleteAccountMutation } from "../../../../store/services/epicApi"
import { useNavigate } from "react-router";

function Delete() {
    const userId = localStorage.getItem("userId")
    const navigator = useNavigate()
    const [deletUser] = useDeleteAccountMutation()
    const handleDelete = () => {
        Swal.fire({
            title: "Delete your account?",
            text: `Your account will be deleted in 30 days.
                    Your personal information, purchases, game progress, in-game content, Epic account balance, and any Unreal projects will be permanently deleted.
                    You have 14 days to cancel this request by signing into your account.
                    If you need help, contact Player Support.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            cancelButtonColor: "#414145",
            confirmButtonText: "Delete Account",
            background: '#202024',
            color: 'white'
        }).then((result) => {
            if (result.isConfirmed) {
                const res = deletUser(userId)
                navigator('/store/browse')
                localStorage.clear()

                Swal.fire({
                    title: "Deleted",
                    background : "#202024",
                    color : 'white', 
                    text: "Your profile has been deleted.",
                    icon: "success"
                });

            }
        });
    }
    return (
        <div className="space-y-4 pt-5">
            <h2 className="text-2xl font-bold">Delete account</h2>
            <p className="text-gray-400">
                Delete your Epic Games account including all personal information, purchases, game progress, in-game content, your Epic account balance and Unreal projects. Your account will be permanently deleted in 30 days.
            </p>
            <button onClick={handleDelete} className="bg-red-500 cursor-pointer w-full md:w-max duration-500 text-black hover:bg-red-600  font-medium py-2 px-4 rounded">
                Delete account
            </button>
        </div>
    )
}

export default Delete