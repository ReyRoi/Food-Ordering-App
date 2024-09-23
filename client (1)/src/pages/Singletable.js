import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import TotalOrder from '../components/TotalOrder'
const Singletable = () => {
    const [openTotal,setOpenTotal]=useState(false)
    const [orders, setOrders] = useState([])
    const { id } = useParams()
    const getOrders = async () => {
        const res = await fetch('http://localhost:2003/showorderbytable/' + id, {
            headers: { 'Content-type': 'application-json' },
            method: 'GET',
        })
        setOrders(await res.json());
        // await console.log(orders)
    }
    const changeStatus=async(id)=>{
        console.log(id)
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
    useEffect(() => {
        getOrders()
        // console.log(orders)
    }, [])
    const deleteOrder=async(id)=>{
        const res=await fetch('http://localhost:2003/deletesingleorder/'+id,{
            method:'DELETE',
            headers:{'Content-type':'application/json'},

        })
        if(res.ok){
            alert("deleted")
            window.location.reload()
        }
        console.log(id)
    }
    return (
        <div>

            <div className='flex justify-between mt-4'>
                <h1 className='text-3xl m-4'>Total : </h1>
                

                <button onClick={()=>setOpenTotal(!openTotal)} className='text-2xl m-4 mx-10 bg-custom-secondary px-4 py-1 rounded'>Paid</button>
                
            </div>
                {openTotal&&<div className=" "><TotalOrder  orders={orders} /></div>}

            <div className='grid grid-cols-3 gap-3 mt-5'>
                {orders.map((order, index) => (
                    <div class="col-span-1 max-w-sm bg-custom-secondary border rounded-lg shadow ">
                        <a href="#">
                            <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Order :{index+1}</h5>
                            </a>
                            <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr >
                                    <th className="px-6 py-3 text-left text-xl font-medium  uppercase tracking-wider w-2/5"><IoFastFoodOutline /></th>
                                    <th className="px-6 py-3 text-left text-xl font-medium  uppercase tracking-wider"><FaIndianRupeeSign /></th>
                                    <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider"><MdOutlineProductionQuantityLimits /></th>
                                </tr>
                            </thead>
                            {order.orders.map(o=>(

                                <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-4 whitespace-normal w-2/5">{o.name}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{o.price}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{o.quantity}</td>
                                </tr>
                            </tbody>
                                ))}
                </table>
                <div>
                <div className="text-center"><button onClick={()=>changeStatus(order.id)} className="border-2 p-2 px-5 rounded-xl my-5 ">{`${order.status==="ordered"?"Change Status":"Completed"}`}</button></div>
                <div><button onClick={()=>deleteOrder(order._id)}>Delete</button></div>
                </div>
                        </div>
                    </div>


                ))}
            </div>

        </div>
    )
}

export default Singletable