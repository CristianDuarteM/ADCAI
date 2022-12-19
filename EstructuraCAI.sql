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
) ENGINE=InnoDB AUTO_INCREMENT=461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=298 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=732 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-18  2:57:36
