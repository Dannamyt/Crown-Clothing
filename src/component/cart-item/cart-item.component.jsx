import './cart-item.styles.scss'
function CartItem({cartItem}){
    const {name,imageUrl,price, quantity} = cartItem
    return(
        <>
            <div className='cart-item-container'>
                <img src={imageUrl} alt="" />
              
                <div className='item-details'>
                    <span>{name}</span>
                    <span className='price'>{quantity} X ${price}</span>
                </div>
            </div> 
        </>
    )
}
export default CartItem