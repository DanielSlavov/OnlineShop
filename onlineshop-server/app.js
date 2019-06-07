
const express = require("express")
const Product = require( "./model/Product.js")
const User = require("./model/User.js")
const Order = require("./model/Order.js")
const bodyParser = require('body-parser');
const fs=require("fs")
const multer = require('multer'); // v1.0.5
const upload = multer({dest:"./img"}); // for parsing multipart/form-data
var cors = require('cors');
 
const app = express()
const port=3002

app.use(cors());
app.use("/img",express.static('img'))
app.use("/",express.static('public'))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


//User.token()

app.get("/token",(req,res)=>{
    User.token()
    res.sendStatus(200)
})

app.post('/register',(req,res)=>{
    User.register(req.body).then(dbRes=>{
        res.send(dbRes)
    }).catch(error=>{
        console.log(error)
        if(error.code && error.code=="ER_DUP_ENTRY")
            res.sendStatus(409)
        else
            res.sendStatus(500)
    })
})

app.post('/login',(req,res)=>{
    User.login(req.body).then(token=>{
        res.send({token})
    }).catch(err=>{
        res.status(401).send(err.message)
    })
})
app.get('/getSelfData',(req,res)=>{

    let token=req.headers.authorization.split(' ')[1]
    res.send(User.userData(token))
 })




app.get('/checkEmail',(req,res)=>{
    User.checkEmail(req.query.email)
    .then(dbres=>{
        res.send({"exists":dbres.length})
    })
})

app.post('/makeOrder',(req,res)=>{
    let token=req.headers.authorization.split(' ')[1]
    Order.makeOrder(req.body)
    .then(dbres=>{
        res.send("success")
    }).catch(err=>{
        console.log(err)
        res.sendStatus(500)
    })
}),


app.get('/getProducts', (req, res) => {
    Product.getProducts(req.query.category).then(dbRes => {
        res.send(dbRes)
    })
})

app.get('/getProduct', (req, res) => {
    Product.getProduct(req.query.product_id).then(dbRes => {
        res.send(dbRes)
    })
})

app.get('/getCategories',(req,res)=>{
    Product.getCategories().then(dbRes=>{
        res.send(dbRes)
    })
})

app.get("/getOrders",(req,res)=>{
    let token=req.headers.authorization.split(' ')[1]
    let userData=User.userData(token)
    
    Order.getOrders(User.userData(token).id)
    .then(dbres=>{
        res.send(dbres)
    })
})





//admin

app.get('/getAllOrders',(req,res)=>{
    let token=req.headers.authorization.split(' ')[1]
    let userData=User.userData(token)
    if(userData.privilege==0){
        res.sendStatus(401)
        return;
    }

    Order.getAllOrders().then(dbRes=>{
        res.send(dbRes)
    })



})


app.post("/orderSent",(req,res)=>{
    Order.orderSent(req.body.order_id)
    .then(dbres=>{
        res.send("success")
    }).catch(err=>{
        console.log(err)
        res.sendStatus(500)
    })
})

fields=[
    { name: 'name', maxCount: 1 },
    { name: 'image', maxCount: 1 },
    { name: 'price', maxCount: 1 },
    { name: 'description', maxCount: 1 },
    { name: 'category', maxCount: 1 }

]
app.post('/addProduct', upload.single("image"), (req, res) => {
    req.body.image = req.file.filename
    fs.rename(req.file.path, "./img/" + req.body.image,(err)=>{})

    Product.addProduct(req.body)
        .then(dbres => {
            res.send("success")
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
            //res.send("error")
        })
})

app.post('/removeProduct',(req,res)=>{
    return Product.removeProduct(req.body.id).then(dbRes=>{
        res.sendStatus(200)
    })
})




//end using


//unused

app.listen(port,()=>console.log('listening on '+port))