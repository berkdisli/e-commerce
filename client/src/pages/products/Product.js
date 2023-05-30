import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { addToCart, addToFavorite, removeFromFavorite } from '../../features/productSlice';
import { deleteProduct } from '../../services/ProductService';
import { useAppDispatch } from '../../app/hooks';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteForever from '@mui/icons-material/DeleteForever'
import Edit from '@mui/icons-material/Edit'
import MoreVert from '@mui/icons-material/MoreVert'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


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

    const handleCart = () => {
        dispatch(addToCart(product))
    }

    const handleDelete = async () => {
        const result = window.confirm("Want to delete?")
        if (result) {
            deleteProduct(slug)
        }
        navigate(`/products`)
    }

    return (
        <div className='product'>

            <Card sx={{ maxWidth: 250, maxHeight: 270 }}>

                <CardMedia
                    sx={{ height: 100, width: 100 }}
                    image={imageUrl}
                />
                <CardContent>
                    <Typography gutterBottom component="div">
                        {name}
                    </Typography>
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
    );
}

export default Product