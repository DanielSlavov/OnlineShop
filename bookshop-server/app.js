const mysql = require('mysql')
const express = require("express")
const Product = require( "./model/Product.js")
const bodyParser = require('body-parser');
const fs=require("fs")
const multer = require('multer'); // v1.0.5
const upload = multer({dest:"./img"}); // for parsing multipart/form-data
var cors = require('cors');

const app = express()
const port=3002
const dbClient=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pass",
    database:"bookshop"
})

app.use(cors());
app.use("/img",express.static('img'))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));























//using
app.post('/addBook', upload.single("productImage"), (req, res) => {

    req.body.image = req.file.filename + ".jpg";
    fs.rename(req.file.path, "./img/" + req.body.image)

    Product.addBook(dbClient, req.body)
        .then(dbres => {
            res.send("success")
        }).catch(err => {
            res.send("error")
        })
})
app.get('/getBook', (req, res) => {
    Product.getBook(
        dbClient,
        req.query.product_id
    ).then(dbRes => {
        console.log(dbRes)
        res.send(dbRes)
    })
})
app.get('/getBooks', (req, res) => {
    console.log(req.query.authors)
    Product.getBooks(dbClient, false, false, req.query.genres, req.query.authors)
        .then(dbRes => {
            console.log(dbRes)
            res.send(dbRes)
        })
})
app.get('/getGenres', (req, res) => {
    Product.getFromTable(dbClient, "Genres")
        .then(dbRes => {
            res.send(dbRes)
        })
})

//end using


//unused
app.post('/addAuthor',(req,res)=>{
    Product.addToTable(dbClient,"Authors",req.body)
    .then(dbres=>{
        res.send(dbres.rows[0])
    })
})
app.post('/addGenre',(req,res)=>{
    Product.addToTable(dbClient,"Genres",req.body)
    .then(dbres=>{
        res.send(dbres.rows[0])
    })
})
app.get('/getBookByProductId',(req,res)=>{
    Product.getBookById(dbClient,req.query.id).then(dbres=>{
        console.log(req.query.id)
        res.send(dbres.rows[0])
    })
})
app.listen(port,()=>console.log('listening on '+port))