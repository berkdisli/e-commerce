import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getSingleProduct } from '../../services/ProductService';

const ProductDetails = () => {
    const navigate = useNavigate()
    const { slug } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        image: 'image',
    });
    const imageUrl = 'http://localhost:8080/image/'

    const fetchProductDetails = async () => {
        try {
            const response = await getSingleProduct(slug);
            setProduct(response.data.payload.product);
        } catch (err) {
            toast.error(err.response.data.message)
        }
    };
    useEffect(() => {
        fetchProductDetails()
    }, []);

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div >
            <Helmet>
                <title>Product Details Page</title>
            </Helmet>
            <button onClick={handleBackClick}>Back</button>
            {product && (
                <div className='product'>
                    <img className='image' src={`${imageUrl}${product.image}`} alt={product.slug} />
                    <h2> {product.name} </h2>
                    <p> {product.description} </p>
                    <p> {product.price} </p>
                    <button>Add to the cart</button>
                </div>
            )}
        </div>
    )
}

export default ProductDetails