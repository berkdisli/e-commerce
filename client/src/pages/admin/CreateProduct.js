import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { createProduct } from '../../services/ProductService';
import { allCategories } from '../../features/categorySlice';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormLabel, Input, MenuItem, Select } from '@mui/material';

const theme = createTheme();
export const CreateProduct = () => {
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
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    const { category } = categories;

    useEffect(() => {
        dispatch(allCategories())
    }, [dispatch])

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setProduct({
            ...product,
            [name]: name === 'image' ? files[0] : value,
        });

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await createProduct(product)
        console.log(data)

        setProduct({
            name: '',
            slug: '',
            description: '',
            price: 0,
            category: '',
            inStock: 0,
            sold: 0,
            size: '',
            image: '',
        })
    };


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
                        Create Product
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Product name"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Product description"
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
                                    label="Product price"
                                    type="number"
                                    id="price"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel>Product category</FormLabel>
                                <Select
                                    id="category"
                                    name="category"
                                    required
                                    defaultValue=""
                                    onChange={handleChange} >
                                    {category?.map((c) => <MenuItem key={c?._id} value={c?._id}>{c?.name}</MenuItem>)}

                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="inStock"
                                    label="inStock"
                                    id="inStock"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="sold"
                                    label="Product sold"
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
                                    type="number"
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
                            Create product
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}


