# [Bookstore-Online](https://github.com/Naplesoul/Bookstore-Online)

### Demo

![ebookstore](https://raw.githubusercontent.com/Naplesoul/Bookstore-Online/main/ebookstore.png)



Login Page

![loginPage](https://raw.githubusercontent.com/Naplesoul/Bookstore-Online/main/loginPage.png)



### Dependencies

MySQL >= 8.0

MongoDB >= 5.2

Redis >= 5.0

NodeJs >= 16.14.0 (lts)

JDK >= 11 (lts), OpenJDK17 (lts) recommended



### Deployment

Import `data/bookstore.sql` into MySQL schema named `bookstore`.

Create MongoDB database named `Bookstore`.

Import `data/Bookstore.bookImage.csv` into MongoDB collection named `bookImage`.

Import `data/Bookstore.bookIntro.csv` into MongoDB collection named `bookIntro`.

Import `data/Bookstore.userAvatar.csv` into MongoDB collection named `userAvatar`.

Set url of the database in `bookstore-backend/src/main/resources/application.properties` as you wish.

Run Java class `BookstoreBackendApplication`.
