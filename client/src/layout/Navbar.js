import { useSelector } from 'react-redux';
import { useNavigate, Link as MyLink } from 'react-router-dom';

import { logoutUser } from '../services/UserService';
import { theme } from './Theme'

import { AppBar, Link, Box, Toolbar, Typography, Badge, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite'
import { ThemeProvider } from '@mui/material/styles';

const Navbar = () => {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("_id") ? true : false;
    const { favorite, cart } = useSelector((state) => state.product);

    const handleLogout = async () => {
        try {
            localStorage.removeItem("_id");
            await logoutUser();
            navigate("/")
        } catch (err) {
        }
    }

    return (
        <ThemeProvider theme={theme}>
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
                                <Link href='/'>
                                    <Button style={{ color: '#fff' }} onClick={handleLogout}>Logout</Button>
                                </Link>
                                <Link href="/profile">
                                    <Button style={{ color: '#fff' }}>Profile</Button>
                                </Link>
                                <Link href="/admin/createProduct">
                                    <Button style={{ color: '#fff' }}>Create Product</Button>
                                </Link>
                                <Link href="/admin/createCategory">
                                    <Button style={{ color: '#fff' }}>Create Category</Button>
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
                        <IconButton
                            size="large"
                            aria-label="change me"
                            color="inherit" >
                            <Badge badgeContent={favorite.length} color="secondary">
                                <FavoriteIcon style={{ color: '#fff' }} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="change me"
                            color="#ffffff" >
                            <Badge badgeContent={cart.length} color="primary">
                                <MyLink to="/cart">
                                    <ShoppingCartIcon style={{ color: '#fff' }} />
                                </MyLink>
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>

    )
}

export default Navbar;