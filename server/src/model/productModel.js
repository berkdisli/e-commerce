const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: [2, 'Product name must be at least 2 characters'],
        required: true
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    category: {
        type: Schema.ObjectId,
        minlength: 2,
        ref: 'Category',
        required: true,
    },
    inStock: {
        type: Number,
        default: 0,
        min: 0,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
        required: true,
    },
    size: {
        type: String,
        enum: ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'],
        required: false,
    },
    image: {
        type: String
    },
},
    { timestamps: true }
)

const Product = model("Product", productSchema)

module.exports = Product;