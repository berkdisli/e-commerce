import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProducts } from '../services/ProductService'

export const getAllProducts = createAsyncThunk("api/products/all", async () => {
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

        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            console.log(action.payload)
            state.products = action.payload
        });
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.products = []
        });
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.products = []
        });
    }
})

//export const { } = productSlice.actions
export default productSlice.reducer