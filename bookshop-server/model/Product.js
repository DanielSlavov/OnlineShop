const isRequired = () => { throw new error("param is required") }

function query_promise(sql, args, dbClient) {
    return new Promise((resolve, reject) => {
        dbClient.query(sql, args, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        });
    });
}

class Product {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.price = obj.price
        this.quantity = obj.quantity
    }
    static getBook(dbClient, product_id = isRequired()) {
        var queryWithProduct = "SELECT * FROM Books B INNER JOIN Products P on P.id=B.product_id WHERE B.product_id = ?"
        var query = "SELECT *,B.id as id FROM Books B WHERE B.product_id = ?"

        console.log(query)
        return new Promise((resolve, reject) => {
            query_promise(query, [product_id], dbClient)
                .then((res) => {
                    var book = res[0]

                    var book_id = book["id"]
                    var authors_query = "SELECT * FROM Authors A INNER JOIN Book_Author BA on A.id=BA.author_id WHERE BA.book_id = ?"
                    var authors_promise = query_promise(authors_query, [book_id], dbClient)
                    var genres_query = "SELECT * FROM Genres G INNER JOIN Book_Genre BG ON G.id=BG.genre_id WHERE BG.book_id = ?"
                    var genres_promise = query_promise(genres_query, [book_id], dbClient)

                    book["authors"] = []
                    book["genres"] = []

                    Promise.all([authors_promise, genres_promise]).then(values => {
                        values[0].forEach(a => {
                            book["authors"].push(a["name"])
                        })
                        values[1].forEach(g => {
                            book["genres"].push(g["name"])
                        })
                        resolve(book)
                    })

                })
        })

    }
    static getBooks(dbClient, page = false, pageSize = false, genres = [], authors = []) {
        var args = []
        console.log(authors)
        var queryWithProduct = "SELECT  a.id,p.id as product_id, p.name, p.price, p.quantity, p.image, a.publisher, a.description, a.pages, a.ISBN, a.year, GROUP_CONCAT(DISTINCT c.name ORDER BY c.name) Authors, GROUP_CONCAT(g.name ORDER BY g.name SEPARATOR ';') Genres FROM Books a LEFT JOIN Products p ON a.product_id=p.id LEFT JOIN Book_Author b ON a.id = b.book_id  LEFT JOIN Authors c ON b.author_id = c.id LEFT JOIN Book_Genre bg ON a.id=bg.book_id LEFT JOIN Genr"
        var query = `
            SELECT  a.id,p.id as product_id, p.name, p.price, p.quantity, p.image, a.publisher, a.description, a.pages, a.ISBN, a.year, GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ';') Authors, GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR ';') Genres 
            FROM Books a 
            LEFT JOIN Products p ON a.product_id=p.id 
            LEFT JOIN Book_Author b ON a.id = b.book_id 
            LEFT JOIN Authors c ON b.author_id = c.id 
            LEFT JOIN Book_Genre bg ON a.id=bg.book_id 
            LEFT JOIN Genres g on bg.genre_id=g.id `
        if (genres.length > 0 || authors.length > 0)
            query += "WHERE "
        if (genres.length > 0) {
            query += "a.id in (SELECT book_id FROM Book_Genre WHERE genre_id IN (" + Array(genres.length).fill('?').join(',')
            args = args.concat(genres)
            query += ")) "
            if (authors.length > 0)
                query += "AND "
        }
        if (authors.length > 0) {
            query += "a.id in (SELECT book_id FROM Book_Author WHERE author_id IN (" + Array(authors.length).fill('?').join(',')
            args = args.concat(authors)
            query += ")) "
        }
        console.log(args)
        query += "GROUP BY a.id"
        return new Promise((resolve, rej) => {
            query_promise(query, args, dbClient).then(res => {
                res.forEach(element => {
                    //console.log(element)
                    if(element.Authors)
                        element.Authors = element.Authors.split(';')
                    if(element.Authors)
                    element.Genres = element.Genres.split(';')
                });
                resolve(res);
            })
        })
    }
    static getProduct(dbClient, id) {
        var query = "SELECT * from Products P WHERE id=?"
        return query_promise(sql, [id], dbClient)
    }
    static getMerchById(dbClient, id) {
        //By product id
        var query = "SELECT * FROM Products P FULL JOIN OtherProducts O on O.product_id=P.id WHERE O.product_id=" + id
        return dbClient.query(query)
    }
    static getImages(dbClient, id) {
        //By product id
    };

    static getFromTable(dbClient, tableName = isRequired()) {
        var query = "SELECT * FROM " + tableName;
        return dbClient.query(query)
    }
    static getFromTableById(dbClient, tableName = isRequired(), id) {
        if (!id) return new Promise((res, rej) => { res.send("") })
        var query = "SELECT * FROM " + tableName;
        query += " WHERE id=" + id;
        return dbClient.query(query)
    }


    static addBook(dbClient, { name, price, quantity, image, publisher, description, pages, ISBN, year, authors = [], genres = [] }) {
        console.log(name + " ", price + " " + quantity + " " + image)
        authors=JSON.parse(authors)
        genres=JSON.parse(genres)

        var queryProduct = "INSERT INTO Products (name,price,quantity,image) VALUES (?,?,?,?)";
        var productID;
        var queryBook = "INSERT INTO Books (product_id,publisher,description,pages,ISBN,year) VALUES(?,?,?,?,?,?)"
        var bookID;
        return new Promise(resolve => {
            query_promise(queryProduct, [name, price, quantity, image], dbClient)
                .then(res => {
                    productID = res.insertId
                    return query_promise(queryBook, [productID, publisher, description, pages, ISBN, year], dbClient)
                        .then(res => {
                            bookID = res.insertId
                            var promiseArr = []
                            authors.forEach(a => {
                                promiseArr.push(this.addAuthorToBook(dbClient, bookID, a))
                            })
                            genres.forEach(g => {
                                promiseArr.push(this.addGenreToBook(dbClient, bookID, g))
                            })
                            Promise.all(promiseArr)
                                .then(res => {
                                    resolve(bookID)
                                })
                        })
                })
        })
    }

    static addAuthorToBook(dbClient, book_id = isRequired(), author_name = isRequired()) {
        return query_promise("SELECT id FROM Authors WHERE name=?", [author_name], dbClient)
            .then(res => {
                if (res.length == 0) {
                    return query_promise("INSERT INTO Authors(name) VALUES (?)", [author_name], dbClient)
                        .then(res => {
                            return query_promise("INSERT INTO Book_Author VALUES(?,?)", [book_id, res.insertId], dbClient)
                        })
                } else {
                    return query_promise("INSERT INTO Book_Author VALUES(?,?)", [book_id, res[0]['id']], dbClient)
                }
            })
    }
    static addGenreToBook(dbClient, book_id = isRequired(), genre_name = isRequired()) {
        return query_promise("SELECT id FROM Genres WHERE name=?", [genre_name], dbClient)
            .then(res => {
                if (res.length == 0) {
                    return query_promise("INSERT INTO Genres(name) VALUES (?)", [genre_name], dbClient)
                        .then(res => {
                            return query_promise("INSERT INTO Book_Genre VALUES(?,?)", [book_id, res.insertId], dbClient)
                        })
                } else {
                    return query_promise("INSERT INTO Book_Genre VALUES(?,?)", [book_id, res[0]['id']], dbClient)
                }
            })
    }


    static addMerch(dbClient, { name, manufacturer_id, category_id, genre_id, description, price, quantity }) {
        //TODO
    }
    static getFromTable(dbClient,tableName=isRequired()){
        var query="SELECT * FROM "+tableName;
        return query_promise(query,[tableName],dbClient)
    }

    static addBook_Author(dbClient, { book_id = isRequired(), author_id = isRequired() }) {
        var query = "INSERT INTO Book_Author (book_id,author_id) VALUES (" + book_id + ", " + author_id + ")"
        console.log(query)
        dbClient.query(query)
    }
    static addToTable(dbClient, tableName = isRequired(), { name }) {//ONLY FOR ENUM TABLES!
        //if table is NOT ENUM(has only 'id' and 'name' columns)
        //you should create a separate function

        var query = "INSERT INTO " + tableName + " (name) VALUES ('" + name + "')"
        console.log(query)
        return dbClient.query(query);
    }
}
module.exports = Product


