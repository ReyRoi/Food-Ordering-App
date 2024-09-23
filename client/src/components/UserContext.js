const { createContext, useState } = require("react");

export const UserContext=createContext({})

export const UserContextProvider=({children})=>{
    const [items,setItems]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)
    return (
        <UserContext.Provider value={{items,setItems,totalPrice,setTotalPrice}}>
        {children}
        </UserContext.Provider>
    )
}