CREATE DATABASE  IF NOT EXISTS `200_ok` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `200_ok`;
-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: 200_ok
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `parking_garage_detail`
--

DROP TABLE IF EXISTS `parking_garage_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parking_garage_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_profile_id` varchar(45) NOT NULL,
  `creation_data_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_mod_date_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `parking_garage_id` varchar(45) NOT NULL,
  `address` varchar(100) NOT NULL,
  `city` varchar(45) NOT NULL,
  `pincode` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking_garage_detail`
--

LOCK TABLES `parking_garage_detail` WRITE;
/*!40000 ALTER TABLE `parking_garage_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `parking_garage_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parking_spot_detail`
--

DROP TABLE IF EXISTS `parking_spot_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parking_spot_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_profile_id` varchar(45) NOT NULL,
  `creation_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_mod_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date` date NOT NULL,
  `parking_garage_id` varchar(45) NOT NULL,
  `parking_spot_name` varchar(45) NOT NULL,
  `available` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking_spot_detail`
--

LOCK TABLES `parking_spot_detail` WRITE;
/*!40000 ALTER TABLE `parking_spot_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `parking_spot_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parking_spot_reserve_detail`
--

DROP TABLE IF EXISTS `parking_spot_reserve_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parking_spot_reserve_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(45) NOT NULL,
  `order_status` varchar(45) NOT NULL,
  `parking_garage_id` varchar(45) NOT NULL,
  `parking_spot_name` varchar(45) NOT NULL,
  `creation_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_mod_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_name` varchar(45) NOT NULL,
  `phone_no` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking_spot_reserve_detail`
--

LOCK TABLES `parking_spot_reserve_detail` WRITE;
/*!40000 ALTER TABLE `parking_spot_reserve_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `parking_spot_reserve_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile_access`
--

DROP TABLE IF EXISTS `user_profile_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profile_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_profile_id` varchar(45) NOT NULL,
  `creation_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_mod_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile_access`
--

LOCK TABLES `user_profile_access` WRITE;
/*!40000 ALTER TABLE `user_profile_access` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_profile_access` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-27 17:30:16
