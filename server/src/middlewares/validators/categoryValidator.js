const { body } = require('express-validator')

const validateCategory = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category\'s name is required.')
        .isLength({ min: 2, max: 50 })
        .withMessage('Category\'s name length should be in 2-50 range.'),
];

module.exports = { validateCategory }