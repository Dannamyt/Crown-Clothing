import { useContext } from 'react'

import { CartContext } from '../../context/cart.context'
import CartItem from '../cart-item/cart-item.component'
import Button from '../button/Button'

import './cart-dropdown.styles.scss'
import { useNavigate } from 'react-router-dom'

function CartDropdown(){
    const{cartItems,cartCount} = useContext(CartContext)
    console.log(cartCount)
    console.log(cartItems)
    const navigate = useNavigate()
    const goToCheckOutHandler = ()=>{
        navigate('/checkout')
    }
    return(
        <>
            <div className="cart-dropdown-container">
                { cartCount >= 1 ? (
                    <>
                        <div className="cart-items">
                        {cartItems.map((item)=>(
                            <CartItem key={item.id} cartItem={item}/>
                        ))}
                                        </div>
                                        <Button onClick ={goToCheckOutHandler}>GO TO CHECKOUT</Button>
                    </>) : <div>
                        <h1>Your Cart Is Empty</h1>
                        <Button>Back to Shop</Button>
                    </div>}
            </div>
        </>
    )
}
export default CartDropdown