const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const {
    queryPromise
} = require("./db.js")
const {
    isRequired
} = require("./db.js")



class User {
    constructor(obj) {
        this.id = obj.id
        this.email = obj.email
        this.password = obj.password
        this.name = obj.name

    }

    static register({email = isRequired(),password = isRequired(),name = isRequired()}) {
        let hashedPassword
        return bcrypt.hash(password,1).then(res => {
            hashedPassword = res
            return queryPromise(
                    "INSERT INTO Users(email,password,name) VALUES (?,?,?)",
                    [email, hashedPassword, name])
                .then(res => {
                    console.log(res.insertId)
                }).catch(rej => {
                    console.log(rej.code)
                })
        })
    }
}
module.exports = User