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

app.use('/', homeRouter.index);

app.use('/login', loginRouter.index);

app.use('/register', registerRouter.index );

app.use('/productCart', productCartRouter.index );

app.use('/productDetail', productDetailRouter.index);

