const path = require('path');
const fs = require('fs');

const usersFilePath = path.join(__dirname, '../database/users.json');

let usersJSON = fs.readFileSync(usersFilePath, 'utf-8');

const users = JSON.parse(usersJSON);


const model = {
    getAll: ()=> users,

    getOne: (id) => {
        let userSearched=users.find(user => user.id==id);
        return userSearched;
    },

    //Guardar nuevo usuario en base de Datos
    save: (user) =>{

        user.id = users.length + 1;

        users.push(user);
        usersJSON = JSON.stringify(users);
        fs.writeFileSync("src/database/users.json", usersJSON);
        return true;
    }
}

module.exports = model;