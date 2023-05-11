const express = require("express");

const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/productControllers");
const { isLoggedIn } = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/upload");
const runValidation = require("../middlewares/validators");
const { validateCategory } = require("../middlewares/validators/categoryValidator");

const productRouter = express.Router();

productRouter.route("/")
    .get(isLoggedIn, isAdmin, getAllProducts)
    .post(validateCategory, runValidation, isLoggedIn, isAdmin, upload.single('image'), createProduct);

productRouter.route("/:slug")
    .get(validateCategory, runValidation, isLoggedIn, isAdmin, getSingleProduct)
    .put(validateCategory, runValidation, isLoggedIn, isAdmin, upload.single('image'), updateProduct)
    .delete(validateCategory, runValidation, isLoggedIn, isAdmin, deleteProduct);


module.exports = productRouter;
