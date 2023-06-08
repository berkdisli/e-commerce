import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks';
import { filter, selectProducts } from '../../features/productSlice';
import { getAllProducts } from '../../services/ProductService';
import { theme } from '../../layout/Theme'
import Product from './Product';

import { Button, Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Text, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const Products = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [products, setProducts] = useState([{ _id: '' }])
    const [filterBody, setFilterBody] = useState({});
    const filterProducts = useSelector(selectProducts)

    const fetchAllProducts = async () => {
        const result = await getAllProducts();
        setProducts(result.payload.products);
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])


    const handleFilter = (event) => {
        setFilterBody({ ...filterBody, [event.target.name]: event.target.name === 'price' && 'name' ? event.target.value.split('-').map(price => Number(price), name => name) : event.target.value })
    }

    const applyFilter = (event) => {
        event.preventDefault();
        dispatch(filter(filterBody))
    }

    useEffect(() => {
        console.log(filterProducts)
        setProducts(filterProducts)
    }, [filterProducts]
    )

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <ThemeProvider theme={theme}>
            <Button
                variant="contained"
                onClick={handleBackClick}
            >
                Back
            </Button>
            <div className='products'>
                <Helmet>
                    <title>Products Page</title>
                </Helmet>
                <form onSubmit={applyFilter}>
                    <Card sx={{ minWidth: 200, minHeight: 500 }}>
                        <FormControl >
                            <FormLabel id="filter">Filter By Price<hr /></FormLabel>
                            <RadioGroup
                                aria-labelledby="filter"
                                defaultValue="minimum"
                                name="price"
                                onChange={handleFilter}
                            >
                                <FormControlLabel value="0-1000" name="price" control={<Radio />} label="all products" />
                                <FormControlLabel value="0-50" name="price" control={<Radio />} label="0-50€" />
                                <FormControlLabel value="50-100" name="price" control={<Radio />} label="50€-100€" />
                                <FormControlLabel value="100-200" name="price" control={<Radio />} label="100€-200€" />
                                <FormControlLabel value="200-500" name="price" control={<Radio />} label="200€-500€" />
                                <FormControlLabel value="500-1000" name="price" control={<Radio />} label="500€-1000€" />
                            </RadioGroup>
                            <RadioGroup>
                                <FormLabel id="filter">Filter By Name<hr /></FormLabel>
                                <TextField
                                    label="Search"
                                    name="filter"
                                    placeholder='Search...'
                                    type="string"
                                    onChange={handleFilter}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Apply
                                </Button>
                            </RadioGroup>
                        </FormControl>
                    </Card>
                </form>
                <div className='all__products'>
                    {products?.length > 0 && products?.map((product) => <Product key={product._id} product={product} />)}
                </div>
            </div>
        </ThemeProvider>
    );
};
export default Products