const express = require("express");

const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/productControllers");
const { isLoggedIn } = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/productUpload");
const runValidation = require("../middlewares/validators");

const productRouter = express.Router();

productRouter.route("/")
    .get(getAllProducts)
    .post(runValidation, upload.single('image'), createProduct);

productRouter.route("/:slug")
    .get(runValidation, getSingleProduct)
    .put(runValidation, upload.single('image'), updateProduct)
    .delete(runValidation, deleteProduct);


module.exports = productRouter;
