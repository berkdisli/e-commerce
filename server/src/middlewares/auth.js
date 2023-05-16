const createError = require("http-errors")
const jwt = require("jsonwebtoken")
const dev = require("../config/index")

const isLoggedIn = (req, res, next) => {
    try {
        if (!req.headers.cookie) {
            throw createError(404, 'cookie was not found')
        }

        const token = req.headers.cookie.split('=')[1]

        if (!token) {
            throw createError(404, 'token was not found')
        }
        const jwtAuthorizationKey = dev.app.jwtAuthorizationKey
        const decoded = jwt.verify(token, String(jwtAuthorizationKey))

        if (!decoded) throw createError(403, 'invalid token')
        req._id = decoded._id
        next()
    } catch (error) {
        next(error)
    }
}
const isLoggedOut = (req, res, next) => {
    try {
        if (req.session.userId) {
            return res.status(400).json({
                message: "please logout",
            })
        }
        next()
    } catch (err) {
        console.log(err)
    }
}

module.exports = { isLoggedIn, isLoggedOut }