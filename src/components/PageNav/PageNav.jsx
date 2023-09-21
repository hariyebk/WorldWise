import { NavLink } from "react-router-dom"
import Styles from "./PageNav.module.css"
import Logo from "../Logo/Logo"
import { useAuth } from "../../contexts/FakeAuthContext"

function PageNav() {
    const {isLoggedIn} = useAuth()
    return (
        <nav className= {Styles.nav}>
            <Logo />
            <ul>
                <li>
                    <NavLink to={"/product"}>Product</NavLink>
                </li>
                <li>
                    <NavLink to={"/pricing"}>Pricing</NavLink>
                </li> 
                {isLoggedIn ? null
                : 
                <li>
                    <NavLink to={"/login"} className={Styles.ctaLink}> Login </NavLink>
                </li> 
                }
            </ul>
        </nav>
    )
}

export default PageNav
