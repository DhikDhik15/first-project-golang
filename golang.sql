-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_golang
CREATE DATABASE IF NOT EXISTS `db_golang` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_golang`;

-- Dumping structure for table db_golang.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` longtext,
  `price` bigint DEFAULT NULL,
  `stock` bigint DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `description` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumping data for table db_golang.products: ~5 rows (approximately)
INSERT INTO `products` (`id`, `name`, `price`, `stock`, `created_at`, `updated_at`, `description`) VALUES
	(2, 'PS 5 FAT', 65000, 8, '2026-01-08 13:22:23.221', '2026-01-19 11:26:05.203', 'Barang baru'),
	(4, 'Product PS 5 Slim', 25000, 9, '2026-01-12 14:19:19.500', '2026-01-13 16:33:46.160', 'Peminjaman PS 5 Slim'),
	(5, 'PS VITA S', 35700, 10, '2026-01-14 11:25:04.894', '2026-01-19 14:43:52.408', 'Barang baru'),
	(6, 'PSP FAT', 150000, 8, '2026-01-19 11:31:15.578', '2026-01-19 11:31:58.970', 'psp fat 32 GB'),
	(7, 'XBOX - Pro', 300000, 5, '2026-01-19 14:43:31.613', '2026-01-19 14:43:31.613', 'xbox 1TB'),
	(8, 'XBOX - Slim', 45000, 5, '2026-01-19 14:44:21.156', '2026-01-19 14:44:21.156', 'xbox slim 500GB');

