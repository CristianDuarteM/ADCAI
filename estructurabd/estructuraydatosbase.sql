-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: esquemabase
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
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
  KEY `id_facultad_idx` (`id_facultad`),
  CONSTRAINT `fad` FOREIGN KEY (`id_facultad`) REFERENCES `facultad` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
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
INSERT INTO `estado` VALUES (1,'DILIGENCIADO','El docente ha diligenciado el cai pero aun no ha sido evaluado por el director de departamento','2022-12-06 15:56:34','2022-12-06 15:56:34'),(2,'APROBADO DIRECTOR','El cai ha sido evaluado por el director de departamento y lo ha aprobado','2022-12-06 15:57:07','2022-12-06 15:57:07'),(3,'APROBADO DECANO','El cai ha sido evaluado por el decano de facultad y lo ha aprobado','2022-12-06 15:57:24','2022-12-06 15:57:24'),(4,'RECHAZADO DECANO','El cai ha sido evaluado por el decano de facultad y lo ha rechazado, el docente debe hacerle correcciones','2022-12-06 15:58:46','2022-12-06 15:58:46'),(5,'RECHAZADO DIRECTOR','El cai ha sido evaluado por el director de departamento y lo ha rechazado, el docente debe hacerle correcciones','2022-12-06 15:59:10','2022-12-06 16:02:41'),(6,'SINFIRMADOCENTE','El docente ha diligenciado el cai pero no lo ha firmado',NULL,NULL),(7,'SINFIRMADIRECTOR','El director ha aprobado el cai pero le falta cargar el documento del cai firmado por el',NULL,NULL),(8,'SINFIRMADECANO','El decano ha aprobado el cai pero le falta cargar el documento del cai firmado por el',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evidencia`
--

LOCK TABLES `evidencia` WRITE;
/*!40000 ALTER TABLE `evidencia` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultad`
--

LOCK TABLES `facultad` WRITE;
/*!40000 ALTER TABLE `facultad` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=515 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo`
--

LOCK TABLES `periodo` WRITE;
/*!40000 ALTER TABLE `periodo` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente`
--

LOCK TABLES `periodo_docente` WRITE;
/*!40000 ALTER TABLE `periodo_docente` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_actividad_administracion`
--

LOCK TABLES `periodo_docente_actividad_administracion` WRITE;
/*!40000 ALTER TABLE `periodo_docente_actividad_administracion` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_actividad_extension`
--

LOCK TABLES `periodo_docente_actividad_extension` WRITE;
/*!40000 ALTER TABLE `periodo_docente_actividad_extension` DISABLE KEYS */;
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
/*!40000 ALTER TABLE `periodo_docente_asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo_docente_firma`
--

DROP TABLE IF EXISTS `periodo_docente_firma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo_docente_firma` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_periodo_docente` int NOT NULL,
  `id_firma` int NOT NULL,
  `rol` varchar(45) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `firma_idx` (`id_firma`),
  KEY `cai_idx` (`id_periodo_docente`),
  CONSTRAINT `c` FOREIGN KEY (`id_periodo_docente`) REFERENCES `periodo_docente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `f` FOREIGN KEY (`id_firma`) REFERENCES `firma` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_firma`
--

LOCK TABLES `periodo_docente_firma` WRITE;
/*!40000 ALTER TABLE `periodo_docente_firma` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=314 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_otra`
--

LOCK TABLES `periodo_docente_otra` WRITE;
/*!40000 ALTER TABLE `periodo_docente_otra` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=772 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo_docente_representacion`
--

LOCK TABLES `periodo_docente_representacion` WRITE;
/*!40000 ALTER TABLE `periodo_docente_representacion` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_estudio`
--

LOCK TABLES `plan_estudio` WRITE;
/*!40000 ALTER TABLE `plan_estudio` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retroalimentacion`
--

LOCK TABLES `retroalimentacion` WRITE;
/*!40000 ALTER TABLE `retroalimentacion` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `correo` varchar(50) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'ufpsadcai@gmail.com','ADMIN',NULL,NULL,0,NULL,NULL,1,NULL,NULL);
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
INSERT INTO `usuario_rol` VALUES (1,1,NULL,NULL);
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

-- Dump completed on 2023-02-01 22:50:05
