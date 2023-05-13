import axios from "axios";
const baseURL = "http://127.0.0.1:8080" || "http://localhost:8080";

// auth

export const registerUser = async (newUser) => {
    const response = await axios.post(`${baseURL}/api/users/register`, newUser);
    return response.data;
};

export const activateUser = async (token) => {
    const response = await axios.post(`${baseURL}/api/users/activate`, { token });
    return response.data;
};

export const loginUser = async (user) => {
    const response = await axios.post(`${baseURL}/api/users/login`, user);
    return response.data;
};

export const logoutUser = async (user) => {
    const response = await axios.post(`${baseURL}/api/users/logout`, user);
    return response.data;
};

export const getRefreshToken = async () => {
    const response = await axios.get(`${baseURL}/api/users/refresh-token`);
    return response.data;
};

export const resetPassword = async (user) => {
    const response = await axios.post('http://localhost:8080/api/users/reset-password', user)
    return response
}

export const verifyPassword = async (token) => {
    const response = await axios.post('http://localhost:8080/api/users/verify-password', { token })
    return response
}

// users

export const updateUser = async (id, user) => {
    const response = await axios.put(`http://localhost:8080/api/users/${id}`, user)
    return response
}

export const deleteUser = async (id) => {
    const response = await axios.delete(`http://localhost:8080/api/users/${id}`)
    return response
}

//admin

export const getAllUsers = async () => {
    const response = await axios.get(`http://localhost:8080/api/admin/dashboard/`)
    return response
}

export const updateUserByAdmin = async (user) => {
    const response = await axios.get(`http://localhost:8080/api/admin/dashboard/${id}`, user)
    return response
}

export const deleteUserByAdmin = async () => {
    const response = await axios.get(`http://localhost:8080/api/admin/dashboard/${id}`)
    return response
}
