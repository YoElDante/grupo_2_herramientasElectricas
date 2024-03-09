/*
Aqui deberian ir las validaciones para el formulario de creacion de producto nuevo
*/

const {body} = require('express-validator');

const productCreateValidator = [
    body('name')
        .notEmpty().withMessage('<<< ATENCION <<<').bail()
        .isLength({min: 5}).withMessage('Minimo 5 caracteres'),

    body('description')
        .notEmpty().withMessage('<<< ATENCION <<<').bail()
        .isLength({min: 20}).withMessage('Minimo 20 caracteres'),
    
    body('image')
        //.notEmpty().withMessage('<<< ATENCION <<<')
        .custom((value, {req})=>{//console.log(req.files);
            if(req.files.length === 0){// No hay archivos
                throw new Error('<<< ATENCION <<<');
            }else{// Si hay archivos
                return true;
            };
        }).bail()
        .custom((value, {req})=>{
            const permitted = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
            const errorsAux = [];
            for(let file of req.files){
                if(!permitted.includes(file.mimetype)){ // Archivo no permitido
                    errorsAux.push('invalidFile');
                };
            };
            if(errorsAux.length > 0){ // Error de archivo
                throw new Error('Archivo invalido');
            }else{ // Sin error de archivo
                return true;
            };
        })
];

module.exports = productCreateValidator;