# [Bookstore-Online](https://github.com/Naplesoul/Bookstore-Online)

### Demo

![ebookstore](./ebookstore.png)



Login Page

![loginPage](./loginPage.png)



### Dependencies

MySQL >= 8.0

MongoDB >= 5.2

Redis >= 5.0

NodeJs >= 16.14.0 (lts)

JDK >= 11 (lts), OpenJDK17 (lts) recommended



### Deployment

Import MySQL database:

```shell
mysql -uroot -p -Dbookstore <./data/bookstore.sql
```



Import MongoDB database:

```shell
mongorestore -d Bookstore --drop ./data/mongo/Bookstore/
```



Set url of the database in `bookstore-backend/src/main/resources/application.properties` as you wish.

Run Java class `BookstoreBackendApplication`.
