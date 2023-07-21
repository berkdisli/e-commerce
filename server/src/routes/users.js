const express = require("express");
const { updateUser, deleteUser, registerUser, loginUser, verifyEmail, userProfile, logoutUser, forgetPassword, resetPassword, getRefreshToken, verifyPassword } = require("../controllers/users");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const userRouter = express.Router();
const upload = require("../middlewares/upload")

userRouter.route("/:_id")
    .put(updateUser)
    .delete(deleteUser);

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/activate", verifyEmail);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.get('/refresh-token', getRefreshToken);
userRouter.post('/verify-password', verifyPassword);
userRouter.get('/profile/:id', userProfile);

module.exports = userRouter;