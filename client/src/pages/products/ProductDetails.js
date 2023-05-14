import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getSingleProduct } from '../../services/ProductService';

const ProductDetails = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        image: 'image',
    });
    const imageUrl = 'http://localhost:8080/product/image/'

    const fetchProductDetails = async () => {
        try {
            const result = await getSingleProduct(slug);
            setProduct(result.product);
        } catch (err) {
            toast.error(err.response.data.message)
        }
    };
    useEffect(() => {
        fetchProductDetails()
    }, []);

    return (
        <div >
            {product && (
                <div className='product'>
                    <img className='image' src={`${imageUrl}${product.image}`} alt={product.name} />
                    <h2> {product.name} </h2>
                    <p> {product.description} </p>
                    <p> {product.price} </p>
                    <button>add to the cart</button>
                </div>
            )}
        </div>
    )
}

export default ProductDetails