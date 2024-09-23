import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { FaRegBell } from "react-icons/fa"
import { HiChatAlt } from "react-icons/hi";
const AdminHeader = () => {
  return (
    <div className='h-16 px-4 flex justify-between items-center border-b border-slate-900 w-[76rem]'>
      <div className="relative">
        <IoIosSearch fontSize={24} className='absolute top-1/2 -translate-y-1/2 left-3  '></IoIosSearch>
        <input type="text" placeholder='search' className='focus:outline-none h-10 w-[24rem] border border-slate-700 rounded-sm pl-11 pr-4'/>
      </div>
      <div className='flex items-center gap-7 mr-7 '>
        <FaRegBell fontSize={24}></FaRegBell>
        <HiChatAlt fontSize={24}></HiChatAlt>
      </div>
   </div>
  )
}

export default AdminHeader
