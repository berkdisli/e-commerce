import React from 'react'
import { logoutUser } from '../../services/UserService'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";

const Logout = () => {

    const handleLogout = async () => {
        try {
            const response = await logoutUser()
            const data = response.data;
            toast(data.message)
        } catch (err) {
            toast.error(err.response.data.error.message)
        }
    }

    return (
        <div>
            <Link to="/login"> <button onClick={handleLogout}>Click to Login</button></Link>
        </div>
    )
}

export default Logout