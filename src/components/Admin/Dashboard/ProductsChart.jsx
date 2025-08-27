import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, DollarSign, Users, Filter } from 'lucide-react';
import { useCheckOutQuery, useGetProductsQuery } from '../../../store/services/epicApi';
import LoaderModal from '../LoaderModal';
import SalesChart from './SalesChart';
const ProductsChart = () => {
    const { data, isLoading } = useGetProductsQuery({ page: 1, limit: 100 })
    const { data: checkOutData, isLoading: checkOutLoader } = useCheckOutQuery()
    const totalPrice = checkOutData?.filter(item => item?.status == "COMPLETED").reduce((acc, item) => acc + item?.totalAmount, 0)

    const parts = [
        {
            title: "Total Product",
            info: data?.count,
            icon: <Package className="w-6 h-6 text-blue-600" />
        },
        {
            title: "Total Sales",
            info: checkOutData?.filter(item => item.status == "COMPLETED")?.length || 0,
            icon: <TrendingUp className="w-6 h-6 text-green-600" />
        },
        {
            title: "Total Revenue",
            info: totalPrice?.toFixed(1),
            icon: <DollarSign className="w-6 h-6 text-yellow-600" />
        }

    ]

    const getSalesbyGenre = () => {
        const normalProducts = data?.data.filter(item => !item.discount && !item.isFree)?.length
        const disCountedProducts = data?.data.filter(item => item.discount)?.length
        const freeProducts = data?.data.filter(item => item.isFree)?.length
        const pieData = [
            {
                name: 'Discounted Product',
                value: disCountedProducts,
                percentage: ((disCountedProducts / data?.count) * 100).toFixed(1),
                color: '#3B82F6'
            },
            {
                name: 'Free Products',
                value: freeProducts,
                percentage: ((freeProducts / data?.count) * 100).toFixed(1),
                color: '#10B981'
            },
            {
                name: 'No discount',
                value: normalProducts,
                percentage: ((normalProducts / data?.count) * 100).toFixed(1),
                color: '#10B981'
            }
        ];
        return pieData
    }
    const { data: checkouts } = useCheckOutQuery()
    const monthlyData = checkouts?.reduce((acc, checkout) => {
        const month = new Date(checkout.createdAt).toLocaleString('default', { month: 'short' }) 
        const existing = acc.find(item => item.name === month)
        if (existing) {
            existing.uv += checkout.totalAmount 
            if (checkout.status === 'FAILED') {
                existing.pv += checkout.totalAmount 
            }
        } else {
            acc.push({
                name: month,
                uv: checkout.totalAmount,
                pv: checkout.status === 'FAILED' ? checkout.totalAmount : 0,
            })
        }
        return acc
    }, [])
    
    const genreData = getSalesbyGenre();
    const barData = data?.data.map(item => ({ name: item?.name, price: item?.price, discountedPrice: item?.discountedPrice || 0 }))
    const COLORS = ['#3B82F6', '#10B981', '#ff0000']

    return (
        <div className="p-6  min-h-screen">
            {(isLoading || checkOutLoader) && <LoaderModal />}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Products Analytics Dashboard</h1>
                <p className="text-gray-600">Epic Games Store product analytics and sales data</p>
            </div>
            <div className="flex items-center  gap-6 mb-8">
                {
                    parts?.map((item, index) => <div key={index} className="bg-white w-full p-6 rounded-lg shadow-sm ">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{item?.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{item?.info}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                {item?.icon}
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className="bg-white p-6 mb-3 rounded-lg shadow-sm ">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Sales Distribution
                </h3>

                <div className='flex items-center'>
                    <SalesChart />
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={genreData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {genreData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [`${value} product (${genreData.find(item => item.name === name)?.percentage}%)`, name]}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm ">

                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Sales Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            width={500}
                            height={300}
                            data={monthlyData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm ">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Discounted and Regular Product Prices</h3>
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                        <div style={{ width: `${barData?.length * 120}px` }}>
                            <BarChart
                                width={barData?.length * 120}
                                height={300}
                                data={barData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="price" fill="#8884d8" />
                                <Bar dataKey="discountedPrice" fill="#82ca9d" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductsChart;