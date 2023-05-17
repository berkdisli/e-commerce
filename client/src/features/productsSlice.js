import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProducts } from '../services/ProductService'

export const readAllProduct = createAsyncThunk("api/products/all", async () => {
    const res = await getAllProducts();
    return res;
})

const initialState = {
    products: []
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(readAllProduct.fulfilled, (state, action) => {
            console.log(action.payload)
            state.products = action.payload
        });
        builder.addCase(readAllProduct.pending, (state, action) => {
            state.products = []
        });
        builder.addCase(readAllProduct.rejected, (state, action) => {
            state.products = []
        });
    }
})

//export const { } = productSlice.actions
export default productSlice.reducer