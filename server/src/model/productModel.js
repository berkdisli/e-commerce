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
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    category: {
        type: String,
        required: true,
        minlength: 2,
        ref: 'Category',
    },
    variants: {
        type: String,
    },
    sizes: {
        type: Number,
    },
    image: {
        type: String,
        default: "../../public/images/1681998504104-portfolio.png",
        required: true
    },
},
    { timestamps: true }
)

const Product = model("Product", productSchema)

module.exports = Product;