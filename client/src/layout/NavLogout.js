import { NavLink } from "react-router-dom";

const NavLogout = () => {
    return (
        <nav className="nav">
            <NavLink to='/'>HOME</NavLink>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/login'>Sign In</NavLink>
        </nav>
    )
}

export default NavLogout;