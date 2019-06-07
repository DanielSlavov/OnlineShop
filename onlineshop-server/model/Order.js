// const jwt = require("jsonwebtoken")
// const fs = require('fs')


const { queryPromise } = require("./db.js")
const { isRequired } = require("./db.js")



class Order {
    static makeOrder({ user_id, price, date, details, products,place,address,phone,name }) {
        console.log({ user_id, price, date, details, products,place,address,phone,name })
        let query = "INSERT INTO Orders(user_id,price,date,details,status,place,address,phone,name) VALUES(?,?,(SELECT CURDATE() + 1),?,?,?,?,?,?)"
        return queryPromise(query, [user_id, price, details, 0,place,address,phone,name]).then(res => {
            let orderID = res.insertId
            let orderProductPromises = []
            products.forEach(product => {
                let orderProductQuery = "INSERT INTO Order_Product(order_id,product_id) VALUES(?,?)"
                orderProductPromises.push(queryPromise(orderProductQuery, [orderID, product.id]))
            })

            return Promise.all(orderProductPromises)
        })
    }

    static orderSent(order_id) {
        let query = "UPDATE Orders SET status='1' WHERE id=?"
        return queryPromise(query, [order_id]);
    }
    static getOrders(userID) {
        let query = "SELECT * FROM Orders WHERE user_id=?"
        return queryPromise(query, [userID]).then(res => {
            let productsQuery = `SELECT P.id, P.name,P.price,P.category,P.image 
                FROM Order_Product OP
                JOIN Products P on OP.product_id=P.id
                WHERE OP.order_id=?`
            let productsPromises = []
            res.forEach(order => {
                productsPromises.push(queryPromise(productsQuery,[order.id]))
            })
            return Promise.all(productsPromises).then(productsRes=>{
                for(let i=0;i<res.length;i++){
                    res[i].products=productsRes[i]
                    //console.log(res[i])
                }
                return res
            })

        })
    }
    static getAllOrders(){

        let query = "SELECT * FROM Orders"
        return queryPromise(query).then(res => {
            let userQuery="SELECT name,email"
            let productsQuery = `SELECT P.id, P.name,P.price,P.category,P.image 
                FROM Order_Product OP
                JOIN Products P on OP.product_id=P.id
                WHERE OP.order_id=?`
            let productsPromises = []
            res.forEach(order => {

                productsPromises.push(queryPromise(productsQuery,[order.id]))
            })
            return Promise.all(productsPromises).then(productsRes=>{
                for(let i=0;i<res.length;i++){
                    res[i].products=productsRes[i]
                    //console.log(res[i])
                }
                return res
            })

        })
    }
}
module.exports = Order