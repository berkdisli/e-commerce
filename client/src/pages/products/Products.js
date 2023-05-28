import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks';
import { filter } from '../../features/productSlice';
import { getAllProducts } from '../../services/ProductService';

import Product from './Product';

import { Button, Card, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const Products = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [products, setProducts] = useState([{ _id: '' }])

    const fetchAllProducts = async () => {
        const result = await getAllProducts();
        setProducts(result.payload.products);
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    const [filterBody, setFilterBody] = useState({});

    const handleFilter = (e) => {
        setFilterBody({ ...filterBody, [e.target.name]: e.target.name === 'price' ? e.target.value.split('-') : e.target.value })
    }

    const applyFilter = (e) => {
        e.preventDefault();
        console.log(filterBody)
        dispatch(filter(filterBody))
    }

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='products'>
            <Helmet>
                <title>Products Page</title>
            </Helmet>
            <button onClick={handleBackClick}>Back</button>
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
                            <FormControlLabel value="0-50" name="price" control={<Radio />} label="0-50€" />
                            <FormControlLabel value="50-100" name="price" control={<Radio />} label="50€-100€" />
                            <FormControlLabel value="100-200" name="price" control={<Radio />} label="100€-200€" />
                            <FormControlLabel value="200-500" name="price" control={<Radio />} label="200€-500€" />
                            <FormControlLabel value="500-1000" name="price" control={<Radio />} label="500€-1000€" />
                        </RadioGroup>

                        <FormLabel id="filter">Filter By Gender<hr /></FormLabel>
                        <RadioGroup
                            aria-labelledby="filter"
                            defaultValue="minimum"
                            name="gender"
                            onChange={handleFilter}
                        >
                            <FormControlLabel value="Men" control={<Checkbox />} label="Men" />
                            <FormControlLabel value="Women" control={<Checkbox />} label="Women" />
                            <FormControlLabel value="Kids" control={<Checkbox />} label="Kids" />
                        </RadioGroup>

                        <FormLabel id="filter">Filter By Size<hr /></FormLabel>
                        <RadioGroup
                            aria-labelledby="filter"
                            defaultValue="minimum"
                            name="size"
                            onChange={handleFilter}
                        >
                            <FormControlLabel value="XSmall" control={<Checkbox />} label="XSmall" />
                            <FormControlLabel value="Small" control={<Checkbox />} label="Small" />
                            <FormControlLabel value="Medium" control={<Checkbox />} label="Medium" />
                            <FormControlLabel value="Large" control={<Checkbox />} label="Large" />
                            <FormControlLabel value="XLarge" control={<Checkbox />} label="XLarge" />
                        </RadioGroup>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Apply
                        </Button>
                    </FormControl>
                </Card>
            </form>
            <div className='all__products'>
                {products?.length > 0 && products?.map((p) => <Product key={p._id} product={p} />)}
            </div>
        </div>
    );
};
export default Products