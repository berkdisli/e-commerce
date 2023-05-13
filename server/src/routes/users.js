const express = require("express");
const session = require("express-session");
const { updateUser, deleteUser, registerUser, loginUser, verifyEmail, userProfile, logoutUser, forgetPassword, resetPassword, getRefreshToken } = require("../controllers/users");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const userRouter = express.Router();
const dev = require("../config");
const upload = require("../middlewares/upload")

userRouter.use(
    session({
        name: "user_session",
        secret: dev.app.sessionSecretKey,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 60000 }
    })
)

userRouter.route("/")
    .get(isLoggedIn, userProfile)
    .put(isLoggedIn, upload.single("image"), updateUser)
    .delete(isLoggedIn, deleteUser);

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/login", isLoggedOut, loginUser);
userRouter.get("/logout", isLoggedIn, logoutUser);
userRouter.post("/activate", verifyEmail);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.get('/refresh-token', isLoggedIn, getRefreshToken)


module.exports = userRouter;