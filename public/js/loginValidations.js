/*
<input type="email" name="email" placeholder="Su Email" id="correo-electronico" required>
<input type="password" name="password" placeholder="Contraseña" id="password" required>
<input type="checkbox" name="rememberMe" id="rememberMe">

*/
let h1 = document.querySelector('h1');
h1.style.color = 'red';

let emailInput = document.getElementById('email');

console.log(emailInput);

let emailError = document.getElementById('emailErrors');


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\.com$/;

emailInput.addEventListener('focus', (event) => {
  console.log('se selecciono el input');
})

emailInput.addEventListener('blur', function () {

  this.value = this.value.trim();

  if (!emailRegex.test(emailInput.value)) {
    emailError.innerHTML = `
    <p class="error">
    Correo electrónico inválido ❗
    </p> 
    `
  }
  console.log("El valor del campo de correo electrónico es: " + emailInput.value);
});

//! Si hay errores en el campo, evitar el evento submit!