-- Dumping structure for table db_golang.transactions
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `quantity` bigint DEFAULT NULL,
  `total` bigint DEFAULT NULL,
  `status` longtext,
  `start_date` datetime(3) DEFAULT NULL,
  `end_date` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `is_return` tinyint(1) NOT NULL,
  `is_late` tinyint(1) NOT NULL,
  `return_date` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transactions_user` (`user_id`),
  KEY `fk_transactions_product` (`product_id`),
  CONSTRAINT `fk_transactions_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `fk_transactions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

-- Dumping data for table db_golang.transactions: ~11 rows (approximately)
INSERT INTO `transactions` (`id`, `user_id`, `product_id`, `quantity`, `total`, `status`, `start_date`, `end_date`, `created_at`, `updated_at`, `price`, `is_return`, `is_late`, `return_date`) VALUES
	(2, 12, 2, 2, 100000, 'paid', '2026-01-10 07:00:00.000', '2026-02-10 07:00:00.000', '2026-01-09 10:25:17.163', '2026-01-09 10:25:17.163', 50000, 0, 0, NULL),
	(3, 12, 2, 2, 100000, 'paid', '2026-01-10 07:00:00.000', '2026-02-10 07:00:00.000', '2026-01-09 10:26:23.637', '2026-01-09 10:26:23.637', 50000, 0, 0, NULL),
	(4, 12, 2, 2, 100000, 'paid', '2026-01-10 07:00:00.000', '2026-02-10 07:00:00.000', '2026-01-09 10:30:02.375', '2026-01-09 10:30:02.375', 50000, 0, 0, NULL),
	(5, 12, 2, 2, 100000, 'cancel', '2026-01-10 07:00:00.000', '2026-02-10 07:00:00.000', '2026-01-12 14:31:27.939', '2026-01-14 10:49:29.673', 50000, 0, 0, NULL),
	(6, 12, 4, 1, 2500000, 'cancel', '2026-01-12 07:00:00.000', '2026-01-16 07:00:00.000', '2026-01-12 14:39:29.358', '2026-01-14 10:45:34.660', 2500000, 0, 0, NULL),
	(7, 12, 4, 3, 7500000, 'cancel', '2026-01-12 07:00:00.000', '2026-01-15 07:00:00.000', '2026-01-12 14:40:43.106', '2026-01-14 10:45:38.505', 2500000, 0, 0, NULL),
	(8, 12, 4, 2, 5000000, 'paid', '2026-01-13 07:00:00.000', '2026-01-16 07:00:00.000', '2026-01-12 14:42:08.606', '2026-01-14 10:55:28.371', 2500000, 0, 0, '2026-01-16 07:00:00.000'),
	(9, 11, 4, 1, 2500000, 'paid', '2026-01-12 07:00:00.000', '2026-01-22 07:00:00.000', '2026-01-12 14:43:04.412', '2026-01-13 16:21:38.347', 2500000, 0, 0, '2026-01-22 07:00:00.000'),
	(10, 11, 4, 2, 50000, 'cancel', '2026-01-12 07:00:00.000', '2026-01-15 07:00:00.000', '2026-01-12 15:19:56.915', '2026-01-19 11:28:36.659', 25000, 0, 0, '2026-01-15 07:00:00.000'),
	(11, 12, 2, 2, 100000, 'paid', '2026-01-10 07:00:00.000', '2026-02-10 07:00:00.000', '2026-01-12 15:22:46.957', '2026-01-15 16:32:17.145', 50000, 0, 0, '2026-01-13 15:03:19.000'),
	(14, 2, 4, 1, 25000, 'cancel', '2026-01-12 07:00:00.000', '2026-01-19 07:00:00.000', '2026-01-12 16:10:06.437', '2026-01-14 10:28:03.111', 25000, 1, 0, '2026-01-13 15:40:00.000'),
	(15, 37, 4, 1, 25000, 'cancel', '2026-01-13 07:00:00.000', '2026-01-15 07:00:00.000', '2026-01-13 16:33:46.147', '2026-01-14 10:26:44.985', 25000, 0, 0, '2026-01-15 07:00:00.000'),
	(16, 37, 5, 1, 150000, 'cancel', '2026-01-15 07:00:00.000', '2026-01-16 07:00:00.000', '2026-01-15 08:29:11.543', '2026-01-15 16:32:21.365', 150000, 0, 0, NULL),
	(17, 12, 2, 2, 100000, 'pending', '2026-01-10 07:00:00.000', '2026-02-10 07:00:00.000', '2026-01-19 11:26:05.166', '2026-01-19 11:26:05.166', 50000, 0, 0, NULL),
	(18, 43, 6, 2, 300000, 'pending', '2026-01-19 07:00:00.000', '2026-01-21 07:00:00.000', '2026-01-19 11:31:58.969', '2026-01-19 11:31:58.969', 150000, 0, 0, NULL);

-- Dumping structure for table db_golang.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` longtext,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` longtext,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `role` varchar(191) DEFAULT 'user',
  `address` longtext,
  `phone` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_users_username` (`username`),
  UNIQUE KEY `uni_users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

-- Dumping data for table db_golang.users: ~11 rows (approximately)
INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `created_at`, `updated_at`, `role`, `address`, `phone`) VALUES
	(2, 'Fika Ridaul Maulayya', 'maulayyacyber_crime', 'fika@santrikoding.com', '$2a$10$c1AFY2KhxDLDkcF9D0rKL.UwGipnRI4KNAlarZPpdTBLGtuUgaN2e', '2026-01-07 15:03:20.674', '2026-01-07 16:55:36.292', 'user', 'bandung', NULL),
	(11, 'Fika Ridaul Maulayya .S.', 'maulayyacyber', 'fika@santrikodings.com', '$2a$10$narHKGo3.UqQd2vTUdOHxu1.pBLhl0bP5XiUSWFj5GPh/uR8YLnsu', '2026-01-08 08:41:33.380', '2026-01-08 08:43:04.799', 'user', NULL, NULL),
	(12, 'Fika Ridaul Maulayya - Edit', 'maulayyacyber - edit', 'fika@santrikoding_edit.com', '$2a$10$4VtpCZgsY4NnP4GS5YXw0egPmuCZ7iLAFDP1gsSL39HY3GNTn88A.', '2026-01-08 08:55:34.684', '2026-01-19 11:06:21.694', 'admin', '', ''),
	(13, 'Dhika', 'user2', 'user1@mail.com', '$2a$10$U.dpKlbC7x7gt//ovoyPBeFs5CiFJo3cWjaa6zskzjkBylfFQOtoO', '2026-01-13 09:35:38.241', '2026-01-13 09:35:38.241', 'user', NULL, NULL),
	(18, 'Dhika', 'user21', 'user2@mail.com', '$2a$10$pAv/IuRMXjU1yab2m6/QTubhvxYZQOuI/vwUa3/ihmAZeTeQO1.O6', '2026-01-13 09:48:47.311', '2026-01-13 09:48:47.311', 'user', NULL, NULL),
	(22, 'Dhika', 'user22', 'user22@mail.com', '$2a$10$vm9dRdrAI7xEf5vd9ilXTupzZaDAuJEw9W2kPt4opd.Dh2stgHnXW', '2026-01-13 09:49:35.604', '2026-01-13 09:49:35.604', 'user', NULL, NULL),
	(37, 'Dhika.p', 'user001', 'user001@mailto.com', '$2a$10$dWeceRg68vsmhtLOtawbMe4vabNbu25gtuow8X3Ks4AnyPzOWesTe', '2026-01-13 10:01:51.753', '2026-01-13 10:01:51.753', 'user', NULL, NULL),
	(38, 'username 4', 'user 4', 'user4@mail.com', '$2a$10$hQw98qe4GI0AONMjkRnrQ.jEVC6ml4Q8JRwFCqBc3HrchNrTIvVqy', '2026-01-13 10:23:33.474', '2026-01-13 10:23:33.474', 'user', NULL, NULL),
	(39, 'Dhika.p.s', 'user002', 'user002@mailto.com', '$2a$10$hiqL.R.mmiwCP4xJh/vb6u2FbPojD4Z5PqgY6ZfYsCZqAikBiHDyS', '2026-01-13 10:54:34.011', '2026-01-13 10:54:34.011', 'user', 'jakarta', '08180923394859'),
	(40, 'Dhika.p.s.i', 'user003', 'user003@mailto.com', '$2a$10$x0BAkc8vQZWecvvbh7js8.RYd6xbWpVA2q61XrM89uo2tYtxLfM3W', '2026-01-13 11:05:27.249', '2026-01-13 11:05:27.249', 'user', 'jakarta', '08180923394859'),
	(42, 'putra adhika', 'dhika', 'dhika@mail.com', '$2a$10$/Mxm4jNyNB5/ejLtt539kuCDJ8/X1PyMfnxb5ytW7Nq2XVh4EEjVe', '2026-01-13 11:06:37.394', '2026-01-13 11:06:37.394', 'user', 'semarang', '081809255007'),
	(43, 'customer2', 'customer2', 'customer@mailto.com', '$2a$10$l3kL7fqthCNAAX9LZhWgK.lAsE1svQMkc9H1GCbmNuGmEbwlgsEj2', '2026-01-19 11:01:48.461', '2026-01-19 11:01:48.461', 'user', 'jakarta', '08180923394859');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
