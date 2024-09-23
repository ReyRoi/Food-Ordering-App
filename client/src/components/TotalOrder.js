import React, { useEffect, useState,useRef } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { useReactToPrint } from 'react-to-print'
import { useNavigate, useParams } from 'react-router-dom';
const TotalOrder = ({ orders }) => {
  const navigate=useNavigate()
  const [items, setItems] = useState(new Map());
  const [total,setTotal]=useState(0)
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    const updatedItems = new Map();

    orders.forEach(order => {
      order.orders.forEach(o1 => {
        const name = o1.name;
        const price = parseFloat(o1.price)* parseInt(o1.quantity);
        setTotal(prevTotal => prevTotal + price);
        // console.log(typeof(price))
        const quantity = parseInt(o1.quantity);

        if (!updatedItems.has(name)) {
          updatedItems.set(name, { price, quantity });
        } else {
          const existingItem = updatedItems.get(name);
          updatedItems.set(name, {
            price: price + (parseFloat(existingItem.price)*parseInt(existingItem.quantity)),
            quantity: quantity + parseInt(existingItem.quantity)
          });
        }
      });
    });

    setItems(updatedItems);
  }, [orders]);
  const {id}=useParams()
  const closeOrder=async()=>{
    // console.log(id)
    const itemsArray = Array.from(items).map(([name, { price, quantity }]) => ({
      name,
      price,
      quantity
    }));
    const res=await fetch('http://localhost:2003/closeorder/'+id,{
      method:'POST',
      body: JSON.stringify({ items: itemsArray }),
      headers:{'Content-type':'application/json'}
    })
    if(res.ok){
      alert("Order closed")
      navigate('/admin/order')
    }
  }
  return (
    <div className="bg-white text-black shadow-2xl p-5 absolute mx-[30%] " >
      <table className="min-w-full divide-y divide-gray-200" ref={componentRef}>
                            <thead>
                                <tr >
                                    <th className="px-6 py-3 text-left text-xl font-medium  uppercase tracking-wider w-2/5"><IoFastFoodOutline /></th>
                                    <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider"><MdOutlineProductionQuantityLimits /></th>
                                    <th className="px-6 py-3 text-left text-xl font-medium  uppercase tracking-wider"><FaIndianRupeeSign /></th>
                                </tr>
                            </thead>
                            {Array.from(items).map(([name, { price, quantity }])=>(

                                <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-4 whitespace-normal w-2/5">{name}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{quantity}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{price}</td>
                                </tr>
                            </tbody>
                                ))}
                                <tbody className="">
                                  <td></td>
                                  <td></td>
                                  <td>Total: {total}</td>
                                </tbody>
                </table>
                <div className="flex justify-between">

                <button onClick={handlePrint}>Print this out!</button>
                <button onClick={closeOrder}>Close order</button>
                </div>
    </div>
  );
};

export default TotalOrder;
