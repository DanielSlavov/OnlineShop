const {queryPromise} = require("./db.js")
const {isRequired} = require("./db.js")

class Product {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.price = obj.price
        this.quantity = obj.quantity
    }
    
    static addProduct({ name, price, category, image, description, quantity}) {
        var queryProduct = "INSERT INTO Products (name,price,category,image,description) VALUES (?,?,?,?,?)";
        return queryPromise(queryProduct, [name, price, category, image,description])

    }
    
    static removeProduct(product_id){
        var query="DELETE FROM Products WHERE id=?"
        return queryPromise(query,[product_id])
    }

    static getProducts(category=false){
        var query="SELECT * FROM Products"
        var args=[]
        if(category){
            query+=" WHERE category=?"
            args.push(category)
        }
        return queryPromise(query,args);
    }


    static getProduct(id=isRequired()) {
        var query = "SELECT * from Products P WHERE id=?"
        return queryPromise(query, [id])
    }


    static getFromTable(tableName=isRequired()){
        var query="SELECT * FROM "+tableName;
        return queryPromise(query,[tableName])
    }

    static getCategories(){
        var query="SELECT category FROM Products GROUP BY category"
        return queryPromise(query)
        .then(dbRes=>{
            return new Promise((resolve,reject)=>{
                let res=[]
                if(dbRes)
                dbRes.forEach(cat=>{
                    res.push(cat['category'])
                })
                resolve(res)
            })
        })
    }

}
module.exports = Product


