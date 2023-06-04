import { useNavigate, Link } from 'react-router-dom';

import { deleteCategory } from '../../services/CategoryService';

import { Button, CardActionArea, CardActions, Card, CardContent, CardMedia, Typography } from '@mui/material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';

const Category = (props) => {
    const navigate = useNavigate();
    const { _id, name, image, slug } = props.category;
    const imageUrl = 'http://localhost:8080/category/image/' + image;

    const handleDelete = () => {
        const result = window.confirm("Want to delete?")
        if (result) {
            deleteCategory(slug)
        }
    }

    const handleUpdate = () => {
        navigate(`/admin/updateCategory/${slug}`)
    }

    const handleViewCategoryProducts = (slug) => {

    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl} alt={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => { handleViewCategoryProducts(slug) }}>
                    <Link to={'/category/' + _id + '/product'}>View Products</Link>
                </Button>
                <DeleteForever onClick={() => handleDelete()} cursor='pointer' />
                <Edit onClick={() => { handleUpdate() }} cursor='pointer' />
            </CardActions>
        </Card>

    );
}

export default Category;