const elInputEmail = document.getElementById('email');
const elInputUsername = document.getElementById('username');
const elInputPassword = document.getElementById('password');
const elInputConfirmPassword = document.getElementById('confirmPassword');
const elInputFirstname = document.getElementById('firstname');
const elInputLastname = document.getElementById('lastname');
const elInputBirthday = document.getElementById('birthday');
const elInputPhone = document.getElementById('phone');
const elInputStreet = document.getElementById('street');
const elInputCity = document.getElementById('city');
const elInputCountry = document.getElementById('country');
const elInputZipcode = document.getElementById('zipcode');
const elInputImage = document.getElementById('image');
const elBtnSubmit = document.getElementById('buttom-imput');

//------------------------
//   Funcion Validacion
//------------------------
function validation(inputElement, regex, errMsg = 'Campo obligatorio') {

  //Sanitizamos el campo
  inputElement.value = inputElement.value.trim();
  inputElement.value = inputElement.value.charAt(0).toUpperCase() + inputElement.value.slice(1);

  if (regex.test(inputElement.value)) {

    inputElement.nextElementSibling.innerText = '';

    inputElement.isOk = true;

  } else {
    inputElement.nextElementSibling.innerText = errMsg;
    inputElement.nextElementSibling.style.color = "red"
    inputElement.isOk = false;
  }
}

//---------------------
//        Email
//---------------------
elInputEmail.addEventListener('blur', function () {
  validation(this, /^[^\s@]{2,}@[^@\s]{2,}\.com$/, 'Correo electrónico inválido');
});
/*
Esta expresión regular verificará que haya al menos 2 caracteres antes del @, 
seguidos de un @, 
luego al menos 2 caracteres después del @, 
y finalmente un punto (.) seguido de "com" al final de la cadena.
*/


