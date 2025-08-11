import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useGetEventsQuery, useGetFeaturesQuery, useGetGenresQuery, useGetPlatformsQuery, useGetSubscriptionQuery, useGetTypesQuery } from '../../../store/services/epicApi';
import LoaderModal from '../LoaderModal';
function CategoriesChart() {
    const { data: types } = useGetTypesQuery()
    const { data: events } = useGetEventsQuery()
    const { data: genres, isLoading } = useGetGenresQuery()
    const { data: features } = useGetFeaturesQuery()
    const { data: platforms } = useGetPlatformsQuery()
    const { data: subscriptions } = useGetSubscriptionQuery()
    const data = [
        { name: 'Types', count: types?.length },
        { name: 'Events', count: events?.length },
        { name: 'Features', count: features?.length },
        { name: 'Platforms', count: platforms?.length },
        { name: 'Subscriptions', count: subscriptions?.length },
        { name: 'Genres', count: genres?.length },
    ]
    return (
        <div className='pt-5'>
            {isLoading && <LoaderModal />}
            <ResponsiveContainer width="100%" height={200}>
                <LineChart
                    width={500}
                    height={200}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CategoriesChart