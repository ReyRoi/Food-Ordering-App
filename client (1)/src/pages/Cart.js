import React, { useContext, useEffect,useState } from 'react'
import { UserContext } from '../components/UserContext'
import CartOrders from '../components/CartOrders'
import {io} from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const redirect=useNavigate()
    const socket=io("http://localhost:2003")
    const [tableNo,setTableNo]=useState([])
    const [table,setTable]=useState(1)
    useEffect(()=>{
    socket.on('connect',()=>{
        console.log(" Connected "+socket.id)
    })
    const getTables = async () => {
        console.log('called')
        const res = await fetch('http://localhost:2003/gettables', {
          method: 'GET',
          headers: { 'Content-type': 'application/json' },
        })
        setTableNo(await res.json())
      }
      getTables()
        
     },[])
   const {items,totalPrice,setTotalPrice}=useContext(UserContext)
   const [name,setName]=useState('')
   const [mobile,setMobile]=useState('')
    useEffect(()=>{
        if(totalPrice>0){
            setTotalPrice(0)
        }
        // console.log(table)
    },[])
    const handleSubmit=async()=>{
        const id=Date.now().toString(36)
        const res=await fetch('http://localhost:2003/order',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({id:id,items,name,table,mobile,totalPrice,status:"ordered"})
        })
    //    socket.emit('send-orders',{id:id,orders:items,name,table,mobile,amount:totalPrice,status:"ordered"})
       socket.emit('send-status',{table,status:"ordered"})
        if(res.ok){
            toast.success('🦄 Order Placed', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                
        }
    }
  return (
    <div className="font-mono capitalize">
        <div className="bg-white shadow-2xl mx-5 py-5 my-5">

            <div className="text-center text-3xl font-mono">CART</div>
       {items.map(item=>(
        <div className="  mx-5 ">
           <CartOrders itemDet={item} count={0}/>
           </div>
           ))}
           </div>
           <div className=" border-2 w-fit mx-auto p-5">Total Amount : ₹{totalPrice}</div>
           <div id="form" className=" w-fit grid grid-cols-2 gap-y-6  my-5">
            <div className="text-center"><label>Name : </label></div><div><input onChange={(e)=>setName(e.target.value)} type='text' className="border-2" /></div>
            <div className="text-center"><label>Table No : </label></div><div><select name="cars" onChange={(e)=>setTable(e.target.value)} id="cars">
                {tableNo.map(t=>(

    <option value={t.id} >{t.id}</option>
                ))}

  </select></div>
            <div className="text-center"><label>Mobile No : </label></div><div><input onChange={(e)=>setMobile(e.target.value)} type='text' maxLength={10} className="border-2" /></div>
           </div>
            <div className="text-center py-5"><button onClick={handleSubmit} className="border-2 p-2 px-5 bg-yellow-200 border-yellow-300 rounded-xl">Submit</button></div>
           <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  )
}

export default Cart