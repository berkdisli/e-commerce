import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const Category = (props) => {
    const { name } = props.category;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link to="/products">
                    <Button size="small" color="primary">
                        View Products
                    </Button>
                </Link>
            </CardActions>
        </Card>

    );
}

export default Category;