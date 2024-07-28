import { Outlet,Link } from "react-router-dom"
import './navigation.styles.scss'
import Logo from "../../Logo"
function Navigation(){
    return(
        <>
            <div className="navigation">
                <Link className="logo-container" to={'/'}>
                    <Logo className='logo'/>
                </Link>
                    <div className="nav-links-container">
                        <Link className="nav-link" to='shop'>Shop</Link>
                        <Link className="nav-link" to='auth'>Sign In</Link>
                    </div>
            </div>
            <Outlet/>
        </>
    )
}
export default Navigation