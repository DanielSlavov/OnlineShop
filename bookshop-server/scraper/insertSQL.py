from scraper import scrapeBook
from scraper import Book
import mysql.connector
import pickle
import json


def scrapeToSQL(book):
    
    mydb=mysql.connector.connect(
        host="localhost",
        port="3306",
        user="root",
        passwd="pass",
        database="bookshop"
    )
    mydb.autocommit = True
    cursor=mydb.cursor()
    queryProduct=("INSERT INTO Products (name,price,quantity,image) VALUES ('"+
                book.name+"', '"+
                book.price+"', '20', '"+
                book.imageFileName+"')")


    cursor.execute(queryProduct)
    product_id=cursor.lastrowid
    if(not product_id):
        quit()


    queryBook="INSERT INTO Books (product_id,publisher,description,pages,ISBN,year) VALUES (%s,%s,%s,%s,%s,%s)"
    cursor.execute(queryBook,(product_id,book.publisher,book.description,book.pages,book.ISBN,book.year,))
    bookID=cursor.lastrowid

    authorIDs=[]
    querySelectAuthor="SELECT id FROM Authors WHERE name = %s"
    queryInsertAuthor="INSERT INTO Authors (name) VALUES (%s)"
    for author in book.author:
        cursor.execute(querySelectAuthor,(author,))
        dbRes=cursor.fetchall()
        if(cursor.rowcount>0):
            authorIDs.append(dbRes[0][0])
        else:
            cursor.execute(queryInsertAuthor,(author,))
            authorIDs.append(cursor.lastrowid)

    #print(authorIDs)
    bookAuthorQuery="INSERT INTO Book_Author(book_id,author_id) VALUES(%s,%s)"
    for auth_id in authorIDs:
        cursor.execute(bookAuthorQuery,(bookID,auth_id))


    genreIDs=[]
    querySelectGenre="SELECT id FROM Genres WHERE name = %s"
    queryInsertGenre="INSERT INTO Genres (name) VALUES (%s)"
    for genre in book.genres:
        cursor.execute(querySelectGenre,(genre,))
        dbRes=cursor.fetchall()
        if(cursor.rowcount>0):
            genreIDs.append(dbRes[0][0])
        else:
            cursor.execute(queryInsertGenre,(genre,))
            genreIDs.append(cursor.lastrowid)

    #print(genreIDs)
    bookGenreQuery="INSERT INTO Book_Genre(book_id,genre_id) VALUES(%s,%s)"
    for genre_id in genreIDs:
        cursor.execute(bookGenreQuery,(bookID,genre_id))

        
    return True


urls=open("urls.txt",'r')

for url in urls:
    print(scrapeToSQL(url.strip()))

urls.close()

