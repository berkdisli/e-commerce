const createError = require("http-errors")
const slugify = require('slugify')

let Product = require("../model/productModel")

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            message: "all products returned",
            products: products
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            message: "single product returned",
            products: products
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const { image } = req.file;
        if (image && image.size > 1024 * 1024 * 2)
            throw createError(400, "The image size is large, it must be less than 2mb")

        const product = await Product.findOne({ name: name });
        if (product) {
            throw createError(400, `Product with this name already exists, please create another name`
            )
        }

        if (!name || !description || !price || !category) {
            throw createError(404, `name, description, price or category is missing`
            );
        }

        if (name.length < 2) {
            throw createError(404, `min name length is 2 `);
        }

        const newProduct = new Product({
            name: name,
            slug: slugify(title),
            description: description,
            category: category,
            image: image
        })

        //save the product
        const saveProduct = await newProduct.save();

        if (!saveProduct) {
            throw createError(400, `The product was not created`
            )
        }

        return res.status(200).json({
            success: true,
            message: "The product was created",
            products: newProduct
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            message: "the product was succesfully updated ",
            products: products
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            message: "the product was deleted successfully",
            products: products
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


module.exports = { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct }