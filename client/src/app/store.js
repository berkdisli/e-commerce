import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import categoryReducer from "../features/categorySlice";
import productReducer from "../features/productSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        category: categoryReducer
    }
})

export default store