import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCategories } from '../services/CategoryService';

export const allCategories = createAsyncThunk("api/categories/", async () => {
    const res = await getAllCategories();
    return res;
})

const initialState = {
    categorys: []
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        search: (state, action) => {

        }
    },
    extraReducers: (builder) => {

        builder.addCase(allCategories.fulfilled, (state, action) => {
            state.categorys = action.payload
        });

        builder.addCase(allCategories.pending, (state, action) => {
            state.categorys = []
        });

        builder.addCase(allCategories.rejected, (state, action) => {
            state.categorys = []
        });
    }
})

export const { search } = categorySlice.actions
export default categorySlice.reducer