import { BarChart, Bar, ResponsiveContainer, XAxis, CartesianGrid, YAxis, Tooltip, Pie, Cell, Legend, PieChart } from 'recharts';
import { useGetUsersQuery } from "../../../store/services/epicApi"
import LoaderModal from '../LoaderModal';

function UserChart() {
    const { data, isLoading } = useGetUsersQuery()
    const adminCount = data?.filter(item => item?.role?.name == "ADMIN")?.length
    const guestCount = data?.filter(item => item?.role?.name != "ADMIN")?.length
    const parts = [
        {
            title: 'Total Users',
            count: data?.length
        },
        {
            title: 'Admin User',
            count: adminCount
        },
        {
            title: 'Guest User',
            count: guestCount
        }
    ]

    const barData = [
        {
            name: 'Admin',
            count: adminCount,
            color: '#3B82F6'
        },
        {
            name: 'Guest',
            count: guestCount,
            color: '#10B981'
        }
    ];
    const pieData = [
        {
            name: 'Admin',
            value: adminCount,
            percentage: ((adminCount / data?.length) * 100).toFixed(1),
            color: '#3B82F6'
        },
        {
            name: 'Guest',
            value: guestCount,
            percentage: ((guestCount / data?.length) * 100).toFixed(1),
            color: '#10B981'
        }
    ];
    const COLORS = ['#3B82F6', '#10B981']
    return (
        <div className='w-full h-full'>
            {isLoading && <LoaderModal />}
            <div className="flex items-center justify-between gap-3">
                {
                    parts?.map((item, index) => <div key={index} className="bg-white flex items-center justify-between w-full p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{item?.title}</h3>
                        <p className="text-3xl font-bold text-blue-600">{item?.count}</p>
                    </div>)
                }
            </div>
            <div className='flex items-center justify-between'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip
                            formatter={(value, name) => [`${value} user`, name]}
                            labelStyle={{ color: '#374151' }}
                        />
                        <Bar
                            dataKey="count"
                            fill="#3B82F6"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
                <div className='w-full'>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [`${value} user (${pieData.find(item => item.name === name)?.percentage}%)`, name]}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default UserChart