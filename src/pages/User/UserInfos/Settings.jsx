import { VscEdit } from "react-icons/vsc";
import { useLazyGetUserByIdQuery } from "../../../store/services/epicApi";
import { useEffect, useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import NewEmail from "../../../components/User/Account/NewEmail";

function SettingLoader() {
  return (
    <RiLoader5Fill className="text-blue-400 inline-block animate-spin w-5 h-5 mx-auto" />
  )
}

function Settings() {
  const userId = localStorage.getItem('userId')
  const [getUser, { data, isLoading }] = useLazyGetUserByIdQuery()
  const [firstname, setFistname] = useState("")
  const [lastname, setLastname] = useState("")
  const [open , setOpen ] = useState(false)
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
  const emailAdd = data?.email.split('@')[0][0] + "***" + data?.email.split('@')[0][data?.email.split('@')[0].length - 1] + "@" + data?.email.split('@')[1]
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
            <div className="py-3 px-3 w-max bg-blue-400 rounded-xl hover:bg-blue-300">
              <VscEdit className="text-xl text-black" />
            </div>
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
              <NewEmail open={open} setOpen={setOpen}/>
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
              <input className="outline-0 border-0 w-full" onChange={e => setFistname(e.target.value)} value={isLoading ? 'Loading...' : firstname }/>
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
    </>
  )
}

export default Settings