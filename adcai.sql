-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: adcai
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `id_facultad` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `director` int DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_facultad_idx` (`id_facultad`),
  KEY `director_idx` (`director`),
  CONSTRAINT `director` FOREIGN KEY (`director`) REFERENCES `usuario` (`id`),
  CONSTRAINT `id_facultad` FOREIGN KEY (`id_facultad`) REFERENCES `facultad` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,'Ingenieria agroindustrial','descripcion de ingenieria',5,'2022-11-22 15:30:26','2022-11-24 19:57:38',NULL,1),(2,'Ingenieria de Sistemas','descripcion de ingenieria',5,'2022-11-22 15:33:36','2022-11-22 15:52:57',NULL,1),(3,'Ingenieria Electronica','descripcion de ingenieria',7,'2022-11-22 15:34:42','2022-11-22 15:34:42',NULL,1),(4,'Ingenieria Electromecanica','descripcion de ingenieria',3,'2022-11-22 15:35:24','2022-11-22 15:35:24',NULL,1),(5,'Ingenieria Industrial','descripcion de ingenieria',5,'2022-11-22 15:35:38','2022-12-03 20:52:56',39,1),(6,'Ingenieria de Minas','descripcion de ingenieria',5,'2022-11-22 15:35:48','2022-11-22 15:35:48',NULL,1),(7,'Ingenieria Mecanica','descripcion de ingenieria',6,'2022-11-22 15:36:00','2022-11-22 15:36:00',NULL,1),(8,'Quimica Industrial','descripcion de ingenieria',6,'2022-11-22 15:37:24','2022-11-22 15:37:24',NULL,1),(11,'Ingenieria asdfsadf','descripcion de ingenieria',5,'2022-11-29 21:18:45','2022-11-29 21:24:43',NULL,0);
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facultad`
--

DROP TABLE IF EXISTS `facultad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facultad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `decano` int DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `decano_idx` (`decano`),
  CONSTRAINT `decano` FOREIGN KEY (`decano`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultad`
--

LOCK TABLES `facultad` WRITE;
/*!40000 ALTER TABLE `facultad` DISABLE KEYS */;
INSERT INTO `facultad` VALUES (3,'Ciencias de la salud','','2022-11-21 16:19:20','2022-11-21 16:19:20',NULL,1),(4,'Empresariales','','2022-11-21 16:19:41','2022-11-24 19:56:32',NULL,1),(5,'Basicas','','2022-11-21 16:20:01','2022-12-03 20:53:06',39,1),(6,'Ciencias Agrarias y de Ambiente','','2022-11-21 16:20:24','2022-11-21 16:20:24',NULL,1),(7,'Facultad de Ingenieria','','2022-11-21 20:51:29','2022-11-21 20:51:29',NULL,1);
/*!40000 ALTER TABLE `facultad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `firma`
--

DROP TABLE IF EXISTS `firma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `firma` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ruta_firma` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firma`
--

LOCK TABLES `firma` WRITE;
/*!40000 ALTER TABLE `firma` DISABLE KEYS */;
INSERT INTO `firma` VALUES (12,'sadfsadfsadfsadfsfd','2022-11-30 21:12:09','2022-11-30 21:12:09'),(14,'sadfsadfsadfsadfsfd','2022-11-30 21:13:32','2022-11-30 21:13:32');
/*!40000 ALTER TABLE `firma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMIN','Es el encargado de administrar la aplicacion.',NULL,NULL),(2,'DECANO','Es el encargado de una facultad, es el ultimo usuario que aprueba o rechaza el cai de un docente.',NULL,NULL),(3,'DIRECTOR','Es el encagado de un departamento es el primer usuario que aprueba o rechaza el cai de un docente.',NULL,NULL),(4,'DOCENTE','Es el usuario que diligencia el cai',NULL,NULL);
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(45) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `codigo` varchar(10) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `esTiempoCompleto` tinyint DEFAULT NULL,
  `id_departamento` int DEFAULT NULL,
  `id_firma` int DEFAULT NULL,
  `estaActivo` tinyint DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `firma_idx` (`id_firma`),
  KEY `departamento_idx` (`id_departamento`),
  CONSTRAINT `departamento` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `firma` FOREIGN KEY (`id_firma`) REFERENCES `firma` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'1@1.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,'2022-11-21 03:15:50'),(2,'99@gmail.com',NULL,NULL,'1151342','1122334455',NULL,NULL,NULL,1,NULL,'2022-11-21 03:18:29'),(3,'3@3.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(4,'4@4.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(5,'1@5.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(6,'1@6.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(7,'1@7.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(8,'1@8.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(9,'1@9.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(10,'1@10.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(11,'1@11.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(12,'1@12.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(13,'1@13.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(14,'1@14.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(15,'1@15.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(16,'1@16.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(17,'1@17.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(18,'1@18.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(19,'1@19.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(20,'1@20.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(21,'1@21.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(22,'1@22.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(23,'1@23.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(24,'1@24.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(25,'1@25.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(26,'1@26.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(27,'1@27.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(28,'1@28.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(29,'1@29.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(30,'1@30.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(31,'1@31.co',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(38,'crduarte99@gmail.com','Cristian','Duarte',NULL,NULL,NULL,5,NULL,1,'2022-11-22 20:42:04','2022-11-30 21:27:34'),(39,'cristianandresdm@ufps.edu.co','CRISTIAN ANDRES','DUARTE MALDONADO',NULL,NULL,NULL,5,12,1,'2022-11-22 20:42:04','2022-11-30 21:12:09'),(40,'karenbrigidbv@ufps.edu.co',NULL,NULL,NULL,NULL,NULL,5,NULL,1,'2022-11-22 20:42:04','2022-11-22 20:42:04');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_rol`
--

DROP TABLE IF EXISTS `usuario_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_rol` (
  `id_usuario` int NOT NULL,
  `id_rol` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_rol`,`id_usuario`),
  KEY `id_usuario_idx` (`id_usuario`),
  CONSTRAINT `id_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_rol`
--

LOCK TABLES `usuario_rol` WRITE;
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
INSERT INTO `usuario_rol` VALUES (39,1,NULL,NULL),(39,2,'2022-12-03 20:53:06','2022-12-03 20:53:06'),(39,3,'2022-12-03 20:52:56','2022-12-03 20:52:56'),(38,4,'2022-11-22 20:42:04','2022-11-22 20:42:04'),(39,4,NULL,NULL),(40,4,'2022-11-22 20:42:04','2022-11-22 20:42:04');
/*!40000 ALTER TABLE `usuario_rol` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-04 18:33:07
