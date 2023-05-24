import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getUserProfile, updateUser } from "../../services/UserService";

const UpdateUser = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState([])
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: 0
    });
    const fetchUser = async () => {
        const response = await getUserProfile(id)
        setUser(response.data.payload.user)
        setNewUser({
            name: response.data.payload.user.name,
            email: response.data.payload.user.email,
            phone: response.data.payload.user.phone
        })
    }
    useEffect(() => {
        fetchUser()
    }, [])

    const handleChange = async (e) => {
        setNewUser(prevUser => {
            return { ...prevUser, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await updateUser(id, newUser)
            toast(response.data.message)
            setUser(newUser)
            setNewUser({
                name: '',
                email: '',
                phone: 0
            })
        } catch (error) {
            toast(error.response.data.message)
        }

    }

    const handleBackClick = () => {
        navigate(-1);
    };


    return (
        <div className="main row">
            <button onClick={handleBackClick}>Back</button>
            <div className="left">
                <h3>Name: {user.name}</h3>
                <h3>E-mail: {user.email}</h3>
                <h3>Phone: {user.phone}</h3>
            </div>
            <div className="right">
                <form action='' onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name: </label>
                    <input type='text' required value={newUser.name} onChange={handleChange} name='name' id='name' />
                    <label htmlFor='email'>E-mail: </label>
                    <input type='email' required value={newUser.email} onChange={handleChange} name='email' id='email' />
                    <label htmlFor='phone'>Phone: </label>
                    <input type='phone' required value={newUser.phone} onChange={handleChange} name='phone' id='phone' />
                    <button type='submit'>Update</button>
                </form>
                <a href='/reset-password' className="reset-update">Update password</a>
            </div>
        </div>
    );
}

export default UpdateUser;