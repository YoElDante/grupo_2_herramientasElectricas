const { body } = require('express-validator');

const validations = [
    body("email")
        .notEmpty().withMessage("Ingrese su email por favor ❗").bail()
        .isEmail().withMessage("Ingrese un email valido por favor ❗"),
    body("password")
        .notEmpty().withMessage("Ingrese su contraseña por favor ❗")
]

module.exports = validations;