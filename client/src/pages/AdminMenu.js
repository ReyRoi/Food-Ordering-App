import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
const AdminMenu = () => {
  const [menus, setMenus] = useState([])
  const [offer, setOffer] = useState('')
  const [search,setSearch]=useState('')
  const [loading,setLoading]=useState(false)
  const getMenu = async () => {
    const url = "http://localhost:2003/getmenu/"
    const res = await fetch(`${url}?search=${search}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
    await res.json().then(menus => {
      setMenus(menus)
      setLoading(true)
    })
  }
  const deleteMenu=async(id)=>{
    const res=await fetch('http://localhost:2003/deleteMenu/'+id,{
      method:'DELETE',
      headers:{'Content-type':'application/json'},
    })
    if(res.ok){
      alert('deleted')
    }
    window.location.reload()

    
  }
  const changeStatus = async (id) => {
    const res = await fetch('http://localhost:2003/stockstatus/' + id, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ status: "out of stock" })
    })
    if (res.ok) {
      alert('updated')
    }
    window.location.reload()
  }
  
  const applyOffer = async (id) => {
    const res = await fetch('http://localhost:2003/offer/' + id, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ offer })
    })
    if (res.ok) {
      alert('updated')
    }
    window.location.reload()
  }
  useEffect(() => {
    getMenu()
  }, [search])
  return (
    <div>
<div className="mx-auto text-center my-5">
            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search menu' className="border-[1px] text-center border-black rounded-xl w-96 h-10" />
          </div>
    <div className="grid grid-cols-2 ">
      {menus.map(menu => (
        <div className=" bg-custom-secondary m-5 w-[500px] h-[250px] mx-auto flex">
          <div className='flex flex-col w-[60%] my-auto px-5  '>

            <div className='mt-2  flex'><div className='w-[50%] font-semibold text-lg'>Type:</div>  {menu.type}</div>
            <div className='mt-2 flex'><div className='w-[50%] font-semibold text-lg'>Name:</div>{menu.name}</div>
            <div className='mt-2 flex' ><div className='w-[50%] font-semibold text-lg'>Desc:</div><div className='break-words w-[50%]'>{menu.des}</div></div>
            <div className='mt-2 flex'><div className='w-[50%] font-semibold text-lg'>Price:</div>{menu.price}</div>
            <div className='mt-2 flex'><div className='w-[50%] font-semibold text-lg'>Status:</div>{menu.status}</div>
          </div>
          <div className='text-right w-[40%] my-auto'>

            <div><button className=" bg-white p-2 px-5 w-36 m-2" onClick={() => changeStatus(menu._id)}>Out of stock</button></div>
            <div><button className=" bg-white p-2 px-5 m-2 w-36" ><Link to={`/admin/editMenu/${menu._id}`}>Edit</Link></button></div>
            <div><button className=" bg-white p-2 px-5 m-2 w-36" onClick={() => deleteMenu(menu._id)}>Delete</button></div>
            {/* <div><input className='border-[1px] border-black' type='text' placeholder='enter offer percent' onChange={(e) => setOffer(e.target.value)} /><button className="border-2 p-2 px-5 m-2" onClick={() => applyOffer(menu._id)}>Apply offer</button></div> */}
          </div>
        </div>

))}
    </div>
</div>
  )
}

export default AdminMenu