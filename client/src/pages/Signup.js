import React, { useState } from 'react'
import { Link, redirect,useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate=useNavigate()
    const [user,setUser]=useState('')
    const [pass,setPass]=useState('')
    const handleSubmit=async()=>{
        const res=await fetch('http://localhost:2003/signup',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({user:user,pass:pass})
        })
        if(res.status===201){
            navigate('/admin/login')
        }
        if(res.status===400){
            alert('username already exist')
        }
    }
  return (
    <div className='bg-white shadow-2xl mx-auto  my-52 w-fit'>
        <div className="text-center m-16">
        <div className="text-center text-5xl font-serif py-5">
            SIGNUP
        </div>
        <div className="my-5"><label className="mx-5">Username:</label><input className="border-2 rounded-lg h-10 border-black text-center" placeholder='username' onChange={(e)=>setUser(e.target.value)} type='text'/></div>
        <div className="my-5"><label className="mx-5">Password:</label><input className="border-2 rounded-lg h-10 border-black text-center" placeholder='password' onChange={(e)=>setPass(e.target.value)} type='password'/></div>
        <div><button className="px-5 p-2 border-2 border-black my-5 rounded-2xl" onClick={handleSubmit}>Submit</button></div>
        <div><Link to='/admin/login'>Exisiting User?</Link></div>
        </div>
    </div>
  )
}

export default Signup