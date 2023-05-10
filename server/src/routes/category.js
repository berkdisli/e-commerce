const express = require("express");
const session = require("express-session");

const upload = require("../middlewares/upload")
const dev = require("../config");
const { validateCategory } = require("../middlewares/validators/categoryValidator");
const runValidation = require("../middlewares/validators");
const { createCategory, getAllCategories } = require("../controllers/category");
const { isLoggedIn } = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const categoryRouter = express.Router();

categoryRouter.route("/")
    .get(validateCategory, runValidation, isLoggedIn, isAdmin, getAllCategories)
    .post(validateCategory, runValidation, isLoggedIn, isAdmin, createCategory);

// categoryRouter.route("/:id")
//     .get(isLoggedIn, getSingleProduct)
//     .put(isLoggedIn, upload.single("image"), updateProduct)
//     .delete(isLoggedIn, deleteProduct);

module.exports = categoryRouter;
