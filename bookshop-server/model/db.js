const mysql = require('mysql')
const dbClient = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "bookshop"
})

function queryPromise(sql, args) {
    return new Promise((resolve, reject) => {
        dbClient.query(sql, args, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        });
    });
}
const isRequired = () => {
    throw new Error("param is required")
}

module.exports={queryPromise,isRequired}
