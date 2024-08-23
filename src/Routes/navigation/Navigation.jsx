import { Outlet } from "react-router-dom"
import{NavigationContainer,NavLinks,NavLink,LogoContainer} from './navigation.styles.jsx'
import Logo from "../../Logo"
import CartIcon from "../../component/cart-icon/cart-icon.component"
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component"
import { useContext } from "react"
import { UserContext } from "../../context/user.context"
import { CartContext } from "../../context/cart.context"
// import { useSelector } from "react-redux"
// import  selectCurrentUser  from "../../store/user/user-selector.jsx"
import { signOutUser } from "../../utils/firebase/firebase.utils"

function Navigation(){
    
    const {currentUser} = useContext(UserContext)

    const { isOpen} = useContext(CartContext)
    return(
        <>
                <NavigationContainer >
                    <LogoContainer  to='/'>
                        <Logo className='logo'/>
                    </LogoContainer>
                        <NavLinks >
                            <NavLink  to='shop'>Shop</NavLink>
                
                            {currentUser ? (
                                <NavLink as={'span'} onClick={signOutUser}>
                                 SIGN OUT
                                </NavLink>):
                                ( <NavLink  to='auth'>Sign In</NavLink>)
                        }
                        <CartIcon />
                        </NavLinks>
                        {!isOpen && <CartDropdown/>}
                </NavigationContainer>
                <Outlet/>

        </>
    )
}
export default Navigation