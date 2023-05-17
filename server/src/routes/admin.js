const adminRouter = require("express").Router();
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const dev = require("../config/index");

const { loginAdmin, logoutAdmin, updateUserByAdmin, deleteUserbyAdmin } = require("../controllers/admin");
const isAdmin = require("../middlewares/isAdmin");
const { registerUser } = require("../controllers/users");
const { getAllUsers } = require("../controllers/admin");
const upload = require("../middlewares/upload");

adminRouter.post("/login", loginAdmin);
adminRouter.get("/logout", logoutAdmin);
adminRouter.get("/dashboard", getAllUsers);
adminRouter.post("/register", upload.single("image"), registerUser);
adminRouter.put("/dashboard/:id", upload.single("image"), updateUserByAdmin);
adminRouter.delete("/dashboard/:id", deleteUserbyAdmin);

module.exports = adminRouter;