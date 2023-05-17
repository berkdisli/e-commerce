import { useState } from 'react';
import { toast } from "react-toastify";
import { createCategory } from '../../services/CategoryService';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();
export const CreateCategory = () => {
    const [name, setName] = useState({});

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const newCategory = new FormData();
            newCategory.append("name", name);

            const response = await createCategory(newCategory);
            toast.success(response.message);
            setName("");

        } catch (err) {
            toast.error(err.response.data.error.message);
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
                        Create Category
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
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Category
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
