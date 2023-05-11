import axios from 'axios'

const baseURL = "http://127.0.0.1:8080" || "http://localhost:8080";

export const getAllProductsReq = async () => {
    const response = await axios.get(`${baseURL}/api/products/`)
    return response.data
}

export const getSingleProductReq = async (slug) => {
    const response = await axios.get(`${baseURL}/api/products/`, slug)
    return response
}

export const createProductReq = async (product) => {
    const response = await axios.post(`${baseURL}/api/products/`, product)
    return response
}

export const updateProductReq = async (product) => {
    const response = await axios.put(`${baseURL}/api/products/`, product)
    return response
}

export const deleteProductReq = async (slug) => {
    const response = await axios.delete(`${baseURL}/api/products/`, slug)
    return response
}

