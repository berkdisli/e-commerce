const { body } = require('express-validator')

const validateCategory = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category\'s name is required.')
        .isLength({ min: 3, max: 50 })
        .withMessage('Category\'s name length should be in 3-50 range.'),
];

module.exports = { validateCategory }