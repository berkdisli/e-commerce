import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAllProducts } from '../../services/ProductService';
import Product from '../products/Product';

const CategoryToProduct = () => {
    const { id } = useParams();

    const [products, setProducts] = useState([{ _id: '' }])

    const fetchAllProducts = async () => {
        const result = await getAllProducts();
        setProducts(result.payload.products);
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    return (
        <div className='all__products'>
            {products && products.filter((product) => product.category)?.map((product) => <Product key={product._id} product={product} />)}
        </div>
    )
}

export default CategoryToProduct