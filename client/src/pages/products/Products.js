import React, { useState, useEffect } from 'react'
import Product from './Product'
import { getAllProducts } from '../../services/ProductService';

const Products = () => {
    const [products, setProducts] = useState([{ _id: '' }])

    const fetchAllProducts = async () => {
        const result = await getAllProducts();
        setProducts(result.product.products);
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    return (
        <div>
            <h1>All Products</h1>
            {products?.length > 0 && products?.map((product) => <Product key={product._id} product={product} />)}
        </div>
    );
};

export default Products