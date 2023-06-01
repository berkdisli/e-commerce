const express = require("express");

const { validateCategory } = require("../middlewares/validators/categoryValidator");
const runValidation = require("../middlewares/validators");
const { createCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory } = require("../controllers/categoryControllers");
const { isLoggedIn } = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const categoryRouter = express.Router();

categoryRouter.route("/")
    .get(runValidation, getAllCategories)
    .post(runValidation, createCategory);

categoryRouter.route("/:slug")
    .get(runValidation, getSingleCategory)
    .put(runValidation, updateCategory)
    .delete(runValidation, deleteCategory);

module.exports = categoryRouter;
