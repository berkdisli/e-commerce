import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';

import { Card, Checkbox } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { getAllProducts } from '../../services/ProductService';
import Product from './Product';


const Products = () => {
    const [products, setProducts] = useState([{ _id: '' }])

    const fetchAllProducts = async () => {
        const result = await getAllProducts();
        console.log(result)
        setProducts(result.payload.products);
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    return (
        <div className='products'>
            <Helmet>
                <title>Products Page</title>
            </Helmet>
            <Card sx={{ minWidth: 250, minHeight: 500 }}>
                <FormControl>
                    <FormLabel id="filter">Filter</FormLabel>
                    <RadioGroup
                        aria-labelledby="filter"
                        defaultValue="minimum"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="Men" control={<Checkbox />} label="Men" />
                        <FormControlLabel value="Women" control={<Checkbox />} label="Women" />
                        <FormControlLabel value="Kids" control={<Checkbox />} label="Kids" />

                        <FormControlLabel value="XSmall" control={<Checkbox />} label="XSmall" />
                        <FormControlLabel value="Small" control={<Checkbox />} label="Small" />
                        <FormControlLabel value="Medium" control={<Checkbox />} label="Medium" />
                        <FormControlLabel value="Large" control={<Checkbox />} label="Large" />
                        <FormControlLabel value="XLarge" control={<Checkbox />} label="XLarge" />

                    </RadioGroup>

                    <RadioGroup
                        aria-labelledby="filter"
                        defaultValue="Medium"
                        name="radio-buttons-group"
                    >
                        <FormLabel id="filter">Sorting</FormLabel>
                        <FormControlLabel value="shotbyname" control={<Radio />} label="Sort by name" />
                        <FormControlLabel value="medium" control={<Radio />} label="Sort by price" />
                    </RadioGroup>
                </FormControl>
            </Card>
            <div className='all__products'>
                {products?.length > 0 && products?.map((product) => <Product key={product._id} product={product} />)}
            </div>
        </div>
    );
};

export default Products