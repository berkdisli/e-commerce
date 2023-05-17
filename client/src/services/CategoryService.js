import axios from 'axios'

const baseURL = "http://127.0.0.1:8080" || "http://localhost:8080";

export const getAllProducts = async () => {
    const response = await axios.get(`${baseURL}/api/categories/`)
    return response.data
}

export const getSingleProduct = async (slug) => {
    const response = await axios.get(`${baseURL}/api/categories/${slug}`,)
    return response
}

export const createProduct = async (category) => {
    const response = await axios.post(`${baseURL}/api/categories/`, category)
    return response
}

export const updateProduct = async (slug) => {
    const response = await axios.put(`${baseURL}/api/categories/${slug}`)
    return response
}

export const deleteProduct = async (slug) => {
    const response = await axios.delete(`${baseURL}/api/categories/${slug}`)
    return response
}
