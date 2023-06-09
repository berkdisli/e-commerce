import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProducts, getFilteredProducts } from '../services/ProductService'

export const readAllProduct = createAsyncThunk("api/products/", async () => {
    const res = await getAllProducts();
    return res;
})

export const filter = createAsyncThunk("api/products/filter", async (body) => {
    const res = await getFilteredProducts(body);
    return res;
})

const initialState = {
    all_products: [],
    favorite: [],
    cart: []
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        removeProduct: (state, action) => {
            state.all_products = state.all_products?.filter((products) => products.slug !== action.payload)
        },
        addToFavorite: (state, action) => {
            if (state.favorite.includes(action.payload)) {
            } else {
                state.favorite.push(action.payload)
            }
        },
        removeFromFavorite: (state, action) => {
            state.favorite = state.favorite.map((favorite) => favorite._id !== action.payload._id)
        },
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload]
            console.log(action.payload)
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((c) => c._id !== action.payload._id)
        }
    },
    extraReducers: (builder) => {

        builder.addCase(readAllProduct.fulfilled, (state, action) => {
            state.all_products = action.payload
        });
        builder.addCase(readAllProduct.pending, (state, action) => {
            state.all_products = []
        });
        builder.addCase(readAllProduct.rejected, (state, action) => {
            state.all_products = []
        });

        builder.addCase(filter.fulfilled, (state, action) => {
            state.all_products = action.payload.payload.products
        });
        builder.addCase(filter.pending, (state, action) => {
            state.all_products = []
        });
        builder.addCase(filter.rejected, (state, action) => {
            state.all_products = []
        });
    }
})

export const { addToCart, removeFromCart, removeProduct, addToFavorite, removeFromFavorite } = productSlice.actions
export default productSlice.reducer
export const selectProducts = (state) => state.product.all_products;