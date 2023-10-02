import styles from './Sidebar.module.css'
import Logo from "../Logo/Logo"
import AppNav from "../AppNav/AppNav"
import { Outlet } from 'react-router-dom'
function Sidebar() {
    return (
        <div className= {styles.sidebar}>
            <Logo />
            <AppNav />
            <Outlet  className = {styles.outlet}/>
            <footer className= {styles.footer}>
                <p className= {styles.copyright}>
                    &copy; Copyright &nbsp; {new Date().getFullYear()} &nbsp; By Harun.B
                </p>
            </footer>
        </div>
    )
}

export default Sidebar
