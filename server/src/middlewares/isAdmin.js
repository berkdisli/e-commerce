const User = require("../model/users");
const createError = require("http-errors")

const isAdmin = async (req, res, next) => {
    try {
        const id = req._id
        if (id) {
            const user = await User.findById(id)
            if (!user) throw createError(404, 'no user found with this id')
            if (!user.is_admin) throw createError(404, 'the user is not an admin')
            next()
        } else {
            throw createError(500, 'please login')
        }
    } catch (error) {
        next(error)
    }
}
module.exports = isAdmin;