//-------------------------
//        Username
//-------------------------
elInputUsername.addEventListener('blur', function () {
  validation(this, /^(?=[A-Z0-9])(?!.*\s)[A-Za-z0-9\-_!@#$%^&*()+=<>?/]{2,}$/, 'Nombre de Usuario inválido')
});
/*
Esta expresión regular asegura que el primer carácter sea una letra mayúscula o un dígito, 
que los caracteres siguientes (si los hay) sean letras mayúsculas, minúsculas, dígitos o los signos especificados, 
y que no haya espacios en blanco en la cadena. Además, garantiza que la cadena tenga al menos tres caracteres.
*/

//-------------------------
//        Password
//-------------------------
const textPasswordRequires = 'La contraseña debe tener al menos 8 caracteres\n' +
  'Debe poseer al menos una letra Mayúscula\n' +
  'Debe poseer al menos una letra Minúscula\n' +
  'Debe poseer al menos un caracter especial\n' +
  'Lista de caracteres especiales: !@#$%^&*()-_=+{};:,<.>'

elInputPassword.addEventListener('focus', function () {
  this.nextElementSibling.innerText = textPasswordRequires
  this.nextElementSibling.style.color = '#11115f'
})

elInputPassword.addEventListener('blur', function () {
  const regex = /^(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  if (regex.test(this.value)) {
    //Si el campo SI pasa el test
    // Si hay un mensaje de error anterior, lo queremos borrar
    this.nextElementSibling.innerText = 'Contraseña correctamente ✅';
    this.nextElementSibling.style.color = 'green'
    //guardamos en una variable que esto esta correcto para el submit final
    this.isOk = true;

  } else {
    //Si el campo NO pasa el test
    // Mensaje de error que queremos mostrar si el usuario completa incorrectamente el campo
    this.nextElementSibling.innerText = textPasswordRequires;
    this.nextElementSibling.style.color = 'red'

    //guardamos en una variable que esto esta correcto para el submit final
    this.isOk = false;
  }

})

elInputConfirmPassword.addEventListener('blur', function () {
  if (this.value === elInputPassword.value) {
    //Si el campo SI pasa el test
    // Si hay un mensaje de error anterior, lo queremos borrar
    this.nextElementSibling.innerText = 'Las contraseñas coinciden correctamente ✅';
    this.nextElementSibling.style.color = 'green'
    //guardamos en una variable que esto esta correcto para el submit final
    this.isOk = true;

  } else {
    //Si el campo NO pasa el test
    // Mensaje de error que queremos mostrar si el usuario completa incorrectamente el campo
    this.nextElementSibling.innerText = 'Las contraseñas deben ser iguales';
    this.nextElementSibling.style.color = 'red'
    //guardamos en una variable que esto esta correcto para el submit final
    this.isOk = false;
  }
})

//--------------------------
//   Validacion Firstname
//--------------------------

elInputFirstname.addEventListener('blur', function () {
  validation(this, /^[A-ZÁÉÍÓÚÜÑ]{1}[a-záéíóúüñ]{1,}$/,
    ('Campo obligatorio\n' + 'Nombre Invalido, no debe tener espacios ni signos'))
})
/*
Esta expresión regular verifica que el string comience con una letra mayúscula, 
tenga como mínimo 3 caracteres 
y no contenga espacios ni ningún signo.
*/

//-------------------------
//   Validacion Lastname
//-------------------------

elInputLastname.addEventListener('blur', function () {
  validation(this, /^[A-ZÁÉÍÓÚÜÑ]{1}[a-záéíóúüñ]{1,}$/,
    ('Campo obligatorio\n' + 'Apellido Invalido, no debe tener espacios ni signos'))
})
/*
Esta expresión regular verifica que el string comience con una letra mayúscula, 
tenga como mínimo 3 caracteres 
y no contenga espacios ni ningún signo.
*/

//---------------
//   Birthday 
//---------------
let birthdayMsg = ('La fecha debe ser posterior 01/01/1920\n' +
  'Debes ser mayor de 18 años para continuar');

elInputBirthday.addEventListener('focus', function () {
  this.nextElementSibling.innerText = birthdayMsg;
  this.nextElementSibling.style.color = '#11115f'
});

elInputBirthday.addEventListener('blur', function () {

  let birthdate = new Date('0001-01-01')
  if (this.value) {
    birthdate = new Date(this.value);
  }

  // Declaramos la fecha mínima
  const minDate = new Date('1920-01-01');

  // Calculamos la fecha hace 18 años
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  // Validar si la fecha está dentro del rango
  if (birthdate > eighteenYearsAgo || birthdate < minDate) {
    // Mostrar mensaje de error
    this.nextElementSibling.innerText = birthdayMsg;
    // Puedes agregar estilos CSS para que el mensaje sea visible
    this.nextElementSibling.style.color = "red"

    elInputBirthday.isOk = false;

  } else {
    // Limpiamos el mensaje de error si la fecha es válida
    this.nextElementSibling.innerText = '';
    elInputBirthday.isOk = true;
  }
});

//----------------
//     Phone 
//----------------
const phoneMsg = ('Colocar código de area sin el 0 \n' +
  'El número de celular no debe incluir el 15 del principio \n' +
  'El campo debe contener exactamente 10 dígitos')

elInputPhone.addEventListener('blur', function () {
  this.nextElementSibling.innerText = phoneMsg
  this.nextElementSibling.style.color = '#11115f'
})

elInputPhone.addEventListener('blur', function () {
  validation(this,
    /^[1-9]\d{9}$/, phoneMsg)
})

//-----------------
//     Street 
//-----------------

elInputStreet.addEventListener('blur', function () {
  validation(this,
    /^[a-zA-Z0-9 .,:;ºª_ -]{1,50}$/,
    ('No puede superar los 50 caracteres de largo\n' +
      'Solo se admiten letras, números y los siguientes caracteres: .,:;ºª_ -'
    ))
})

//-----------------
//     City
//-----------------

elInputCity.addEventListener('blur', function () {
  validation(this,
    /^[a-zA-Z0-9 .,:;ºª_ -]{1,50}$/,
    ('No puede superar los 50 caracteres de largo\n' +
      'Solo se admiten letras, números y los siguientes caracteres: .,:;ºª_ -'
    ))
})

//-----------------
//     Country
//-----------------

elInputCountry.addEventListener('blur', function () {
  validation(this,
    /^[a-zA-Z]{1,50}$/,
    ('Solo se admiten letras\n' + 'No puede superar los 50 caracteres de largo'))
})

//-----------------
//     ZipCode
//-----------------

elInputZipcode.addEventListener('blur', function () {
  validation(this,
    /^[a-zA-Z0-9 .,:;ºª_ -]{1,10}$/,
    ('No puede superar los 10 caracteres de largo\n' +
      'Solo se admiten letras, números y los siguientes caracteres: .,:;ºª_ -'
    ))
})

//-----------------
//     Image
//-----------------
const imageMsg = ('Los formatos validos recibidos son JPG, JPEG, PNG y GIF\n' +
  'Puede dejar este campo vacio y se le asignara una imagen por defecto')


elInputImage.nextElementSibling.innerText = imageMsg;
elInputImage.nextElementSibling.style.color = '#11115f'


elInputImage.isOk = true;
//La verificacion de las imagenes se realiza por backend


//-------------------------
//   Envio de Formulario
//-------------------------

elBtnSubmit.addEventListener('click', function (event) {

  let errorMsg = '';

  elForm.querySelectorAll('input').forEach(function (campo) {
    if (!campo.isOk) {
      errorMsg += `Error en el campo ${campo.name}\n`
    }
  })

  if (errorMsg === '') {
    this.nextElementSibling.innerText = 'Estan todos bien';
    this.nextElementSibling.style.color = 'green'
  } else {
    this.nextElementSibling.innerText = errorMsg;
    this.nextElementSibling.style.color = 'red'
    event.preventDefault();
  }

})

