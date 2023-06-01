const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: [2, 'Category name must be at least 2 characters'],
        maxlength: [30, 'Category name must be at least 30 characters'],
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    image: {
        type: String
    }
},
    { timestamps: true }
)

const Category = model("Category", categorySchema)

module.exports = Category;