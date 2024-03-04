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



elInputEmail.addEventListener('blur', function () {

  const emailRegex = /^[^\s@]{3,}@[^@\s]{3,}\.com$/;
  /*
  Esta expresión regular verificará que haya al menos 3 caracteres antes del @, 
  seguidos de un @, 
  luego al menos 3 caracteres después del @, 
  y finalmente un punto (.) seguido de "com" al final de la cadena.
  */
  
  this.value = this.value.trim();

  if (emailRegex.test(elInputEmail.value)) {

    this.nextElementSibling.innerText = '';

    elInputEmail.isOk = true;

    
  } else {
    this.nextElementSibling.innerText = 'Correo electrónico inválido ❗';
  }
});

