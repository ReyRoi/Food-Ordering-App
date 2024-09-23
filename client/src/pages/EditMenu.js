import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditMenu = () => {
    const redirect=useNavigate()
    const {id}=useParams()
    const [type,setType]=useState('')
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [description,setDescription]=useState('')
    useEffect(()=>{
        fetch('http://localhost:2003/getsinglemenu/'+id).then(res=>{
            res.json().then(menu=>{
                console.log(menu)
                setType(menu.type)
                setName(menu.name)
                setPrice(menu.price)
                setDescription(menu.des)
            })
        })
    },[])
    const editMenu=async()=>{
        const res=await fetch('http://localhost:2003/editmenu/'+id,{
            method:'PUT',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({name,type,price,description})
        })
        if(res.ok){
            alert('Updated')
            redirect('/admin/addMenu')
        }
    }
  return (
    <div>
         <div className='text-5xl text-center my-10'>EDIT MENU</div>  
         <div><label>NAME : </label><input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='border-[1px] border-black py-2 text-center w-[500px]'/></div> 
         <div><label>TYPE : </label><input type='text' value={type} onChange={(e)=>setType(e.target.value)} className='border-[1px] border-black py-2 text-center w-[500px]'/></div> 
         <div><label>DESCRIPTION : </label><input type='text' value={description} onChange={(e)=>setDescription(e.target.value)} className='border-[1px] border-black py-2 text-center w-[500px]'/></div> 
         <div><label>PRICE : </label><input type='text' value={price} onChange={(e)=>setPrice(e.target.value)} className='border-[1px] border-black py-2 text-center w-[500px]'/></div> 
         <div><button onClick={editMenu} className='border-[1px] border-black px-5 py-2 my-10 '>Update Menu</button></div>   
    </div>
  )
}

export default EditMenu