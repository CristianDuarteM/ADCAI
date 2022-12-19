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
-- Table structure for table `actividad_administracion`
--

DROP TABLE IF EXISTS `actividad_administracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad_administracion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `listar` tinyint(1) DEFAULT '1',
  `estado` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad_administracion`
--

LOCK TABLES `actividad_administracion` WRITE;
/*!40000 ALTER TABLE `actividad_administracion` DISABLE KEYS */;
INSERT INTO `actividad_administracion` VALUES (1,'DESEMPEÑO DE CARGO ADMINISTRATIVO','',1,1,'2022-12-10 00:33:48','2022-12-10 00:37:33');
/*!40000 ALTER TABLE `actividad_administracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actividad_extension`
--

DROP TABLE IF EXISTS `actividad_extension`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad_extension` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(400) NOT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `estado` tinyint(1) DEFAULT '1',
  `listar` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad_extension`
--

LOCK TABLES `actividad_extension` WRITE;
/*!40000 ALTER TABLE `actividad_extension` DISABLE KEYS */;
INSERT INTO `actividad_extension` VALUES (1,'PROYECTO DE EXTENSIÓN','Las aprobadas por Consejo de Facultad y Consejo Académico (no incluya trabajos para cambio de categoría y/o Producción intelectual)','2022-12-09 22:59:58','2022-12-10 18:35:12',1,1);
/*!40000 ALTER TABLE `actividad_extension` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actividad_investigacion`
--

DROP TABLE IF EXISTS `actividad_investigacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad_investigacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `horas_minimas` int DEFAULT '0',
  `horas_maximas` int NOT NULL,
  `descripcion_horas` varchar(200) NOT NULL,
  `estado` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad_investigacion`
--

LOCK TABLES `actividad_investigacion` WRITE;
/*!40000 ALTER TABLE `actividad_investigacion` DISABLE KEYS */;
INSERT INTO `actividad_investigacion` VALUES (1,'DIRECTORES DE GRUPO','',0,7,'7 horas de las 40 laborales.',1,'2022-12-09 21:00:15','2022-12-09 22:54:55'),(2,'DIRECTORES DE SEMILLEROS DE INVESTIGACIÓN*','',0,5,'7 horas de las 40 laborales.',0,'2022-12-09 21:00:49','2022-12-09 21:57:25'),(3,'DIRECTORES DE PROYECTOS DE INVESTIGACIÓN INTERNOS APROBADOS QUE PERTENEZCAN A UN GRUPO DE INVESTIGACIÓN (POR PROYECTO).*','',5,10,'5 a 10 horas de las 40 laborales de acuerdo a la complejidad del proyecto o la bonificación definida por estructura de costos.',1,'2022-12-09 21:04:14','2022-12-09 21:57:26'),(4,'COINVESTIGADORES DE PROYECTOS DE INVESTIGACIÓN INTERNOS APROBADOS QUE PERTENEZCAN A UN GRUPO DE INVESTIGACIÓN (POR PROYECTO).*','',3,6,'De 3 a 6 horas de acuerdo a la complejidad del proyecto o la bonificación definida por estructura de costos.',1,'2022-12-09 21:05:16','2022-12-09 21:57:27'),(5,'PARTICIPACIÓN EN PROYECTOS DE INVESTIGACIÓN EXTERNOS APROBADOS COMO DIRECTOR O COINVESTIGADOR QUE PERTENEZCAN A UN GRUPO DE INVESTIGACIÓN (POR PROYECTO).*','',5,15,'5 a 15 horas de las 40 laborales o la bonificación definida por estructura de costos.',1,'2022-12-09 21:05:48','2022-12-09 21:57:28'),(6,'TUTORES DE JÓVENES INVESTIGADORES (POR JOVEN INVESTIGADOR)*','',0,4,'4 horas de las 40 laborales.',1,'2022-12-09 21:06:57','2022-12-09 21:57:30'),(7,'REPRESENTANTE DE FACULTAD ANTE EL COMITÉ CENTRAL DE INVESTIGACIONES.**','',0,12,'12 horas de las 40 laborales',1,'2022-12-09 21:07:21','2022-12-09 21:57:31');
/*!40000 ALTER TABLE `actividad_investigacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actividad_otra`
--

DROP TABLE IF EXISTS `actividad_otra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad_otra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `listar` tinyint(1) DEFAULT '0',
  `estado` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad_otra`
--

LOCK TABLES `actividad_otra` WRITE;
/*!40000 ALTER TABLE `actividad_otra` DISABLE KEYS */;
INSERT INTO `actividad_otra` VALUES (1,'EVALUACIÓN DE TRABAJOS DE GRADO, PRODUCCIÓN Y CAMBIOS DE CATEGORÍA','(0.5 H semanales por trabajo)',0,0,'2022-12-10 06:17:49','2022-12-10 06:23:31'),(2,'OTRAS ACTIVIDADES APROBADAS POR CONSEJO DE FACULTAD Y CONSEJO ACADÉMICO','Enunciarlas',1,1,'2022-12-10 06:18:36','2022-12-10 06:18:36');
/*!40000 ALTER TABLE `actividad_otra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignatura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `creditos` int NOT NULL,
  `horas_teoricas` int NOT NULL,
  `horas_practicas` int DEFAULT '0',
  `id_programa` int DEFAULT NULL,
  `estado` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plan_estudio_idx` (`id_programa`),
  CONSTRAINT `plan_estudio` FOREIGN KEY (`id_programa`) REFERENCES `plan_estudio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` VALUES (1,'INGENIERIA DE SOFTWARE','cualquier descripcion',3,4,0,14,1,'2022-12-07 03:59:39','2022-12-07 03:59:39'),(2,'ANALISIS Y DISEÑO DE SISTEMAS','',4,4,0,14,1,'2022-12-07 04:03:42','2022-12-10 08:39:22'),(3,'PATRONES DE DISEÑO','cualquier descripcion',2,4,0,14,1,'2022-12-07 04:04:31','2022-12-07 04:04:31'),(4,'FUNDAMENTOS DE PROGRAMACION','cualquier descripcion',4,4,0,14,1,'2022-12-07 04:05:50','2022-12-07 04:05:50'),(5,'FISICA MECANICA','cualquier descripcion',4,2,2,14,1,'2022-12-07 04:06:10','2022-12-07 04:06:10'),(6,'FISICA ELECTROMAGNETICA','cualquier descripcion',4,2,2,14,1,'2022-12-07 04:06:24','2022-12-07 04:06:24'),(7,'FISICA DE ONDAS Y PARTICULAS','cualquier descripcion',5,3,2,14,1,'2022-12-07 04:07:02','2022-12-07 04:07:02'),(8,'FISICA ELECTRONICA','cualquier descripcion',5,3,2,14,1,'2022-12-07 04:10:53','2022-12-07 04:10:53'),(9,'REDES 1','cualquier descripcion',4,2,2,14,1,'2022-12-07 04:11:59','2022-12-07 19:56:36'),(35,'CALCULO DIFERENCIAL','cualquier descripcion',4,4,0,14,1,'2022-12-07 20:57:15','2022-12-07 20:57:15'),(36,'CALCULO INTEGRAL','cualquier descripcion',4,4,0,14,1,'2022-12-07 20:57:15','2022-12-07 20:57:15'),(37,'CALCULO VECTORIAL','cualquier descripcion',4,4,0,14,1,'2022-12-07 20:57:15','2022-12-07 20:57:15'),(38,'ECUACIONES DIFERENCIALES','cualquier descripcion',4,4,0,14,1,'2022-12-07 20:57:15','2022-12-07 20:57:15'),(39,'ANALISIS NUMERICO','cualquier descripcion',3,3,0,14,1,'2022-12-07 20:57:15','2022-12-07 20:57:15'),(40,'CALCULO DIFERENCIAL','cualquier descripcion',4,4,0,9,1,'2022-12-07 21:06:53','2022-12-07 21:06:53'),(41,'CALCULO INTEGRAL','cualquier descripcion',4,4,0,9,1,'2022-12-07 21:06:53','2022-12-07 21:06:53'),(42,'CALCULO VECTORIAL','cualquier descripcion',4,4,0,9,1,'2022-12-07 21:06:53','2022-12-07 21:06:53'),(43,'ECUACIONES DIFERENCIALES','cualquier descripcion',4,4,0,9,1,'2022-12-07 21:06:53','2022-12-07 21:06:53'),(44,'ANALISIS NUMERICO','cualquier descripcion',3,3,0,9,1,'2022-12-07 21:06:53','2022-12-07 21:06:53'),(45,'CALCULO DIFERENCIAL','cualquier descripcion',4,4,0,10,1,'2022-12-07 21:16:14','2022-12-07 21:16:14'),(46,'PARA PROBAR','cualquier descripcion',4,4,0,14,1,'2022-12-10 22:57:27','2022-12-10 22:57:27');
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;
UNLOCK TABLES;

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
  `director` int DEFAULT NULL,
  `id_facultad` int NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `director_UNIQUE` (`director`),
  KEY `id_facultad_idx` (`id_facultad`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,'Ingenieria de Sistemas','descripcion de ingenieria',3,7,1,'2022-11-22 15:33:36','2022-12-08 22:33:14'),(2,'Ingenieria Electronica','descripcion de ingenieria',80,7,1,'2022-11-22 15:34:42','2022-12-13 15:07:14'),(3,'Ingenieria Electromecanica','descripcion de ingenieria',NULL,3,1,'2022-11-22 15:35:24','2022-11-22 15:35:24'),(4,'Ingenieria Industrial','descripcion de ingenieria',NULL,7,1,'2022-11-22 15:35:38','2022-12-03 20:52:56'),(5,'Ingenieria de Minas','descripcion de ingenieria',NULL,5,1,'2022-11-22 15:35:48','2022-11-22 15:35:48'),(6,'Ingenieria Mecanica','descripcion de ingenieria',NULL,6,1,'2022-11-22 15:36:00','2022-11-22 15:36:00'),(7,'Ingenieria agroindustrial','descripcion de ingenieria',NULL,5,1,'2022-11-22 15:30:26','2022-12-08 21:34:29'),(22,'DEPARTAMENTO PARA ELIMINAR 4','',71,6,1,'2022-12-13 08:08:13','2022-12-13 08:08:14'),(23,'INGENIERIA ESPACIAL','',75,7,1,'2022-12-13 08:09:24','2022-12-13 08:33:31');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'DILIGENCIADO','El docente ha diligenciado el cai pero aun no ha sido evaluado por el director de departamento','2022-12-06 15:56:34','2022-12-06 15:56:34'),(2,'APROBADO DIRECTOR','El cai ha sido evaluado por el director de departamento y lo ha aprobado','2022-12-06 15:57:07','2022-12-06 15:57:07'),(3,'APROBADO DECANO','El cai ha sido evaluado por el decano de facultad y lo ha aprobado','2022-12-06 15:57:24','2022-12-06 15:57:24'),(4,'RECHAZADO DECANO','El cai ha sido evaluado por el decano de facultad y lo ha rechazado, el docente debe hacerle correcciones','2022-12-06 15:58:46','2022-12-06 15:58:46'),(5,'RECHAZADO DIRECTOR','El cai ha sido evaluado por el director de departamento y lo ha rechazado, el docente debe hacerle correcciones','2022-12-06 15:59:10','2022-12-06 16:02:41'),(8,'SINFIRMADOCENTE','El docente ha diligenciado el cai pero no lo ha firmado',NULL,NULL),(9,'SINFIRMADIRECTOR','El director ha aprobado el cai pero le falta cargar el documento del cai firmado por el',NULL,NULL),(10,'SINFIRMARDECANO','El decano ha aprobado el cai pero le falta cargar el documento del cai firmado por el',NULL,NULL);
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evidencia`
--

DROP TABLE IF EXISTS `evidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evidencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(500) NOT NULL,
  `id_periodo` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `p_idx` (`id_periodo`),
  CONSTRAINT `p` FOREIGN KEY (`id_periodo`) REFERENCES `periodo_docente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evidencia`
--

LOCK TABLES `evidencia` WRITE;
/*!40000 ALTER TABLE `evidencia` DISABLE KEYS */;
INSERT INTO `evidencia` VALUES (4,'c7844853-463d-420b-b11c-c60ba958b5a7.pdf',200,'2022-12-17 07:43:12','2022-12-17 07:45:00'),(5,'a21c5390-36e0-49a3-bb1d-fdb447540798.pdf',204,'2022-12-17 20:55:14','2022-12-17 22:14:50'),(10,'7fca00b7-8c4f-4890-a295-4184e7dc69eb.pdf',212,'2022-12-17 23:18:42','2022-12-17 23:19:51');
/*!40000 ALTER TABLE `evidencia` ENABLE KEYS */;
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
  `decano` int DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `decano_UNIQUE` (`decano`),
  KEY `decano_idx` (`decano`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultad`
--

LOCK TABLES `facultad` WRITE;
/*!40000 ALTER TABLE `facultad` DISABLE KEYS */;
INSERT INTO `facultad` VALUES (3,'Ciencias de la salud','',1,0,'2022-11-21 16:19:20','2022-12-08 20:59:26'),(4,'Empresariales','',50,1,'2022-11-21 16:19:41','2022-12-08 22:34:41'),(5,'Basicas','',2,0,'2022-11-21 16:20:01','2022-12-08 21:01:34'),(6,'Ciencias Agrarias y de Ambiente','',3,1,'2022-11-21 16:20:24','2022-11-21 16:20:24'),(7,'Facultad de Ingenieria','',4,1,'2022-11-21 20:51:29','2022-12-12 06:41:37');
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
  `ruta_firma` varchar(500) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firma`
--

LOCK TABLES `firma` WRITE;
/*!40000 ALTER TABLE `firma` DISABLE KEYS */;
INSERT INTO `firma` VALUES (16,'6195f52c-b9bb-42f3-9815-5f9a295e7ca8.jpg','2022-12-11 16:40:01','2022-12-17 18:15:55'),(17,'daa768e8-eaa2-46b0-9c6b-b89a06a9976f.jpg','2022-12-11 16:51:35','2022-12-17 18:14:07'),(18,'https://res.cloudinary.com/dfqil2srx/image/upload/v1670824396/y9goqlrhms9unjoyexqn.jpg','2022-12-12 05:47:13','2022-12-12 05:53:18'),(19,'https://res.cloudinary.com/dfqil2srx/image/upload/v1670828878/jsurzdv2q9lgdh2e8rva.jpg','2022-12-12 07:08:00','2022-12-12 07:08:00');
/*!40000 ALTER TABLE `firma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notas`
--

DROP TABLE IF EXISTS `notas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(1000) NOT NULL,
  `estado` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notas`
--

LOCK TABLES `notas` WRITE;
/*!40000 ALTER TABLE `notas` DISABLE KEYS */;
INSERT INTO `notas` VALUES (1,'Al finalizar el semestre académico el profesor presentará al Decano de la Facultad y al Director de Departamento al cual esté adscrito, un informe sobre la ejecución de las actividades programadas en el plan propuesto al inicio del semestre, la cual deberá ser sustentado con las certificaciones y documentos pertinentes (Artículo 17, Acuerdo 046 de 1991)',1,'2022-12-16 04:43:17','2022-12-16 04:45:46');
/*!40000 ALTER TABLE `notas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacion`
--

DROP TABLE IF EXISTS `notificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `mensaje` varchar(200) NOT NULL,
  `rol` varchar(45) DEFAULT NULL,
  `fecha_lectura` datetime DEFAULT NULL,
  `leido` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_idx` (`id_usuario`),
  CONSTRAINT `usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=348 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
INSERT INTO `notificacion` VALUES (1,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DECANODECANO','2022-12-12 00:00:00',1,'2022-12-11 19:21:37','2022-12-12 21:53:05'),(2,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DECANO','2022-12-11 00:00:00',1,'2022-12-11 19:44:53','2022-12-11 23:58:13'),(3,3,'El usuario: Cristian Andres ha registrado el cai.','DIRECTOR','2022-12-12 00:00:00',1,'2022-12-11 19:48:16','2022-12-12 23:01:34'),(4,3,'El usuario: Cristian Andres ha registrado el cai.','DECANO',NULL,1,'2022-12-11 19:49:04','2022-12-11 19:49:04'),(12,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DIRECTOR','2022-12-12 00:00:00',1,'2022-12-12 00:59:42','2022-12-12 23:01:34'),(13,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DECANO','2022-12-12 00:00:00',1,'2022-12-12 01:27:24','2022-12-12 23:01:34'),(14,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DIRECTOR','2022-12-12 00:00:00',1,'2022-12-12 01:28:29','2022-12-12 23:01:33'),(15,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DECANO','2022-12-12 00:00:00',1,'2022-12-12 01:34:33','2022-12-12 23:01:33'),(16,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DECANO','2022-12-12 00:00:00',1,'2022-12-12 01:34:48','2022-12-12 23:01:33'),(17,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DIRECTOR','2022-12-12 00:00:00',1,'2022-12-12 01:39:43','2022-12-12 23:01:33'),(18,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DECANO','2022-12-12 00:00:00',1,'2022-12-12 01:42:21','2022-12-12 23:01:33'),(19,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DECANO','2022-12-12 00:00:00',1,'2022-12-12 01:51:16','2022-12-12 23:01:33'),(20,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DIRECTOR','2022-12-12 00:00:00',1,'2022-12-12 01:53:10','2022-12-12 23:01:33'),(21,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DECANO','2022-12-12 00:00:00',1,'2022-12-12 02:35:57','2022-12-12 22:57:27'),(22,3,'Su CAI ha sido aprobado por el director de departamento','DECANO','2022-12-12 00:00:00',1,'2022-12-12 06:31:54','2022-12-12 22:57:27'),(23,3,'Su CAI ha sido aprobado por el director de departamento','DIRECTOR','2022-12-12 00:00:00',1,'2022-12-12 06:33:11','2022-12-12 22:57:27'),(24,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-12 00:00:00',1,'2022-12-12 06:33:54','2022-12-12 22:57:27'),(25,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-12 00:00:00',1,'2022-12-12 06:45:24','2022-12-12 22:57:27'),(27,3,'Su CAI ha sido aprobado por el director de departamento','DIRECTOR','2022-12-12 00:00:00',1,'2022-12-12 07:04:14','2022-12-12 22:57:27'),(28,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-12 00:00:00',1,'2022-12-12 07:09:47','2022-12-12 22:57:27'),(30,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-12 00:00:00',1,'2022-12-12 07:10:49','2022-12-12 22:57:27'),(32,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-12 00:00:00',1,'2022-12-12 07:12:43','2022-12-12 22:57:27'),(34,3,'Su CAI ha sido aprobado por el director de departamento','DECANO','2022-12-12 00:00:00',1,'2022-12-12 07:17:45','2022-12-12 22:57:27'),(36,3,'Su CAI ha sido rechazado por el director de departamento','DOCENTE','2022-12-12 00:00:00',1,'2022-12-12 07:59:15','2022-12-12 22:57:27'),(37,3,'Su CAI ha sido rechazado por el director de departamento','DECANO','2022-12-12 00:00:00',1,'2022-12-12 07:59:52','2022-12-12 22:57:27'),(38,3,'Su CAI ha sido rechazado por el director de departamento','DOCENTE','2022-12-12 00:00:00',1,'2022-12-12 08:00:32','2022-12-12 22:57:27'),(39,3,'Su CAI ha sido rechazado por el director de departamento','DECANO','2022-12-12 00:00:00',1,'2022-12-12 08:04:41','2022-12-12 22:57:27'),(40,3,'Su CAI ha sido rechazado por el director de departamento','DOCENTE','2022-12-12 00:00:00',1,'2022-12-12 08:06:47','2022-12-12 22:57:27'),(41,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DECANO','2022-12-12 00:00:00',1,'2022-12-12 18:24:44','2022-12-12 22:57:27'),(42,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.','DECANO','2022-12-12 00:00:00',1,'2022-12-12 18:25:03','2022-12-12 22:57:27'),(46,3,'Su CAI ha sido rechazado por el director de departamento','DOCENTE','2022-12-12 00:00:00',1,'2022-12-12 22:31:30','2022-12-12 22:57:27'),(47,3,'Su CAI ha sido aprobado por el director de departamento','DECANO','2022-12-12 00:00:00',1,'2022-12-12 22:32:18','2022-12-12 22:57:27'),(49,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-12 00:00:00',1,'2022-12-12 22:45:22','2022-12-12 22:57:27'),(51,3,'Su CAI ha sido aprobado por el Decano de Facultad','DECANO','2022-12-16 00:00:00',1,'2022-12-12 23:19:55','2022-12-16 23:35:11'),(53,3,'Su CAI ha sido aprobado por el Decano de Facultad','DOCENTE','2022-12-16 00:00:00',1,'2022-12-12 23:22:28','2022-12-16 23:35:11'),(55,3,'Su CAI ha sido aprobado por el Decano de Facultad','DECANO','2022-12-16 00:00:00',1,'2022-12-13 00:14:22','2022-12-16 23:35:10'),(57,3,'Su CAI ha sido rechazado por el Decano de la Facultad','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 00:15:11','2022-12-16 23:35:09'),(62,3,'Su CAI ha sido aprobado por el director de departamento','DECANO','2022-12-16 00:00:00',1,'2022-12-13 02:49:01','2022-12-16 23:35:09'),(63,3,'Su CAI ha sido rechazado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 02:50:06','2022-12-16 23:35:08'),(64,3,'Su CAI ha sido rechazado por el Decano de la Facultad','DECANO','2022-12-16 00:00:00',1,'2022-12-13 02:53:47','2022-12-16 23:35:07'),(67,3,'Su CAI ha sido rechazado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:04:43','2022-12-16 23:35:07'),(69,3,'Su CAI ha sido rechazado por el director de departamento','DECANO','2022-12-16 00:00:00',1,'2022-12-13 03:33:31','2022-12-16 23:35:06'),(71,3,'Su CAI ha sido rechazado por el director de departamento','DECANO','2022-12-16 00:00:00',1,'2022-12-13 03:36:04','2022-12-16 23:35:05'),(73,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:37:08','2022-12-16 23:35:05'),(75,3,'Su CAI ha sido rechazado por el Decano de la Facultad','DECANO','2022-12-16 00:00:00',1,'2022-12-13 03:37:32','2022-12-16 23:35:05'),(78,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:38:17','2022-12-16 23:35:05'),(80,3,'Su CAI ha sido aprobado por el Decano de Facultad','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:38:29','2022-12-16 23:35:05'),(83,3,'Su CAI ha sido rechazado por el director de departamento','DECANO','2022-12-16 00:00:00',1,'2022-12-13 03:39:26','2022-12-16 23:35:05'),(85,3,'Su CAI ha sido rechazado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:39:42','2022-12-16 23:35:04'),(87,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:39:59','2022-12-16 23:35:04'),(89,3,'Su CAI ha sido rechazado por el Decano de la Facultad','DECANO','2022-12-16 00:00:00',1,'2022-12-13 03:40:07','2022-12-16 23:35:04'),(92,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:40:20','2022-12-16 23:35:04'),(94,3,'Su CAI ha sido aprobado por el Decano de Facultad','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:40:28','2022-12-16 23:35:04'),(97,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:44:35','2022-12-16 23:35:04'),(100,3,'Su CAI ha sido rechazado por el Decano de la Facultad','DECANO','2022-12-16 00:00:00',1,'2022-12-13 03:44:43','2022-12-16 23:35:04'),(102,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:44:54','2022-12-16 23:35:04'),(104,3,'Su CAI ha sido rechazado por el Decano de la Facultad','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:44:59','2022-12-16 23:35:04'),(107,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:45:22','2022-12-16 23:35:04'),(109,3,'Su CAI ha sido aprobado por el Decano de Facultad','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:45:26','2022-12-16 23:35:03'),(112,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:48:51','2022-12-16 23:35:03'),(115,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 03:49:00','2022-12-16 23:35:03'),(117,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-13 03:49:19','2022-12-16 23:35:03'),(119,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 03:50:43','2022-12-16 23:35:03'),(122,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-13 03:50:53','2022-12-16 23:35:03'),(124,3,'Su CAI ha sido rechazado por el Decano de la Facultad','DOCENTE','2022-12-16 00:00:00',1,'2022-12-13 03:51:54','2022-12-16 23:35:03'),(127,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-13 03:52:08','2022-12-16 23:35:03'),(129,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 03:53:53','2022-12-16 23:35:03'),(132,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-13 03:54:03','2022-12-16 23:35:03'),(134,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 03:57:49','2022-12-16 23:35:03'),(137,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-13 03:58:36','2022-12-16 23:35:03'),(139,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 04:00:42','2022-12-16 23:35:03'),(142,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-13 04:00:54','2022-12-16 23:35:03'),(144,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 04:02:13','2022-12-16 23:35:02'),(147,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-13 04:02:23','2022-12-16 23:35:02'),(149,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 04:13:54','2022-12-16 23:35:02'),(152,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-13 04:14:19','2022-12-16 23:35:02'),(154,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 04:18:01','2022-12-16 23:35:02'),(157,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-13 04:18:17','2022-12-16 23:35:02'),(159,3,'El usuario: Cristian Andres ha registrado el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-13 08:50:18','2022-12-16 23:35:02'),(161,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 08:51:30','2022-12-16 20:21:01'),(163,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 08:59:03','2022-12-16 23:35:02'),(164,3,'El usuario: Cristian Andres ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-13 08:59:25','2022-12-16 23:35:01'),(166,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 08:59:30','2022-12-16 20:21:01'),(168,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 08:59:35','2022-12-16 23:35:01'),(169,3,'El usuario: Cristian Andres ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-13 08:59:40','2022-12-16 23:35:01'),(171,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 08:59:48','2022-12-16 20:21:01'),(173,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 08:59:56','2022-12-16 23:35:01'),(174,3,'El usuario: Cristian Andres ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:00:02','2022-12-16 23:35:00'),(176,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:00:05','2022-12-16 20:21:01'),(178,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido aprobado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:00:15','2022-12-16 23:35:00'),(180,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:02:51','2022-12-16 20:21:01'),(182,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:03:03','2022-12-16 23:35:00'),(183,3,'El usuario: Cristian Andres ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:03:10','2022-12-16 23:34:59'),(185,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:03:16','2022-12-16 20:21:01'),(187,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:03:20','2022-12-16 23:34:59'),(188,3,'El usuario: Cristian Andres ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:03:26','2022-12-16 23:34:59'),(190,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:04:08','2022-12-16 20:21:01'),(192,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:04:29','2022-12-16 23:34:59'),(193,3,'El usuario: Cristian Andres ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:04:37','2022-12-16 23:34:59'),(195,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:04:47','2022-12-16 20:21:01'),(197,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:04:49','2022-12-16 23:34:58'),(198,3,'El usuario: Cristian Andres ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:04:55','2022-12-16 23:34:58'),(200,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:10:01','2022-12-16 20:21:01'),(202,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido aprobado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:10:09','2022-12-16 23:34:58'),(204,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:11:30','2022-12-16 20:21:01'),(206,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:11:37','2022-12-16 23:34:58'),(207,3,'El usuario: Cristian Andres ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:11:44','2022-12-16 23:34:58'),(209,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:11:50','2022-12-16 20:21:00'),(211,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:11:54','2022-12-16 23:34:57'),(212,3,'El usuario: Cristian Andres ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:13:25','2022-12-16 23:34:57'),(214,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:13:32','2022-12-16 20:21:00'),(216,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:13:36','2022-12-16 23:34:57'),(217,3,'El usuario: Cristian Andres ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:13:44','2022-12-16 23:34:57'),(219,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:13:46','2022-12-16 20:21:00'),(221,3,'CAI del docente Cristian Andres Duarte Maldonado ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-13 09:13:50','2022-12-16 23:34:57'),(222,5,'CAI del docente Cristian Andres Duarte Maldonado para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-14 10:08:14','2022-12-16 20:21:00'),(224,3,'El usuario: Andres ha registrado el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 22:06:53','2022-12-16 23:34:56'),(225,3,'El usuario: Andres ha registrado el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 22:08:27','2022-12-16 23:34:56'),(226,3,'El usuario: Andres ha registrado el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 22:08:39','2022-12-16 23:34:56'),(227,3,'El usuario: Andres ha registrado el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 22:08:56','2022-12-16 23:34:56'),(228,3,'El usuario: Andres ha registrado el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 22:09:09','2022-12-16 23:34:56'),(229,3,'El usuario: Andres ha registrado el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 22:09:25','2022-12-16 23:34:55'),(230,3,'El usuario: Cristian ha registrado el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:26:14','2022-12-16 23:34:55'),(231,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:27:36','2022-12-16 23:34:55'),(232,5,'CAI del docente Cristian Duarte para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:27:36','2022-12-16 20:21:00'),(233,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:34:40','2022-12-16 23:34:55'),(234,3,'CAI del docente Cristian Duarte ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:34:40','2022-12-16 23:34:55'),(235,3,'El usuario: Cristian ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:37:19','2022-12-16 23:34:55'),(236,3,'Su CAI ha sido rechazado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:38:54','2022-12-16 23:34:55'),(237,3,'El usuario: Cristian ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:39:06','2022-12-16 23:34:55'),(238,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:39:30','2022-12-16 23:34:55'),(239,5,'CAI del docente Cristian Duarte para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:39:30','2022-12-16 20:21:00'),(240,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:39:47','2022-12-16 23:34:54'),(241,3,'CAI del docente Cristian Duarte ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:39:47','2022-12-16 23:34:54'),(242,3,'El usuario: Cristian ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:39:57','2022-12-16 23:34:54'),(243,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:40:01','2022-12-16 23:34:54'),(244,5,'CAI del docente Cristian Duarte para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:40:01','2022-12-16 20:21:00'),(245,3,'Su CAI ha sido aprobado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:40:22','2022-12-16 23:34:53'),(246,3,'CAI del docente Cristian Duarte ha sido aprobado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:40:22','2022-12-16 23:34:53'),(247,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:42:57','2022-12-16 23:34:53'),(248,5,'CAI del docente Cristian Duarte para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:42:57','2022-12-16 20:21:00'),(249,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:43:04','2022-12-16 23:34:52'),(250,3,'CAI del docente Cristian Duarte ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:43:04','2022-12-16 23:34:52'),(251,3,'El usuario: Cristian ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:43:10','2022-12-16 23:34:52'),(252,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:43:19','2022-12-16 23:34:52'),(253,5,'CAI del docente Cristian Duarte para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:43:19','2022-12-16 20:21:00'),(254,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:43:23','2022-12-16 23:34:51'),(255,3,'CAI del docente Cristian Duarte ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:43:23','2022-12-16 23:34:52'),(256,3,'El usuario: Cristian ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:43:29','2022-12-16 23:34:51'),(257,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:43:32','2022-12-16 23:34:51'),(258,5,'CAI del docente Cristian Duarte para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:43:32','2022-12-16 20:21:00'),(259,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:50:18','2022-12-16 23:34:50'),(260,3,'CAI del docente Cristian Duarte ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:50:18','2022-12-16 23:34:50'),(261,3,'El usuario: Cristian ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:55:53','2022-12-16 23:34:50'),(262,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:56:58','2022-12-16 23:34:50'),(263,5,'CAI del docente Cristian Duarte para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:56:58','2022-12-16 20:21:00'),(264,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:03','2022-12-16 23:34:50'),(265,3,'CAI del docente Cristian Duarte ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:03','2022-12-16 23:34:50'),(266,3,'El usuario: Cristian ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:10','2022-12-16 23:34:50'),(267,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:16','2022-12-16 23:34:50'),(268,5,'CAI del docente Cristian Duarte para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:16','2022-12-16 20:21:00'),(269,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:20','2022-12-16 23:34:49'),(270,3,'CAI del docente Cristian Duarte ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:20','2022-12-16 23:34:50'),(271,3,'El usuario: Cristian ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:26','2022-12-16 23:34:48'),(272,3,'Su CAI ha sido aprobado por el director de departamento',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:29','2022-12-16 23:34:48'),(273,5,'CAI del docente Cristian Duarte para evaluar',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:29','2022-12-16 20:21:00'),(274,3,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:57','2022-12-16 23:34:47'),(275,3,'CAI del docente Cristian Duarte ha sido rechazado por el Decano de Facultad',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:57:57','2022-12-16 23:34:48'),(276,3,'El usuario: Cristian ha actualizao el CAI.',NULL,'2022-12-16 00:00:00',1,'2022-12-14 23:58:03','2022-12-16 23:34:47'),(277,3,'Su CAI ha sido aprobado por el director de departamento','DECANO','2022-12-16 00:00:00',1,'2022-12-14 23:58:06','2022-12-16 23:34:47'),(278,5,'CAI del docente Cristian Duarte para evaluar','DIRECTOR','2022-12-16 00:00:00',1,'2022-12-14 23:58:06','2022-12-16 20:21:00'),(279,3,'Su CAI ha sido rechazado por el Decano de la Facultad','DECANO','2022-12-16 00:00:00',1,'2022-12-14 23:58:09','2022-12-16 23:34:46'),(280,3,'CAI del docente Cristian Duarte ha sido rechazado por el Decano de Facultad','DIRECTOR','2022-12-16 00:00:00',1,'2022-12-14 23:58:09','2022-12-16 23:34:46'),(281,3,'El usuario: Cristian ha actualizao el CAI.','DECANO','2022-12-16 00:00:00',1,'2022-12-14 23:58:15','2022-12-16 23:34:45'),(282,3,'Su CAI ha sido aprobado por el director de departamento','DIRECTOR','2022-12-16 00:00:00',1,'2022-12-14 23:58:18','2022-12-16 23:34:45'),(283,5,'CAI del docente Cristian Duarte para evaluar','DECANO','2022-12-16 00:00:00',1,'2022-12-14 23:58:18','2022-12-16 20:21:00'),(284,3,'Su CAI ha sido rechazado por el Decano de la Facultad','DIRECTOR','2022-12-16 00:00:00',1,'2022-12-14 23:58:23','2022-12-16 23:34:44'),(285,3,'CAI del docente Cristian Duarte ha sido rechazado por el Decano de Facultad','DECANO','2022-12-16 00:00:00',1,'2022-12-14 23:58:23','2022-12-16 23:34:44'),(286,3,'El usuario: Cristian ha actualizao el CAI.','DIRECTOR','2022-12-16 00:00:00',1,'2022-12-14 23:58:28','2022-12-16 23:34:44'),(287,3,'Su CAI ha sido aprobado por el director de departamento','DIRECTOR','2022-12-16 00:00:00',1,'2022-12-14 23:58:33','2022-12-16 23:34:43'),(288,5,'CAI del docente Cristian Duarte para evaluar','DECANO','2022-12-16 00:00:00',1,'2022-12-14 23:58:33','2022-12-16 20:21:00'),(289,3,'Su CAI ha sido rechazado por el Decano de la Facultad','DIRECTOR','2022-12-16 00:00:00',1,'2022-12-14 23:58:37','2022-12-16 23:34:43'),(290,3,'CAI del docente Cristian Duarte ha sido rechazado por el Decano de Facultad','DECANO','2022-12-16 00:00:00',1,'2022-12-14 23:58:37','2022-12-16 23:34:43'),(291,3,'El usuario: Cristian ha actualizao el CAI.','DOCENTE','2022-12-16 00:00:00',1,'2022-12-14 23:59:26','2022-12-16 23:34:43'),(292,3,'Su CAI ha sido aprobado por el director de departamento','DOCENTE','2022-12-16 00:00:00',1,'2022-12-14 23:59:31','2022-12-16 23:34:43'),(293,5,'CAI del docente Cristian Duarte para evaluar','DECANO','2022-12-16 00:00:00',1,'2022-12-14 23:59:31','2022-12-16 20:21:00'),(294,3,'Su CAI ha sido aprobado por el Decano de Facultad','DOCENTE','2022-12-16 00:00:00',1,'2022-12-14 23:59:50','2022-12-16 23:34:42'),(295,3,'CAI del docente Cristian Duarte ha sido aprobado por el Decano de Facultad','DOCENTE','2022-12-16 00:00:00',1,'2022-12-14 23:59:50','2022-12-16 23:34:42'),(296,3,'El usuario: Andres ha registrado el CAI.','DECANO','2022-12-16 00:00:00',1,'2022-12-16 03:27:51','2022-12-16 23:34:42'),(297,3,'El usuario: Andres ha registrado el CAI.','DOCENTE','2022-12-16 00:00:00',1,'2022-12-16 03:36:17','2022-12-16 23:34:42'),(298,3,'El usuario: Andres ha actualizao el CAI.','DOCENTE','2022-12-16 00:00:00',1,'2022-12-16 03:45:35','2022-12-16 23:34:42'),(299,3,'El usuario: Andres ha registrado el CAI.','DOCENTE','2022-12-16 00:00:00',1,'2022-12-16 03:48:10','2022-12-16 23:34:42'),(300,3,'El usuario: Andres ha registrado el CAI.','DIRECTOR','2022-12-16 00:00:00',1,'2022-12-16 03:59:33','2022-12-16 23:34:42'),(301,3,'El usuario: Andres ha actualizao el CAI.','DOCENTE','2022-12-16 00:00:00',1,'2022-12-16 04:00:47','2022-12-16 23:34:41'),(302,3,'El usuario: Cristian ha registrado el CAI.','DIRECTOR','2022-12-16 00:00:00',1,'2022-12-16 05:06:02','2022-12-16 23:34:41'),(303,3,'El usuario: Cristian ha actualizao el CAI.','DOCENTE','2022-12-16 00:00:00',1,'2022-12-16 05:08:42','2022-12-16 23:34:41'),(304,3,'El usuario: Andres ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 00:03:01','2022-12-17 00:03:01'),(305,2,'Su CAI ha sido aprobado por el director de departamento','DOCENTE',NULL,0,'2022-12-17 00:07:03','2022-12-17 00:07:03'),(306,5,'CAI del docente Andres Maldonado para evaluar','DECANO',NULL,0,'2022-12-17 00:07:03','2022-12-17 00:07:03'),(307,2,'Su CAI ha sido rechazado por el Decano de la Facultad','DOCENTE',NULL,0,'2022-12-17 00:07:31','2022-12-17 00:07:31'),(308,3,'CAI del docente Andres Maldonado ha sido rechazado por el Decano de Facultad','DIRECTOR',NULL,0,'2022-12-17 00:07:31','2022-12-17 00:07:31'),(309,3,'El usuario: Andres ha actualizao el CAI.','DIRECTOR',NULL,0,'2022-12-17 00:08:27','2022-12-17 00:08:27'),(310,2,'Su CAI ha sido aprobado por el director de departamento','DOCENTE',NULL,0,'2022-12-17 00:08:57','2022-12-17 00:08:57'),(311,5,'CAI del docente Andres Maldonado para evaluar','DECANO',NULL,0,'2022-12-17 00:08:57','2022-12-17 00:08:57'),(312,2,'Su CAI ha sido aprobado por el Decano de Facultad','DOCENTE',NULL,0,'2022-12-17 00:09:05','2022-12-17 00:09:05'),(313,3,'CAI del docente Andres Maldonado ha sido aprobado por el Decano de Facultad','DIRECTOR',NULL,0,'2022-12-17 00:09:05','2022-12-17 00:09:05'),(314,3,'El usuario: Cristian ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 17:10:19','2022-12-17 17:10:19'),(315,3,'El usuario: Andres ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 20:05:30','2022-12-17 20:05:30'),(316,3,'El usuario: Cristian ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 20:06:34','2022-12-17 20:06:34'),(317,3,'El usuario: Andres ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 20:58:57','2022-12-17 20:58:57'),(318,2,'Su CAI ha sido aprobado por el director de departamento','DOCENTE',NULL,0,'2022-12-17 21:59:31','2022-12-17 21:59:31'),(319,2,'Su CAI ha sido aprobado por el director de departamento','DOCENTE',NULL,0,'2022-12-17 21:59:51','2022-12-17 21:59:51'),(320,4,'CAI del docente Andres Maldonado para evaluar','DECANO',NULL,0,'2022-12-17 21:59:51','2022-12-17 21:59:51'),(321,2,'Su CAI ha sido aprobado por el Decano de Facultad','DOCENTE',NULL,0,'2022-12-17 22:14:50','2022-12-17 22:14:50'),(322,3,'CAI del docente Andres Maldonado ha sido aprobado por el Decano de Facultad','DIRECTOR',NULL,0,'2022-12-17 22:14:50','2022-12-17 22:14:50'),(323,3,'El usuario: Andres ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 22:43:00','2022-12-17 22:43:00'),(324,3,'El usuario: Andres ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 22:53:14','2022-12-17 22:53:14'),(325,2,'Su CAI ha sido rechazado por el director de departamento','DOCENTE',NULL,0,'2022-12-17 22:54:22','2022-12-17 22:54:22'),(326,3,'El usuario: Andres ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 23:11:26','2022-12-17 23:11:26'),(327,2,'Su CAI ha sido rechazado por el director de departamento','DOCENTE',NULL,0,'2022-12-17 23:12:59','2022-12-17 23:12:59'),(328,3,'El usuario: Andres ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 23:13:51','2022-12-17 23:13:51'),(329,2,'Su CAI ha sido aprobado por el director de departamento','DOCENTE',NULL,0,'2022-12-17 23:15:30','2022-12-17 23:15:30'),(330,4,'CAI del docente Andres Maldonado para evaluar','DECANO',NULL,0,'2022-12-17 23:15:30','2022-12-17 23:15:30'),(331,2,'Su CAI ha sido rechazado por el Decano de la Facultad','DOCENTE',NULL,0,'2022-12-17 23:16:16','2022-12-17 23:16:16'),(332,3,'CAI del docente Andres Maldonado ha sido rechazado por el Decano de Facultad','DIRECTOR',NULL,0,'2022-12-17 23:16:16','2022-12-17 23:16:16'),(333,3,'El usuario: Cristian ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 23:17:13','2022-12-17 23:17:13'),(334,2,'Su CAI ha sido aprobado por el director de departamento','DOCENTE',NULL,0,'2022-12-17 23:18:01','2022-12-17 23:18:01'),(335,4,'CAI del docente Andres Maldonado para evaluar','DECANO',NULL,0,'2022-12-17 23:18:01','2022-12-17 23:18:01'),(336,2,'Su CAI ha sido rechazado por el Decano de la Facultad','DOCENTE',NULL,0,'2022-12-17 23:18:08','2022-12-17 23:18:08'),(337,3,'CAI del docente Andres Maldonado ha sido rechazado por el Decano de Facultad','DIRECTOR',NULL,0,'2022-12-17 23:18:08','2022-12-17 23:18:08'),(338,3,'El usuario: Andres ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 23:18:42','2022-12-17 23:18:42'),(339,2,'Su CAI ha sido aprobado por el director de departamento','DOCENTE',NULL,0,'2022-12-17 23:19:05','2022-12-17 23:19:05'),(340,4,'CAI del docente Andres Maldonado para evaluar','DECANO',NULL,0,'2022-12-17 23:19:05','2022-12-17 23:19:05'),(341,2,'Su CAI ha sido aprobado por el Decano de Facultad','DOCENTE',NULL,0,'2022-12-17 23:19:51','2022-12-17 23:19:51'),(342,3,'CAI del docente Andres Maldonado ha sido aprobado por el Decano de Facultad','DIRECTOR',NULL,0,'2022-12-17 23:19:51','2022-12-17 23:19:51'),(343,3,'El usuario: marcelus ha registrado el CAI.','DIRECTOR',NULL,0,'2022-12-17 23:39:10','2022-12-17 23:39:10'),(344,4,'Su CAI ha sido aprobado por el director de departamento','DOCENTE',NULL,0,'2022-12-17 23:39:49','2022-12-17 23:39:49'),(345,4,'CAI del docente marcelus walas para evaluar','DECANO',NULL,0,'2022-12-17 23:39:49','2022-12-17 23:39:49'),(346,4,'Su CAI ha sido aprobado por el Decano de Facultad','DOCENTE',NULL,0,'2022-12-17 23:41:16','2022-12-17 23:41:16'),(347,3,'CAI del docente marcelus walas ha sido aprobado por el Decano de Facultad','DIRECTOR',NULL,0,'2022-12-17 23:41:16','2022-12-17 23:41:16');
/*!40000 ALTER TABLE `notificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo`
--

DROP TABLE IF EXISTS `periodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `anno` int DEFAULT NULL,
  `semestre` int DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_limite` datetime DEFAULT NULL,
  `id_departamento` int DEFAULT NULL,
  `estado` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_departamento_idx` (`id_departamento`),
  CONSTRAINT `id_departamento` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo`
--

LOCK TABLES `periodo` WRITE;
/*!40000 ALTER TABLE `periodo` DISABLE KEYS */;
INSERT INTO `periodo` VALUES (1,2020,1,'2020-01-01 00:00:00','2020-01-15 00:00:00',1,1,'2022-12-09 02:18:18',NULL),(2,2020,2,'2020-07-01 00:00:00','2020-07-10 00:00:00',1,1,'2022-12-09 02:14:57','2022-12-09 02:14:57'),(3,2021,1,'2021-01-08 00:00:00','2021-01-15 00:00:00',1,1,'2022-12-09 02:17:48','2022-12-09 02:17:48'),(4,2021,2,'2021-07-08 00:00:00','2021-07-15 00:00:00',1,1,'2022-12-09 02:17:58','2022-12-09 02:17:58'),(5,2022,1,'2022-01-01 00:00:00','2021-01-15 00:00:00',1,1,'2022-12-09 02:18:18','2022-12-09 02:18:18'),(6,2022,2,'2022-12-16 00:00:00','2022-12-31 00:00:00',1,1,'2022-12-17 01:38:54','2022-12-17 01:38:54'),(7,2022,2,'2022-12-11 00:00:00','2022-12-20 00:00:00',3,1,'2022-12-12 00:11:02','2022-12-12 00:11:02');
/*!40000 ALTER TABLE `periodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo_docente`
--

DROP TABLE IF EXISTS `periodo_docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo_docente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_periodo` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_estado` int NOT NULL,
  `fecha_diligenciamiento` datetime NOT NULL,
  `dedicacion` varchar(5) DEFAULT NULL,
  `horas_lectivas_semanales` double DEFAULT '0',
  `horas_investigacion` double DEFAULT '0',
  `horas_extension` double DEFAULT '0',
  `horas_administracion` double DEFAULT '0',
  `horas_representacion` double DEFAULT '0',
  `horas_otras` double DEFAULT '0',
  `horas_totales` double DEFAULT '0',
  `observacion` varchar(500) DEFAULT NULL,
  `esActivo` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `docente_idx` (`id_usuario`),
  KEY `odo` (`id_periodo`),
  KEY `estado_idx` (`id_estado`),
  CONSTRAINT `docente` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `odo` FOREIGN KEY (`id_periodo`) REFERENCES `periodo` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=214 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente`
--

LOCK TABLES `periodo_docente` WRITE;
/*!40000 ALTER TABLE `periodo_docente` DISABLE KEYS */;
INSERT INTO `periodo_docente` VALUES (1,7,3,1,'2022-12-21 00:00:00',NULL,0,0,0,0,0,0,0,NULL,1,NULL,NULL),(3,4,3,2,'2022-08-11 00:00:00',NULL,0,0,0,0,0,0,0,NULL,1,NULL,NULL),(5,3,3,2,'2022-10-11 00:00:00',NULL,0,0,0,0,0,0,0,NULL,1,NULL,NULL),(191,1,3,3,'2022-12-14 00:00:00','tc',30.5,2.5,0,0.5,3,0.5,37,'',1,'2022-12-14 23:59:25','2022-12-14 23:59:50'),(192,2,2,1,'2022-12-15 00:00:00','tc',18.8,23,0.5,0.5,6,1,49.8,'Cualquier observaciones es posible en esta situacion',1,'2022-12-16 03:27:49','2022-12-16 03:27:51'),(200,3,3,1,'2022-12-16 00:00:00','tc',18.8,0,0,0,0,0,18.8,'Cualquier observaciones es posible en esta situacion',1,'2022-12-16 05:08:40','2022-12-16 05:08:42'),(203,4,3,1,'2022-12-17 05:00:00','tc',30.5,16.5,1,8,9,3,68,'De momento ninguna',1,'2022-12-17 17:10:17','2022-12-17 17:10:19'),(204,5,2,3,'2022-12-17 05:00:00','tc',30.5,16.5,1,8,9,3,68,'De momento ninguna',1,'2022-12-17 20:05:29','2022-12-17 22:14:50'),(212,6,2,3,'2022-12-17 05:00:00','tp',30.5,16.5,1,8,9,3,68,'De momento ninguna',1,'2022-12-17 23:18:17','2022-12-17 23:19:51'),(213,6,4,3,'2022-12-17 05:00:00','tc',30.5,16.5,1,8,9,3,68,'De momento ninguna',1,'2022-12-17 23:39:09','2022-12-17 23:41:16');
/*!40000 ALTER TABLE `periodo_docente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo_docente_actividad_administracion`
--

DROP TABLE IF EXISTS `periodo_docente_actividad_administracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo_docente_actividad_administracion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_actividad_administracion` int NOT NULL,
  `id_periodo_docente` int NOT NULL,
  `horas` double DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `nombre` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `periodo_idx` (`id_periodo_docente`),
  KEY `act_administracion_idx` (`id_actividad_administracion`),
  CONSTRAINT `act_administracion` FOREIGN KEY (`id_actividad_administracion`) REFERENCES `actividad_administracion` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `periodo` FOREIGN KEY (`id_periodo_docente`) REFERENCES `periodo_docente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_actividad_administracion`
--

LOCK TABLES `periodo_docente_actividad_administracion` WRITE;
/*!40000 ALTER TABLE `periodo_docente_actividad_administracion` DISABLE KEYS */;
INSERT INTO `periodo_docente_actividad_administracion` VALUES (135,1,191,0.5,'2022-12-14 23:59:25','2022-12-14 23:59:25','DESEMPEÑO DE CARGO ADMINISTRATIVO'),(136,1,192,0.5,'2022-12-16 03:27:50','2022-12-16 03:27:50','DESEMPEÑO DE CARGO ADMINISTRATIVO'),(144,1,200,0,'2022-12-16 05:08:42','2022-12-16 05:08:42',''),(147,1,203,8,'2022-12-17 17:10:17','2022-12-17 17:10:17','Director de plan de estudio academico'),(148,1,204,8,'2022-12-17 20:05:30','2022-12-17 20:05:30','Director de plan de estudio academico'),(156,1,212,8,'2022-12-17 23:18:18','2022-12-17 23:18:18','Director de plan de estudio academico'),(157,1,213,8,'2022-12-17 23:39:10','2022-12-17 23:39:10','Director de plan de estudio academico');
/*!40000 ALTER TABLE `periodo_docente_actividad_administracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo_docente_actividad_extension`
--

DROP TABLE IF EXISTS `periodo_docente_actividad_extension`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo_docente_actividad_extension` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_actividad_extension` int NOT NULL,
  `id_periodo_docente` int NOT NULL,
  `horas` double DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `nombre` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cai_idx` (`id_periodo_docente`),
  KEY `actividad_extension_idx` (`id_actividad_extension`),
  KEY `a_idx` (`id_actividad_extension`),
  CONSTRAINT `ae` FOREIGN KEY (`id_actividad_extension`) REFERENCES `actividad_extension` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `extensioncai` FOREIGN KEY (`id_periodo_docente`) REFERENCES `periodo_docente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_actividad_extension`
--

LOCK TABLES `periodo_docente_actividad_extension` WRITE;
/*!40000 ALTER TABLE `periodo_docente_actividad_extension` DISABLE KEYS */;
INSERT INTO `periodo_docente_actividad_extension` VALUES (76,1,192,0.5,'2022-12-16 03:27:50','2022-12-16 03:27:50','a'),(84,1,200,0,'2022-12-16 05:08:42','2022-12-16 05:08:42',''),(87,1,203,1,'2022-12-17 17:10:17','2022-12-17 17:10:17','Analisis de imagenes del espacio por medio de algoritmos de aprendizaje'),(88,1,204,1,'2022-12-17 20:05:30','2022-12-17 20:05:30','Analisis de imagenes del espacio por medio de algoritmos de aprendizaje'),(96,1,212,1,'2022-12-17 23:18:18','2022-12-17 23:18:18','Analisis de imagenes del espacio por medio de algoritmos de aprendizaje'),(97,1,213,1,'2022-12-17 23:39:10','2022-12-17 23:39:10','Analisis de imagenes del espacio por medio de algoritmos de aprendizaje');
/*!40000 ALTER TABLE `periodo_docente_actividad_extension` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo_docente_actividad_investigacion`
--

DROP TABLE IF EXISTS `periodo_docente_actividad_investigacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo_docente_actividad_investigacion` (
  `id_actividad_investigacion` int NOT NULL,
  `id_periodo_docente` int NOT NULL,
  `horas` double DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_actividad_investigacion`,`id_periodo_docente`),
  KEY `cai_idx` (`id_periodo_docente`),
  CONSTRAINT `actividad_investigacion` FOREIGN KEY (`id_actividad_investigacion`) REFERENCES `actividad_investigacion` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `cai` FOREIGN KEY (`id_periodo_docente`) REFERENCES `periodo_docente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_actividad_investigacion`
--

LOCK TABLES `periodo_docente_actividad_investigacion` WRITE;
/*!40000 ALTER TABLE `periodo_docente_actividad_investigacion` DISABLE KEYS */;
INSERT INTO `periodo_docente_actividad_investigacion` VALUES (1,191,0,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(1,192,7,'2022-12-16 03:27:50','2022-12-16 03:27:50'),(1,200,0,'2022-12-16 05:08:41','2022-12-16 05:08:41'),(1,203,1,'2022-12-17 17:10:17','2022-12-17 17:10:17'),(1,204,1,'2022-12-17 20:05:29','2022-12-17 20:05:29'),(1,212,1,'2022-12-17 23:18:17','2022-12-17 23:18:17'),(1,213,1,'2022-12-17 23:39:09','2022-12-17 23:39:09'),(2,191,0,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(2,200,0,'2022-12-16 05:08:41','2022-12-16 05:08:41'),(2,203,0.5,'2022-12-17 17:10:17','2022-12-17 17:10:17'),(2,204,0.5,'2022-12-17 20:05:29','2022-12-17 20:05:29'),(2,212,0.5,'2022-12-17 23:18:17','2022-12-17 23:18:17'),(2,213,0.5,'2022-12-17 23:39:09','2022-12-17 23:39:09'),(3,191,0,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(3,192,4,'2022-12-16 03:27:50','2022-12-16 03:27:50'),(3,200,0,'2022-12-16 05:08:41','2022-12-16 05:08:41'),(3,203,2,'2022-12-17 17:10:17','2022-12-17 17:10:17'),(3,204,2,'2022-12-17 20:05:29','2022-12-17 20:05:29'),(3,212,2,'2022-12-17 23:18:17','2022-12-17 23:18:17'),(3,213,2,'2022-12-17 23:39:09','2022-12-17 23:39:09'),(4,191,1,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(4,200,0,'2022-12-16 05:08:41','2022-12-16 05:08:41'),(4,203,3,'2022-12-17 17:10:17','2022-12-17 17:10:17'),(4,204,3,'2022-12-17 20:05:29','2022-12-17 20:05:29'),(4,212,3,'2022-12-17 23:18:18','2022-12-17 23:18:18'),(4,213,3,'2022-12-17 23:39:09','2022-12-17 23:39:09'),(5,191,1,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(5,200,0,'2022-12-16 05:08:41','2022-12-16 05:08:41'),(5,203,4,'2022-12-17 17:10:17','2022-12-17 17:10:17'),(5,204,4,'2022-12-17 20:05:29','2022-12-17 20:05:29'),(5,212,4,'2022-12-17 23:18:18','2022-12-17 23:18:18'),(5,213,4,'2022-12-17 23:39:09','2022-12-17 23:39:09'),(6,191,0.5,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(6,200,0,'2022-12-16 05:08:41','2022-12-16 05:08:41'),(6,203,4,'2022-12-17 17:10:17','2022-12-17 17:10:17'),(6,204,4,'2022-12-17 20:05:29','2022-12-17 20:05:29'),(6,212,4,'2022-12-17 23:18:18','2022-12-17 23:18:18'),(6,213,4,'2022-12-17 23:39:09','2022-12-17 23:39:09'),(7,191,0,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(7,192,12,'2022-12-16 03:27:50','2022-12-16 03:27:50'),(7,200,0,'2022-12-16 05:08:41','2022-12-16 05:08:41'),(7,203,2,'2022-12-17 17:10:17','2022-12-17 17:10:17'),(7,204,2,'2022-12-17 20:05:29','2022-12-17 20:05:29'),(7,212,2,'2022-12-17 23:18:18','2022-12-17 23:18:18'),(7,213,2,'2022-12-17 23:39:10','2022-12-17 23:39:10');
/*!40000 ALTER TABLE `periodo_docente_actividad_investigacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo_docente_asignatura`
--

DROP TABLE IF EXISTS `periodo_docente_asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo_docente_asignatura` (
  `id_asignatura` int NOT NULL,
  `id_periodo_docente` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_asignatura`,`id_periodo_docente`),
  KEY `periodo_docente_idx` (`id_periodo_docente`),
  CONSTRAINT `asignatura` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `periodo_docente` FOREIGN KEY (`id_periodo_docente`) REFERENCES `periodo_docente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_asignatura`
--

LOCK TABLES `periodo_docente_asignatura` WRITE;
/*!40000 ALTER TABLE `periodo_docente_asignatura` DISABLE KEYS */;
INSERT INTO `periodo_docente_asignatura` VALUES (1,192,'2022-12-16 03:27:49','2022-12-16 03:27:49'),(1,200,'2022-12-16 05:08:40','2022-12-16 05:08:40'),(2,192,'2022-12-16 03:27:49','2022-12-16 03:27:49'),(2,200,'2022-12-16 05:08:40','2022-12-16 05:08:40'),(3,191,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(3,203,'2022-12-17 17:10:17','2022-12-17 17:10:17'),(3,204,'2022-12-17 20:05:29','2022-12-17 20:05:29'),(3,212,'2022-12-17 23:18:17','2022-12-17 23:18:17'),(3,213,'2022-12-17 23:39:09','2022-12-17 23:39:09'),(4,203,'2022-12-17 17:10:17','2022-12-17 17:10:17'),(4,204,'2022-12-17 20:05:29','2022-12-17 20:05:29'),(4,212,'2022-12-17 23:18:17','2022-12-17 23:18:17'),(4,213,'2022-12-17 23:39:09','2022-12-17 23:39:09'),(6,191,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(7,191,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(7,203,'2022-12-17 17:10:17','2022-12-17 17:10:17'),(7,204,'2022-12-17 20:05:29','2022-12-17 20:05:29'),(7,212,'2022-12-17 23:18:17','2022-12-17 23:18:17'),(7,213,'2022-12-17 23:39:09','2022-12-17 23:39:09');
/*!40000 ALTER TABLE `periodo_docente_asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo_docente_firma`
--

DROP TABLE IF EXISTS `periodo_docente_firma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo_docente_firma` (
  `id_periodo_docente` int NOT NULL,
  `id_firma` int NOT NULL,
  `rol` varchar(45) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_periodo_docente`,`id_firma`),
  KEY `firma_idx` (`id_firma`),
  KEY `cai_idx` (`id_periodo_docente`),
  CONSTRAINT `c` FOREIGN KEY (`id_periodo_docente`) REFERENCES `periodo_docente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `f` FOREIGN KEY (`id_firma`) REFERENCES `firma` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_firma`
--

LOCK TABLES `periodo_docente_firma` WRITE;
/*!40000 ALTER TABLE `periodo_docente_firma` DISABLE KEYS */;
INSERT INTO `periodo_docente_firma` VALUES (191,16,'Docente','2022-12-14 23:59:25','2022-12-14 23:59:25'),(191,17,'Director','2022-12-14 23:59:31','2022-12-14 23:59:31'),(191,18,'Decano','2022-12-14 23:59:50','2022-12-14 23:59:50'),(192,16,'Docente','2022-12-16 03:27:51','2022-12-16 03:27:51'),(200,16,'Docente','2022-12-16 05:08:42','2022-12-16 05:08:42'),(203,16,'Docente','2022-12-17 17:10:18','2022-12-17 17:10:18'),(213,17,'Director','2022-12-17 23:39:49','2022-12-17 23:39:49'),(213,18,'Docente','2022-12-17 23:39:10','2022-12-17 23:39:10');
/*!40000 ALTER TABLE `periodo_docente_firma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo_docente_notas`
--

DROP TABLE IF EXISTS `periodo_docente_notas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo_docente_notas` (
  `id_periodo_docente` int NOT NULL,
  `id_notas` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_periodo_docente`,`id_notas`),
  KEY `nota_idx` (`id_notas`),
  CONSTRAINT `nota` FOREIGN KEY (`id_notas`) REFERENCES `notas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `qwerwe` FOREIGN KEY (`id_periodo_docente`) REFERENCES `periodo_docente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_notas`
--

LOCK TABLES `periodo_docente_notas` WRITE;
/*!40000 ALTER TABLE `periodo_docente_notas` DISABLE KEYS */;
INSERT INTO `periodo_docente_notas` VALUES (191,1,NULL,NULL),(200,1,'2022-12-16 05:08:42','2022-12-16 05:08:42'),(203,1,'2022-12-17 17:10:18','2022-12-17 17:10:18'),(204,1,'2022-12-17 20:05:30','2022-12-17 20:05:30'),(212,1,'2022-12-17 23:18:19','2022-12-17 23:18:19'),(213,1,'2022-12-17 23:39:10','2022-12-17 23:39:10');
/*!40000 ALTER TABLE `periodo_docente_notas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo_docente_otra`
--

DROP TABLE IF EXISTS `periodo_docente_otra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo_docente_otra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_actividad_otra` int NOT NULL,
  `id_periodo_docente` int NOT NULL,
  `horas` double DEFAULT NULL,
  `nombre` varchar(1000) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `periodo_docente_idx` (`id_periodo_docente`),
  KEY `otra_act_idx` (`id_actividad_otra`),
  CONSTRAINT `otra_act` FOREIGN KEY (`id_actividad_otra`) REFERENCES `actividad_otra` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `per_doc` FOREIGN KEY (`id_periodo_docente`) REFERENCES `periodo_docente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=244 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_otra`
--

LOCK TABLES `periodo_docente_otra` WRITE;
/*!40000 ALTER TABLE `periodo_docente_otra` DISABLE KEYS */;
INSERT INTO `periodo_docente_otra` VALUES (199,1,191,0.5,NULL,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(200,1,192,0.5,NULL,'2022-12-16 03:27:51','2022-12-16 03:27:51'),(201,2,192,0.5,'Integrante Comité Acreditación Institucional','2022-12-16 03:27:51','2022-12-16 03:27:51'),(216,1,200,0,NULL,'2022-12-16 05:08:42','2022-12-16 05:08:42'),(217,2,200,0,'','2022-12-16 05:08:42','2022-12-16 05:08:42'),(222,1,203,1,NULL,'2022-12-17 17:10:18','2022-12-17 17:10:18'),(223,2,203,2,'Comite de jurado academico','2022-12-17 17:10:18','2022-12-17 17:10:18'),(224,1,204,1,NULL,'2022-12-17 20:05:30','2022-12-17 20:05:30'),(225,2,204,2,'Comite de jurado academico','2022-12-17 20:05:30','2022-12-17 20:05:30'),(240,1,212,1,NULL,'2022-12-17 23:18:19','2022-12-17 23:18:19'),(241,2,212,2,'Comite de jurado academico','2022-12-17 23:18:19','2022-12-17 23:18:19'),(242,1,213,1,NULL,'2022-12-17 23:39:10','2022-12-17 23:39:10'),(243,2,213,2,'Comite de jurado academico','2022-12-17 23:39:10','2022-12-17 23:39:10');
/*!40000 ALTER TABLE `periodo_docente_otra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo_docente_representacion`
--

DROP TABLE IF EXISTS `periodo_docente_representacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo_docente_representacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_periodo_docente` int NOT NULL,
  `id_tipo_representacion` int NOT NULL,
  `horas` double DEFAULT NULL,
  `nombre` varchar(1000) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `p_d_idx` (`id_periodo_docente`),
  KEY `t_representacion_idx` (`id_tipo_representacion`),
  CONSTRAINT `p_d` FOREIGN KEY (`id_periodo_docente`) REFERENCES `periodo_docente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_representacion` FOREIGN KEY (`id_tipo_representacion`) REFERENCES `tipo_representacion` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=597 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_representacion`
--

LOCK TABLES `periodo_docente_representacion` WRITE;
/*!40000 ALTER TABLE `periodo_docente_representacion` DISABLE KEYS */;
INSERT INTO `periodo_docente_representacion` VALUES (485,191,1,2,NULL,'2022-12-14 23:59:25','2022-12-14 23:59:25'),(486,191,5,1,'comite curricular del programa','2022-12-14 23:59:25','2022-12-14 23:59:25'),(487,192,1,2,NULL,'2022-12-16 03:27:50','2022-12-16 03:27:50'),(488,192,2,2,NULL,'2022-12-16 03:27:50','2022-12-16 03:27:50'),(489,192,3,0.5,NULL,'2022-12-16 03:27:51','2022-12-16 03:27:51'),(490,192,4,0.5,NULL,'2022-12-16 03:27:51','2022-12-16 03:27:51'),(491,192,5,1,'comite curricular del programa','2022-12-16 03:27:51','2022-12-16 03:27:51'),(527,200,1,0,NULL,'2022-12-16 05:08:42','2022-12-16 05:08:42'),(528,200,2,0,NULL,'2022-12-16 05:08:42','2022-12-16 05:08:42'),(529,200,3,0,NULL,'2022-12-16 05:08:42','2022-12-16 05:08:42'),(530,200,4,0,NULL,'2022-12-16 05:08:42','2022-12-16 05:08:42'),(531,200,5,0,'','2022-12-16 05:08:42','2022-12-16 05:08:42'),(542,203,1,2,NULL,'2022-12-17 17:10:18','2022-12-17 17:10:18'),(543,203,2,1,NULL,'2022-12-17 17:10:18','2022-12-17 17:10:18'),(544,203,3,3,NULL,'2022-12-17 17:10:18','2022-12-17 17:10:18'),(545,203,4,1,NULL,'2022-12-17 17:10:18','2022-12-17 17:10:18'),(546,203,5,2,'Comite curricular','2022-12-17 17:10:18','2022-12-17 17:10:18'),(547,204,1,2,NULL,'2022-12-17 20:05:30','2022-12-17 20:05:30'),(548,204,2,1,NULL,'2022-12-17 20:05:30','2022-12-17 20:05:30'),(549,204,3,3,NULL,'2022-12-17 20:05:30','2022-12-17 20:05:30'),(550,204,4,1,NULL,'2022-12-17 20:05:30','2022-12-17 20:05:30'),(551,204,5,2,'Comite curricular','2022-12-17 20:05:30','2022-12-17 20:05:30'),(587,212,1,2,NULL,'2022-12-17 23:18:18','2022-12-17 23:18:18'),(588,212,2,1,NULL,'2022-12-17 23:18:18','2022-12-17 23:18:18'),(589,212,3,3,NULL,'2022-12-17 23:18:19','2022-12-17 23:18:19'),(590,212,4,1,NULL,'2022-12-17 23:18:19','2022-12-17 23:18:19'),(591,212,5,2,'Comite curricular','2022-12-17 23:18:19','2022-12-17 23:18:19'),(592,213,1,2,NULL,'2022-12-17 23:39:10','2022-12-17 23:39:10'),(593,213,2,1,NULL,'2022-12-17 23:39:10','2022-12-17 23:39:10'),(594,213,3,3,NULL,'2022-12-17 23:39:10','2022-12-17 23:39:10'),(595,213,4,1,NULL,'2022-12-17 23:39:10','2022-12-17 23:39:10'),(596,213,5,2,'Comite curricular','2022-12-17 23:39:10','2022-12-17 23:39:10');
/*!40000 ALTER TABLE `periodo_docente_representacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_estudio`
--

DROP TABLE IF EXISTS `plan_estudio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_estudio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `id_facultad` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `estado` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `facultad_idx` (`id_facultad`),
  CONSTRAINT `facultad` FOREIGN KEY (`id_facultad`) REFERENCES `facultad` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_estudio`
--

LOCK TABLES `plan_estudio` WRITE;
/*!40000 ALTER TABLE `plan_estudio` DISABLE KEYS */;
INSERT INTO `plan_estudio` VALUES (9,'INGENIERIA CIVIL',7,'2022-12-08 05:37:34','2022-12-08 05:37:34',1),(10,'INGENIERIA ELECTRONICA',7,'2022-12-08 05:37:34','2022-12-08 05:37:34',1),(11,'INGENIERIA ELECTROMECANICA',7,'2022-12-08 05:37:34','2022-12-08 05:37:34',1),(12,'INGENIERIA INDUSTRIAL',7,'2022-12-08 05:37:34','2022-12-08 05:37:34',1),(13,'INGENIERIA MINAS',7,'2022-12-08 05:37:34','2022-12-08 05:37:34',1),(14,'INGENIERIA DE SISTEMAS',7,'2022-12-08 05:46:59','2022-12-08 05:46:59',0),(15,'FACILITO',5,'2022-12-08 06:09:11','2022-12-08 06:10:39',0);
/*!40000 ALTER TABLE `plan_estudio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `retroalimentacion`
--

DROP TABLE IF EXISTS `retroalimentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retroalimentacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_periodo_docente` int NOT NULL,
  `docencia` varchar(1000) DEFAULT NULL,
  `investigacion` varchar(1000) DEFAULT NULL,
  `extension` varchar(1000) DEFAULT NULL,
  `administracion` varchar(1000) DEFAULT NULL,
  `representacion` varchar(1000) DEFAULT NULL,
  `otras` varchar(1000) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `rol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `c_idx` (`id_periodo_docente`),
  KEY `u_idx` (`id_usuario`),
  CONSTRAINT `q` FOREIGN KEY (`id_periodo_docente`) REFERENCES `periodo_docente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `u` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retroalimentacion`
--

LOCK TABLES `retroalimentacion` WRITE;
/*!40000 ALTER TABLE `retroalimentacion` DISABLE KEYS */;
INSERT INTO `retroalimentacion` VALUES (43,4,191,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-14 23:57:03','2022-12-14 23:59:25','DECANO DE FACULTAD'),(44,4,191,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-14 23:57:20','2022-12-14 23:59:25','DECANO DE FACULTAD'),(45,4,191,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-14 23:57:57','2022-12-14 23:59:26','DECANO DE FACULTAD'),(46,4,191,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-14 23:58:09','2022-12-14 23:59:26','DECANO DE FACULTAD'),(47,4,191,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-14 23:58:23','2022-12-14 23:59:26','DECANO DE FACULTAD'),(48,4,191,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-14 23:58:37','2022-12-14 23:59:26','DECANO DE FACULTAD'),(51,3,212,'Cualquiera de ejemplo','en la actividad directores de investigacion realiza menos horas de las debidas','debe revisar el proyecto escrito','','','','2022-12-17 23:12:59','2022-12-17 23:18:19','DIRECTOR DE DEPARTAMENTO'),(52,4,212,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion','Debes mencionarme el cargo de director de biblioteca','','','2022-12-17 23:16:16','2022-12-17 23:18:19','DECANO DE FACULTAD'),(53,4,212,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion','Debes mencionarme el cargo de director de biblioteca','','','2022-12-17 23:18:08','2022-12-17 23:18:19','DECANO DE FACULTAD');
/*!40000 ALTER TABLE `retroalimentacion` ENABLE KEYS */;
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
-- Table structure for table `seccion`
--

DROP TABLE IF EXISTS `seccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seccion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seccion`
--

LOCK TABLES `seccion` WRITE;
/*!40000 ALTER TABLE `seccion` DISABLE KEYS */;
INSERT INTO `seccion` VALUES (1,'AVTIVIDADES DE DOCENCIA'),(2,'ACTIVIDADES DE INVESTIGACION'),(3,'ACTIVIDADES DE EXTENSION'),(4,'ADMINISTRACION'),(5,'REPRESENTACIONES'),(6,'OTRAS ACTIVIDADES');
/*!40000 ALTER TABLE `seccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_representacion`
--

DROP TABLE IF EXISTS `tipo_representacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_representacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `listar` tinyint DEFAULT '0',
  `estado` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_representacion`
--

LOCK TABLES `tipo_representacion` WRITE;
/*!40000 ALTER TABLE `tipo_representacion` DISABLE KEYS */;
INSERT INTO `tipo_representacion` VALUES (1,'CONSEJOS','Superior, Académico, Facultad, Departamento (2H por semana)',0,1,'2022-12-10 05:08:53','2022-12-10 05:21:09'),(2,'COMITES','Central de Autoevaluación y Planeación Institucional, Evaluación Docente, Admisiones, Bienestar Universitario, Administrativo, Coordinación Académica, Asesor de Biblioteca, Curricular Central, Curriculares de Planes de Estudio, Asignación de puntaje, Central de Investigación y Extensión, Fondo Rotatorio de Investigación y Extensión (1 hora por semana)',0,1,'2022-12-10 05:10:31','2022-12-10 05:10:31'),(3,'COMITES DE INVESTIGACIÓN Y EXTENSIÓN','Trabajos de Grado e Investigación y Extensión de las facultades (0.5 H por semana)',0,1,'2022-12-10 05:11:31','2022-12-10 05:11:31'),(4,'REUNIÓN DE PROFESORES','(0.5 H)',0,1,'2022-12-10 05:11:53','2022-12-10 05:11:53'),(5,'OTROS COMITÉS Y REPRESENTACIONES','(0.5 a 1.0 H por semana) (describir)',1,1,'2022-12-10 05:12:20','2022-12-10 05:12:20');
/*!40000 ALTER TABLE `tipo_representacion` ENABLE KEYS */;
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
  `realizaCai` tinyint(1) NOT NULL DEFAULT '1',
  `id_departamento` int DEFAULT NULL,
  `id_firma` int DEFAULT NULL,
  `estaActivo` tinyint NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  KEY `firma_idx` (`id_firma`),
  KEY `departamento_idx` (`id_departamento`),
  CONSTRAINT `departamento` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `firma` FOREIGN KEY (`id_firma`) REFERENCES `firma` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'ufpsadcai@gmail.com','AD','CAI','1',0,NULL,NULL,1,NULL,NULL),(2,'crduarte99@gmail.com','Andres','Maldonado','1151343',1,1,16,1,NULL,NULL),(3,'cristianandresdm@ufps.edu.co','Cristian','Duarte','1151342',1,1,17,1,'2022-11-22 20:42:04','2022-12-11 16:40:01'),(4,'marceluswalas0697@gmail.com','marcelus','walas',NULL,1,1,18,1,'2022-12-13 08:33:30','2022-12-13 08:58:28'),(5,'karenbrigidbv@ufps.edu.co','KAREN','BELTRAN VERA','1151644',1,2,NULL,1,'2022-12-08 21:26:15','2022-12-16 17:30:30');
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
INSERT INTO `usuario_rol` VALUES (1,1,NULL,NULL),(5,1,NULL,NULL),(4,2,NULL,NULL),(5,2,NULL,NULL),(3,3,NULL,NULL),(5,3,NULL,NULL),(2,4,NULL,NULL),(3,4,NULL,NULL),(4,4,NULL,NULL),(5,4,NULL,NULL);
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

-- Dump completed on 2022-12-17 18:54:30
