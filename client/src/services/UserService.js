import axios from "axios";
axios.defaults.withCredentials = true;
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
    try {
        const response = await axios.post(`${baseURL}/api/users/login`, user);
        return response;
    } catch (error) {
        console.log(error)
    }

};

export const logoutUser = async () => {
    const response = await axios.get(`${baseURL}/api/users/logout`);
    return response.data;
};

export const getRefreshToken = async () => {
    const response = await axios.get(`${baseURL}/api/users/refresh-token`);
    return response.data;
};

export const resetPassword = async (user) => {
    const response = await axios.post(`${baseURL}/api/users/reset-password`, user)
    return response
}

export const verifyPassword = async (token) => {
    const response = await axios.post(`${baseURL}/api/users/verify-password`, { token })
    return response
}

// users

export const updateUser = async (id, user) => {
    const response = await axios.put(`${baseURL}/api/users/${id}`, user)
    return response
}

export const deleteUser = async (id) => {
    const response = await axios.delete(`${baseURL}/api/users/${id}`)
    return response
}

export const getUserProfile = async (id) => {
    const response = await axios.get(`${baseURL}/api/users/profile/${id}`);
    return response;
};

//admin

export const getAllUsers = async () => {
    const response = await axios.get(`${baseURL}/api/admin/dashboard`)
    return response
}

export const updateUserByAdmin = async (id, user) => {
    const response = await axios.get(`${baseURL}/admin/users/dashboard/${id}`, user)
    return response
}

export const deleteUserByAdmin = async (id) => {
    const response = await axios.get(`${baseURL}/admin/users/dashboard/${id}`)
    return response
}
