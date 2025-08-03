import { useEffect, useState } from 'react';
import { X, User, Plus, Trash } from 'lucide-react';
import { useCheckOutByUserQuery, useCheckOutQuery, useClearCartsMutation, useCompleteCheckOutMutation, useDeleteCheckItemMutation, useLazyGetUserByIdQuery } from '../../../../store/services/epicApi';
import Loader from '../../../ui/Loader';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function Checkout({ flag, setFlag }) {
    const navigator = useNavigate()
    const userId = localStorage.getItem('userId')
    const { data, isLoading } = useCheckOutByUserQuery(userId)

    const [clear] = useClearCartsMutation()
    const [getUser, { data: user, isLoading: userLoading }] = useLazyGetUserByIdQuery()
    useEffect(() => {
        const user = async () => await getUser(userId)
        user()
    }, [isLoading])

    const price = data?.filter(item => item.status == "INPROGRESS").at(data?.filter(item => item.status == "INPROGRESS")?.length - 1)?.items?.map(item => item?.product).reduce((acc, item) => acc + item?.price, 0) || 0
    const discount = data?.filter(item => item.status == "INPROGRESS").at(data?.filter(item => item.status == "INPROGRESS")?.length - 1)?.items?.map(item => item?.product).reduce((acc, item) => acc + (item?.price - item?.discountedPrice), 0) || 0

    const [complete, { isLoading: completeLoader }] = useCompleteCheckOutMutation()
    const [selectedAmount, setSelectedAmount] = useState(false)
    const handleCompleteCheckOut = async () => {
        const patch = { checkoutIds: [Number(data?.filter(item => item.status == "INPROGRESS")?.at(data?.filter(item => item.status == "INPROGRESS")?.length - 1)?.id)] }
        const res = await complete(patch)
        if (res?.error) {
            toast.error(res?.error.data.message)
            navigator('/account/payment-settings')
        }
        else {
            toast.success(res?.message)
            navigator('/store/browse')
            setFlag(false)
            await clear()
        }
    }
    const [deleteCheckItem, { isLoading: deleteLoader }] = useDeleteCheckItemMutation()
    const handleDelete = async (id) => {
        const arr = data?.filter(item => item.status == "INPROGRESS")?.at(data?.filter(item => item.status == "INPROGRESS")?.length - 1)?.items
        const checkId = data?.filter(item => item.status == "INPROGRESS")?.at(data?.filter(item => item.status == "INPROGRESS")?.length - 1)?.id

        const res = await deleteCheckItem({ checkId, id })
        if (res.error) toast.error(res?.error?.data.message)
        else toast.success(res?.data?.message)
        if (arr?.length == 1) {
            setFlag(false)
            return
        }
    }
    return (
        <div className={`fixed text-black top-0 px-3 flex items-center justify-center left-0 w-full h-full bg-black/50 z-1000 ${flag ? "block" : 'hidden'}`}>
            {
                isLoading ? <div className='w-full bg-white h-[90vh] lg:w-[80%] flex items-center justify-center'><Loader /></div> :
                    <div className=" w-full lg:w-[80%]  bg-white flex flex-col lg:flex-row">
                        <div className="lg:hidden w-full p-4 bg-white border-b">
                            <div className="flex items-center w-full  justify-between">
                                <h1 className="text-xl ">CHECKOUT</h1>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 text-blue-500">
                                        <User size={16} />
                                        <span className="text-sm font-medium">{user?.username}</span>
                                    </div>
                                    <button
                                        onClick={() => setFlag(false)}
                                        className="p-1"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:flex flex-1 p-8 h-full bg-white flex-col">
                            <div className="mb-8">
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <h1 className="text-xl font-ligth">CHECKOUT</h1>
                                    <div className="flex items-center gap-2 text-blue-500">
                                        <User size={20} />
                                        <span className="font-medium">{user?.username}</span>
                                    </div>
                                </div>
                                <div className="h-1 bg-blue-500 w-full rounded"></div>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-lg font-semibold mb-4">ACCOUNT BALANCE</h2>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <input
                                        value={selectedAmount}
                                        checked={selectedAmount}
                                        type="radio"
                                        name="payment"
                                        className="w-4 h-4"
                                        onChange={() => setSelectedAmount(true)}
                                    />
                                    <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">EPIC</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Account Balance </span>
                                        <span className="text-gray-600">${user?.balance}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-96 h-screen bg-white p-4 lg:p-6 lg:border-l flex-1 lg:flex-none">
                            <div className="hidden lg:flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">ORDER SUMMARY</h2>
                                <button
                                    onClick={() => setFlag(false)}
                                    className="p-1 hover:bg-gray-200 rounded"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="lg:hidden mb-4">
                                <h2 className="text-lg font-semibold">ORDER SUMMARY</h2>
                            </div>
                            <div className={` ${deleteLoader ? "" : 'overflow-y-auto space-y-3'} mb-6`}>
                                {
                                    deleteLoader ? <Loader /> : data?.filter(item => item.status == "INPROGRESS")?.at(data?.filter(item => item?.status == "INPROGRESS")?.length - 1)?.items?.map((game, index) => (
                                        <div key={index} className="flex gap-3 p-3 w-full bg-gray-50 rounded-lg">
                                            <div className="flex gap-3 w-full overflow-auto">
                                                <img className='w-15 h-15 object-cover' src={game?.product?.coverImage?.url} alt="" />
                                                <div className='w-full'>
                                                    <div className='w-full flex items-start justify-between gap-4'>
                                                        <h3 className="font-semibold text-sm leading-tight mb-1">
                                                            {game?.product?.name}
                                                        </h3>
                                                        <button onClick={() => handleDelete(game?.id)}>
                                                            <Trash className='w-5 h-5 text-red-500 cursor-pointer' />
                                                        </button>
                                                    </div>
                                                    <span className={`${game?.product?.discount ? 'inline-block' : 'hidden'} px-2 text-[12px] bg-blue-500 text-white  rounded`}>{game?.product?.discount ? `-${game?.product?.discount}%` : ""}</span>
                                                    <div className='flex items-center gap-1'>
                                                        <p className={`${game?.product?.discount ? 'line-through text-[#505050]' : ""} text-sm`}>
                                                            {game?.product?.isFree ? 'Free' : `$ ${game?.product?.price}`}
                                                        </p>
                                                        <span>
                                                            {game?.product?.discount ? `$ ${game?.product?.discountedPrice}` : ""}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    ))
                                }

                            </div>
                            <div className="space-y-2 mb-6 pb-4 border-b border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Price</span>
                                    <span>${price}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Sale Discount</span>
                                    <span>-${discount?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${data?.filter(item => item?.status == "INPROGRESS")?.at(data?.filter(item => item?.status == "INPROGRESS")?.length - 1)?.totalAmount}</span>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-yellow-200 to-green-200 p-3 rounded-lg mb-6 flex items-center gap-2">
                                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                                    <Plus size={12} className="text-white" />
                                </div>
                                <span className="text-sm font-medium">
                                    Earn $7.62 in Epic Rewards with this purchase.
                                </span>
                            </div>
                            <div className="mb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">+ Add Creator Code</span>
                                    <a href="#" className="text-blue-500 text-sm underline">What is this?</a>
                                </div>
                            </div>
                            <div className="lg:hidden mb-6">
                                <div className="space-y-3">


                                    <h3 className="text-sm font-semibold text-gray-700 mt-4 mb-2">PAYMENT METHODS</h3>
                                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                        <input
                                            type="radio"
                                            name="payment-mobile"
                                            className="w-4 h-4"
                                            checked={selectedAmount}
                                            value={selectedAmount}
                                            onChange={() => setSelectedAmount(true)}
                                        />
                                        <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">E</span>
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-sm font-medium">Account Balance </span>
                                            <span className="text-sm text-gray-600">${user?.balance}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-gray-600 mb-4 leading-relaxed">
                                You are purchasing a digital license for this product. For full terms, see{' '}
                                <span className="text-blue-600 underline">purchase policy</span>.
                            </div>

                            <div className="text-xs text-gray-600 mb-6 leading-relaxed">
                                By selecting 'Place Order' below, you certify that you are over 18 and an authorized user of this payment method, and agree to the{' '}
                                <span className="text-blue-600 underline">End User License Agreement</span>.
                            </div>
                            <button
                                disabled={!(selectedAmount)}
                                onClick={handleCompleteCheckOut}
                                className="w-full mt-6 bg-gray-700 cursor-pointer text-white py-2 font-semibold rounded disabled:opacity-50">

                                {completeLoader ? <Loader /> : 'Place Order'}
                            </button>
                        </div>
                    </div>
            }
        </div >
    );
}

export default Checkout;