-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.1.0-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for project
CREATE DATABASE IF NOT EXISTS `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `project`;

-- Dumping structure for table project.detail_tb
CREATE TABLE IF NOT EXISTS `detail_tb` (
  `detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `detail_date` varchar(100) NOT NULL,
  `detail_list` longtext NOT NULL,
  `detail_owner` varchar(100) NOT NULL,
  `detail_status` int(11) NOT NULL DEFAULT 0,
  `detail_success` longtext DEFAULT NULL,
  PRIMARY KEY (`detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table project.detail_tb: ~3 rows (approximately)
INSERT INTO `detail_tb` (`detail_id`, `detail_date`, `detail_list`, `detail_owner`, `detail_status`, `detail_success`) VALUES
	(1, '2024-03-11 17:10:44.922', 'sadasddsadasads', 'koonjarn', 0, ''),
	(2, '2024-03-13 20:56:00.969', 'ทำเว็บไซต์งานแรก', 'koonjarn', 1, 'เสร็จแล้วsadasdsafadsdsf;lksd;lfkjsd;lfkl;sdfkl;sdkfl;sdfkl;sdkfl;sdkfl;sdfkl;sdfksdl;fkls;dfkl;dskfl;sdkfl;sd'),
	(3, '2024-03-13 20:16:04.098', 'asdasdasddas', 'Test', 0, NULL);

-- Dumping structure for table project.users_tb
CREATE TABLE IF NOT EXISTS `users_tb` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_roles` tinyint(1) NOT NULL DEFAULT 0,
  `user_password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table project.users_tb: ~2 rows (approximately)
INSERT INTO `users_tb` (`user_id`, `user_name`, `user_roles`, `user_password`) VALUES
	(1, 'louis', 1, 'e10adc3949ba59abbe56e057f20f883e'),
	(3, 'Test', 0, 'e10adc3949ba59abbe56e057f20f883e');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
