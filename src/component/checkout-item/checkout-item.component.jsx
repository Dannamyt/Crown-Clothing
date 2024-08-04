import { CartContext } from '../../context/cart.context'
import { useContext } from 'react'

import './checkout-item.styles.scss'
function CheckoutItem({cartItem}){
    const{clearProductFromCart,addItemToCart,removeItemFromCart} = useContext(CartContext)
   const {name,imageUrl,price,quantity} = cartItem
    
   const addItemHandler=()=>addItemToCart(cartItem)
   const removeItemHandler=()=>removeItemFromCart(cartItem)
   return(
        <>
            <div className='checkout-item-container'>
                <div className='image-container'><img src={imageUrl} alt="" /></div>
                <span className='name'>{name}</span>
                <span className='quantity'>
                    <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                    <span className='value'>{quantity}</span>
                    <div className='arrow' onClick={addItemHandler}>&#10095;</div>
                </span>
                <span className='price'>{price}</span>
                <div className='remove-button' onClick={()=>clearProductFromCart(cartItem)}>&#9986;</div>
            </div>
        </>
    )
}
export default CheckoutItem