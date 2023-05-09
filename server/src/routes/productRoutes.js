const express = require("express");

const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/productControllers");
const { isLoggedIn } = require("../middlewares/auth");
const upload = require("../middlewares/upload")
const dev = require("../config");
const session = require("express-session");

const productRouter = express.Router();

productRouter.use(
    session({
        name: "ecommerce_session",
        secret: dev.app.sessionSecretKey,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 60000 }
    })
)

productRouter.route("/")
    .get(isLoggedIn, getAllProducts)
    .post(isLoggedIn, upload.single("image"), createProduct);

productRouter.route("/:id")
    .get(isLoggedIn, getSingleProduct)
    .put(isLoggedIn, upload.single("image"), updateProduct)
    .delete(isLoggedIn, deleteProduct);

module.exports = productRouter;
