from bs4 import BeautifulSoup
import requests
import csv
import lxml
import demjson
import urllib.request


class Book:
    def __init__(self,name=None,price=None,quantity=None,author=None,publisher=None,genres=None,description=None,pages=None,ISBN=None,year=None,imageLink=None,imageFileName=None):
        self.name=name
        self.price=price
        self.quantity=quantity
        self.author=author
        self.publisher=publisher
        self.genres=genres
        self.description=description
        self.pages=pages
        self.ISBN=ISBN
        self.year=year
        self.imageLink=imageLink
        self.imageFileName=imageFileName
    def __str__(self):
        return (
            "Name: "+ str(self.name) +"\n" +
            "Price: "+ str(self.price) + "\n"
            "Quantity: "+ str(self.quantity) + "\n" +
            "Authors: "+ str(self.author) + "\n" +
            "Publisher: "+ str(self.publisher) + "\n" +
            "Genres: "+ str(self.genres) + "\n" +
            "Year: "+ str(self.year) + "\n" +   
            "Description: "+ str(self.description) + "\n" +
            "Pages: "+ str(self.pages) + "\n" +
            "ISBN: "+ str(self.ISBN) + "\n" +
            "ImageFileName: " + str(self.imageFileName) +'\n'+
            "ImageLink: "+ str(self.imageLink) + "\n" 
                
        )

def scrapeBook(url):

    b=Book()


    source=requests.get(url).text


    soup=BeautifulSoup(source,'lxml')
    details=soup.find('div',class_="full-technical-data-content")
    productDetails=soup.find_all('script',type="text/javascript")
    image=soup.find('meta',property="og:image")
    b.imageLink=image["content"]
    urllib.request.urlretrieve(b.imageLink, "../img/"+b.imageLink.split('/')[-1])
    b.imageFileName=b.imageLink.split('/')[-1]
    productDetailsJSONString=""
    for child in productDetails:
        if("productData" in child.text):
            productDetailsJSONString=(child.text[19:].split('}')[0]+'}')
            break

    jsonn=demjson.decode(productDetailsJSONString)
    b.name=jsonn['name']
    b.price=jsonn['value']
    description=' '.join(soup.find('div',class_="text-page",itemprop="description").text.split())
    b.description=description[:500]
    arr=[]
    for child in details.descendants:
        if (child.name=='td' or child.name=='th'):
            arr.append(child.text.strip())



    i=0
    while i<len(arr):
        if(arr[i]=="Автор" or arr[i]=="Автори"):
            authors=[]
            for x in arr[i+1].split(','):
                authors.append((' '.join(x.replace('\n','').split())).strip())

            b.author=authors
            i+=1

        if(arr[i]=="Издателство" or arr[i]=="Издателства"):
            b.publisher=arr[i+1]
            i+=1

        if(arr[i]=="Година"):
            b.year=arr[i+1]
            i+=1

        if(arr[i]=="Брой страници"):
            b.pages=arr[i+1]
            i+=1

        if(arr[i]=="Жанрове"):
            genres=[]
            for x in arr[i+1].split(','):
                genres.append((' '.join(x.replace('\n','').split())).strip())
            b.genres=genres
            i+=1

        if(arr[i]=="Баркод"):
            b.ISBN=arr[i+1]
            i+=1
        i+=1

    return b

