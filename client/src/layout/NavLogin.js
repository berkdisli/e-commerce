import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../features/userSlice";
import { logoutUser } from "../services/UserService";
import { toast } from "react-toastify";

const NavLogin = () => {
    const admin = useSelector((state) => state.user.Admin)
    const dispatch = useDispatch()
    const handleLogout = async (e) => {
        try {
            e.preventDefault()
            dispatch(logout())
            const response = await logoutUser()
            console.log(response)
        } catch (error) {
            toast(error.response.data.message)
        }

    }
    return (
        <nav className="nav">
            <NavLink to='/'>Home</NavLink>
            {!admin && <NavLink to='/products'>All Products</NavLink>}
            <NavLink to='/' onClick={handleLogout}>Logout</NavLink>
            {admin && <NavLink to='/admin'>Admin</NavLink>}
        </nav>
    )
}

export default NavLogin;