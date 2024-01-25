const path = require('path'); 
const fs = require('fs'); 

const usersFilePath = path.join(__dirname, '../database/users.json');

const usersJSON = fs.readFileSync(usersFilePath, 'utf-8'); 

const users = JSON.parse(usersJSON); 

console.log(users);
module.exports = users;