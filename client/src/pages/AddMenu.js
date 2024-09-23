import React from 'react'
import { useState } from 'react'
import AdminMenu from './AdminMenu'
const AddMenu = () => {
    const [name,setName]=useState('')
    const [type,setType]=useState('')
    const [price,setPrice]=useState('')
    const [des,setDes]=useState('')
    const [showMenu,setShowMenu]=useState(false)
    const addItem=async()=>{
        const res=await fetch('http://localhost:2003/additem',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({name,type,price,des,status:"available"})
        })
        if(res.ok){
            alert('added item')
        }
    }
  return (
    <div className="">
        <div className='flex mt-16 mx-auto'>

        <div className='px-5'><label>Type : </label><input className="border-[1px] border-black" onChange={(e)=>setType(e.target.value)} type='text'/></div>
        <div className='px-5'><label>Name : </label><input className="border-[1px] border-black" onChange={(e)=>setName(e.target.value)} type='text'/></div>
        <div className='px-5'><label>Price : </label><input className="border-[1px] border-black" onChange={(e)=>setPrice(e.target.value)} type='text'/></div>
        <div className='px-5'><label>Description : </label><input className="border-[1px] border-black" onChange={(e)=>setDes(e.target.value)} type='text'/></div>
        </div>
        <div className="text-center my-16"><button onClick={addItem} className="p-2 bg-custom-secondary px-5 rounded-xl border-[1px] border-custom-secondary">Add</button></div>
        <div className=''>
            <button className='border-[1px] border-custom-secondary bg-custom-secondary px-5 py-2' onClick={(e)=>setShowMenu(!showMenu)}>Show Menu</button>
            {showMenu&&<AdminMenu/>}
        </div>
    </div>
  )
}

export default AddMenu