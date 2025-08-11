import { Calendar, Package, DollarSign, Clock, CheckCircle, AlertCircle, XCircle, X } from 'lucide-react';
import { useCheckOutByUserQuery, useDeleteCheckOutMutation } from '../../../../store/services/epicApi';
import Loader from '../../../ui/Loader';
import toast from 'react-hot-toast';

const OrderListItem = ({ order }) => {

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'inprogress':
                return 'bg-blue-100 text-blue-800 border-blue-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <CheckCircle size={16} className="text-green-600" />;
            case 'inprogress':
                return <Clock size={16} className="text-blue-600" />;
            default:
                return <Package size={16} className="text-gray-600" />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const [deleteCheckOut, { isLoading }] = useDeleteCheckOutMutation()

    const deleteCheck = async (id) => {
        const res = await deleteCheckOut(id)
        if (res?.error) toast(res?.error.data.message,{icon: '⚠️'});
        else toast.success(res?.data.message)


    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 p-4">

            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Package size={16} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm">Order #{order.id}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar size={12} />
                            <span>{formatDate(order.createdAt)}</span>
                        </div>
                    </div>
                </div>

                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)} flex items-center gap-1`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2">
                    <Package size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-600">Items:</span>
                    <span className="text-xs font-medium">{order.items?.length || 0}</span>
                </div>

                <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-600">Total:</span>
                    <span className="text-xs font-medium text-green-600">${order.totalAmount}</span>
                </div>
            </div>
            <div className="border-t pt-3">
                <div className="flex items-center justify-between mb-2">
                    <div></div>
                    <button onClick={() => deleteCheck(order?.id)} className="text-xs text-blue-500 cursor-pointer hover:text-blue-700 font-medium">
                        {isLoading ? <Loader /> : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

function CheckList({ open, setOpen }) {
    const userId = localStorage.getItem('userId')
    const { data, isLoading } = useCheckOutByUserQuery(userId)

    return (
        <div className={`${open ? "flex" : "hidden"} items-center justify-center fixed top-0 left-0 z-1000 bg-black/50 w-full h-full `}>
            <div className='w-full max-w-4xl mx-4 overflow-hidden bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col'>
                <div className='flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50'>
                    <div>
                        <h1 className='font-bold text-2xl text-gray-900'>Your Check List</h1>
                        <p className="text-sm text-gray-600 mt-1">Track and manage your recent orders</p>
                    </div>
                    <button
                        className='p-2 hover:bg-gray-200 rounded-lg transition-colors'
                        onClick={() => setOpen(false)}
                    >
                        <X size={24} className='text-gray-600' />
                    </button>
                </div>
                <div className='flex-1 overflow-auto p-6 bg-gray-50'>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <span className="ml-2 text-gray-600">Loading...</span>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {data && data.length > 0 ? (
                                data?.map((order, index) => (
                                    <OrderListItem key={index} order={order} />
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <Package size={48} className="text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                                    <p className="text-gray-600">You don't have any orders yet.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-6 py-4 bg-white">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Total Orders: {data?.length || 0}</span>
                        <button
                            className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckList;