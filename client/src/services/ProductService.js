import axios from 'axios'

const baseURL = "http://127.0.0.1:8080" || "http://localhost:8080";

export const getAllProducts = async () => {
    const response = await axios.get(`${baseURL}/api/products/`)
    return response.data
}

export const getSingleProduct = async (slug) => {
    const response = await axios.get(`${baseURL}/api/products/`, slug)
    return response
}

export const createProduct = async (product) => {
    const response = await axios.post(`${baseURL}/api/products/`, product)
    return response
}

export const updateProduct = async (product) => {
    const response = await axios.put(`${baseURL}/api/products/`, product)
    return response
}

export const deleteProduct = async (slug) => {
    const response = await axios.delete(`${baseURL}/api/products/`, slug)
    return response
}

