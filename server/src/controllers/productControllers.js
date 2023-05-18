const createError = require("http-errors")
const slugify = require('slugify')
const { successResponse } = require('../helpers/responseHandler');

let Product = require("../model/productModel")

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        console.log(products)
        return successResponse(res, {
            statusCode: 201,
            message: "all products returned",
            product: { products }
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: slug });

        if (!product) {
            throw createError(404, 'this product was not found')
        }

        return successResponse(res, {
            statusCode: 201,
            message: "single product returned",
            product: product
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, sold, inStock, size } = req.body;
        const { image } = req.file;
        if (image && image.size > 1024 * 1024 * 2)
            throw createError(400, "The image size is large, it must be less than 2mb")

        const product = await Product.findOne({ name: name });
        if (product) {
            throw createError(400, `Product with this name already exists, please create another name`
            )
        }

        if (!name || !description || !price || !category || !sold || !inStock || !size) {
            throw createError(400, `name, description, price, category, sold, quantity, instock or size is missing`
            );
        }

        if (name.length < 2) {
            throw createError(400, `min name length is 2 `);
        }

        const isProductExist = await Product.exists({ name: name })
        if (isProductExist) {
            throw new createError(400, 'a product with this name already exists')
        }

        const newProduct = await Product.create({
            name: name,
            slug: slugify(name),
            description: description,
            price: price,
            sold: sold,
            category: category,
            inStock: inStock,
            size: size,
            image: image,

        })

        //save the product
        const saveProduct = await newProduct.save();

        if (!saveProduct) {
            throw createError(400, `The product was not created`
            )
        }

        return successResponse(res, {
            statusCode: 200,
            message: "The product was created",
            product: newProduct
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const filter = { slug: req.params.slug }
        const options = { new: true }
        const image = req?.file?.filename
        const updates = {}
        Object.keys(req.body).forEach((property) => {
            if (req.body[property]) {
                updates[property] = req.body[property]
            }
        })
        if (image) updates['image'] = image
        const updatedData = await Product.findOneAndUpdate(filter, updates, options)
        if (!updatedData) throw createError(404, 'the product was not found')

        successResponse(res, {
            statusCode: 201,
            message: 'the product was updated successfully'
        })
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { slug } = req.params
        const deleteTheProduct = await Product.findOneAndDelete({ slug: slug })
        if (!deleteTheProduct) throw createError(404, 'the product was not found')

        successResponse(res, {
            statusCode: 200,
            message: 'the product was deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}

const searchProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 3 } = req.query
        const searchValue =
            typeof req.query.searchValue === 'string'
                ? req.query.searchValue.trim()
                : ''
        let filter = {}
        const searchRegExpr = new RegExp('.*' + searchValue + '.*', 'i')
        if (searchValue) {
            filter = {
                $or: [
                    { name: { $regex: searchRegExpr } },
                    { description: { $regex: searchRegExpr } },
                ],
            }
        }
        const products = await Product.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })

        const count = await Product.find().countDocuments()
        return successResponse(res, {
            statusCode: 201,
            message: 'Searched products returned successfully!'
        },
            {
                products,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page - 1,
                nextPage: page + 1,
                totalNumberOfProducts: count,
            }
        )
    } catch (error) {
        next(error)
    }
}


module.exports = { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct, searchProducts }