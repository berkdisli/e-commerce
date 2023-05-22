import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "../pages/Home";
import Register from "../pages/users/Register";
import Login from "../pages/users/Login";
import Activate from "../pages/users/Activate";
import UserProfile from "../pages/users/UserProfile";
import ResetPassword from "../pages/users/ResetPassword";
import VerifyPassword from "../pages/users/VerifyPassword";
import ProductDetails from "../pages/products/ProductDetails";
import Products from "../pages/products/Products";
import { CreateProduct } from "../pages/admin/CreateProduct";
import { CreateCategory } from "../pages/admin/CreateCategory";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";


const Index = () => {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Navbar />
            <Routes>
                {/* users, auth */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/api/users/activate/:token" element={<Activate />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/" element={<UserProfile />} />
                <Route path='/reset-password' element={<ResetPassword />} />
                <Route path='reset-password/:token' element={<VerifyPassword />} />

                {/* products */}
                <Route path='/products' element={<Products />} />
                <Route path='/products/:slug' element={<ProductDetails />} />

                {/* admin */}
                <Route path="/admin/createProduct" element={<CreateProduct />} />
                <Route path="/admin/createCategory" element={<CreateCategory />} />

            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Index;