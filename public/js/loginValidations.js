/*
<input type="email" name="email" placeholder="Su Email" id="correo-electronico" required>
<input type="password" name="password" placeholder="Contraseña" id="password" required>
<input type="checkbox" name="rememberMe" id="rememberMe">
*/

const elEmailInput = document.getElementById('email');

// ------------------------
//   Funcion Validacion
// ------------------------
function validation(inputElement, regex, errMsg = 'Campo obligatorio') {

  // Sanitizamos el campo
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

// ------------
//    Email
// ------------


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\.com$/;




