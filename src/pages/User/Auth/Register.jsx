import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Forms from '../../../components/ui/Register/Forms';
import { useNavigate } from 'react-router';
import { Formik, useFormik } from 'formik';
import { useGetCounrtyQuery, useRegisterMutation } from '../../../store/services/epicApi';
import Loader from '../../../components/ui/Loader';
import { registerSchema } from '../../../validation/registerSchema';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { changeMail } from '../../../store/emailSlice';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

export default function Register() {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [continuer, setContinue] = useState(false)
  const isFormValid = month && day && year
  const [register , { isLoading : loader }] = useRegisterMutation()
  const { values: form, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      firstname: "",
      lastname: '',
      username: '',
      email: "",
      password: "",
      dateOfBirth: '',
      country: ""
    },
    onSubmit: async () => {
      const dateOfBirth = `${month}-${day}-${year}`;
      const payload = { ...form, dateOfBirth };
      const res = await register(payload)

      if (res.error) toast.error(res?.error.data.message)
      else {
        
        dispatch(changeMail(form.email))
        toast.success(res?.data?.message)
        navigator('/verify-email')
      }
    },
    validationSchema: registerSchema
  })

  const { data, isLoading } = useGetCounrtyQuery()

  const handleNext = () => {
    setContinue(true)
  }

  return (
    !continuer ?
      <div className="min-h-screen flex items-center px-3 justify-center bg-[#101014] text-white">
        <div
          className="bg-[#18181C]  border border-[#303033] p-10 rounded-2xl w-full md:w-[500px] space-y-6"
        >
          <button onClick={() => navigator('/login')} className="text-md flex items-center gap-1 cursor-pointer text-gray-400">
            <MdOutlineKeyboardArrowLeft />
            <span>Back</span>
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl mb-10 font-bold">Enter your date of birth</h2>
            <p className="text-gray-400 text-md mt-1">
              This is to help you have a safe and fun experience whatever your age.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className='flex flex-col w-full items-center gap-1'>
              <label htmlFor="">Month</label>
              <Forms data={months} value={month} change={setMonth} lable="month-select-label" />
            </div>
            <div className='flex w-full flex-col items-center'>
              <label htmlFor="">Days</label>
              <Forms data={days} value={day} change={setDay} lable="day-select-label" />
            </div>
            <div className='flex flex-col items-center w-full gap-1'>
              <label htmlFor="">Years</label>
              <Forms data={years} value={year} change={setYear} lable="year-select-label" />
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-semibold transition ${isFormValid
              ? 'bg-blue-500 cursor-pointer text-black hover:bg-blue-400'
              : 'bg-gray-400 text-black cursor-not-allowed'
              }`}
          >
            Continue
          </button>
          <p className="text-sm text-blue-400 text-center underline cursor-pointer">
            Privacy Policy
          </p>
        </div>
      </div>
      :

      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

        <form onSubmit={handleSubmit} className="bg-[#121212] border border-[#303033] p-8 rounded-2xl w-full max-w-md space-y-6">

          <button type="button" className="flex items-center gap-1 text-gray-400 text-sm">
            <MdOutlineKeyboardArrowLeft size={20} /> Back
          </button>

          <div>
            <h2 className="text-2xl font-semibold">Create your account</h2>
          </div>

          <div className="space-y-4">
            <label className='text-[#AEAEB0] font-semibold inline-block mb-2'>Email address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              className={`w-full bg-transparent outline-0 border ${errors.email ? "border-red-500" : "border-[#303033]"} rounded-lg px-4 py-3 `} />
            {errors.email && <p className='text-red-500'>{errors.email}</p>}
            <div className="flex gap-4">
              <div className='flex flex-col '>
                <label className='text-[#AEAEB0] font-semibold inline-block mb-2'>First Name</label>
                <input type="text" name="firstname" value={form.firstname} onChange={handleChange}
                  className={`w-full bg-transparent outline-0 border ${errors.firstname ? "border-red-500" : "border-[#303033]"} rounded-lg px-4 py-3 `} />
                {errors.firstname && <p className='text-red-500'>{errors.firstname}</p>}
              </div>
              <div className='flex flex-col '>
                <label className='text-[#AEAEB0] font-semibold inline-block mb-2'>Last Name</label>
                <input type="text" name="lastname" value={form.lastname} onChange={handleChange}
                  className={`w-full bg-transparent outline-0 border ${errors.lastname ? "border-red-500" : "border-[#303033]"} rounded-lg px-4 py-3 `} />
                {errors.lastname && <p className='text-red-500'>{errors.lastname}</p>}
              </div>
            </div>

            <div className="relative">
              <label className='text-[#AEAEB0] font-semibold inline-block mb-2'>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange}
                className={`w-full bg-transparent outline-0 border ${errors.password ? "border-red-500" : "border-[#303033]"} rounded-lg px-4 py-3 `} />
              {errors.password && <p className='text-red-500'>{errors.password}</p>}
            </div>

            <div className="relative">
              <label className='text-[#AEAEB0] font-semibold inline-block mb-2'>User Name</label>
              <input type="text" name="username" value={form.username} onChange={handleChange}
                className={`w-full bg-transparent outline-0 border ${errors.username ? "border-red-500" : "border-[#303033]"} rounded-lg px-4 py-3 `} />
              {errors.username && <p className='text-red-500'>{errors.username}</p>}
            </div>
            <div className='w-full -ml-2'>
              {
                isLoading ? <Loader /> :
                  <Forms data={data} isFormik={true} value={form.country} change={handleChange} lable='country' />
              }
            </div>
          </div>


          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition ${true
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-[#2c2c2c] text-gray-500 cursor-not-allowed'}`}
          >
            {loader ? <Loader /> : "Continue"}
          </button>
        </form>
      </div>
  );
}
