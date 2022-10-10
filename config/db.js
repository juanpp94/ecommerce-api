const Mysqli = require('mysqli');

// DATABASE CONNECTION
let conn = new Mysqli( {
    host:'localhost',
    post:3306,
    user:'root',
    passwd:'',
    db:'petshoofhorror'
})

let db = conn.emit(false,'');

const secret = "1SBz93MsqTs7KgwARcB0I0ihpILIjk3w";

module.exports = {
    database: db
};