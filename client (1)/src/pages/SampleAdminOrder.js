import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import AdminOrder from './AdminOrder'
import AdminTable from '../components/AdminTable'
const SampleAdminOrder = () => {
  const [status,setStatus]=useState([])
  const socket = io("http://localhost:2003")
  useEffect(()=>{

    socket.on('connect', () => {
      console.log(" Connected " + socket.id)
    })
  },[])

  const [table, setTable] = useState([])
  const [dep,setDep]=useState(true)
  const getTables = async () => {
    console.log('called')
    const res = await fetch('http://localhost:2003/gettables', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
    setTable(await res.json())
  }
  const changeStatus = async (id, status) => {
    console.log('called')
    const res = await fetch('http://localhost:2003/changestatus', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) {
      alert('order received from table ' + id)
    }
  }
 

  useEffect(() => {
    getTables()
  }, [dep])
  socket.once('update-status', (data) => {
    // Create a new array with the updated status for the specific table
    const updatedTable = table.map((item, index) => {
      if (index === data.id) {
        return { ...item, status: data.status };
      }
      return item;
    });
    setDep(!dep)
  
    // Set the state with the updated array
    setTable(updatedTable);
  
    // Additionally, call your changeStatus function and log the data
    changeStatus(data.table, data.status);
    console.log(data);
  });
  
  return (
    <div className="flex flex-col">
      <h1 className='text-center'>table</h1>
      <div className='grid grid-cols-3 mt-7'>
        {table.map((t,index) => (
          <div key={index} className="col-span-1 p-2 active:scale-[.98] active-duration-75 hover:scale-[1.06] ease-in-out transition-all">
            <AdminTable {...t} />
            <button  className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-white rounded-lg ${
            t.status==='ordered' ? 'animate-blink' : ''
          }`} >
                {t.status}     
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default SampleAdminOrder