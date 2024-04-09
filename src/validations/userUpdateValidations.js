const path = require('node:path');
const { body } = require('express-validator');

const validations = [

  // input type="email" name="email" placeholder="Correo Electrónico" id="email"
  body('email')
    .notEmpty().withMessage("Ingrese su email por favor ❗").bail()
    .isEmail().withMessage("Ingrese un email valido por favor ❗")
    .custom((value, { req }) => {
      if (!value.endsWith('.com')) {
          throw new Error('El correo electrónico debe terminar en .com ❗');
      }
      return true;
  }),


  //input type="text" name="username" placeholder="Nombre de Usuario" id="username" required>
  body("username")
    .notEmpty().withMessage("Ingrese su nombre de usuario por favor ❗").bail()
    .isLength({ min: 2 }).withMessage('El nombre de usuario debe tener al menos 2 caracteres'),

  //input type="password" name="password" placeholder="Contraseña" id="password" required>
  body("password")
    .notEmpty().withMessage("Ingrese su contraseña por favor ❗").bail(),

  //input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" id="confirmPassword" required>
  body("confirmPassword")
    .notEmpty().withMessage("Ingrese su contraseña nuevamente por favor ❗").bail()

    // Validación personalizada para verificar si password y confirmPassword son iguales
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden ❗");
      }
      return true;
    }),

  //input type="text" name="firstname" placeholder="Nombre" id="firstname" required>
  body("firstname")
    .notEmpty().withMessage("Ingrese su nombre por favor ❗").bail(),

  //input type="text" name="lastname" placeholder="Apellido" id="lastname" required>
  body("lastname")
    .notEmpty().withMessage("Ingrese su apellido por favor ❗").bail(),

  //input type="number" name="birthday" placeholder="fecha de nacimiento" id="birthday" required>
  body("birthday")
    .notEmpty().withMessage("Ingrese su fecha de nacimiento por favor ❗").bail(),

  //input type="text" name="phone" placeholder="Teléfono" id="phone" required>
  body("phone")
    .notEmpty().withMessage("Ingrese su número de telefono por favor ❗").bail()
    .isLength({ min: 10, max: 10 }).withMessage("No debe incluir 0 ni 15 del número celular ❗"),

  //input type="text" name="street" placeholder="Calle y Altura" id="street" required>
  body("street")
    .notEmpty().withMessage("Ingrese la calle y la altura de su casa por favor ❗").bail(),

  //input type="text" name="city" placeholder="Ciudad" id="city" required>
  body("city")
    .notEmpty().withMessage("Ingrese el nombre de su Ciudad por favor ❗").bail(),

  //input type="text" name="country" placeholder="País" id="country" required>
  body("country")
    .notEmpty().withMessage("Ingrese su País por favor ❗").bail(),

  //input type="text" name="zipcode" placeholder="Código Postal" id="zipcode" required>
  body("zipcode")
    .notEmpty().withMessage("Ingrese su Código Postal por favor ❗").bail(),

  // input type="file" name="image" placeholder="Imagen de Perfil" id="image" required>
  body("image").custom((value, { req }) => {
      // Verificacion de extension de tipo de imagen
      let file = req.file;
      let acceptedExtensions = ['.jpg', 'jpeg', '.png', '.gif', 'webp'];

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
