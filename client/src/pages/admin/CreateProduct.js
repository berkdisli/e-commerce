import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createProduct, updateProduct } from '../../services/ProductService';
import { allCategories } from '../../features/categorySlice';
import { theme } from '../../layout/Theme'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { FormLabel, Input, MenuItem, Select } from '@mui/material';
import { getAllCategories } from '../../services/CategoryService';

export const CreateProduct = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState({
        name: '',
        slug: '',
        description: '',
        price: 0,
        category: '',
        inStock: 0,
        sold: 0,
        size: '',
        image: ''
    })

    const [categories, setCategories] = useState([{ _id: '' }])

    const fetchAllCategories = async () => {
        const result = await getAllCategories();
        setCategories(result.payload.category);
    }

    useEffect(() => {
        fetchAllCategories()
    }, [])

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setProduct({
            ...product,
            [name]: name === 'image' ? files[0] : value,
        });

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (slug) {
                const updateResponse = await updateProduct(slug, product);
                toast.success(updateResponse.message)
            } else {
                const createResponse = await createProduct(product)
                toast.success(createResponse.message)
            }
        } catch (err) {
            toast.error(err?.message)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" >
                        {slug ? 'Update' : 'Create'} Product
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    id="category"
                                    name="category"
                                    required
                                    type='Object'
                                    fullWidth
                                    defaultValue=""
                                    onChange={handleChange} >
                                    {categories?.map((category) => <MenuItem key={category?._id} value={category?._id}>{category?.name}</MenuItem>)}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Description"
                                    multiline
                                    rows={4}
                                    placeholder="Enter text here"
                                    variant="outlined"
                                    id="description"
                                    name="description"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="price"
                                    label="Price"
                                    type="number"
                                    id="price"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="inStock"
                                    label="In stock"
                                    id="inStock"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="sold"
                                    label="Sold"
                                    type="number"
                                    id="sold"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="size"
                                    label="Product size"
                                    type="string"
                                    id="size"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel>product image</FormLabel>
                                <Input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {slug ? 'Update' : 'Create'} Product
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}


