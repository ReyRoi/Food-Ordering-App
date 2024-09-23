import React, { useEffect, useState } from 'react'
import CompletedOrder from './CompletedOrder'
import {io} from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
const AdminOrder = (id) => {
    const navigate=useNavigate()
    const [loaded,setLoaded]=useState(false)
    const [orders,setOrders]=useState([])
    const [showComplete,setShowComplete]=useState(false)
       
    console.log(id)
    const getData=async()=>{

        const res=await fetch('http://localhost:2003/showorderbytable/'+id.id,{
            method:'GET',
            header:{'Content-type':'application/json'}
        })
        res.json().then(orders=>{
            setOrders(orders.filter((order)=>order.status!=='completed'))
        })
        // setOrders(orders.filter((order)=>order.status!=='completed'))
    }
    const changeStatus=async(id)=>{
        const res=await fetch('http://localhost:2003/status/'+id,{
            method:'PUT',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({status:"completed"})
        })
        // console.log('hi')
        if(res.ok){
            alert('updated')
        }
        window.location.reload()
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <>
        
    <div className="">
        {orders.map((order)=>(
            <div className="border-2 w-fit m-5 mx-auto p-5">
            <div>Name : {order.name}</div>
            <div>Table No. : {order.table}</div>
            <div>Amount : {order.amount}</div>
            Dish :
            <div className="">{order.orders.map(order=>(
                <div className="flex">
                <div className="mx-5"> {order.name}</div>
                <div> {order.quantity}</div>
                </div>
            ))}</div>
            <div>Mobile No. : {order.mobile}</div>
            <div>Status : {order.status}</div>
            {/* <div>{order.id}</div> */}
            <div className="text-center"><button onClick={()=>changeStatus(order.id)} className="border-2 p-2 px-5 rounded-xl my-5 ">Update Status</button></div>
            </div>
            ))}
            <div>
            <button onClick={()=>setShowComplete(!showComplete)}>Completed Orders</button>
            {showComplete&&<CompletedOrder/>}
        </div>
        
        </div>
   
    </>
    
  )
}

export default AdminOrder