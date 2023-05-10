const createError = require("http-errors")
const slugify = require('slugify')

const { successResponse } = require('../helpers/responseHandler');
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
        const categories = await Category.find({});

        return successResponse(res, {
            statusCode: 201,
            message: 'Categories were returned successfully',
            payload: { categories }
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { createCategory, getAllCategories }