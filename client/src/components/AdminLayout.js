import React, { useState,useEffect, } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'


const AdminLayout = () => {
    const navigate=useNavigate()
    const [loaded,setLoaded]=useState(false)
    const verifyAdmin=async()=>{
        const token=localStorage.getItem('token')
        const user=localStorage.getItem('user')
        const res=await fetch('http://localhost:2003/verify',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({token,user})
        })
        if(res.ok){
            setLoaded(true)
        }else{
            navigate('/admin/login')
        }
    }
    useEffect(()=>{
        verifyAdmin()
    },[])
    return (
        <div className='flex flex-row h-screen w-screen overflow-x-hidden'>
            

            <AdminSidebar/>
           
            <div className="p-4 ml-44">
                <AdminHeader/>
                <div>{<Outlet></Outlet>}</div>
            </div>

        </div>
    )
}

export default AdminLayout
