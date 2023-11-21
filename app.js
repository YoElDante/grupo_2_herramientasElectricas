const express = require('express');
const path = require("node:path");
const homeRouter = require('./src/controllers/homeController.js')
const loginRouter = require('./src/controllers/loginController.js')
const registerRouter = require('./src/controllers/registerController.js')
const productCartRouter = require('./src/controllers/productCartController.js')
const productDetailRouter = require('./src/controllers/productDetailController.js')

const app = express();

// Habilitar la capeta Public
const publicFolderPath = path.resolve(__dirname, './public');
app.use(express.static(publicFolderPath));

// Subir servidor
app.listen(3000, ()=> {
    console.log("Servidor online en puerto 3000");
});

app.get('/', homeRouter.index);

app.get('/login', loginRouter.index);

app.get('/register', registerRouter.index );

app.get('/productCart', productCartRouter.index );

app.get('/productDetail', productDetailRouter.index);

