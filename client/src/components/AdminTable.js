import React, { useState } from 'react'
import AdminOrder from '../pages/AdminOrder'
import { Link } from 'react-router-dom'
const AdminTable = (props) => {
    const [isBlinking,setBlinking]=useState(true)
    const [open,setOpen]=useState(false)
    const changeStatus=async(id,status)=>{
        console.log('called')
        const res=await fetch('http://localhost:2003/changestatus',{
          method:'PUT',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify({id,status}),
        })
        if(res.ok){
          alert('status updated')
        }
      }
  return (
    <Link to={`/admin/table/${props.id}`} className="max-w-sm p-5 rounded-lg shadow bg-custom-secondary flex flex-col gap-20 justify-between ">
            
            <h5 className="mb-2 text-2xl  tracking-tight text-white ">{props.id}</h5>
            <div className="flex gap-9 ">
           
           
            </div>
          </Link>
  )
}

export default AdminTable