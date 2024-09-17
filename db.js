const mysql = require('mysql2');

let dbConnection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT
 });

function runQuery(query, params){
    return new Promise((resolve, reject) => {
        let resultQuery = dbConnection.query(query,params, function (error, results) {
            if(error){
                console.log(error.message, error.stack);
                console.log(resultQuery.sql);
                reject(error.message);
            }
            else {
                resolve(results);
            }
        });
    });
}
 
async function createUser(email, pw, username)
{
    let query = `
        INSERT INTO users(email, pw, username) VALUES (?, ? , ?);
    `;
    let params = [email, pw, username];
    let results = await runQuery(query, params);
    return results.insertId;
}

async function getUserByEmail(email)
{
    let query = `
        SELECT * FROM users WHERE email = ?;
    `;

    let params = [email]
    let results = await runQuery(query, params);
    return results[0];
}
async function getUserById(id)
{
    let query = `
        SELECT * FROM users WHERE id = ?;
    `;
    let params = [id]
    let results = await runQuery(query, params);
    return results[0];
}
module.exports = {createUser, getUserByEmail , getUserById};