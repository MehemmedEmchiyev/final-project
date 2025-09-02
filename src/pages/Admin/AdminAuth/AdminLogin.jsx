import { useFormik } from "formik"
import { useLazyGetUserByIdQuery, useLoginMutation } from "../../../store/services/epicApi"
import { adminLoginSchema } from "../../../validation/adminLoginSchema"
import Loader from "../../../components/ui/Loader"
import toast from "react-hot-toast"
import {  useNavigate } from "react-router"
import { useEffect } from "react"


function AdminLogin() {
  const navigator = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const [getUser] = useLazyGetUserByIdQuery()
  useEffect(() => {
    localStorage.clear()
  },[])
  
  
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: adminLoginSchema,
    onSubmit: async () => {
      const res = await login(values)
      if (res?.error) toast.error(res?.error.data.message)

      if (res) {
        localStorage.setItem('accessToken', res?.data?.token.accessToken)
        localStorage.setItem('refreshToken', res?.data?.token.refreshToken)
      }

      const payload = JSON.parse(atob(res?.data?.token.accessToken.split('.')[1]));
      const user = await getUser(payload.userId)
      if (user?.data.role.name == "ADMIN") {
        toast.success("Succes Login")
        localStorage.setItem("userId", payload.userId)
        navigator('/admin')
      }
      else toast.error("Only admin can enter")
    }
  })
  
  return (
    <div className='h-screen flex items-center justify-center text-white'>
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm dark:text-gray-600">Sign in to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
              <input type="email" value={values.email} name="email" id="email" onChange={handleChange} placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">Password</label>
              </div>
              <input type="password" value={values.password} onChange={handleChange} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
              {errors.password && <p className="text-red-500">{errors.password}</p>}

            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-red-600 dark:text-gray-50">{
                isLoading ? <Loader /> : "Sign in"
              }</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin