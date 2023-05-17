const express = require("express");
const session = require("express-session");
const { updateUser, deleteUser, registerUser, loginUser, verifyEmail, userProfile, logoutUser, forgetPassword, resetPassword, getRefreshToken, verifyPassword } = require("../controllers/users");
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
    .get(userProfile)
    .put(upload.single("image"), updateUser)
    .delete(deleteUser);

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/login", isLoggedOut, loginUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/activate", verifyEmail);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.get('/refresh-token', getRefreshToken)
userRouter.post('/verify-password', verifyPassword)


module.exports = userRouter;