import { VscEdit } from "react-icons/vsc";
import { useLazyGetUserByIdQuery, useUpdateProfileMutation } from "../../../store/services/epicApi";
import { useEffect, useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import NewEmail from "../../../components/User/Account/Setting/NewEmail";
import NewNameModal from "../../../components/User/Account/Setting/NewNameModal";
import toast from "react-hot-toast";
import Loader from "../../../components/ui/Loader";
import Download from "../../../components/User/Account/Setting/Download";
import Delete from "../../../components/User/Account/Setting/Delete";

function SettingLoader() {
  return (
    <RiLoader5Fill className="text-blue-400 inline-block animate-spin w-5 h-5 mx-auto" />
  )
}

function Settings() {
  const userId = localStorage.getItem('userId')
  const [getUser, { data, isLoading }] = useLazyGetUserByIdQuery()
  const [update, { isLoading: updateLoader }] = useUpdateProfileMutation()
  const [firstname, setFistname] = useState("")
  const [lastname, setLastname] = useState("")
  const [open, setOpen] = useState(false)
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    const user = async () => {
      await getUser(userId)
      if (data) {
        setFistname(data?.firstname)
        setLastname(data?.lastname)
      }
    }
    user()
  }, [data])
  const infos = {
    firstname: data?.firstname,
    lastname: data?.lastname,
    username: data?.username
  }
  const emailAdd = data?.email.split('@')[0][0] + "***" + data?.email.split('@')[0][data?.email.split('@')[0].length - 1] + "@" + data?.email.split('@')[1]
  const handleSubmit = async () => {
    const patch = {
      firstname, lastname,
      username: data?.username
    }
    const res = await update(patch)
    if (res?.error) toast.error(res?.error.data.message)
    else toast.success(res?.data.message)
  }
  return (
    <>
      <div>
        <h1 className='text-2xl md:text-4xl font-bold'>Settings</h1>
        <p className='font-semibold text-sm text-[#ACACAD] pt-3'>Manage your account’s details.</p>
      </div>
      <div className='pt-10'>
        <h2 className='text-2xl font-bold'>Account information</h2>
        <h3 className=' mt-2'><span className='font-bold mr-2'>ID :</span>{isLoading ? <SettingLoader /> : data?.accountId}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 pt-3 pb-10 border-[#28282C] border-b gap-10">
        <div className="w-full">
          <h2 className="text-sm mb-3 font-semibold text-[#ACACAD]">Display Name</h2>
          <div className="flex w-full items-center  gap-3">
            <div className="border w-full bg-[#1C1C20] border-[#ACACAD] hover:border-white rounded-xl py-3 px-2">
              <span>{isLoading ? <SettingLoader /> : data?.username}</span>
            </div>
            <div onClick={() => setFlag(true)} className="py-3 px-3 w-max bg-blue-400 rounded-xl hover:bg-blue-300">
              <VscEdit className="text-xl text-black" />
            </div>
            <NewNameModal open={flag} setOpen={setFlag} info={infos} />
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-sm mb-3 font-semibold text-[#ACACAD]">Email Addes</h2>
          <div className="flex w-full items-center  gap-3">
            <div className="border w-full bg-[#1C1C20] border-[#ACACAD] hover:border-white rounded-xl py-3 px-2">
              <span>{isLoading ? <SettingLoader /> : emailAdd}</span>
            </div>
            <div onClick={() => setOpen(true)} className="py-3 px-3 w-max bg-blue-400 rounded-xl hover:bg-blue-300">
              <VscEdit className="text-xl text-black" />
            </div>
            <NewEmail open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
      <div className="pt-5 ">
        <h2 className="text-2xl font-bold">Personal details</h2>
        <p className="pt-3">Manage your name and contact info. These personal details are private and will not be displayed to other users. View our <span className="text-blue-400 underline">Privacy Policy</span></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 pt-3  gap-10">
        <div className="w-full">
          <h2 className="text-sm mb-3 font-semibold text-[#ACACAD]">First Name</h2>
          <div className="flex w-full items-center  gap-3">
            <div className="border w-full bg-[#1C1C20] border-[#ACACAD] hover:border-white rounded-xl py-3 px-2">
              <input className="outline-0 border-0 w-full" onChange={e => setFistname(e.target.value)} value={isLoading ? 'Loading...' : firstname} />
            </div>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-sm mb-3 font-semibold text-[#ACACAD]">Last Name</h2>
          <div className="flex w-full items-center  gap-3">
            <div className="border w-full bg-[#1C1C20] border-[#ACACAD] hover:border-white rounded-xl py-3 px-2">
              <input className="outline-0 border-0 w-full" value={isLoading ? 'Loading...' : lastname} onChange={e => setLastname(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} disabled={firstname != data?.firstname || lastname != data?.lastname ? false : true} className={`${firstname != data?.firstname || lastname != data?.lastname ? "bg-blue-400 hover:bg-blue-300 text-black cursor-pointer" : "bg-[#2e2e30] cursor-not-allowed text-gray-500"} rounded-xl  mt-5 py-3 px-4 font-semibold `}>
        {updateLoader ? <Loader /> : "Save Changes"}
      </button>
      <div className="pt-10">
        <Download />
        <Delete />
      </div>
    </>
  )
}

export default Settings