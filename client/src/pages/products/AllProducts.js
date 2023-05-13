import { useEffect, useState } from "react";
import Products from "./Products";
import { getAllProducts } from "../../services/ProductService";

const AllProducts = () => {
    const [products, setproducts] = useState([])
    const fetchAllProducts = async () => {
        const response = await getAllProducts()
        setproducts(response.products)
    }
    useEffect(() => {
        fetchAllProducts()
    }, [])
    return (
        <div className="main" >
            {products.length > 0 && <Products products={products} />}
        </div>
    );
}

export default AllProducts;