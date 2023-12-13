const path = require('path'); 
const fs = require('fs'); 

const productsFilePath = path.join(__dirname, '../database/products.json'); 
const productsJSON = fs.readFileSync(productsFilePath, 'utf-8'); 
const products = JSON.parse(productsJSON); 

module.exports = products; // Cristian