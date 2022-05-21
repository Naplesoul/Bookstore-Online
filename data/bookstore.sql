-- MySQL dump 10.13  Distrib 8.0.29, for macos12.2 (arm64)
--
-- Host: 127.0.0.1    Database: bookstore
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `ISBN` int NOT NULL,
  `book_name` varchar(20) NOT NULL,
  `category` varchar(10) DEFAULT NULL,
  `author` varchar(15) NOT NULL,
  `price` int NOT NULL,
  `storage` int NOT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `books_ISBN_uindex` (`ISBN`),
  UNIQUE KEY `books_book_id_uindex` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,1,'Java核心技术卷II','编程','凯S.霍斯特曼',9010,951),(2,2,'深入理解计算机系统','编程','兰德尔·E·布莱恩特',13690,1191),(3,3,'Effective C++','编程','梅耶',5130,995),(4,4,'小王子','儿童文学','圣-埃克苏佩里',889,195),(5,5,'Java编程思想','编程','Bruce Ecke',9120,9086),(6,6,'魔兽世界编年史套装','魔幻小说','克里斯˙梅森',44820,121),(7,7,'三体：全三册','科幻小说','刘慈欣',5020,14404),(8,8,'悲惨世界','世界名著','雨果',10400,371),(9,9,'动物农场','社会小说','乔治·奥威尔',2039,115),(10,10,'机器学习','编程','周志华',6160,2518),(11,11,'纳尼亚传奇','魔幻小说','刘易斯',8620,123),(12,12,'老人与海','世界名著','海明威',2780,2414),(13,13,'魔力的胎动','悬疑/推理小说','东野圭吾',3590,1229),(14,14,'我不怕这漫长黑夜','青春文学','苑子豪',3750,1130),(15,15,'永久记录','传记文学','爱德华·斯诺登',5670,123),(16,16,'探索月球','儿童文学','安妮·詹克利奥维奇',13319,1516),(17,17,'高考英语','中小学教辅','曲一线',7080,12329),(18,18,'红楼梦','世界名著','曹雪芹',1880,2441),(19,19,'草房子','儿童文学','曹文轩',2250,1235),(20,20,'追风筝的人','世界名著','卡勒德·胡赛尼',3529,14141),(21,21,'软件工程原理','编程','沈备军、陈昊鹏、陈雨亭',3590,1012),(22,22,'数据库系统概念','编程','西尔伯沙茨',7420,235),(23,23,'算法导论','编程','科尔曼',7763,144),(24,24,'史记','古籍','司马迁',23710,4141),(25,25,'天龙八部','武侠小说','金庸',10230,74747),(26,26,'笑傲江湖','武侠小说','金庸',8009,2522),(27,27,'楚留香传奇','武侠小说','古龙',22450,550),(28,28,'哈利波特与魔法石','魔幻小说','J·K·罗琳',3020,1000),(29,29,'哈利波特与死亡圣器','魔幻小说','J·K·罗琳',5620,1551);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `book_id` int NOT NULL,
  `book_num` int NOT NULL,
  `book_price` int NOT NULL,
  `book_name` varchar(20) NOT NULL,
  `author` varchar(15) NOT NULL,
  `category` varchar(10) NOT NULL,
  `image` longtext,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `order_items_item_id_uindex` (`item_id`),
  KEY `order` (`order_id`),
  CONSTRAINT `order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_price` int NOT NULL,
  `order_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `orders_order_id_uindex` (`order_id`),
  KEY `user` (`user_id`),
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `user_info_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `nickname` varchar(15) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `tel` varchar(15) DEFAULT NULL,
  `address` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`user_info_id`),
  UNIQUE KEY `user_info_user_id_uindex` (`user_id`),
  UNIQUE KEY `user_info_user_info_id_uindex` (`user_info_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,1,'swhSWH','SWH','swh@outlook.com','13012345678','SJTU'),(2,2,NULL,NULL,'who@outlook.com',NULL,NULL),(3,3,'admin','admin','admin@sjtu.edu.cn','13912345678','SJTU'),(4,4,NULL,NULL,'qyt@sjtu.edu.cn',NULL,NULL),(5,5,NULL,NULL,'hyj@sjtu.edu.cn',NULL,NULL),(6,6,NULL,NULL,'szc@sjtu.edu.cn',NULL,NULL),(7,7,NULL,NULL,'she@sjtu.edu.cn',NULL,NULL);
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `password` varchar(15) NOT NULL,
  `user_type` int NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `users_username_uindex` (`username`),
  UNIQUE KEY `users_user_id_uindex` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'shenwhang','123456',0),(2,'test','123456',0),(3,'admin','admin',1),(4,'qnzzzz','123456',0),(5,'hyj','123456',0),(6,'szc','123456',0),(7,'test2','123456',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-21 21:55:12
