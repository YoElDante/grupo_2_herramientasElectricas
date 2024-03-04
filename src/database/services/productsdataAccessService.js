const path = require('path'); 
const fs = require('fs'); 

const productsFilePath = path.join(__dirname, '../products.json'); 
const productsJSON = fs.readFileSync(productsFilePath, 'utf-8'); 
const products = JSON.parse(productsJSON); 

module.exports = products; // Cristian

// -----------------------------------------------------------------
//                  Actualizacion para Sequelize
// -----------------------------------------------------------------

// const path = require('path');
const db = require('../models/index.js');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const productServices = {
    'list': (req, res) => {
        db.Movie.findAll({
            include: ['genre']
        })
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id,
            {
                include : ['genre']
            })
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': async () => {
        
        let movies = await db.Movie.findAll({
            include: ['genre'],
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })

        return movies;

    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        let promGenres = Genres.findAll();
        let promActors = Actors.findAll();
        
        Promise
        .all([promGenres, promActors])
        .then(([allGenres, allActors]) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'moviesAdd'), {allGenres,allActors})})
        .catch(error => res.send(error))
    },

    create: console.log('create del product SQL')
    

}
module.exports = productServices;