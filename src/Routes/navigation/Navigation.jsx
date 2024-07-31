import { Outlet,Link } from "react-router-dom"
import './navigation.styles.scss'
import Logo from "../../Logo"
import { useContext } from "react"
import { UserContext } from "../../context/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"

function Navigation(){
    
    const{currentUser} = useContext(UserContext)
   
    return(
        <>
            <div className="navigation">
                <Link className="logo-container" to={'/'}>
                    <Logo className='logo'/>
                </Link>
                    <div className="nav-links-container">
                        <Link className="nav-link" to='shop'>Shop</Link>
                        
                        {currentUser ? (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>):
                            ( <Link className="nav-link" to='auth'>Sign In</Link>)
                    }
                    </div>
            </div>
            <Outlet/>
        </>
    )
}
export default Navigation