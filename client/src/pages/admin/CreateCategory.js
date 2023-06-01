import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';

import { createCategory, updateCategory, getSingleCategory } from '../../services/CategoryService';
import { theme } from '../../layout/Theme'

import { ThemeProvider } from '@mui/material/styles';
import { FormLabel, Input, Button, TextField, Grid, Box, Typography, Container, CssBaseline } from '@mui/material';

export const CreateCategory = () => {
    const [category, setCategory] = useState({
        name: '',
        slug: '',
        image: '',
    })


    const { slug } = useParams();
    //fetch single category
    const fetchCategory = async (slug) => {
        const singleCategory = await getSingleCategory(slug)
        setCategory(singleCategory?.category)
    }

    useEffect(() => {
        if (slug) {
            fetchCategory(slug)
        }
    }, [slug])


    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setCategory({
            ...category,
            [name]: name === 'image' ? files[0] : value,
        });

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (slug) {
                const updateResponse = await updateCategory(slug, category);
                toast.success(updateResponse.message)
            } else {
                const createResponse = await createCategory(category)
                toast.success(createResponse.message)
            }
        } catch (err) {
            toast.error(err?.message)
        }
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
                        {slug ? 'Update' : 'Create'} Category
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="category name"
                                    autoFocus
                                    onChange={handleChange}
                                    value={category?.name}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormLabel>Category image</FormLabel>
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
                            {slug ? 'Update' : 'Create'} Category
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

