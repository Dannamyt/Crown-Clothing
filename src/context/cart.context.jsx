import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util";


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

const INITIAL_STATE={
    isOpen:true,
    cartItems:[],
    cartCount:0,
    cartTotal:0
}

const cartReducer =(state,action)=>{
    const{type,payload} = action

    switch(type){
        case 'SET_CART_ITEMS':
        return{
            ...state,
            ...payload
        }
        case 'SET_IS_CART_OPEN':
        return{
            ...state,
            isOpen: payload
        }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({children})=>{
        // const [isOpen,setIsOpen]= useState(false)
        // const [cartItems,setCartItems]= useState([])
        // const[cartCount,setCartCount]=useState(0)
        // const[cartTotal,setCartTotal]=useState(0)

        const [{cartItems,cartCount,cartTotal,isOpen},dispatch]= useReducer(cartReducer, INITIAL_STATE)
        
        // useEffect(()=>{
        //     const newCartCount = cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0)
        //     setCartCount(newCartCount)
           
        // },[cartItems])

        // useEffect(()=>{
        //     const newCartTotal = cartItems.reduce((total,cartItem) =>total +(cartItem.price * cartItem.quantity),0) 
        //     setCartTotal(newCartTotal)
        // },[cartItems])
        
        const updateCartItemsreducer =(newCartItems)=>{
            const newCartCount = newCartItems.reduce((total,cartItem)=>total+cartItem.quantity,0)
            const newCartTotal = newCartItems.reduce((total,cartItem) =>total +(cartItem.price * cartItem.quantity),0) 

        dispatch(
            createAction('SET_CART_ITEMS',{
            cartItems: newCartItems,
            cartTotal:newCartTotal,
            cartCount: newCartCount }
        ))
    
        }

        const addItemToCart  = (productToAdd)=>{
            const newCartItems = addCartItem(cartItems,productToAdd)
            updateCartItemsreducer(newCartItems)
        }
        const removeItemFromCart = (productToRemove)=>{
          const newCartItems = removeCartItem(cartItems,productToRemove)
          updateCartItemsreducer(newCartItems)

        }
        const clearProductFromCart =(productToClear)=>{
            const newCartItems = clearProduct(cartItems,productToClear)
            updateCartItemsreducer(newCartItems)

        }

        const setIsOpen =(bool)=>{
            dispatch(createAction ('SET_IS_CART_OPEN', bool))
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