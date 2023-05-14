const createError = require("http-errors")
const slugify = require('slugify')

const { successResponse, errorResponse } = require('../helpers/responseHandler');
let Category = require("../model/category")

const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw createError(400, 'name cannot be empty')
        }
        const newCategory = await Category.create({
            name: name,
            slug: slugify(name)
        });

        const categoryData = await newCategory.save()

        return successResponse(res, {
            statusCode: 201,
            message: 'the category was created successfully',
            payload: categoryData
        })
    } catch (err) {
        next(err)
    }
}

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({})
        return successResponse(res, {
            statusCode: 201,
            message: 'categories returned successfully',
            payload: { category: categories }
        })
    } catch (error) {
        next(error)
    }
}

const getSingleCategory = async (req, res, next) => {
    try {
        const { slug } = req.params
        const category = await Category.findOne({ slug: slug }).select(
            'name slug'
        )

        return successResponse(res, {
            statusCode: 201,
            message: 'the category returned successfully',
            payload: { category: category }
        })
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


        return successResponse(res, {
            statusCode: 201,
            message: 'the category was updated successfully'
        })
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { slug } = req.params
        const deletedCategory = await Category.findOneAndDelete({ slug: slug })
        if (!deletedCategory) throw new createError(400, 'the category was not found')

        return successResponse(res, {
            statusCode: 201,
            message: 'the category was deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}



module.exports = { createCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory }