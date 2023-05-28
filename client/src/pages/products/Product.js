import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Product = (props) => {

    const navigate = useNavigate();
    const handleDetailsPage = (slug) => {
        navigate(`/products/${slug}`)
    }

    const { name, image, price, slug } = props.product;

    const imageUrl = `http://localhost:8080/images/products/1684350838245-jean.jpg`;

    return (
        <div className='product'>
            <Card sx={{ maxWidth: 250, maxHeight: 270, display: 'flex', flexDirection: 'column' }}>
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
                    <Typography color="text.secondary" variant="body2">
                        <img src={`http://localhost:8080/${image}`} alt={name} />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => { handleDetailsPage(slug) }}>View more</Button>
                    <Button size="small">Add to cart</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Product