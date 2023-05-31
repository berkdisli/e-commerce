import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'

import product from '../app/store';
import { logoutUser } from '../services/UserService';
import { useAppDispatch } from '../app/hooks';
import { filter } from '../features/productSlice';
import { getSearchedProducts } from '../services/ProductService';
import { theme } from './Theme'

import { AppBar, Link, Box, Toolbar, Typography, Badge, Button, IconButton, Input } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite'
import { ThemeProvider } from '@mui/material/styles';

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const location = useLocation();

    const isLoggedIn = localStorage.getItem("_id")
    const { favorite, cart } = useSelector((state) => state.product);

    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [searchPage, setSearchPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')

    const fetchSearchedProducts = async () => {
        try {
            const response = await getSearchedProducts(searchValue, searchPage)
            setProducts(response.payload.products);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast(error);
            } else {
                toast("An error occurred");
            }
        }
    }
    useEffect(() => {
        if (searchValue.length === 0) return;
        fetchSearchedProducts();
    }, [searchValue])

    const loadMoreSearchProducts = async () => {
        try {
            const response = await getSearchedProducts(searchValue, searchPage)
            setProducts((prevState) => { return [...prevState, ...response.payload.products]; });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast(error);
            } else {
                toast("An error occurred");
            }
        }
    }

    useEffect(() => {
        if (searchPage === 1) return;
        loadMoreSearchProducts()
    }, [searchPage])



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
                        <Input placeholder='Search...' id="my-input" aria-describedby="my-helper-text" sx={{ mt: 5, width: '200px' }} inputProps={{ maxLength: 200 }} onChange={(event) => setSearchValue(event.target.value)} />

                        {searchValue.length === 0 && <Button variant="contained" onClick={(() => setPage(page + 1))}>Load More...</Button>}
                        {searchValue.length > 0 && <Button variant="contained" onClick={(() => setSearchPage(searchPage + 1))}>Load More...</Button>}
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
                                <Link href="/cart">
                                    <ShoppingCartIcon style={{ color: '#fff' }} />
                                </Link>
                            </Badge>
                        </IconButton>

                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>

    )
}

export default Navbar;