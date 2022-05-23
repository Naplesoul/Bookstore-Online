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
INSERT INTO `books` VALUES (1,1,'Java核心技术卷II','编程','凯S.霍斯特曼',9010,99999999),(2,2,'深入理解计算机系统','编程','兰德尔·E·布莱恩特',13690,99999999),(3,3,'Effective C++','编程','梅耶',5130,99999999),(4,4,'小王子','儿童文学','圣-埃克苏佩里',889,99999999),(5,5,'Java编程思想','编程','Bruce Ecke',9120,99999999),(6,6,'魔兽世界编年史套装','魔幻小说','克里斯˙梅森',44820,99999999),(7,7,'三体：全三册','科幻小说','刘慈欣',5020,99999999),(8,8,'悲惨世界','世界名著','雨果',10400,99999999),(9,9,'动物农场','社会小说','乔治·奥威尔',2039,99999999),(10,10,'机器学习','编程','周志华',6160,99999999),(11,11,'纳尼亚传奇','魔幻小说','刘易斯',8620,99999999),(12,12,'老人与海','世界名著','海明威',2780,99999999),(13,13,'魔力的胎动','悬疑/推理小说','东野圭吾',3590,99999999),(14,14,'我不怕这漫长黑夜','青春文学','苑子豪',3750,99999999),(15,15,'永久记录','传记文学','爱德华·斯诺登',5670,99999999),(16,16,'探索月球','儿童文学','安妮·詹克利奥维奇',13319,99999999),(17,17,'高考英语','中小学教辅','曲一线',7080,99999999),(18,18,'红楼梦','世界名著','曹雪芹',1880,99999999),(19,19,'草房子','儿童文学','曹文轩',2250,99999999),(20,20,'追风筝的人','世界名著','卡勒德·胡赛尼',3529,99999999),(21,21,'软件工程原理','编程','沈备军、陈昊鹏、陈雨亭',3590,99999999),(22,22,'数据库系统概念','编程','西尔伯沙茨',7420,99999999),(23,23,'算法导论','编程','科尔曼',7763,99999999),(24,24,'史记','古籍','司马迁',23710,99999999),(25,25,'天龙八部','武侠小说','金庸',10230,99999999),(26,26,'笑傲江湖','武侠小说','金庸',8009,99999999),(27,27,'楚留香传奇','武侠小说','古龙',22450,99999999),(28,28,'哈利波特与魔法石','魔幻小说','J·K·罗琳',3020,99999999),(29,29,'哈利波特与死亡圣器','魔幻小说','J·K·罗琳',5620,99999999);
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
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,1,'swhSWH','SWH','swh@outlook.com','13012345678','SJTU'),(2,2,'who','who','who@outlook.com','13012345678','SJTU'),(3,3,'admin','admin','admin@sjtu.edu.cn','13912345678','SJTU'),(4,4,'qyt','qyt','qyt@sjtu.edu.cn','13012345678','SJTU'),(5,5,'hyj','hyj','hyj@sjtu.edu.cn','13012345678','SJTU'),(6,6,'hyj','hyj','szc@sjtu.edu.cn','13012345678','SJTU'),(7,7,'test1','test1','test@sjtu.edu.cn','13012345678','SJTU'),(8,8,'test2','test2','test@sjtu.edu.cn','13012345678','SJTU'),(9,9,'test3','test3','test@sjtu.edu.cn','13012345678','SJTU'),(10,10,'test4','test4','test@sjtu.edu.cn','13012345678','SJTU'),(11,11,'test5','test5','test@sjtu.edu.cn','13012345678','SJTU'),(12,12,'test6','test6','test@sjtu.edu.cn','13012345678','SJTU'),(13,13,'test7','test7','test@sjtu.edu.cn','13012345678','SJTU'),(14,14,'test8','test8','test@sjtu.edu.cn','13012345678','SJTU'),(15,15,'test9','test9','test@sjtu.edu.cn','13012345678','SJTU'),(16,16,'test10','test10','test@sjtu.edu.cn','13012345678','SJTU'),(17,17,'test11','test11','test@sjtu.edu.cn','13012345678','SJTU'),(18,18,'test12','test12','test@sjtu.edu.cn','13012345678','SJTU'),(19,19,'test13','test13','test@sjtu.edu.cn','13012345678','SJTU'),(20,20,'test14','test14','test@sjtu.edu.cn','13012345678','SJTU'),(21,21,'test15','test15','test@sjtu.edu.cn','13012345678','SJTU'),(22,22,'test16','test16','test@sjtu.edu.cn','13012345678','SJTU'),(23,23,'test17','test17','test@sjtu.edu.cn','13012345678','SJTU'),(24,24,'test18','test18','test@sjtu.edu.cn','13012345678','SJTU'),(25,25,'test19','test19','test@sjtu.edu.cn','13012345678','SJTU'),(26,26,'test20','test20','test@sjtu.edu.cn','13012345678','SJTU'),(27,27,'test21','test21','test@sjtu.edu.cn','13012345678','SJTU'),(28,28,'test22','test22','test@sjtu.edu.cn','13012345678','SJTU'),(29,29,'test23','test23','test@sjtu.edu.cn','13012345678','SJTU'),(30,30,'test24','test24','test@sjtu.edu.cn','13012345678','SJTU'),(31,31,'test25','test25','test@sjtu.edu.cn','13012345678','SJTU'),(32,32,'test26','test26','test@sjtu.edu.cn','13012345678','SJTU'),(33,33,'test27','test27','test@sjtu.edu.cn','13012345678','SJTU'),(34,34,'test28','test28','test@sjtu.edu.cn','13012345678','SJTU'),(35,35,'test29','test29','test@sjtu.edu.cn','13012345678','SJTU'),(36,36,'test30','test30','test@sjtu.edu.cn','13012345678','SJTU'),(37,37,'test31','test31','test@sjtu.edu.cn','13012345678','SJTU'),(38,38,'test32','test32','test@sjtu.edu.cn','13012345678','SJTU'),(39,39,'test33','test33','test@sjtu.edu.cn','13012345678','SJTU'),(40,40,'test34','test34','test@sjtu.edu.cn','13012345678','SJTU'),(41,41,'test35','test35','test@sjtu.edu.cn','13012345678','SJTU'),(42,42,'test36','test36','test@sjtu.edu.cn','13012345678','SJTU'),(43,43,'test37','test37','test@sjtu.edu.cn','13012345678','SJTU'),(44,44,'test38','test38','test@sjtu.edu.cn','13012345678','SJTU'),(45,45,'test39','test39','test@sjtu.edu.cn','13012345678','SJTU'),(46,46,'test40','test40','test@sjtu.edu.cn','13012345678','SJTU'),(47,47,'test41','test41','test@sjtu.edu.cn','13012345678','SJTU'),(48,48,'test42','test42','test@sjtu.edu.cn','13012345678','SJTU'),(49,49,'test43','test43','test@sjtu.edu.cn','13012345678','SJTU'),(50,50,'test44','test44','test@sjtu.edu.cn','13012345678','SJTU'),(51,51,'test45','test45','test@sjtu.edu.cn','13012345678','SJTU'),(52,52,'test46','test46','test@sjtu.edu.cn','13012345678','SJTU'),(53,53,'test47','test47','test@sjtu.edu.cn','13012345678','SJTU'),(54,54,'test48','test48','test@sjtu.edu.cn','13012345678','SJTU'),(55,55,'test49','test49','test@sjtu.edu.cn','13012345678','SJTU'),(56,56,'test50','test50','test@sjtu.edu.cn','13012345678','SJTU'),(57,57,'test51','test51','test@sjtu.edu.cn','13012345678','SJTU'),(58,58,'test52','test52','test@sjtu.edu.cn','13012345678','SJTU'),(59,59,'test53','test53','test@sjtu.edu.cn','13012345678','SJTU'),(60,60,'test54','test54','test@sjtu.edu.cn','13012345678','SJTU'),(61,61,'test55','test55','test@sjtu.edu.cn','13012345678','SJTU'),(62,62,'test56','test56','test@sjtu.edu.cn','13012345678','SJTU'),(63,63,'test57','test57','test@sjtu.edu.cn','13012345678','SJTU'),(64,64,'test58','test58','test@sjtu.edu.cn','13012345678','SJTU'),(65,65,'test59','test59','test@sjtu.edu.cn','13012345678','SJTU'),(66,66,'test60','test60','test@sjtu.edu.cn','13012345678','SJTU'),(67,67,'test61','test61','test@sjtu.edu.cn','13012345678','SJTU'),(68,68,'test62','test62','test@sjtu.edu.cn','13012345678','SJTU'),(69,69,'test63','test63','test@sjtu.edu.cn','13012345678','SJTU'),(70,70,'test64','test64','test@sjtu.edu.cn','13012345678','SJTU'),(71,71,'test65','test65','test@sjtu.edu.cn','13012345678','SJTU'),(72,72,'test66','test66','test@sjtu.edu.cn','13012345678','SJTU'),(73,73,'test67','test67','test@sjtu.edu.cn','13012345678','SJTU'),(74,74,'test68','test68','test@sjtu.edu.cn','13012345678','SJTU'),(75,75,'test69','test69','test@sjtu.edu.cn','13012345678','SJTU'),(76,76,'test70','test70','test@sjtu.edu.cn','13012345678','SJTU'),(77,77,'test71','test71','test@sjtu.edu.cn','13012345678','SJTU'),(78,78,'test72','test72','test@sjtu.edu.cn','13012345678','SJTU'),(79,79,'test73','test73','test@sjtu.edu.cn','13012345678','SJTU'),(80,80,'test74','test74','test@sjtu.edu.cn','13012345678','SJTU'),(81,81,'test75','test75','test@sjtu.edu.cn','13012345678','SJTU'),(82,82,'test76','test76','test@sjtu.edu.cn','13012345678','SJTU'),(83,83,'test77','test77','test@sjtu.edu.cn','13012345678','SJTU'),(84,84,'test78','test78','test@sjtu.edu.cn','13012345678','SJTU'),(85,85,'test79','test79','test@sjtu.edu.cn','13012345678','SJTU'),(86,86,'test80','test80','test@sjtu.edu.cn','13012345678','SJTU'),(87,87,'test81','test81','test@sjtu.edu.cn','13012345678','SJTU'),(88,88,'test82','test82','test@sjtu.edu.cn','13012345678','SJTU'),(89,89,'test83','test83','test@sjtu.edu.cn','13012345678','SJTU'),(90,90,'test84','test84','test@sjtu.edu.cn','13012345678','SJTU'),(91,91,'test85','test85','test@sjtu.edu.cn','13012345678','SJTU'),(92,92,'test86','test86','test@sjtu.edu.cn','13012345678','SJTU'),(93,93,'test87','test87','test@sjtu.edu.cn','13012345678','SJTU'),(94,94,'test88','test88','test@sjtu.edu.cn','13012345678','SJTU'),(95,95,'test89','test89','test@sjtu.edu.cn','13012345678','SJTU'),(96,96,'test90','test90','test@sjtu.edu.cn','13012345678','SJTU'),(97,97,'test91','test91','test@sjtu.edu.cn','13012345678','SJTU'),(98,98,'test92','test92','test@sjtu.edu.cn','13012345678','SJTU'),(99,99,'test93','test93','test@sjtu.edu.cn','13012345678','SJTU'),(100,100,'test94','test94','test@sjtu.edu.cn','13012345678','SJTU'),(101,101,'test95','test95','test@sjtu.edu.cn','13012345678','SJTU'),(102,102,'test96','test96','test@sjtu.edu.cn','13012345678','SJTU'),(103,103,'test97','test97','test@sjtu.edu.cn','13012345678','SJTU'),(104,104,'test98','test98','test@sjtu.edu.cn','13012345678','SJTU'),(105,105,'test99','test99','test@sjtu.edu.cn','13012345678','SJTU'),(106,106,'test100','test100','test@sjtu.edu.cn','13012345678','SJTU');
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
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'shenwhang','123456',0),(2,'test','123456',0),(3,'admin','admin',1),(4,'qnzzzz','123456',0),(5,'hyj','123456',0),(6,'szc','123456',0),(7,'test1','123456',0),(8,'test2','123456',0),(9,'test3','123456',0),(10,'test4','123456',0),(11,'test5','123456',0),(12,'test6','123456',0),(13,'test7','123456',0),(14,'test8','123456',0),(15,'test9','123456',0),(16,'test10','123456',0),(17,'test11','123456',0),(18,'test12','123456',0),(19,'test13','123456',0),(20,'test14','123456',0),(21,'test15','123456',0),(22,'test16','123456',0),(23,'test17','123456',0),(24,'test18','123456',0),(25,'test19','123456',0),(26,'test20','123456',0),(27,'test21','123456',0),(28,'test22','123456',0),(29,'test23','123456',0),(30,'test24','123456',0),(31,'test25','123456',0),(32,'test26','123456',0),(33,'test27','123456',0),(34,'test28','123456',0),(35,'test29','123456',0),(36,'test30','123456',0),(37,'test31','123456',0),(38,'test32','123456',0),(39,'test33','123456',0),(40,'test34','123456',0),(41,'test35','123456',0),(42,'test36','123456',0),(43,'test37','123456',0),(44,'test38','123456',0),(45,'test39','123456',0),(46,'test40','123456',0),(47,'test41','123456',0),(48,'test42','123456',0),(49,'test43','123456',0),(50,'test44','123456',0),(51,'test45','123456',0),(52,'test46','123456',0),(53,'test47','123456',0),(54,'test48','123456',0),(55,'test49','123456',0),(56,'test50','123456',0),(57,'test51','123456',0),(58,'test52','123456',0),(59,'test53','123456',0),(60,'test54','123456',0),(61,'test55','123456',0),(62,'test56','123456',0),(63,'test57','123456',0),(64,'test58','123456',0),(65,'test59','123456',0),(66,'test60','123456',0),(67,'test61','123456',0),(68,'test62','123456',0),(69,'test63','123456',0),(70,'test64','123456',0),(71,'test65','123456',0),(72,'test66','123456',0),(73,'test67','123456',0),(74,'test68','123456',0),(75,'test69','123456',0),(76,'test70','123456',0),(77,'test71','123456',0),(78,'test72','123456',0),(79,'test73','123456',0),(80,'test74','123456',0),(81,'test75','123456',0),(82,'test76','123456',0),(83,'test77','123456',0),(84,'test78','123456',0),(85,'test79','123456',0),(86,'test80','123456',0),(87,'test81','123456',0),(88,'test82','123456',0),(89,'test83','123456',0),(90,'test84','123456',0),(91,'test85','123456',0),(92,'test86','123456',0),(93,'test87','123456',0),(94,'test88','123456',0),(95,'test89','123456',0),(96,'test90','123456',0),(97,'test91','123456',0),(98,'test92','123456',0),(99,'test93','123456',0),(100,'test94','123456',0),(101,'test95','123456',0),(102,'test96','123456',0),(103,'test97','123456',0),(104,'test98','123456',0),(105,'test99','123456',0),(106,'test100','123456',0);
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

-- Dump completed on 2022-05-23 16:52:05
