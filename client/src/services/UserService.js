import axios from "axios";
const baseURL = "http://127.0.0.1:8080" || "http://localhost:8080";

export const registerUser = async (newUser) => {
    const response = await axios.post(`${baseURL}/api/users/register`, newUser);
    return response.data;
};

export const activateUser = async (token) => {
    const response = await axios.post(`${baseURL}/api/users/activate`, token);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${baseURL}/api/users/login`, userData);
    return response.data;
};

export const logoutUser = async (user) => {
    const response = await axios.post(`${baseURL}/api/users/logout`, user);
    return response.data;
};