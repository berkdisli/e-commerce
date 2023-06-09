import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { addToCart, addToFavorite, removeFromFavorite, removeFromCart } from '../../features/productSlice';
import { deleteProduct } from '../../services/ProductService';
import { useAppDispatch } from '../../app/hooks';
import { theme } from '../../layout/Theme'

import { CardActions, Card, CardContent, CardMedia, Typography } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteForever from '@mui/icons-material/DeleteForever'
import Edit from '@mui/icons-material/Edit'
import MoreVert from '@mui/icons-material/MoreVert'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ThemeProvider } from '@mui/material/styles';


const Product = (props) => {

    const navigate = useNavigate();

    const { product } = props;
    const { _id, name, image, price, slug } = product;

    const imageUrl = 'http://localhost:8080/image/' + image;
    const dispatch = useAppDispatch();
    const { favorite, cart } = useSelector((state) => state.product);

    const handleDetailsPage = (slug) => {
        navigate(`/products/${slug}`)
    }

    const handleFavorite = () => {
        dispatch(addToFavorite(_id))
    }

    const removeFavorite = () => {
        dispatch(removeFromFavorite(_id))
    }

    const handleCart = () => {
        dispatch(addToCart(product))
    }

    const removeCart = () => {
        dispatch(removeFromCart(product))
    }

    const handleDelete = async () => {
        const result = window.confirm("Want to delete?")
        if (result) {
            deleteProduct(slug)
        }
        navigate(`/products`)
    }

    return (
        <ThemeProvider theme={theme}>
            <div className='product'>
                <Card sx={{ maxWidth: 250, maxHeight: 270 }}>
                    <CardMedia
                        sx={{ height: 100, width: 100 }}
                        image={imageUrl}
                    />
                    <CardContent>
                        {name}
                        <Typography color="text.secondary" variant="body2">
                            price : € {price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <FavoriteIcon color={favorite.includes(_id) ? 'secondary' : 'black'} onClick={handleFavorite} cursor='pointer' />
                        <ShoppingCartIcon color={cart.includes(product) ? 'primary' : 'black'} onClick={handleCart} cursor='pointer' />
                        <DeleteForever onClick={() => handleDelete()} cursor='pointer' />
                        <MoreVert onClick={() => { handleDetailsPage(slug) }} cursor='pointer' />
                    </CardActions>
                </Card>
            </div>
        </ThemeProvider>
    );
}

export default Product