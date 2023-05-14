import React from 'react'
import { useNavigate } from 'react-router-dom';

const Product = (props) => {
    const navigate = useNavigate();
    const handleDetailsPage = (slug) => {
        navigate(`/product/${slug}`)
    }
    const { name, description, image, price, slug } = props.product;
    const imageUrl = 'http://localhost:8080/product/image/' + image;
    return (
        <div className='product'>
            <img className='image' src={imageUrl} alt={name} />
            <h2> {name} </h2>
            <p> {price} </p>
            <p> {description} </p>
            <button onClick={() => { handleDetailsPage(slug) }}>view more</button>
            <button>add to the cart</button>

        </div>
    );
}

export default Product