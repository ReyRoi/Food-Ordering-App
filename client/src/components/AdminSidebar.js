import React from 'react'
import { RiAdminFill } from "react-icons/ri";
import { Dashboard_links } from './AdminNavigation'
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
const AdminSidebar = () => {
    return (
        <div className='flex flex-col w-[180px]  bg-custom-secondary text-slate-100 border-2 fixed h-full'>
            <div className='flex items-center gap-4 px-7 py-3'>
                <RiAdminFill fontSize={24} />
                <span className='text-lg'>Admin</span>
            </div>
            <div className="flex-1">
                {Dashboard_links.map((ele) => (
                    <div key={ele.key}>
                        <Link to={ele.path} className='flex  items-center py-6 px-5 gap-4 text-lg hover:bg-white hover:text-slate-900 hover:border-l hover:border-r hover:border-custom-secondary transition ease-out delay-140  ' >
                            <span className='text-xl'>{ele.icon}</span>
                            {ele.label}
                        </Link>
                    </div>
                ))}
            </div>
            <div className='flex items-center px-6 py-5 gap-4  text-lg hover:bg-white hover:text-slate-900 transition ease-in-out delay-120    '>
                <span className='text-xl'><IoIosLogOut></IoIosLogOut></span>
                <div>Logout</div>
            </div>
     </div>
    )
}

export default AdminSidebar
