const express = require('express');
const path = require("node:path");

// Routers
const homeRouter = require('./src/routers/home.js')
const loginRouter = require('./src/routers/login.js')
const registerRouter = require('./src/routers/register.js')
const productCartRouter = require('./src/routers/productCart.js')
const productDetailRouter = require('./src/routers/productDetail.js')
const registerEditionRouter = require('./src/routers/registerEditionRouter.js')

const app = express();

// Indicamos que vamos a trabajar con un motor de plantillas
app.set('view engine','ejs');
// app.set('views', path.resolve(__dirname,'./src/views')); 

// Habilitar la capeta Public
const publicFolderPath = path.resolve(__dirname, './public');
app.use(express.static(publicFolderPath));

// Subir servidor
app.listen(3000, ()=> {
    console.log("Servidor online en puerto 3000");
});

app.use('/', homeRouter);

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/edicionRegistro', registerEditionRouter);

app.use('/productCart', productCartRouter);

app.use('/productDetail', productDetailRouter);



