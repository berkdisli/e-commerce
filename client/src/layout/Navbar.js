import * as React from 'react';
import { useSelector } from 'react-redux';

import Login from '../pages/users/Login';
import Logout from '../pages/users/Logout';

import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Navbar = () => {

    const loggedin = useSelector((state) => state.user.isLoggedin)

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

                    <Link href="/products">
                        <Button style={{ color: '#fff' }}>Products</Button>
                    </Link>

                    <Link href="/register">
                        <Button style={{ color: '#fff' }}>Register</Button>
                    </Link>

                    <Link href="/login">
                        <Button style={{ color: '#fff' }} onChange={loggedin ? <Login /> : <Logout />}>Login</Button>

                    </Link>
                    <IconButton
                        size="large"
                        aria-label="change me"
                        color="inherit" >
                        <Badge >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;