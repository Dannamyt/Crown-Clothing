import { createContext,  useEffect,  useState } from "react";

const addCartItem = (cartItems,productToAdd)=>{
 
    const existingCartItem =  cartItems.find((cartItem)=>
     cartItem.id === productToAdd.id)

 if (existingCartItem){
    return cartItems.map((cartItem)=>
    cartItem.id === productToAdd.id
    ? {...cartItem,quantity:cartItem.quantity + 1}
 :  cartItem
 )
}
    return [...cartItems, {...productToAdd, quantity:1}]
}

const removeCartItem =(cartItems,cartItemToRemove)=>{
    const existingCartItem =  cartItems.find((cartItem)=>
        cartItem.id === cartItemToRemove.id)

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    return cartItems.map((cartItem)=>
        cartItem.id === cartItemToRemove.id
        ? {...cartItem,quantity:cartItem.quantity - 1}
     :  cartItem
     )
}

const clearProduct= (cartItems,cartItemToRemove)=>{
   
return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    
   
}

export const CartContext = createContext({
    isOpen:false,
    setIsOpen:()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    removeItemFromCart:()=>{},
    clearProductFromCart:()=>{},
    cartCount:0,
    cartTotal:0
})
export const CartProvider = ({children})=>{
        const [isOpen,setIsOpen]= useState(false)
        const [cartItems,setCartItems]= useState([])
        const[cartCount,setCartCount]=useState(0)
        const[cartTotal,setCartTotal]=useState(0)


        useEffect(()=>{
            const newCartCount = cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0)
            setCartCount(newCartCount)
            const newCartTotal = cartItems.reduce((total,cartItem) =>total +(cartItem.price * cartItem.quantity),0) 
            setCartTotal(newCartTotal)
        },[cartItems])
        

        const addItemToCart  = (producToAdd)=>{
            setCartItems(addCartItem(cartItems,producToAdd))
        }
        const removeItemFromCart = (producToRemove)=>{
            setCartItems(removeCartItem(cartItems,producToRemove))
        }
        const clearProductFromCart =(productToClear)=>{
            setCartItems(clearProduct(cartItems,productToClear))
        }
        const value = {
            isOpen,
            setIsOpen,
            addItemToCart, 
            cartItems,
            cartCount,
            cartTotal,
            removeItemFromCart,
            clearProductFromCart
        }
        return(
            <CartContext.Provider value={value}>{children}</CartContext.Provider>
         )
}