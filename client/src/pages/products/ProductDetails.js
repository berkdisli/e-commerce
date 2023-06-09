import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

import { getSingleProduct } from '../../services/ProductService';
import { theme } from '../../layout/Theme'

import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';

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
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>Product Details Page</title>
            </Helmet>
            <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleBackClick}
            >
                Back
            </Button>
            {product && (
                <div className='product'>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Card>
                            <CardContent>
                                <Typography align="left" color="text.secondary">
                                    <img className='image' src={`${imageUrl}${product.image}`} alt={product.slug} />
                                    <h2> {product.name} </h2>
                                    <p> {product.description} </p>
                                    <p> €{product.price} </p>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Add to the Cart
                                    </Button>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </div>
            )
            }
        </ThemeProvider >

    )
}

export default ProductDetails