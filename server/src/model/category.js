import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
})

const Category = model("Product", categorySchema)

module.exports = Category;