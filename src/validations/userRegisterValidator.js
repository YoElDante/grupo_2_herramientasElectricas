const path = require('node:path');
const { body } = require('express-validator');

const validations = [

    //input type="email" name="email" placeholder="Correo Electrónico" id="email"
    body("email")
        .notEmpty().withMessage("Ingrese su email por favor ❗").bail()
        .isEmail().withMessage("Ingrese un email valido por favor ❗"),

    //input type="text" name="username" placeholder="Nombre de Usuario" id="username" required>
    body("username")
        .notEmpty().withMessage("Ingrese su nombre de usuario por favor ❗").bail(),

    //input type="password" name="password" placeholder="Contraseña" id="password" required>
    body("password")
        .notEmpty().withMessage("Ingrese su contraseña por favor ❗").bail(),

    //input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" id="confirmPassword" required>
    body("confirmPassword")
        .notEmpty().withMessage("Ingrese su contraseña nuevamente por favor ❗").bail(),

    //input type="text" name="firtsname" placeholder="Nombre" id="firtsname" required>
    body("firtsname")
        .notEmpty().withMessage("Ingrese su nombre por favor ❗").bail(),

    //input type="text" name="lastname" placeholder="Apellido" id="lastname" required>
    body("lastname")
        .notEmpty().withMessage("Ingrese su apellido por favor ❗").bail(),

    //input type="number" name="age" placeholder="Edad" id="age" required>
    body("age")
        .notEmpty().withMessage("Ingrese su edad en números por favor ❗").bail()
        .isInt({ gt: 18, lt: 100 }),

    //input type="text" name="phone" placeholder="Teléfono" id="phone" required>
    body("phone")
        .notEmpty().withMessage("Ingrese su número de telefono por favor ❗").bail()
        .isLength({ min: 10, max: 10 }).withMessage("el número no debe incluir 0 ni 15 del comienzo del celular ❗"),

    //input type="text" name="street" placeholder="Calle y Altura" id="street" required>
    body("street")
        .notEmpty().withMessage("Ingrese la calle y la altura de su casa por favor ❗").bail(),

    //input type="text" name="city" placeholder="Ciudad" id="city" required>
    body("city")
        .notEmpty().withMessage("Ingrese el nombre de su Ciudad por favor ❗").bail(),

    //input type="text" name="country" placeholder="País" id="country" required>
    body("country")
        .notEmpty().withMessage("Ingrese su País por favor ❗").bail(),

    //input type="text" name="cp" placeholder="Código Postal" id="cp" required>
    body("cp")
        .notEmpty().withMessage("Ingrese su Código Postal por favor ❗").bail(),

    //input type="file" name="image" placeholder="Imagen de Perfil" id="image" required>
    body("image").custom((value, { req }) => {
        // Verificacion de extension de tipo de imagen
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if(file){
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')} ❗`);
            }
        }
        return true;
    })

]

module.exports = validations;