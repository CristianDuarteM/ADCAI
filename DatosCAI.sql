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
-- Dumping data for table `actividad_administracion`
--

LOCK TABLES `actividad_administracion` WRITE;
/*!40000 ALTER TABLE `actividad_administracion` DISABLE KEYS */;
INSERT INTO `actividad_administracion` VALUES (1,'DESEMPEÑO DE CARGO ADMINISTRATIVO','',1,1,'2022-12-10 00:33:48','2022-12-10 00:37:33');
/*!40000 ALTER TABLE `actividad_administracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `actividad_extension`
--

LOCK TABLES `actividad_extension` WRITE;
/*!40000 ALTER TABLE `actividad_extension` DISABLE KEYS */;
INSERT INTO `actividad_extension` VALUES (1,'PROYECTO DE EXTENSIÓN','Las aprobadas por Consejo de Facultad y Consejo Académico (no incluya trabajos para cambio de categoría y/o Producción intelectual)','2022-12-09 22:59:58','2022-12-10 18:35:12',1,1);
/*!40000 ALTER TABLE `actividad_extension` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `actividad_investigacion`
--

LOCK TABLES `actividad_investigacion` WRITE;
/*!40000 ALTER TABLE `actividad_investigacion` DISABLE KEYS */;
INSERT INTO `actividad_investigacion` VALUES (1,'DIRECTORES DE GRUPO','',0,7,'7 horas de las 40 laborales.',1,'2022-12-09 21:00:15','2022-12-09 22:54:55'),(2,'DIRECTORES DE SEMILLEROS DE INVESTIGACIÓN*','',0,5,'7 horas de las 40 laborales.',1,'2022-12-09 21:00:49','2022-12-09 21:57:25'),(3,'DIRECTORES DE PROYECTOS DE INVESTIGACIÓN INTERNOS APROBADOS QUE PERTENEZCAN A UN GRUPO DE INVESTIGACIÓN (POR PROYECTO).*','',5,10,'5 a 10 horas de las 40 laborales de acuerdo a la complejidad del proyecto o la bonificación definida por estructura de costos.',1,'2022-12-09 21:04:14','2022-12-09 21:57:26'),(4,'COINVESTIGADORES DE PROYECTOS DE INVESTIGACIÓN INTERNOS APROBADOS QUE PERTENEZCAN A UN GRUPO DE INVESTIGACIÓN (POR PROYECTO).*','',3,6,'De 3 a 6 horas de acuerdo a la complejidad del proyecto o la bonificación definida por estructura de costos.',1,'2022-12-09 21:05:16','2022-12-09 21:57:27'),(5,'PARTICIPACIÓN EN PROYECTOS DE INVESTIGACIÓN EXTERNOS APROBADOS COMO DIRECTOR O COINVESTIGADOR QUE PERTENEZCAN A UN GRUPO DE INVESTIGACIÓN (POR PROYECTO).*','',5,15,'5 a 15 horas de las 40 laborales o la bonificación definida por estructura de costos.',1,'2022-12-09 21:05:48','2022-12-09 21:57:28'),(6,'TUTORES DE JÓVENES INVESTIGADORES (POR JOVEN INVESTIGADOR)*','',0,4,'4 horas de las 40 laborales.',1,'2022-12-09 21:06:57','2022-12-09 21:57:30'),(7,'REPRESENTANTE DE FACULTAD ANTE EL COMITÉ CENTRAL DE INVESTIGACIONES.**','',0,12,'12 horas de las 40 laborales',1,'2022-12-09 21:07:21','2022-12-09 21:57:31');
/*!40000 ALTER TABLE `actividad_investigacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `actividad_otra`
--

LOCK TABLES `actividad_otra` WRITE;
/*!40000 ALTER TABLE `actividad_otra` DISABLE KEYS */;
INSERT INTO `actividad_otra` VALUES (1,'EVALUACIÓN DE TRABAJOS DE GRADO, PRODUCCIÓN Y CAMBIOS DE CATEGORÍA','(0.5 H semanales por trabajo)',0,1,'2022-12-10 06:17:49','2022-12-10 06:23:31'),(2,'OTRAS ACTIVIDADES APROBADAS POR CONSEJO DE FACULTAD Y CONSEJO ACADÉMICO','Enunciarlas',1,1,'2022-12-10 06:18:36','2022-12-10 06:18:36');
/*!40000 ALTER TABLE `actividad_otra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` VALUES (1,'INGENIERIA DE SOFTWARE','cualquier descripcion',3,4,0,14,1,'2022-12-07 03:59:39','2022-12-07 03:59:39'),(2,'ANALISIS Y DISEÑO DE SISTEMAS','',4,4,0,14,1,'2022-12-07 04:03:42','2022-12-10 08:39:22'),(3,'PATRONES DE DISEÑO','cualquier descripcion',2,4,0,14,1,'2022-12-07 04:04:31','2022-12-07 04:04:31'),(4,'FUNDAMENTOS DE PROGRAMACION','cualquier descripcion',4,4,0,14,1,'2022-12-07 04:05:50','2022-12-07 04:05:50'),(5,'FISICA MECANICA','cualquier descripcion',4,2,2,14,1,'2022-12-07 04:06:10','2022-12-07 04:06:10'),(6,'FISICA ELECTROMAGNETICA','cualquier descripcion',4,2,2,14,1,'2022-12-07 04:06:24','2022-12-07 04:06:24'),(7,'FISICA DE ONDAS Y PARTICULAS','cualquier descripcion',5,3,2,14,1,'2022-12-07 04:07:02','2022-12-07 04:07:02'),(8,'FISICA ELECTRONICA','cualquier descripcion',5,3,2,14,1,'2022-12-07 04:10:53','2022-12-07 04:10:53'),(9,'REDES 1','cualquier descripcion',4,2,2,14,0,'2022-12-07 04:11:59','2022-12-07 19:56:36'),(35,'CALCULO DIFERENCIAL','cualquier descripcion',4,4,0,14,1,'2022-12-07 20:57:15','2022-12-07 20:57:15'),(36,'CALCULO INTEGRAL','cualquier descripcion',4,4,0,14,1,'2022-12-07 20:57:15','2022-12-07 20:57:15'),(37,'CALCULO VECTORIAL','cualquier descripcion',4,4,0,14,1,'2022-12-07 20:57:15','2022-12-07 20:57:15'),(38,'ECUACIONES DIFERENCIALES','cualquier descripcion',4,4,0,14,1,'2022-12-07 20:57:15','2022-12-07 20:57:15'),(39,'ANALISIS NUMERICO','cualquier descripcion',3,3,0,14,1,'2022-12-07 20:57:15','2022-12-07 20:57:15'),(40,'CALCULO DIFERENCIAL','cualquier descripcion',4,4,0,9,1,'2022-12-07 21:06:53','2022-12-07 21:06:53'),(41,'CALCULO INTEGRAL','cualquier descripcion',4,4,0,9,1,'2022-12-07 21:06:53','2022-12-07 21:06:53'),(42,'CALCULO VECTORIAL','cualquier descripcion',4,4,0,9,1,'2022-12-07 21:06:53','2022-12-07 21:06:53'),(43,'ECUACIONES DIFERENCIALES','cualquier descripcion',4,4,0,9,1,'2022-12-07 21:06:53','2022-12-07 21:06:53'),(44,'ANALISIS NUMERICO','cualquier descripcion',3,3,0,9,1,'2022-12-07 21:06:53','2022-12-07 21:06:53'),(45,'CALCULO DIFERENCIAL','cualquier descripcion',4,4,0,10,1,'2022-12-07 21:16:14','2022-12-07 21:16:14'),(46,'PARA PROBAR','cualquier descripcion',4,4,0,14,1,'2022-12-10 22:57:27','2022-12-10 22:57:27');
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,'Ingenieria agroindustrial','descripcion de ingenieria',5,'2022-11-22 15:30:26','2022-12-08 21:34:29',2,1),(2,'Ingenieria de Sistemas','descripcion de ingenieria',7,'2022-11-22 15:33:36','2022-12-08 22:33:14',3,0),(3,'Ingenieria Electronica','descripcion de ingenieria',7,'2022-11-22 15:34:42','2022-12-09 04:32:46',2,1),(4,'Ingenieria Electromecanica','descripcion de ingenieria',3,'2022-11-22 15:35:24','2022-11-22 15:35:24',56,1),(5,'Ingenieria Industrial','descripcion de ingenieria',7,'2022-11-22 15:35:38','2022-12-03 20:52:56',1,1),(6,'Ingenieria de Minas','descripcion de ingenieria',5,'2022-11-22 15:35:48','2022-11-22 15:35:48',57,1),(7,'Ingenieria Mecanica','descripcion de ingenieria',6,'2022-11-22 15:36:00','2022-11-22 15:36:00',58,1);
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'DILIGENCIADO','El docente ha diligenciado el cai pero aun no ha sido evaluado por el director de departamento','2022-12-06 15:56:34','2022-12-06 15:56:34'),(2,'APROBADO DIRECTOR','El cai ha sido evaluado por el director de departamento y lo ha aprobado','2022-12-06 15:57:07','2022-12-06 15:57:07'),(3,'APROBADO DECANO','El cai ha sido evaluado por el decano de facultad y lo ha aprobado','2022-12-06 15:57:24','2022-12-06 15:57:24'),(4,'RECHAZADO DECANO','El cai ha sido evaluado por el decano de facultad y lo ha rechazado, el docente debe hacerle correcciones','2022-12-06 15:58:46','2022-12-06 15:58:46'),(5,'RECHAZADO DIRECTOR','El cai ha sido evaluado por el director de departamento y lo ha rechazado, el docente debe hacerle correcciones','2022-12-06 15:59:10','2022-12-06 16:02:41');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `facultad`
--

LOCK TABLES `facultad` WRITE;
/*!40000 ALTER TABLE `facultad` DISABLE KEYS */;
INSERT INTO `facultad` VALUES (3,'Ciencias de la salud','','2022-11-21 16:19:20','2022-12-08 20:59:26',1,0),(4,'Empresariales','','2022-11-21 16:19:41','2022-12-08 22:34:41',50,1),(5,'Basicas','','2022-11-21 16:20:01','2022-12-08 21:01:34',2,0),(6,'Ciencias Agrarias y de Ambiente','','2022-11-21 16:20:24','2022-11-21 16:20:24',3,1),(7,'Facultad de Ingenieria','','2022-11-21 20:51:29','2022-12-12 06:41:37',5,1);
/*!40000 ALTER TABLE `facultad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `firma`
--

LOCK TABLES `firma` WRITE;
/*!40000 ALTER TABLE `firma` DISABLE KEYS */;
INSERT INTO `firma` VALUES (16,'https://res.cloudinary.com/dfqil2srx/image/upload/v1670822741/bihj8ofzshgxlfdymzve.jpg','2022-12-11 16:40:01','2022-12-12 05:25:43'),(17,'https://res.cloudinary.com/dfqil2srx/image/upload/v1670822797/tb44qjza5undoxbhraww.jpg','2022-12-11 16:51:35','2022-12-12 05:26:38'),(18,'https://res.cloudinary.com/dfqil2srx/image/upload/v1670824396/y9goqlrhms9unjoyexqn.jpg','2022-12-12 05:47:13','2022-12-12 05:53:18'),(19,'https://res.cloudinary.com/dfqil2srx/image/upload/v1670828878/jsurzdv2q9lgdh2e8rva.jpg','2022-12-12 07:08:00','2022-12-12 07:08:00');
/*!40000 ALTER TABLE `firma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
INSERT INTO `notificacion` VALUES (1,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-11 19:21:37','2022-12-12 21:53:05'),(2,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-11 00:00:00',1,'2022-12-11 19:44:53','2022-12-11 23:58:13'),(3,1,'El usuario: Cristian Andres ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-11 19:48:16','2022-12-12 23:01:34'),(4,1,'El usuario: Cristian Andres ha registrado el cai.',NULL,1,'2022-12-11 19:49:04','2022-12-11 19:49:04'),(5,56,'El usuario: CRISTIAN ANDRES ha registrado el cai.',NULL,0,'2022-12-11 21:32:10','2022-12-11 21:32:10'),(6,56,'El usuario: CRISTIAN ANDRES ha registrado el cai.',NULL,0,'2022-12-11 22:00:19','2022-12-11 22:00:19'),(7,56,'El usuario: CRISTIAN ANDRES ha registrado el cai.',NULL,0,'2022-12-11 22:05:40','2022-12-11 22:05:40'),(8,56,'El usuario: CRISTIAN ANDRES ha registrado el cai.',NULL,0,'2022-12-11 22:21:40','2022-12-11 22:21:40'),(9,56,'El usuario: CRISTIAN ANDRES ha registrado el cai.',NULL,0,'2022-12-11 22:37:48','2022-12-11 22:37:48'),(10,56,'El usuario: Cristian Andres ha registrado el cai.',NULL,0,'2022-12-11 23:46:25','2022-12-11 23:46:25'),(11,56,'El usuario: Cristian Andres ha registrado el cai.',NULL,0,'2022-12-11 23:46:25','2022-12-11 23:46:25'),(12,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 00:59:42','2022-12-12 23:01:34'),(13,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 01:27:24','2022-12-12 23:01:34'),(14,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 01:28:29','2022-12-12 23:01:33'),(15,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 01:34:33','2022-12-12 23:01:33'),(16,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 01:34:48','2022-12-12 23:01:33'),(17,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 01:39:43','2022-12-12 23:01:33'),(18,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 01:42:21','2022-12-12 23:01:33'),(19,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 01:51:16','2022-12-12 23:01:33'),(20,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 01:53:10','2022-12-12 23:01:33'),(21,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 02:35:57','2022-12-12 22:57:27'),(22,1,'Su CAI ha sido aprobado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 06:31:54','2022-12-12 22:57:27'),(23,1,'Su CAI ha sido aprobado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 06:33:11','2022-12-12 22:57:27'),(24,1,'Su CAI ha sido aprobado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 06:33:54','2022-12-12 22:57:27'),(25,1,'Su CAI ha sido aprobado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 06:45:24','2022-12-12 22:57:27'),(27,1,'Su CAI ha sido aprobado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 07:04:14','2022-12-12 22:57:27'),(28,1,'Su CAI ha sido aprobado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 07:09:47','2022-12-12 22:57:27'),(30,1,'Su CAI ha sido aprobado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 07:10:49','2022-12-12 22:57:27'),(32,1,'Su CAI ha sido aprobado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 07:12:43','2022-12-12 22:57:27'),(34,1,'Su CAI ha sido aprobado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 07:17:45','2022-12-12 22:57:27'),(36,1,'Su CAI ha sido rechazado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 07:59:15','2022-12-12 22:57:27'),(37,1,'Su CAI ha sido rechazado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 07:59:52','2022-12-12 22:57:27'),(38,1,'Su CAI ha sido rechazado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 08:00:32','2022-12-12 22:57:27'),(39,1,'Su CAI ha sido rechazado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 08:04:41','2022-12-12 22:57:27'),(40,1,'Su CAI ha sido rechazado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 08:06:47','2022-12-12 22:57:27'),(41,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 18:24:44','2022-12-12 22:57:27'),(42,1,'El usuario: CRISTIAN ANDRES ha registrado el cai.','2022-12-12 00:00:00',1,'2022-12-12 18:25:03','2022-12-12 22:57:27'),(45,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.',NULL,0,'2022-12-12 22:28:54','2022-12-12 22:28:54'),(46,1,'Su CAI ha sido rechazado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 22:31:30','2022-12-12 22:57:27'),(47,1,'Su CAI ha sido aprobado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 22:32:18','2022-12-12 22:57:27'),(49,1,'Su CAI ha sido aprobado por el director de departamento','2022-12-12 00:00:00',1,'2022-12-12 22:45:22','2022-12-12 22:57:27'),(51,1,'Su CAI ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-12 23:19:55','2022-12-12 23:19:55'),(52,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-12 23:19:55','2022-12-12 23:19:55'),(53,1,'Su CAI ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-12 23:22:28','2022-12-12 23:22:28'),(54,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-12 23:22:28','2022-12-12 23:22:28'),(55,1,'Su CAI ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-13 00:14:22','2022-12-13 00:14:22'),(56,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-13 00:14:22','2022-12-13 00:14:22'),(57,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 00:15:11','2022-12-13 00:15:11'),(58,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 00:15:11','2022-12-13 00:15:11'),(59,3,'El usuario: CRISTIAN ANDRES ha registrado el cai.',NULL,0,'2022-12-13 00:49:11','2022-12-13 00:49:11'),(60,3,'El usuario: CRISTIAN ANDRES ha registrado el CAI.',NULL,0,'2022-12-13 02:46:57','2022-12-13 02:46:57'),(62,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 02:49:01','2022-12-13 02:49:01'),(63,1,'Su CAI ha sido rechazado por el director de departamento',NULL,0,'2022-12-13 02:50:06','2022-12-13 02:50:06'),(64,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 02:53:47','2022-12-13 02:53:47'),(65,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 02:53:47','2022-12-13 02:53:47'),(66,3,'El usuario: CRISTIAN ANDRES ha registrado el CAI.',NULL,0,'2022-12-13 03:04:10','2022-12-13 03:04:10'),(67,1,'Su CAI ha sido rechazado por el director de departamento',NULL,0,'2022-12-13 03:04:43','2022-12-13 03:04:43'),(68,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:31:03','2022-12-13 03:31:03'),(69,1,'Su CAI ha sido rechazado por el director de departamento',NULL,0,'2022-12-13 03:33:31','2022-12-13 03:33:31'),(70,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:33:51','2022-12-13 03:33:51'),(71,1,'Su CAI ha sido rechazado por el director de departamento',NULL,0,'2022-12-13 03:36:04','2022-12-13 03:36:04'),(72,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:36:14','2022-12-13 03:36:14'),(73,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:37:08','2022-12-13 03:37:08'),(75,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 03:37:32','2022-12-13 03:37:32'),(76,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 03:37:32','2022-12-13 03:37:32'),(77,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:38:09','2022-12-13 03:38:09'),(78,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:38:17','2022-12-13 03:38:17'),(80,1,'Su CAI ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-13 03:38:29','2022-12-13 03:38:29'),(81,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-13 03:38:29','2022-12-13 03:38:29'),(82,3,'El usuario: CRISTIAN ANDRES ha registrado el CAI.',NULL,0,'2022-12-13 03:39:10','2022-12-13 03:39:10'),(83,1,'Su CAI ha sido rechazado por el director de departamento',NULL,0,'2022-12-13 03:39:26','2022-12-13 03:39:26'),(84,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:39:32','2022-12-13 03:39:32'),(85,1,'Su CAI ha sido rechazado por el director de departamento',NULL,0,'2022-12-13 03:39:42','2022-12-13 03:39:42'),(86,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:39:49','2022-12-13 03:39:49'),(87,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:39:59','2022-12-13 03:39:59'),(89,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 03:40:07','2022-12-13 03:40:07'),(90,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 03:40:08','2022-12-13 03:40:08'),(91,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:40:13','2022-12-13 03:40:13'),(92,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:40:20','2022-12-13 03:40:20'),(94,1,'Su CAI ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-13 03:40:28','2022-12-13 03:40:28'),(95,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-13 03:40:28','2022-12-13 03:40:28'),(96,3,'El usuario: CRISTIAN ANDRES ha registrado el CAI.',NULL,0,'2022-12-13 03:44:18','2022-12-13 03:44:18'),(97,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:44:35','2022-12-13 03:44:35'),(99,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 03:44:43','2022-12-13 03:44:43'),(100,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 03:44:43','2022-12-13 03:44:43'),(101,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:44:49','2022-12-13 03:44:49'),(102,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:44:54','2022-12-13 03:44:54'),(104,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 03:44:59','2022-12-13 03:44:59'),(105,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 03:44:59','2022-12-13 03:44:59'),(106,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:45:04','2022-12-13 03:45:04'),(107,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:45:22','2022-12-13 03:45:22'),(109,1,'Su CAI ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-13 03:45:26','2022-12-13 03:45:26'),(110,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido aprobado por el Decano de Facultad',NULL,0,'2022-12-13 03:45:26','2022-12-13 03:45:26'),(111,3,'El usuario: CRISTIAN ANDRES ha registrado el CAI.',NULL,0,'2022-12-13 03:48:27','2022-12-13 03:48:27'),(112,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:48:51','2022-12-13 03:48:51'),(114,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 03:49:00','2022-12-13 03:49:00'),(115,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 03:49:00','2022-12-13 03:49:00'),(116,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:49:12','2022-12-13 03:49:12'),(117,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:49:19','2022-12-13 03:49:19'),(119,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 03:50:43','2022-12-13 03:50:43'),(120,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 03:50:43','2022-12-13 03:50:43'),(121,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:50:49','2022-12-13 03:50:49'),(122,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:50:53','2022-12-13 03:50:53'),(124,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 03:51:54','2022-12-13 03:51:54'),(125,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 03:51:54','2022-12-13 03:51:54'),(126,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:52:04','2022-12-13 03:52:04'),(127,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:52:08','2022-12-13 03:52:08'),(129,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 03:53:53','2022-12-13 03:53:53'),(130,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 03:53:53','2022-12-13 03:53:53'),(131,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:53:58','2022-12-13 03:53:58'),(132,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:54:03','2022-12-13 03:54:03'),(134,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 03:57:49','2022-12-13 03:57:49'),(135,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 03:57:49','2022-12-13 03:57:49'),(136,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 03:58:15','2022-12-13 03:58:15'),(137,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 03:58:36','2022-12-13 03:58:36'),(139,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 04:00:42','2022-12-13 04:00:42'),(140,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 04:00:42','2022-12-13 04:00:42'),(141,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 04:00:47','2022-12-13 04:00:47'),(142,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 04:00:54','2022-12-13 04:00:54'),(144,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 04:02:13','2022-12-13 04:02:13'),(145,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 04:02:13','2022-12-13 04:02:13'),(146,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 04:02:20','2022-12-13 04:02:20'),(147,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 04:02:23','2022-12-13 04:02:23'),(149,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 04:13:54','2022-12-13 04:13:54'),(150,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 04:13:54','2022-12-13 04:13:54'),(151,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 04:14:00','2022-12-13 04:14:00'),(152,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 04:14:19','2022-12-13 04:14:19'),(154,1,'Su CAI ha sido rechazado por el Decano de la Facultad',NULL,0,'2022-12-13 04:18:01','2022-12-13 04:18:01'),(155,3,'CAI del docente CRISTIAN ANDRES DUARTE MALDONADO ha sido rechazado por el Decano de Facultad',NULL,0,'2022-12-13 04:18:01','2022-12-13 04:18:01'),(156,3,'El usuario: CRISTIAN ANDRES ha actualizao el CAI.',NULL,0,'2022-12-13 04:18:13','2022-12-13 04:18:13'),(157,1,'Su CAI ha sido aprobado por el director de departamento',NULL,0,'2022-12-13 04:18:17','2022-12-13 04:18:17');
/*!40000 ALTER TABLE `notificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `periodo`
--

LOCK TABLES `periodo` WRITE;
/*!40000 ALTER TABLE `periodo` DISABLE KEYS */;
INSERT INTO `periodo` VALUES (1,2020,1,'2020-01-01 00:00:00','2020-01-15 00:00:00',4,1,'2022-12-09 02:18:18',NULL),(2,2020,2,'2020-07-01 00:00:00','2020-07-10 00:00:00',4,1,'2022-12-09 02:14:57','2022-12-09 02:14:57'),(3,2021,1,'2021-01-08 00:00:00','2021-01-15 00:00:00',4,1,'2022-12-09 02:17:48','2022-12-09 02:17:48'),(4,2021,2,'2021-07-08 00:00:00','2021-07-15 00:00:00',4,1,'2022-12-09 02:17:58','2022-12-09 02:17:58'),(5,2022,1,'2022-01-01 00:00:00','2021-01-15 00:00:00',4,1,'2022-12-09 02:18:18','2022-12-09 02:18:18'),(6,2022,2,'2022-12-11 00:00:00','2022-12-20 00:00:00',4,1,'2022-12-12 00:11:02','2022-12-12 00:11:02'),(7,2022,2,'2022-12-11 00:00:00','2022-12-15 00:00:00',2,1,'2022-12-11 19:48:11','2022-12-11 19:48:11');
/*!40000 ALTER TABLE `periodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `periodo_docente`
--

LOCK TABLES `periodo_docente` WRITE;
/*!40000 ALTER TABLE `periodo_docente` DISABLE KEYS */;
INSERT INTO `periodo_docente` VALUES (1,6,1,1,'2022-12-21 00:00:00',NULL,0,0,0,0,0,0,0,NULL,1,NULL,NULL),(2,5,3,1,'2022-12-11 00:00:00',NULL,0,0,0,0,0,0,0,NULL,1,NULL,NULL),(3,4,1,2,'2022-08-11 00:00:00',NULL,0,0,0,0,0,0,0,NULL,1,NULL,NULL),(4,3,3,1,'2022-10-11 00:00:00',NULL,0,0,0,0,0,0,0,NULL,1,NULL,NULL),(5,3,1,2,'2022-10-11 00:00:00',NULL,0,0,0,0,0,0,0,NULL,1,NULL,NULL),(157,7,1,2,'2022-12-12 00:00:00','tc',30.5,2.5,0,0.5,3,0.5,37,'',1,'2022-12-13 04:18:10','2022-12-13 04:18:17');
/*!40000 ALTER TABLE `periodo_docente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `periodo_docente_actividad_administracion`
--

LOCK TABLES `periodo_docente_actividad_administracion` WRITE;
/*!40000 ALTER TABLE `periodo_docente_actividad_administracion` DISABLE KEYS */;
INSERT INTO `periodo_docente_actividad_administracion` VALUES (101,1,157,0.5,'2022-12-13 04:18:11','2022-12-13 04:18:11','DESEMPEÑO DE CARGO ADMINISTRATIVO');
/*!40000 ALTER TABLE `periodo_docente_actividad_administracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `periodo_docente_actividad_extension`
--

LOCK TABLES `periodo_docente_actividad_extension` WRITE;
/*!40000 ALTER TABLE `periodo_docente_actividad_extension` DISABLE KEYS */;
/*!40000 ALTER TABLE `periodo_docente_actividad_extension` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `periodo_docente_actividad_investigacion`
--

LOCK TABLES `periodo_docente_actividad_investigacion` WRITE;
/*!40000 ALTER TABLE `periodo_docente_actividad_investigacion` DISABLE KEYS */;
INSERT INTO `periodo_docente_actividad_investigacion` VALUES (1,157,0,'2022-12-13 04:18:11','2022-12-13 04:18:11'),(2,157,0,'2022-12-13 04:18:11','2022-12-13 04:18:11'),(3,157,0,'2022-12-13 04:18:11','2022-12-13 04:18:11'),(4,157,1,'2022-12-13 04:18:11','2022-12-13 04:18:11'),(5,157,1,'2022-12-13 04:18:11','2022-12-13 04:18:11'),(6,157,0.5,'2022-12-13 04:18:11','2022-12-13 04:18:11'),(7,157,0,'2022-12-13 04:18:11','2022-12-13 04:18:11');
/*!40000 ALTER TABLE `periodo_docente_actividad_investigacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `periodo_docente_asignatura`
--

LOCK TABLES `periodo_docente_asignatura` WRITE;
/*!40000 ALTER TABLE `periodo_docente_asignatura` DISABLE KEYS */;
INSERT INTO `periodo_docente_asignatura` VALUES (3,157,'2022-12-13 04:18:10','2022-12-13 04:18:10'),(6,157,'2022-12-13 04:18:11','2022-12-13 04:18:11'),(7,157,'2022-12-13 04:18:10','2022-12-13 04:18:10');
/*!40000 ALTER TABLE `periodo_docente_asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `periodo_docente_firma`
--

LOCK TABLES `periodo_docente_firma` WRITE;
/*!40000 ALTER TABLE `periodo_docente_firma` DISABLE KEYS */;
INSERT INTO `periodo_docente_firma` VALUES (75,157,16,'2022-12-13 03:48:27','2022-12-13 04:18:12'),(76,157,17,'2022-12-13 03:48:51','2022-12-13 04:18:12'),(77,157,16,'2022-12-13 03:49:12','2022-12-13 04:18:12'),(78,157,16,'2022-12-13 03:50:49','2022-12-13 04:18:13'),(79,157,16,'2022-12-13 03:52:04','2022-12-13 04:18:13'),(80,157,16,'2022-12-13 03:53:58','2022-12-13 04:18:13'),(81,157,16,'2022-12-13 03:58:14','2022-12-13 04:18:13'),(82,157,17,'2022-12-13 03:58:36','2022-12-13 04:18:13'),(83,157,16,'2022-12-13 04:00:46','2022-12-13 04:18:13'),(84,157,16,'2022-12-13 04:02:18','2022-12-13 04:18:13'),(85,157,16,'2022-12-13 04:13:59','2022-12-13 04:18:13'),(86,157,16,'2022-12-13 04:18:11','2022-12-13 04:18:11');
/*!40000 ALTER TABLE `periodo_docente_firma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `periodo_docente_otra`
--

LOCK TABLES `periodo_docente_otra` WRITE;
/*!40000 ALTER TABLE `periodo_docente_otra` DISABLE KEYS */;
INSERT INTO `periodo_docente_otra` VALUES (157,1,157,0.5,NULL,'2022-12-13 04:18:11','2022-12-13 04:18:11');
/*!40000 ALTER TABLE `periodo_docente_otra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `periodo_docente_representacion`
--

LOCK TABLES `periodo_docente_representacion` WRITE;
/*!40000 ALTER TABLE `periodo_docente_representacion` DISABLE KEYS */;
INSERT INTO `periodo_docente_representacion` VALUES (393,157,1,2,NULL,'2022-12-13 04:18:11','2022-12-13 04:18:11'),(394,157,5,1,'comite curricular del programa','2022-12-13 04:18:11','2022-12-13 04:18:11');
/*!40000 ALTER TABLE `periodo_docente_representacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `plan_estudio`
--

LOCK TABLES `plan_estudio` WRITE;
/*!40000 ALTER TABLE `plan_estudio` DISABLE KEYS */;
INSERT INTO `plan_estudio` VALUES (9,'INGENIERIA CIVIL',7,'2022-12-08 05:37:34','2022-12-08 05:37:34',1),(10,'INGENIERIA ELECTRONICA',7,'2022-12-08 05:37:34','2022-12-08 05:37:34',1),(11,'INGENIERIA ELECTROMECANICA',7,'2022-12-08 05:37:34','2022-12-08 05:37:34',1),(12,'INGENIERIA INDUSTRIAL',7,'2022-12-08 05:37:34','2022-12-08 05:37:34',1),(13,'INGENIERIA MINAS',7,'2022-12-08 05:37:34','2022-12-08 05:37:34',1),(14,'INGENIERIA DE SISTEMAS',7,'2022-12-08 05:46:59','2022-12-08 05:46:59',1),(15,'FACILITO',5,'2022-12-08 06:09:11','2022-12-08 06:10:39',0);
/*!40000 ALTER TABLE `plan_estudio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `retroalimentacion`
--

LOCK TABLES `retroalimentacion` WRITE;
/*!40000 ALTER TABLE `retroalimentacion` DISABLE KEYS */;
INSERT INTO `retroalimentacion` VALUES (17,NULL,157,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-13 03:49:00','2022-12-13 04:18:11','DECANO DE FACULTAD'),(18,NULL,157,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-13 03:50:43','2022-12-13 04:18:12','DECANO DE FACULTAD'),(19,NULL,157,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-13 03:51:54','2022-12-13 04:18:12','DECANO DE FACULTAD'),(20,NULL,157,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-13 03:53:53','2022-12-13 04:18:12','DECANO DE FACULTAD'),(21,NULL,157,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-13 03:57:49','2022-12-13 04:18:12','DECANO DE FACULTAD'),(22,NULL,157,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-13 04:00:42','2022-12-13 04:18:12','DECANO DE FACULTAD'),(23,NULL,157,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-13 04:02:13','2022-12-13 04:18:12','DECANO DE FACULTAD'),(24,NULL,157,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-13 04:13:54','2022-12-13 04:18:12','DECANO DE FACULTAD'),(25,NULL,157,'podrias anexar otra materia para completar las horas que te faltan','','Es necesario que se encuentre en un proyecto de extension dadad si situacion',NULL,'','','2022-12-13 04:18:01','2022-12-13 04:18:12','DECANO DE FACULTAD');
/*!40000 ALTER TABLE `retroalimentacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMIN','Es el encargado de administrar la aplicacion.',NULL,NULL),(2,'DECANO','Es el encargado de una facultad, es el ultimo usuario que aprueba o rechaza el cai de un docente.',NULL,NULL),(3,'DIRECTOR','Es el encagado de un departamento es el primer usuario que aprueba o rechaza el cai de un docente.',NULL,NULL),(4,'DOCENTE','Es el usuario que diligencia el cai',NULL,NULL);
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seccion`
--

LOCK TABLES `seccion` WRITE;
/*!40000 ALTER TABLE `seccion` DISABLE KEYS */;
INSERT INTO `seccion` VALUES (1,'AVTIVIDADES DE DOCENCIA'),(2,'ACTIVIDADES DE INVESTIGACION'),(3,'ACTIVIDADES DE EXTENSION'),(4,'ADMINISTRACION'),(5,'REPRESENTACIONES'),(6,'OTRAS ACTIVIDADES');
/*!40000 ALTER TABLE `seccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tipo_representacion`
--

LOCK TABLES `tipo_representacion` WRITE;
/*!40000 ALTER TABLE `tipo_representacion` DISABLE KEYS */;
INSERT INTO `tipo_representacion` VALUES (1,'CONSEJOS','Superior, Académico, Facultad, Departamento (2H por semana)',0,1,'2022-12-10 05:08:53','2022-12-10 05:21:09'),(2,'COMITES','Central de Autoevaluación y Planeación Institucional, Evaluación Docente, Admisiones, Bienestar Universitario, Administrativo, Coordinación Académica, Asesor de Biblioteca, Curricular Central, Curriculares de Planes de Estudio, Asignación de puntaje, Central de Investigación y Extensión, Fondo Rotatorio de Investigación y Extensión (1 hora por semana)',0,1,'2022-12-10 05:10:31','2022-12-10 05:10:31'),(3,'COMITES DE INVESTIGACIÓN Y EXTENSIÓN','Trabajos de Grado e Investigación y Extensión de las facultades (0.5 H por semana)',0,1,'2022-12-10 05:11:31','2022-12-10 05:11:31'),(4,'REUNIÓN DE PROFESORES','(0.5 H)',0,1,'2022-12-10 05:11:53','2022-12-10 05:11:53'),(5,'OTROS COMITÉS Y REPRESENTACIONES','(0.5 a 1.0 H por semana) (describir)',1,1,'2022-12-10 05:12:20','2022-12-10 05:12:20');
/*!40000 ALTER TABLE `tipo_representacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'cristianandresdm@ufps.edu.co','CRISTIAN ANDRES','DUARTE MALDONADO',NULL,NULL,1,2,16,1,'2022-11-22 20:42:04','2022-12-11 16:40:01'),(2,'karenbrigidbv@ufps.edu.co','KAREN','BELTRAN VERA',NULL,NULL,1,7,18,1,'2022-12-08 21:26:15','2022-12-12 05:47:13'),(3,'crduarte99@gmail.com','Cristian Andres','Duarte Maldonado','1151342','1122334455',1,2,17,1,'2022-12-08 21:37:30','2022-12-11 16:51:35'),(6,'1@6.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(7,'1@7.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(8,'1@8.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(9,'1@9.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(10,'1@10.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(11,'1@11.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(12,'1@12.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(13,'1@13.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(14,'1@14.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(15,'1@15.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(16,'1@16.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(17,'1@17.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(18,'1@18.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(19,'1@19.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(20,'1@20.co',NULL,NULL,NULL,NULL,1,4,NULL,1,NULL,NULL),(21,'1@21.co',NULL,NULL,NULL,NULL,1,4,NULL,1,NULL,NULL),(22,'1@22.co',NULL,NULL,NULL,NULL,1,4,NULL,1,NULL,NULL),(23,'1@23.co',NULL,NULL,NULL,NULL,1,2,NULL,1,NULL,NULL),(24,'1@24.co',NULL,NULL,NULL,NULL,1,2,NULL,1,NULL,NULL),(25,'1@25.co',NULL,NULL,NULL,NULL,1,2,NULL,1,NULL,NULL),(26,'1@26.co',NULL,NULL,NULL,NULL,1,2,NULL,1,NULL,NULL),(27,'1@27.co',NULL,NULL,NULL,NULL,1,2,NULL,1,NULL,NULL),(28,'1@28.co',NULL,NULL,NULL,NULL,1,4,NULL,1,NULL,NULL),(29,'1@29.co',NULL,NULL,NULL,NULL,1,4,NULL,1,NULL,NULL),(30,'1@30.co',NULL,NULL,NULL,NULL,1,4,NULL,1,NULL,NULL),(31,'1@31.co',NULL,NULL,NULL,NULL,1,4,NULL,1,NULL,NULL),(55,'1@1.co',NULL,NULL,NULL,NULL,1,NULL,NULL,0,NULL,'2022-11-21 03:15:50'),(56,'99@gmail.com',NULL,NULL,'1151342','1122334455',1,NULL,NULL,1,NULL,'2022-11-21 03:18:29'),(57,'3@3.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(58,'4@4.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(60,'1@5.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,NULL),(63,'maceluswalas0697@ufps.edu.co',NULL,NULL,NULL,NULL,1,NULL,NULL,1,'2022-12-13 05:56:34','2022-12-13 05:56:34');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuario_rol`
--

LOCK TABLES `usuario_rol` WRITE;
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
INSERT INTO `usuario_rol` VALUES (1,1,NULL,NULL),(2,1,NULL,NULL),(2,2,'2022-12-08 22:34:41','2022-12-08 22:34:41'),(2,3,'2022-12-09 04:40:50','2022-12-09 04:40:50'),(3,3,NULL,NULL),(63,3,'2022-12-13 05:56:35','2022-12-13 05:56:35'),(1,4,NULL,NULL),(2,4,'2022-12-08 21:26:15','2022-12-08 21:26:15'),(3,4,'2022-12-08 21:37:30','2022-12-08 21:37:30'),(63,4,'2022-12-13 05:56:35','2022-12-13 05:56:35');
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

-- Dump completed on 2022-12-13  1:26:56
