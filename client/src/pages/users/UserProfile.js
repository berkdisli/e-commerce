import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { logout } from "../../features/userSlice";
import { deleteUser, getUserProfile } from "../../services/UserService";

import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, Divider, Grid, Link, TextField, Typography } from '@mui/material'


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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={6} lg={3}>
                <Card sx={{ width: '300px', mt: 10, alignItems: 'center', }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            <h2>{user.name}</h2>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <p>E-mail: {user.email}</p>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <p>Age: {user.age}</p>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <p>Phone: {user.phone}</p>
                        </Typography>
                        <button onClick={handleDelete}><FaTrash /></button>
                        <button onClick={handleUpdate}><FaPencilAlt /></button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserProfile