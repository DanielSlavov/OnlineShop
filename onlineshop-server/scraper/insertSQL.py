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
        database="onlineshop"
    )
    mydb.autocommit = True
    cursor=mydb.cursor()
    queryProduct="INSERT INTO Products (name,price,category,image,description) VALUES (%s,%s,%s,%s,%s)"

    cursor.execute(queryProduct,(book.name,book.price,book.genres[0],book.imageFileName,book.description))
    product_id=cursor.lastrowid

    if(not product_id):
        quit()
        
    return True



urls=open("./urls.txt",'r')

for url in urls:
    print(scrapeToSQL(scrapeBook(url.strip())))

urls.close()

