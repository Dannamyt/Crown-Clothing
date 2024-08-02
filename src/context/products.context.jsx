import { createContext, useState } from 'react'
import shopdata from '../shopData.json'

export const ProductsContext = createContext({
products:[],

})

export const ProductProvider= ({children})=>{
   const [products,setProducts] = useState(shopdata)
   const value= {products}
    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}