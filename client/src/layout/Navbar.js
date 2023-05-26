import * as React from 'react';
import { useSelector } from 'react-redux';

import { AppBar, Link, Box, Toolbar, Typography, Badge, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import product from '../app/store';
import { logoutUser } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("_id")
    const { cart } = useSelector((state) => state.product);

    const handleLogout = async () => {
        try {
            localStorage.removeItem("_id");
            await logoutUser();
            navigate("/")
        } catch (err) {
        }
    }

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <AppBar position="static" style={{ backgroundColor: '#27b1c4', color: '#fff' }}>
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        e-commerce
                    </Typography>

                    <Link href="/">
                        <Button style={{ color: '#fff' }}>Home</Button>
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Button style={{ color: '#fff' }} onClick={handleLogout}>Logout</Button>
                            <Link href="/profile">
                                <Button style={{ color: '#fff' }}>Profile</Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/register">
                                <Button style={{ color: '#fff' }}>Register</Button>
                            </Link>
                            <Link href="/login">
                                <Button style={{ color: '#fff' }}>Login</Button>
                            </Link>
                        </>
                    )}
                    <Link href="/products">
                        <Button style={{ color: '#fff' }}>Products</Button>
                    </Link>
                    <Link to="/cart">
                        <IconButton
                            size="large"
                            aria-label="change me"
                            color="inherit" >
                            <Badge badgeContent={cart.length}>
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;