import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import React, { useState, useEffect } from 'react';
import { addToCart, removeFromCart } from '../features/productSlice';
import product from '../app/store';
import { useSelector } from 'react-redux';

const Cart = () => {
    const { cart } = useSelector((state) => state.product);
    const [eCart, seteCart] = useState([])
    console.log(cart)

    useEffect(() => {
        seteCart(cart.map((c) => {
            //this will add a quantity property in the product JSON
            return { ...c, quantity: cart.filter((f) => f._id === c._id).length }
        }).filter((v, i, s) => {
            // This will remove the duplicate value from the array
            return i === s.findIndex((t) => t._id === v._id)
        }).map((fc) => {
            // This will calculate the total price i.e. price * quantity
            return { ...fc, price: fc.quantity * fc.price }
        }))
    }, [cart]);

    console.log(cart)
    const total = eCart.reduce((partialSum, a) => partialSum + a.price, 0);
    const dispatch = useAppDispatch();

    const increaseQuantity = (product) => {
        dispatch(addToCart(product))
    }

    const decreseQuantity = (product) => {
        dispatch(removeFromCart(product))
    }
    return (
        <div className='cart'>
            <TableContainer component={Paper}>
                <h4>Total Price: {total} € </h4>
                <Button type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={total === 0}
                >Proceed to payment</Button>
                <Table sx={{ minWidth: 200 }} aria-label="simple table" style={{ textAlign: 'center' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eCart && eCart.map((c, index) => (
                            <TableRow key={index}>
                                <TableCell align="right">
                                    <img style={{ width: "60px", height: "60px" }} src={'http://localhost:8080/products/image/' + c.image} alt='product' />
                                </TableCell>
                                <TableCell align="right">{c.name}</TableCell>
                                <TableCell align="right">{c.price} €</TableCell>
                                <TableCell align="right">
                                    <button onClick={() => increaseQuantity(c)}>+</button>
                                    {c.quantity}
                                    <button onClick={() => decreseQuantity(c)}>-</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>

        </div>
    )
}

export default Cart;