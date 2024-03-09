window.addEventListener('load', function(){

    // Capturas
    const form = document.getElementById('form');
    const labelName = document.getElementById('labelName'); // *
    const name = document.getElementById('name'); // Cristian: Requerido por el sprint7
    const brand = document.getElementById('brand');
    const model = document.getElementById('model');
    const labelDescription = document.getElementById('labelDescription'); // *
    const description = document.getElementById('description'); // Cristian: Requerido por el sprint7
    const price = document.getElementById('price');
    const units = document.getElementById('units');
    const voltage = document.getElementById('voltage');
    const frequency = document.getElementById('frequency');
    const power = document.getElementById('power');
    const extras = document.getElementById('extras');
    const userManual = document.getElementById('userManual');
    const labelImage = document.getElementById('labelImage'); // *
    const image = document.getElementById('image'); // Cristian: Requerido por el sprint7
    const formButton = document.getElementById('formButton');

    // Almacenamiento de errores
    // Por cada input a validar, se debe agregar el correspondiente atributo con valor = 'error'
    let errors = {
        name: 'error',
        description: 'error',
        image: 'error',
    };

    // Validaciones del input "name"
    name.addEventListener('input', function(){
        if(name.value.length < 5){
            labelName.innerHTML = 'Nombre del producto: <span style="color: #ce9416">Minimo 5 caracteres</span>';
            name.style.background = 'none';
        }else{
            labelName.innerHTML = 'Nombre del producto ' + '<i class="fa-solid fa-check" style="color: green"></i>';
            name.style.background = 'lightgreen';
        };
    });
    name.addEventListener('blur', function(){
        if(name.value == ""){ // Error
            labelName.innerHTML = 'Nombre del producto ' + '<i class="fa-solid fa-xmark" style="color: red"></i>';
            name.style.background = 'pink';
            name.placeholder = 'Este campo es obligatorio';
            errors.name = 'error';
        }else if(name.value.length < 5){ // Error
            labelName.innerHTML = 'Nombre del producto ' + '<i class="fa-solid fa-xmark" style="color: red"></i>';
            name.style.background = 'pink';
            errors.name = 'error';
        }else{ // Sin error
            labelName.innerHTML = 'Nombre del producto ' + '<i class="fa-solid fa-check" style="color: green"></i>';
            name.style.background = 'lightgreen';
            delete errors.name;
        }
    });

    // Validaciones del input "description"
    description.addEventListener('input', function(){
        if(description.value.length < 20){
            labelDescription.innerHTML = 'Descripcion del producto: <span style="color: #ce9416">Minimo 20 caracteres</span>';
            description.style.background = 'none';
        }else{
            labelDescription.innerHTML = 'Descripcion del producto ' + '<i class="fa-solid fa-check" style="color: green"></i>';
            description.style.background = 'lightgreen';
        };
    });
    description.addEventListener('blur', function(){
        if(description.value == ""){ // Error
            labelDescription.innerHTML = 'Descripcion del producto ' + '<i class="fa-solid fa-xmark" style="color: red"></i>';
            description.style.background = 'pink';
            description.placeholder = 'Este campo es obligatorio';
            errors.description = 'error';
        }else if(description.value.length < 20){ // Error
            labelDescription.innerHTML = 'Descripcion del producto ' + '<i class="fa-solid fa-xmark" style="color: red"></i>';
            description.style.background = 'pink';
            errors.description = 'error';
        }else{ // Sin error
            labelDescription.innerHTML = 'Descripcion del producto ' + '<i class="fa-solid fa-check" style="color: green"></i>';
            description.style.background = 'lightgreen';
            delete errors.description;
        }
    });

    // Validaciones del input "image"
    image.addEventListener('click', function(){
        if(image.files.length === 0){ // Error
            labelImage.innerHTML = 'Imagen del producto ' + '<i class="fa-solid fa-xmark" style="color: red"></i>';
            image.style.background = 'pink';
        };
    });
    image.addEventListener('change', function(){
        if(image.files.length === 0){ // Error: No hay archivo cargado
            labelImage.innerHTML = 'Imagen del producto ' + '<i class="fa-solid fa-xmark" style="color: red"></i>';
            image.style.background = 'pink';
            errors.image = 'error';
        }else{ // Hay por lo menos un archivo cargado
            const permitted = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
            const errorsAux = [];
            for(let file of image.files){
                if(!permitted.includes(file.type)){ // Archivo no permitido
                    errorsAux.push('invalidExtension');
                };
            };
            if(errorsAux.length > 0){ // Error de extension
                labelImage.innerHTML = 'Imagen del producto: <span style="color: #ce9416">Admite (.jpg) - (.jpeg) - (.png) - (.gif)</span>';
                    image.style.background = 'pink';
                    errors.image = 'error';
            }else{ // Sin error de extension
                labelImage.innerHTML = 'Imagen del producto ' + '<i class="fa-solid fa-check" style="color: green"></i>';
                    image.style.background = 'lightgreen';
                    delete errors.image;
            };
        };
    });

    // Validacion del formulario
    form.addEventListener('submit', function(event){
        if(Object.keys(errors).length > 0){ // Error
            event.preventDefault();
            labelName.innerHTML = 'Nombre del producto ' + '<i class="fa-solid fa-xmark" style="color: red"></i>';
            labelDescription.innerHTML = 'Descripcion del producto ' + '<i class="fa-solid fa-xmark" style="color: red"></i>';
            labelImage.innerHTML = 'Imagen del producto ' + '<i class="fa-solid fa-xmark" style="color: red"></i>';
            alert('El formulario no cumple los requisitos de envio');
        }; // Sin error
    });
});
