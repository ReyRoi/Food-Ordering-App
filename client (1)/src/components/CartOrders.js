import React, { useContext, useState } from 'react'
import { UserContext } from './UserContext'

const CartOrders = (props) => {
    const [count,setCount]=useState(0)
    const {totalPrice,setTotalPrice,items,setItems}=useContext(UserContext)
    const addCount=()=>{
        setItems(items.map(item=>
            item.name===props.itemDet.name?{...item,quantity:item.quantity+1}:item
            )
        )
        setTotalPrice(parseFloat(totalPrice)+parseFloat(props.itemDet.price))
        setCount(count+1)
        // console.log(items)
    }
    const reduceCount=()=>{
        if(count>0){
            setCount(count-1)
            setTotalPrice(parseInt(totalPrice)-parseInt(props.itemDet.price))
        }
    }
  return (
    <div className=" border-2 w-80 p-5 mx-auto m-5  flex border-yellow-500">
        <div className="mx-5">

        <div className="w-32">{props.itemDet.name}</div>
        <div>₹ {props.itemDet.price}</div>
        </div>
        <div className="flex border-2 ml-10 h-14 border-red-200 bg-[rgba(200,0,0,0.1)]"><button onClick={addCount} className="px-2 font-extrabold text-red-500">+</button><div className="my-3 px-2 ">{count}</div><button onClick={reduceCount} className="px-2 font-extrabold  text-green-500">-</button></div>

    </div>
  )
}

export default CartOrders