import React, { useState } from 'react'

const Tables = () => {
    const [table,setTable]=useState('')
    const handleSubmit=async()=>{
        const res=await fetch('http://localhost:2003/addtable',{
            method:'POST',
            body:JSON.stringify({table,status:"created"}),
            headers:{'Content-type':'application/json'},
        })
        if(res.ok){
            alert('table created')
        }
    }
  return (
    <div>
        <h1>Create tables</h1>
        <div><input type='text' placeholder='table no' onChange={(e)=>setTable(e.target.value)}/></div>
        <div><button onClick={handleSubmit}>Submit</button></div>
    </div>
  )
}

export default Tables