
import React from 'react'
import { useState } from 'react'
import Footer from './Footer'

const SingleItem = (menu) => {
  return (
    <div className="my-5 p-2 font-mono">
        <div className="flex">
        <div className="w-32 my-5">

        <div className="text-2xl font-extrabold capitalize leading-tight">{menu.name}</div>
        <div className="my-2 font-semibold">₹ {menu.price}</div>
        <div className="capitalize font-mono">{menu.des}</div>
        </div>
        </div>
        
    </div>
  )
}

export default SingleItem