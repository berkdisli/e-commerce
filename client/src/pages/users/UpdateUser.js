import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet';

import { getUserProfile, updateUser } from "../../services/UserService";
import { theme } from '../../layout/Theme'

import { Box, Button, Card, CardContent, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';

const UpdateUser = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState([])
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: 0,
        age: 0
    });
    const fetchUser = async () => {
        const response = await getUserProfile(id)
        setUser(response.data.payload.user)
        setNewUser({
            name: response.data.payload.user.name,
            email: response.data.payload.user.email,
            phone: response.data.payload.user.phone,
            age: response.data.payload.user.age
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
                phone: 0,
                age: 0
            })
        } catch (error) {
            toast(error.response.data.message)
        }

    }

    const handleBackClick = () => {
        navigate(-1);
    };


    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>Update User Information</title>
            </Helmet>
            <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleBackClick}
            >
                Back
            </Button>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="h5" align="left" color="text.secondary">
                            Name: {user.name}
                        </Typography>
                        <Typography component="h1" variant="h5" align="left" color="text.secondary">
                            E-mail: {user.email}
                        </Typography>
                        <Typography component="h1" variant="h5" align="left" color="text.secondary">
                            Age: {user.age}
                        </Typography>
                        <Typography component="h1" variant="h5" align="left" color="text.secondary">
                            Phone Number: {user.phone}
                        </Typography>
                    </CardContent>
                </Card>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Update Your Profile Information
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Name"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="age"
                                    label="Age"
                                    type="age"
                                    id="age"
                                    autoComplete="age"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone Number"
                                    type="number"
                                    id="phone"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default UpdateUser;