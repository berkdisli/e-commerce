const { errorResponse, successResponse } = require("../helpers/responseHandler");
const { generateHashPassword, compareHashPassword } = require("../helpers/securePassword");
const User = require("../model/users");
const jwt = require('jsonwebtoken');
const dev = require("../config");
const createError = require("http-errors")

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).json({
                message: " email or password is missing",
            });
        }
        if (password.length < 6) {
            res.status(404).json({
                message: "minimum length for password is 6 characters",
            });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            errorResponse(res, 400, "user with this email does not exist, please register first",
            );
        }
        if (user.is_admin === 0) {
            errorResponse(res, 400, "user is not an admin",
            );
        }
        const isPasswordMatch = await compareHashPassword(password, user.password);
        if (!isPasswordMatch) {
            errorResponse(res, 400, "email/password does not match",
            );
        }
        const jwtAuthorizationKey = dev.app.jwtAuthorizationKey
        const accessToken = jwt.sign(
            { _id: user._id },
            (jwtAuthorizationKey),
            {
                expiresIn: '30m',
            }
        )

        // reset the token if there's a cookie already
        if (req.cookies[`${accessToken}`]) {
            return (req.cookies[`${accessToken}`] = '')
        }

        // Set a cookie containing the refresh token
        res.cookie('accessToken', accessToken, {
            expires: new Date(Date.now() + 1000 * 60 * 15), // 15 min
            httpOnly: true,
            secure: false,
        })
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                image: user.image,
            },
            message: "login successful",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
const logoutAdmin = (req, res) => {
    try {
        if (!req.headers.cookie) {
            throw createError(404, 'no cookie was found')
        }
        const token = req.headers.cookie.split('=')[1]

        if (!token) {
            throw createError(404, 'no token was found')
        }
        const jwtAuthorizationKey = dev.app.jwtAuthorizationKey
        const decoded = jwt.verify(token, jwtAuthorizationKey)
        if (!decoded) throw createError(403, 'Invalid Token')

        if (req.cookies[`${decoded._id}`]) {
            req.cookies[`${decoded._id}`] = ''
        }

        res.clearCookie(`${decoded._id}`)
        res.status(200).json({ message: 'user is logged-out' })
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "all users returned",
            users: users
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const updateUserByAdmin = async (req, res) => {
    try {
        const hashedPassword = await generateHashPassword(req.body.password);
        const userData = await User.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                password: hashedPassword,
                image: req.file,
            },
            { new: true }
        );
        if (!userData) {
            errorResponse(res, 400, "User was not updated",
            );
        }
        await userData.save();
        successResponse(res, 200, "User was updated by Admin",
        );
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

const deleteUserbyAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await User.findById(id);
        if (!users) {
            return res.status(404).json({
                message: "user was not found with this id",
            });
        }
        await User.findByIdAndDelete(id);
        successResponse(res, 200, "User was deleted by admin",
        );
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = { loginAdmin, logoutAdmin, updateUserByAdmin, deleteUserbyAdmin, getAllUsers };