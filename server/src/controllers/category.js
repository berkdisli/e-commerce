const createError = require("http-errors")
const slugify = require('slugify')

const { successResponse, errorResponse } = require('../helpers/responseHandler');
let Category = require("../model/category")

const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await Category.create({
            name: name,
            slug: slugify(name)
        });

        return successResponse(res, {
            statusCode: 201,
            message: 'Category was created successfully',
            payload: { category: category }
        })
    } catch (err) {
        next(err)
    }
}

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({})
        res
            .status(201)
            .json({ message: 'categories return successfully', category: categories })
    } catch (error) {
        next(error)
    }
}

const getSingleCategory = async (req, res, next) => {
    try {
        const { slug } = req.params
        const Categories = await Category.findOne({ slug: slug }).select(
            'name slug'
        )

        res
            .status(201)
            .json({ message: 'category return successfully', category: Categories })
    } catch (error) {
        next(error)
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const { name } = req.body
        const filter = { slug: req.params.slug }
        const updates = {
            $set: {
                name: name,
                slug: slugify(name),
            },
        }
        const options = { new: true }
        const updatedData = await Category.findOneAndUpdate(
            filter,
            updates,
            options
        )
        if (!updatedData) return errorResponse(res, {
            ok: false,
            message: `the user couldn't be updated`,
            data: updatedData
        });


        return successResponse(res,
            {
                statusCode: 201,
                message: 'category was updated successfully'
            })
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const categories = await Category.find();
        return successResponse(res, {
            statusCode: 200,
            message: `'${name}'category was deleted successfully`,
            payload: categories
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};



module.exports = { createCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory }