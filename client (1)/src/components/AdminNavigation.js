import { MdDashboard } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { BiSolidFoodMenu } from "react-icons/bi";
import { BiSolidOffer } from "react-icons/bi";
    
export const  Dashboard_links =[
    {
       key:'dashboard',
       label:'dashboard',
       path:'/admin/dashboard',
       icon: <MdDashboard></MdDashboard>
    },
    {
       key:'order',
       label:'order',
       path:'/admin/order',
       icon:  <IoFastFoodOutline></IoFastFoodOutline>
    },
    {
       key:'menu',
       label:'menu',
       path:'/admin/addMenu',
       icon: <BiSolidFoodMenu></BiSolidFoodMenu>
    },
   
]

