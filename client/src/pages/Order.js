import React, { useContext, useEffect, useState } from 'react'
import { menu } from '../components/menu'
import SingleItem from '../components/SingleItem'
import Cart from './Cart'
import { UserContext } from '../components/UserContext'
import { Link } from 'react-router-dom'
import { useGeolocated } from 'react-geolocated'

const Order = () => {
  const { items, setItems } = useContext(UserContext)
  const [position, setPosition] = useState({});
  const [location, setLocation] = useState(true)
  function isPointWithinSquare(point, squarePoints) {
    const minLat = Math.min(
      squarePoints[0][0],
      squarePoints[1][0],
      squarePoints[2][0],
      squarePoints[3][0]
    );
    const maxLat = Math.max(
      squarePoints[0][0],
      squarePoints[1][0],
      squarePoints[2][0],
      squarePoints[3][0]
    );
    const minLng = Math.min(
      squarePoints[0][1],
      squarePoints[1][1],
      squarePoints[2][1],
      squarePoints[3][1]
    );
    const maxLng = Math.max(
      squarePoints[0][1],
      squarePoints[1][1],
      squarePoints[2][1],
      squarePoints[3][1]
    );

    const lat = point[0];
    const lng = point[1];

    return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
  }
  console.log(typeof (position.latitude))
  // console.log(point)
  const squarePoints = [
    [13.092483472579584, 79.65563035035782],
    [13.092474520370692, 79.65569085860136],
    [13.092349935429759, 79.65568473118428],
    [13.092352173483151, 79.65561886145083]
  ];
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });

      console.log(position)
    } else {
      console.log("Geolocation is not available in your browser.");
    }

    const point = [position.latitude, position.longitude];

    console.log(isPointWithinSquare(point, squarePoints));
    // setLocation(isPointWithinSquare(point, squarePoints));
  }
  useEffect(() => {
    // while(Object.keys(position).length==0){

    //   getLocation()
    // }
    getLocation()
    // console.log(position)
    // console.log(79.6556265===position.longitude)
    
  }, [items]);

  const [loading, setLoading] = useState(false)
  const ENDPOINT = "http://localhost:2003"
  var socket;
  const [menus, setMenus] = useState([])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchItems, setSearchItems] = useState([])
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


  useEffect(() => {
    // setLoading(false)
    getMenu()
    console.log(menus)
  }, [search])
  const addItem = (item) => {
    const isPresent = items.find((o) => o.name === item.name)
    if (!isPresent) {
      setItems(items => [...items, item])
    }
    // console.log(items)
  }
  const removeItem = (item) => {
    setItems(items.filter((item1) => item1.name !== item))
    // console.log(items)
  }


  // const unique = [...new Set(menus.map(item => item.type))];
  // console.log(unique)

  return (
    <>

      {location ?
        <div className="font-mono mb-32">
          <div className="mx-auto text-center my-5">
            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search menu' className="border-2 text-center border-black rounded-xl w-96 h-20" />
          </div>
          <div className="mx-5">
            {menus.length === 0 && <div>No item found</div>}
            {menus && menus.map((menu) => (


              <div className="flex border-b-2 my-5  mx-auto  border-yellow-500 w-full" key={menu.index}>
                <SingleItem {...menu} />
                <div className="text-center ml-14 my-16 "><button onClick={() => {
                  addItem({ name: menu.name, price: menu.price, quantity: 0 })
                }} className="border-2 p-2 px-5 rounded-xl  border-green-500 text-green-500">Add</button></div>
                <div className="text-center ml-5 my-16 "><button onClick={() => {
                  removeItem(menu.name)
                }} className="border-2 p-2 px-5 rounded-xl border-red-500 text-red-500 ">Remove</button></div>
              </div>


            ))}

          </div>
          {items.length > 0 &&
            <div className=" text-center fixed bottom-0 h-20 w-full bg-black text-white py-4 text-2xl">
              {items.length} Items added
              <button className="mx-5 border-2 p-2 px-6 rounded-xl text-lg"><Link to='/cart'>Next</Link></button>
            </div>
          }

        </div>
        : <div>Loading</div>}
    </>
  )
}

export default Order