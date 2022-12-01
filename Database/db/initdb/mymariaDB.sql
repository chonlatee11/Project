-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 28, 2022 at 03:55 PM
-- Server version: 10.9.3-MariaDB-1:10.9.3+maria~ubu2204
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mymariaDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--
-- Error reading structure for table mymariaDB.Admin: #1932 - Table 'mymariadb.admin' doesn't exist in engine
-- Error reading data for table mymariaDB.Admin: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `mymariaDB`.`Admin`' at line 1

-- --------------------------------------------------------

--
-- Table structure for table `example`
--

CREATE TABLE `example` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `example`
--

INSERT INTO `example` (`id`, `name`) VALUES
(1, 'Hey CodeMobiles'),
(2, 'Hey CodeMobiles'),
(3, 'Hey chonlatee');

-- --------------------------------------------------------

--
-- Table structure for table `Researcher`
--
-- Error reading structure for table mymariaDB.Researcher: #1932 - Table 'mymariadb.researcher' doesn't exist in engine
-- Error reading data for table mymariaDB.Researcher: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `mymariaDB`.`Researcher`' at line 1

-- --------------------------------------------------------

--
-- Table structure for table `User`
--
-- Error reading structure for table mymariaDB.User: #1932 - Table 'mymariadb.user' doesn't exist in engine
-- Error reading data for table mymariaDB.User: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `mymariaDB`.`User`' at line 1

--
-- Indexes for dumped tables
--

--
-- Indexes for table `example`
--
ALTER TABLE `example`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `example`
--
ALTER TABLE `example`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
