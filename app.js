const express = require('express');
const path = require("node:path");
const methodOverride = require('method-override'); // Cristian
const session = require('express-session'); // Flor

// Routers
const homeRouter = require('./src/routers/home.js')
const usersRouter = require('./src/routers/users.js')
const productsRouter = require('./src/routers/products.js')
const apiProductsRouter = require('./src/routers/apiProducts.js');
const apiUsersRouter = require('./src/routers/apiUsers.js')


const app = express();

app.use(methodOverride('_method')); // Cristian
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: "Boom, the dinamite" })); // el mensaje explosivo de Cristian (Flor)

//Con esto se pasa el objeto session a TODAS las vistas
//Es un Middleware
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

// Indicamos que vamos a trabajar con un motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

// Habilitar la capeta Public
const publicFolderPath = path.resolve(__dirname, './public');
app.use(express.static(publicFolderPath));

// Subir servidor
app.listen(3000, () => {
    console.log("Servidor online en puerto 3000");
});

// Seccion HOME
app.use('/', homeRouter);

// Seccion USERS
app.use('/users', usersRouter);

// Seccion PRODUCTS
app.use('/products', productsRouter);

// Seccion API

app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter); //Cristian