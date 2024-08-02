import { Outlet,Link } from "react-router-dom"
import './navigation.styles.scss'
import Logo from "../../Logo"
import CartIcon from "../../component/cart-icon/cart-icon.component"
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component"
import { useContext } from "react"
import { UserContext } from "../../context/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import { CartContext } from "../../context/cart.context"

function Navigation(){
    
    const{currentUser} = useContext(UserContext)
    const { isOpen} = useContext(CartContext)
    return(
        <>
            <div>
                <div className="navigation">
                    <Link className="logo-container" to={'/'}>
                        <Logo className='logo'/>
                    </Link>
                        <div className="nav-links-container">
                            <Link className="nav-link" to='shop'>Shop</Link>
                
                            {currentUser ? (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>):
                                ( <Link className="nav-link" to='auth'>Sign In</Link>)
                        }
                        <CartIcon />
                        </div>
                </div>
                {isOpen && <CartDropdown/>}
            </div>
            <Outlet/>
        </>
    )
}
export default Navigation