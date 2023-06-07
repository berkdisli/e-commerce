const express = require("express");

const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct, filterProducts } = require("../controllers/productControllers");
const { isLoggedIn } = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/productUpload");
const runValidation = require("../middlewares/validators");

const productRouter = express.Router();

productRouter.route("/")
    .get(getAllProducts)
    .post(upload.single('image'), createProduct);

productRouter.route("/:slug")
    .get(getSingleProduct)
    .put(upload.single('image'), updateProduct)
    .delete(deleteProduct);

productRouter.post('/filter', filterProducts)


module.exports = productRouter;
