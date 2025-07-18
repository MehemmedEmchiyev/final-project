import { X } from "lucide-react";
function ModalContain({children , close}) {    
  return (
    <div className='fixed top-0 left-0 flex items-center justify-center bg-black/50 w-full h-full'>
        <div className='w-100 h-max bg-white text-black p-3 rounded-2xl'>
            <div className=" py-2" onClick={close}><X className="text-[10px]"/></div>
            {children}
        </div>
    </div>
  )
}
export default ModalContain