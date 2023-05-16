const express = require("express");

const { validateCategory } = require("../middlewares/validators/categoryValidator");
const runValidation = require("../middlewares/validators");
const { createCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory } = require("../controllers/categoryControllers");
const { isLoggedIn } = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const categoryRouter = express.Router();

categoryRouter.route("/")
    .get(validateCategory, runValidation, isLoggedIn, isAdmin, getAllCategories)
    .post(validateCategory, runValidation, isLoggedIn, isAdmin, createCategory);

categoryRouter.route("/:slug")
    .get(validateCategory, runValidation, isLoggedIn, isAdmin, getSingleCategory)
    .put(validateCategory, runValidation, isLoggedIn, isAdmin, updateCategory)
    .delete(validateCategory, runValidation, isLoggedIn, isAdmin, deleteCategory);

module.exports = categoryRouter;
