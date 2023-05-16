const jwt = require('jsonwebtoken');
const fs = require('fs');
const createError = require("http-errors")

let User = require("../model/users")
const { getUniqueId } = require("../helpers/users");
const { generateHashPassword, compareHashPassword } = require("../helpers/securePassword");
const dev = require("../config");
const { sendEmailWithNodeMailer } = require("../helpers/email");
const { successResponse } = require('../helpers/responseHandler');

const updateUser = async (req, res) => {
    try {
        const hashedPassword = await generateHashPassword(req.fields.password)
        const updatedData = await User.findByIdAndUpdate(req.session.userId,
            { ...req.fields, password: hashedPassword },
            { new: true }
        );

        if (!updatedData) {
            return res.status(400).json({
                ok: false,
                message: `the user couldn't be updated`,
                data: updatedData
            });
        }

        if (req.files.image) {
            const { image } = req.files;
            updatedData.image.data = fs.readFileSync(image.path);
            updatedData.image.contentType = image.type;
        }
        await updatedData.save();
        successResponse(res, 200, "the user was successfully updated",
        );
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.session.userId)
        successResponse(res, 200, "the user was deleted successfully",
        );
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, age, phone } = req.body;
        const { image } = req.file.filename;

        const isExist = await User.findOne({ email: email });
        if (isExist) {
            throw createError(400, `the user with this email already exists`
            )
        }

        if (!name || !email || !password || !age || !phone) {
            throw createError(404, `name, email, age or password is missing`
            );
            return
        }
        if (password.lenght < 6) {
            throw createError(404, `min password length is 6 `);
        }


        const secretKey = dev.app.jwtSecretKey
        const hashedPassword = await generateHashPassword(password)
        const token = jwt.sign({ name, email, age, hashedPassword, phone, image }, secretKey, { expiresIn: "10m" });

        //prepare email
        const emailData = {
            email,
            subject: "Account activation email",
            html: `
            <h2>Hello ${name}!</h2>
            <p> Please click here to <a href= "${dev.app.clientURL}/api/users/activate/
            ${token}" target = "_blank"> activate your account </a> </p>
            `
        };
        sendEmailWithNodeMailer(emailData);

        return res.status(201).json({
            token: token,
            message: "A verification link has been sent to your email"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw createError(400, "email or password not found")
        };

        if (password.length < 8)
            throw createError(400, "Bad Request: password length should be minimum 8 characters",
            );

        const user = await User.findOne({ email });
        if (!user) {
            throw createError(400, "Bad Request: user with this email does not exist. Sign up first")
        };

        const isPasswordMatched = await compareHashPassword(password, user.password);

        if (!isPasswordMatched)
            throw createError(400, "Bad Request: invalid email or password");

        if (user.isBanned)
            throw createError(403, "You have no permission, please contact the authority");

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

        res.status(200).json({ message: `Welcome, ${user.name}!` });
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) throw createError(404, "token not found")

        const secretKey = dev.app.jwtSecretKey
        jwt.verify(token, secretKey, async function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    message: "Token is expired",
                })
            }
            //decoded
            const { name, email, hashedPassword, phone, image, age } = decoded;
            const isExist = await User.findOne({ email: email });
            if (isExist)
                throw createError(400, `the user already exist`
                )

            //create user without image
            const newUser = new User({
                id: getUniqueId(),
                name: name,
                password: hashedPassword,
                email: email,
                age: age,
                phone: phone,
                is_verified: 1,
            })

            if (image) {
                newUser.image.data = fs.readFileSync(image.path);
                newUser.image.contentType = image.type;
            }

            //save the user
            const user = await newUser.save()
            if (!user) {
                throw createError(400, `the user was not created`
                )
            }

            successResponse(res, 200, "the user was created and ready to sign in",
            );
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie("user_session");
        res.status(200).json({ message: "Log out is successfull" });
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

const userProfile = async (req, res) => {
    try {
        const userData = await User.findById(req.session.userId)
        return res.status(200).json({
            ok: true,
            message: "user profile",
            user: userData
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const forgetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).json({
                message: ` email or password is missing`
            });
            return
        }
        if (password.lenght < 6) {
            return res.status(404).json({
                message: `min password length is 6 `
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) throw createError(400, `a user wasn't found with this email address `
        );

        const secretKey = dev.app.jwtSecretKey
        const hashedPassword = await generateHashPassword(password)
        const token = jwt.sign({ email, hashedPassword }, secretKey, { expiresIn: "10m" });

        //prepare email
        const emailData = {
            email,
            subject: "Reset your password",
            html: `
            <h2>Hello ${user.name}!</h2>
            <p> Please click here to <a href= "${dev.app.clientURL}/api/users/reset-password/
            ${token}" target = "_blank"> Reset your password </a> </p>
            `
        };
        sendEmailWithNodeMailer(emailData);

        return res.status(200).json({
            message: "An email has been sent to reset your password",
            token: token
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(404).json({
                message: "Token is missing",
            });
        }

        const secretKey = dev.app.jwtSecretKey
        jwt.verify(token, secretKey, async function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    message: "Token is expired",
                })
            }

            const { email, hashedPassword } = decoded;
            const isExist = await User.findOne({ email: email });
            if (!isExist)
                throw createError(400, `the user with this email doesn't exist`
                )

            //update data
            const updateData = await User.updateOne({ email: email },
                {
                    $set: {
                        password: hashedPassword
                    }
                })

            if (!updateData) {
                throw createError(400, `reset password process is not successfull `,
                );
            }

            successResponse(res, 200, "your new password is successfully updated ",
            );
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getRefreshToken = async (req, res, next) => {
    try {
        if (!req.headers.cookie) {
            throw createError(400, 'no cookie found');
        }
        const oldToken = req.headers.cookie.split('=')[1];
        //verify token
        const secretKey = dev.app.jwtSecretKey
        if (!oldToken) {
            throw createError(400, 'no token found');
        }
        jwt.verify(oldToken, String(secretKey), async function (err, decoded) {
            if (err) {
                throw createError(401, 'Token is expired');
            }
            const token = jwt.sign({ id: user._id },
                String(secretKey), { expiresIn: '10m' }
            );

            //reset a cookie
            if (req.cookies[`${decoded.id}`]) {
                req.cookies[`${decoded.id} `] = "";
            }

            res.cookie(String(decoded.id), token, {
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 6),
                httpOnly: true,
            });

        })
        successResponse(200, 'refresh token successfull')
    } catch (err) {
        console.log(err);
    }
}

const verifyPassword = (req, res) => {
    try {
        const { token } = req.body
        if (!token) {
            return res.status(404).json({ message: 'Token is missing' })
        }
        jwt.verify(token, dev.jwtKey, async function (err, decoded) {
            if (err) {
                return res.status(401).json({ message: 'Token was expired' })
            }
            const { username, hashedPassword } = decoded
            hashedPassword = await generateHashPassword(req.fields.password)
            const updatedUser = await User.updateOne({ username }, { $set: { password: hashedPassword } })
            if (!updatedUser) {
                throw createError(401, 'password could not be changed')
            }
            successResponse(200, 'password has been changed successfully')
        });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = { updateUser, deleteUser, registerUser, loginUser, verifyEmail, logoutUser, userProfile, forgetPassword, resetPassword, getRefreshToken, verifyPassword }