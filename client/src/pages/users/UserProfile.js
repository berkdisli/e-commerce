import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { logout } from "../../features/userSlice";
import { deleteUser, getUserProfile } from "../../services/UserService";

const UserProfile = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    const id = localStorage.getItem('userId')
    const fetchProfile = async () => {
        try {
            const response = await getUserProfile(id)
            setUser(response.data.payload.user)
            toast.success(response.data.payload.user)
        } catch (error) {
            toast(error.response)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const handleDelete = async () => {
        await deleteUser(id);
        navigate('/')
        dispatch(logout())
        toast.success('The Profile was succesfully deleted')
    }
    const handleUpdate = () => {
        navigate(`/update/${id}`)
    }
    return (
        <div className="user-info">
            <h1>Hello, {user.name}</h1>
            <p>E-mail: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Phone: {user.phone}</p>
            <button onClick={handleDelete}><FaTrash /></button>
            <button onClick={handleUpdate}><FaPencilAlt /></button>
        </div>
    )
}

export default UserProfile