import UserChart from "../../../components/Admin/Dashboard/UserChart"
import CategoriesChart from "../../../components/Admin/Dashboard/CategoriesChart"
import UserCheckList from "../../../components/Admin/Dashboard/UserCheckList"
import ProductsChart from "../../../components/Admin/Dashboard/ProductsChart"
import SalesChart from "../../../components/Admin/Dashboard/SalesChart"
function Dashboard() {
  return (
    <div>
      <h1 className='text-2xl text-center font-semibold pb-3'>Dashboard</h1>
      <ProductsChart />
      <UserChart />
      <CategoriesChart />
      <UserCheckList />
    </div>
  )
}

export default Dashboard