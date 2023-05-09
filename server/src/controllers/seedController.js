const data = require('../middlewares/validators/data');
const User = require('../model/users');

const seedUsers = async (req, res, next) => {
    try {
        await User.deleteMany({});

        const users = await User.insertMany(data.users)

        return res.status(201).json({
            message: `Users created successfully`,
            payload: users
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { seedUsers };