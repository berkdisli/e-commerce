import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCategories } from '../services/CategoryService';

export const allCategory = createAsyncThunk("api/categorys/all", async () => {
    const res = await getAllCategories();
    return res;
})

const initialState = {
    categorys: []
}

export const categorySlice = createSlice({
    name: 'categorys',
    initialState,
    reducers: {
        search: (state, action) => {

        }
    },
    extraReducers: (builder) => {

        builder.addCase(allCategory.fulfilled, (state, action) => {
            state.categorys = action.payload
        });

        builder.addCase(allCategory.pending, (state, action) => {
            state.categorys = []
        });

        builder.addCase(allCategory.rejected, (state, action) => {
            state.categorys = []
        });
    }
})

export const { search } = categorySlice.actions
export default categorySlice.reducer