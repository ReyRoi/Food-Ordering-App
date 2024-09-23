import React, { useEffect, useState,useRef } from 'react'
import {format} from 'date-fns'
import ReactToPrint from 'react-to-print';
const CompletedOrder = () => {
    const componentRef = useRef([]);
    const [id,setId]=useState('')
  
    const [orders,setOrders]=useState([])
    const getOrders=async()=>{
        const url="http://localhost:2003/showorders/"
        await fetch((`${url}?search=${id}`),{
            method:'GET',
            headers:{'Content-type':'application/json'},
        }).then(res=>res.json().then(orders=>setOrders(orders.filter((order)=>order.status==='completed'))))
        // setOrders(orders.filter(order=>order.status==='completed'))
    }
    // console.log(orders)
   
    useEffect(()=>{
        getOrders()
    },[id])

  return (
    <div  >
        <div><input placeholder='search by order id' onChange={(e)=>setId(e.target.value)} type='text'/></div>
        {orders.map((order,index)=>(
            <div ref={(el)=>componentRef.current[index]=el} key={index} className="hover:scale-110 border-2 w-fit m-5 mx-auto p-5" >
                <div >
            <div >Name : {order.name}</div>
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
            <div>Time : {format(new Date(order.createdAt),'MMM d,yyyy hh:mm')}</div>
            </div>
            <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current[index]}
      />
            </div>
        ))}
    </div>
  )
}

export default CompletedOrder