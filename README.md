# Documentation

##  Introduction

Welcome to the FlowerzAPI. Here you will learn about our available resources and how to use them with HTTP requests.

## Get Started

Firstly, we will learn how to make an API request to the FlowerzAPI.

In order to do that, you will have to open up a terminal and use curl or httpie to make an API request for a resource.
For example:

```bash
http://localHost:8080/api/flowerBouquet/5fd4b1476027c14028b0e5de
```

Here we are asking for a birthday style bouquet.

The response:


```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 329
Date: Sat, 12 Dec 2020 14:02:21 GMT
Connection: close

[
  {
    "_id": "5fd4b1476027c14028b0e5de",
    "color": "WHITE",
    "price": 89.9,
    "size": "M",
    "productDescription": "test test test test test test",
    "productImage": "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    "occasionStyle": "BIRTHDAY",
    "isMixed": true,
    "updatedAt": "2020-12-12T12:06:46.718Z",
    "createdAt": "2020-12-12T12:05:19.018Z"
  }
]
```

*Note: Response may be different due to possible changes in data.

## Base URL

The base URL, which presents the root for the entire API  :


```bash
http://localHist:8080/api
```
## Authentication

FlowerzAPI require authentication for some of its requests. However, some operations are open and does not require authentication to get data. 

## JSON Schema

FlowerzAPI resources support JSON Schema.

## Encoding
FlowerzAPI provides JSON as the data format.

## Resources
FlowerzAPI provides JSON as the data format.

### User
The Users resource provides information on the registered users of the application.
Use and requests from this resource require specific authorizations.

#### Example request:
```
http://localHost:8080/api/users
```

#### Example response:
```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 312
Date: Sat, 12 Dec 2020 14:29:45 GMT
Connection: close

[
  {
    "_id": "5fd3d0bbccb74d3b1c307e64",
    "emailAddress": "test@gmail.com",
    "firstName": "Test",
    "surName": "Testush",
    "phoneNumber": "050-546-6646",
    "addresses": [
      {
        "_id": "5fd4a48331436b3a6cc59173",
        "name": "Home",
        "city": "testavile",
        "street": "testastreet",
        "houseNumber": "4/5",
        "floorNumber": 7,
        "aptNumber": 7
      }
    ],
    "cart": {
      "orders": []
    }
  }
]
```
##### Properties 
* id : *String*-- The User's id. This attribute is generated automatically. 
* emailAddress : *String*-- The User's email address.  Must be a valid email on input.
* firstName : *String* -- The first name of the user.
* surName : *String* -- The last name of the user.
* PhoneNumber : *Number* --The User's phone number. Must be a valid phone number on input.
* addresses : *object Array* -- 
   * id : *String* -- The addresses id. This attribute is generated automatically. 
   * name : *String* -- The type of the address. (Home, Work, etc...)
   * city : *String* - -The city of the user.
   * street : *String* -- The street of the user.
   * houseNumber : *Number* -- The user's house number.
   * floorNumber : *Number* -- The user's floor number.
   * aptNumber : *Number* -- The user's apartment number.

* cart : *Object* -- 
   * orders : *orders Array* -- The orders of the user.

### Order
The Order resource provides information on the orders of the application user's.
Use and requests from this resource require specific authorizations.

#### Example request:
```
http://localhost:8080/api/orders/5fd4a82fd0069c37bc46b183
```

#### Example response:
```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 255
Date: Sat, 12 Dec 2020 15:15:27 GMT
Connection: close

{
  "_id": "5fd4a82fd0069c37bc46b183",
  "userID": "5fd3d0bbccb74d3b1c307e64",
  "frequencyWeeks": "1",
  "startDate": "11/3",
  "nextShippingDate": "19/3",
  "orderCategory": "BOUQUET",
  "totalSum": 200,
  "updatedAt": "2020-12-12T11:26:12.546Z",
  "createdAt": "2020-12-12T11:25:32.675Z"
}
```
##### Properties 
* id : *String*-- The Order's id. This attribute is generated automatically. 
* UserId: *String*-- The id of the user who registered the order.
* frequencyWeeks: *Number* -- The weekly frequency desired by the user
* startDate: *Date* -- The First date for the order delivery.
* nextShippingDate: *Date* -- The next date for the order delivery.
* orderCategory: *String* --The order's type of category.
* totalSum: *Number* -- The order's price amount.
* updateAt: *Date* -- The last date the order has been updated .
* createdAt: *Date* -- The date the order has been created.


### Flower bouquet
The Flower bouquet resource provides information on the product.
Use and requests from this resource require specific authorizations.

#### Example request:
```
http://localHost:8080/api/flowerBouquet
```

#### Example response:
```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 1345
Date: Sat, 12 Dec 2020 16:09:34 GMT
Connection: close

[
  {
    "_id": "5fd4dccf95bab7401c0faea3",
    "color": "WHITE",
    "price": 99.9,
    "size": "M",
    "productDescription": "a very nice flower!",
    "productImage": "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    "occasionStyle": "BIRTHDAY",
    "isMixed": true,
    "createdAt": "2020-12-12T15:07:59.111Z",
    "updatedAt": "2020-12-12T15:07:59.111Z",
    "__v": 0
  }
```
##### Properties 
* id : *String*-- The flowerBouquet's id. This attribute is generated automatically. 
* color: *String*-- The color of the flowerBouquet. 
* price: *Number* -- The price of the flowerBouquet.
* size: *Char* -- The Size of the size (S,M,L,XL).
* productDescription: *Date* -- A description of the flowerBouquet. 
* productImage: *URL* -- An image of the flowerBouquet.
* occasionStyle: *String* -- The product style of occasion.
* isMixed: *Boolean* -- Flower bouquet diversity
* createdAt: *Date* -- The date the flowerBouquet has been created.
* updatedAt: *Date* -- The date the flowerBouquet has been last updated.









