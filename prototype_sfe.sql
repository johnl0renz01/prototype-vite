-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2023 at 12:15 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prototype_sfe`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `AccountID` int(11) NOT NULL,
  `GivenName` varchar(255) NOT NULL,
  `MiddleName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Birthdate` varchar(255) NOT NULL,
  `Age` int(11) NOT NULL,
  `Gender` varchar(25) NOT NULL,
  `GradeLevel` varchar(255) NOT NULL,
  `Section` varchar(255) NOT NULL,
  `GroupType` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`AccountID`, `GivenName`, `MiddleName`, `LastName`, `Birthdate`, `Age`, `Gender`, `GradeLevel`, `Section`, `GroupType`, `Email`, `Password`, `Role`) VALUES
(4, 'John Lorenz', 'Naga', 'Dela Cruz', '2010-06-09', 12, 'Male', 'Grade 7', 'Aguinaldo', 'Facial Group', 'delacruz.johnlorenz@sf.edu.ph', '123456', 'Student'),
(10, 'Danica', 'Sevilla', 'Mendoza', '2010-10-07', 12, 'Female', 'Grade 7', 'Bonifacio', 'Facial Group', 'mendoza.danica@sf.edu.ph', '123456', 'Student'),
(46, 'John', 'Moe', 'Doe', '2010-02-12', 13, 'Male', 'Grade 7', 'Aguinaldo', 'Facial Group', 'doe.john@sf.edu.ph', '$2y$10$agQXvAiDKUZzH8HqU0S6w.yK7rwxVjSu43/Lnt21FtwhSxNGg5eHK', 'Student'),
(47, 'Suriad', '', 'Dimagiba', '2009-03-31', 14, 'Male', 'Grade 7', 'Bonifacio', 'Facial Group', 'dimagiba.suriad@sf.edu.ph', '$2y$10$bbijHt9SUeFMgrkQJ7Ku4OqQ2p9Zab5ea9JBFdrYgf6JSctHeOb2u', 'Student'),
(48, 'Mark Paul', 'Borja', 'Ramos', '2010-07-30', 13, 'Male', 'Grade 7', 'Aguinaldo', 'Facial Group', 'ramos.markpaul@sf.edu.ph', '$2y$10$cjOEThU4JyTAEf6FP5Yf9O9dc9hxSJC0AvhNKCMKf8rsvJkYZeZhi', 'Student'),
(62, 'Paulyn Joy', 'Chua', 'Dela Cruz', '2010-12-30', 12, 'Female', 'Grade 7', 'Aguinaldo', 'Facial Group', 'delacruz.paulynjoy@sf.edu.ph', '$2y$10$NObtQyEvVghDa.6LyMEXcudNlXqipY68IacmaQiB1FSNufGjL.yNO', 'Student'),
(63, 'Joyce Antonette', 'Buenafe', 'Guadalupe', '2010-12-11', 12, 'Female', 'Grade 7', 'Aguinaldo', 'Facial Group', 'guadalupe.joyceantonette@sf.edu.ph', '$2y$10$4XjYRm9va5aNunxsg5ZSIu77cVLFBHBZBpxwqa4gOAavr7lljI8n2', 'Student'),
(64, 'Jiabianca', 'Lorenzo', 'Macaraeg', '2010-02-29', 13, 'Female', 'Grade 7', 'Aguinaldo', 'Facial Group', 'macaraeg.jiabianca@sf.edu.ph', '$2y$10$PWNF2rglW4NhwDJD90v38.tTUh7W9y3VT9KYiWrDxWCxg/G6muZwS', 'Student'),
(65, 'Piolo Jose', 'Suyu', 'Montesa', '2009-06-21', 13, 'Male', 'Grade 7', 'Aguinaldo', 'Facial Group', 'montesa.piolojose@sf.edu.ph', '$2y$10$iQ4ZfmVKyhNKn6aoIsA26uq5lDkxZmkqH1Pybht9cR7lbXHTITQfW', 'Student'),
(66, 'Chris', '', 'Cornell', '2010-12-25', 12, 'Male', 'Grade 7', 'Aguinaldo', 'Facial Group', 'cornell.chris@sf.edu.ph', '$2y$10$I3lnbHd4UV5RN3SX8zf.r.ifvoKIKjvlEYdIJMD4i0Fn90OB2/9Ga', 'Student'),
(68, 'Triple', '', 'H', '2009-12-09', 13, 'Male', 'Grade 7', 'Del Pilar', 'Facial Group', 'h.triple@sf.edu.ph', '$2y$10$T0YXgusm2RQn2OPCup.90Ob8ymuO6h2ctUyYIwnTcDjUC9nHxMlEC', 'Student'),
(69, 'Beethoven', '', 'Martin', '2011-12-18', 11, 'Male', 'Grade 7', 'Aguinaldo', 'Facial Group', 'martin.beethoven@sf.edu.ph', '$2y$10$BX9MOXnMHGdCgRm7GaNY.uM2YMc1vBKUDmvffK0qCw69B2DfyerXm', 'Student'),
(70, 'Bolby', '', 'Montesa', '2011-02-09', 12, 'Male', 'Grade 7', 'Bonifacio', 'Non Facial Group', 'montesa.bolby@sf.edu.ph', '$2y$10$8roK2CbyjmCmH3prsGLl8OyUUWp.YxKYAt.5pzo.Fz8aiOxy4L5xO', 'Student'),
(71, 'Reynalyn', '', 'Tolentino', '', 0, '', '', '', '', 'tolentino.reynalyn@sf.edu.ph', '123456', 'Teacher'),
(72, 'Arne', '', 'Bana', '', 0, '', '', '', '', 'bana.arne@sf.edu.ph', '$2y$10$gv70fSjJ.S2pchN2/q4w4.X4f1HB6c3iNxoZEeo9MlFaa90vqAlO.', 'Teacher'),
(80, 'Emilyn', '', 'Ortencio', '', 0, '', '', '', '', 'ortencio.emilyn@sf.edu.ph', '$2y$10$1B3LVyStRaU.ZiGCCW5Tau8K8AVitSSpFA8PEatpWyJy41.Nar4lq', 'Teacher'),
(82, 'Mary Grace', '', 'Ventura', '', 0, '', '', '', '', 'ventura.marygrace@sf.edu.ph', '$2y$10$N/5dpr6IkhKhLAaa.T5Y6uIvB6BsWh4efPYFM0M1HlQNlS7R0lJTq', 'Teacher'),
(83, 'Imelda', '', 'Ramirez', '', 0, '', '', '', '', 'ramirez.imelda@sf.edu.ph', '$2y$10$RPh3ihy/2d4/k5c48cJDAelLPpe.XDylKvEkBLlrR6XN4kbp.qbla', 'Teacher'),
(84, 'Madelyn', '', 'Co', '', 0, '', '', '', '', 'co.madelyn@sf.edu.ph', '$2y$10$92JfZzuHf8P4pb.xDYUDCO5EwWZB5Tv1u4Y/x9ALqeboRQDVV9NG.', 'Teacher'),
(85, 'Roy', '', 'Callope', '', 0, '', '', '', '', 'callope.roy@sf.edu.ph', '$2y$10$sN0bukzDi.Lp2knP42MF9OtaZegHorDaphHnIH4BoMoMmZXH0KdRq', 'Teacher'),
(93, 'Jovy', '', 'Afable', '', 0, '', '', '', '', 'afable.jovy@sf.edu.ph', '$2y$10$ZjQjXa1leQZP0TCFRxz/EeeAzru8QCYz/j3pmNukBzfzTxhv4V.ny', 'Teacher'),
(97, 'Oluf', 'Landulf', 'Fausti', '', 0, 'Male', 'Grade 7', 'Plaridel', 'Facial Group', 'fausti.oluf@sf.edu.ph', '$2y$10$LKJf8id4O/VlTQHQMR6dF.J7a50QksvsRkyc0KQrF9r2ly2.lWNCq', 'Student'),
(98, 'Zawisza', 'Catriona', 'Ververs', '', 0, 'Female', 'Grade 7', 'Plaridel', 'Facial Group', 'ververs.zawisza@sf.edu.ph', '$2y$10$M1Ubqs1hKAlmxT2paaohTOgAer3QQvFkhyr43ERVlPyFiF0PaIy/6', 'Student'),
(101, 'Imelda', '', 'Batalla', '', 0, '', '', '', '', 'batalla.imelda@sf.edu.ph', '$2y$10$9Iwx4Nb4KilGdQQdgvn3E.Nj8FG7UNQxWeZMcOHOi2oVJ8bfsEXCW', 'Teacher');

-- --------------------------------------------------------

--
-- Table structure for table `cornell_chris`
--

CREATE TABLE `cornell_chris` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cornell_chris`
--

INSERT INTO `cornell_chris` (`SessionID`, `SessionType`, `Score`, `TimeSpent`, `TimeStamp`, `TimeStart`, `ExpressionAngry`, `ExpressionHappy`, `ExpressionSad`, `ExpressionSurprised`, `ExpressionMotivation`) VALUES
(121, 'Easy', 20, '00:00:46', 'Apr 29, 2023 - 07:55 PM', '29-04-2023 19:55:24', '0', '3', '0', '0', ''),
(122, 'Average', 20, '00:00:42', 'Apr 29, 2023 - 07:56 PM', '29-04-2023 19:56:10', '0', '2', '0', '0', ''),
(123, 'Difficult', 0, '00:04:10', 'Apr 29, 2023 - 07:56 PM', '29-04-2023 19:56:52', '0', '0', '0', '0', ''),
(124, 'Average', 0, '00:03:45', 'Apr 29, 2023 - 08:01 PM', '29-04-2023 20:01:02', '0', '6', '0', '0', ''),
(125, 'Average', 0, '00:00:05', 'Apr 29, 2023 - 08:04 PM', '29-04-2023 20:04:47', '0', '0', '0', '0', ''),
(126, 'Easy', 0, '00:00:04', 'Apr 29, 2023 - 08:04 PM', '29-04-2023 20:04:52', '0', '0', '0', '0', ''),
(127, 'Average', 0, '00:00:05', 'Apr 29, 2023 - 08:04 PM', '29-04-2023 20:04:56', '0', '0', '0', '0', ''),
(128, 'Average', 1, '00:12:08', 'Apr 29, 2023 - 08:05 PM', '29-04-2023 20:05:01', '0', '1', '0', '0', ''),
(129, 'Easy', 0, '0', 'Jul 22, 2023 - 02:01 AM', '22-07-2023 02:01:29', '', '', '', '', ''),
(130, 'Easy', 0, '0', 'Jul 22, 2023 - 02:02 AM', '22-07-2023 02:02:48', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `delacruz_johnlorenz`
--

CREATE TABLE `delacruz_johnlorenz` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delacruz_johnlorenz`
--

INSERT INTO `delacruz_johnlorenz` (`SessionID`, `SessionType`, `Score`, `TimeSpent`, `TimeStamp`, `TimeStart`, `ExpressionAngry`, `ExpressionHappy`, `ExpressionSad`, `ExpressionSurprised`, `ExpressionMotivation`) VALUES
(1, 'Easy', 8, '00:13:29', 'Mar 19, 2023 - 11:26 PM', '', '', '', '', '', ''),
(21, 'Easy', 15, '07:44:31', 'Apr 08, 2023 - 07:29 PM', '08-04-2023 19:29:02', '259', '182', '105', '4', ''),
(22, 'Average', 18, '00:11:39', 'Apr 17, 2023 - 03:12 AM', '17-04-2023 03:12:48', '0', '0', '1', '0', ''),
(27, 'Difficult', 19, '00:12:59', 'Apr 17, 2023 - 04:39 AM', '17-04-2023 04:39:22', '0', '13', '6', '3', ''),
(28, 'Easy', 20, '00:04:54', 'Apr 17, 2023 - 04:52 AM', '17-04-2023 04:52:21', '0', '12', '11', '0', ''),
(29, 'Average', 19, '00:05:59', 'Apr 17, 2023 - 04:57 AM', '17-04-2023 04:57:27', '0', '13', '0', '0', ''),
(37, 'Average', 20, '00:01:17', 'Apr 17, 2023 - 05:19 AM', '17-04-2023 05:19:13', '0', '8', '0', '0', ''),
(39, 'Easy', 0, '12:41:08', 'Apr 17, 2023 - 10:11 AM', '17-04-2023 10:11:35', '1', '4', '3', '0', ''),
(41, 'Easy', 20, '04:29:52', 'Apr 19, 2023 - 10:55 PM', '19-04-2023 22:55:05', '0', '13', '0', '0', ''),
(43, 'Average', 0, '00:03:13', 'Apr 22, 2023 - 03:25 AM', '22-04-2023 03:25:03', '0', '0', '0', '0', ''),
(44, 'Easy', 0, '0', 'Apr 22, 2023 - 03:28 AM', '22-04-2023 03:28:16', '', '', '', '', ''),
(45, 'Average', 1, '08:27:18', 'Apr 22, 2023 - 03:29 AM', '22-04-2023 03:29:59', '5', '1', '11', '0', ''),
(46, 'Easy', 0, '00:04:46', 'Apr 25, 2023 - 10:45 PM', '25-04-2023 22:45:25', '0', '0', '0', '0', ''),
(47, 'Easy', 0, '00:02:26', 'Apr 25, 2023 - 11:20 PM', '25-04-2023 23:20:13', '0', '0', '0', '0', ''),
(48, 'Easy', 20, '03:20:50', 'Apr 29, 2023 - 12:13 PM', '29-04-2023 12:13:36', '4', '18', '22', '2', ''),
(49, 'Average', 0, '00:03:17', 'Apr 29, 2023 - 03:37 PM', '29-04-2023 15:37:41', '0', '0', '0', '0', ''),
(50, 'Average', 0, '00:07:12', 'Apr 29, 2023 - 03:40 PM', '29-04-2023 15:40:59', '0', '0', '0', '0', ''),
(52, 'Easy', 0, '01:32:06', 'Jul 06, 2023 - 09:57 PM', '06-07-2023 21:57:35', '71', '0', '0', '0', 'null'),
(53, 'Average', 1, '01:56:04', 'Aug 03, 2023 - 06:25 AM', '03-08-2023 06:25:33', '0', '1', '0', '0', 'null'),
(54, 'Average', 0, '0', 'Aug 03, 2023 - 08:21 AM', '03-08-2023 08:21:37', '', '', '', '', ''),
(55, 'Average', 0, '10:02:36', 'Aug 03, 2023 - 07:22 PM', '03-08-2023 19:22:52', 'null', 'null', 'null', 'null', 'null');

-- --------------------------------------------------------

--
-- Table structure for table `delacruz_paulynjoy`
--

CREATE TABLE `delacruz_paulynjoy` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dimagiba_suriad`
--

CREATE TABLE `dimagiba_suriad` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doe_john`
--

CREATE TABLE `doe_john` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `equation_list`
--

CREATE TABLE `equation_list` (
  `EquationID` int(10) UNSIGNED NOT NULL,
  `EquationType` varchar(255) NOT NULL,
  `EquationString` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equation_list`
--

INSERT INTO `equation_list` (`EquationID`, `EquationType`, `EquationString`) VALUES
(11, 'Average', '2x - 3 = 4x + 5'),
(12, 'Average', '3 + 3x = 4x'),
(13, 'Difficult', '2 + 9 - 3 = 2 * 2x'),
(21, 'Difficult', '2(23 + x) - 25(2x) = 4 + 3 * 4x - 10020'),
(22, 'Easy', '2x + 3 = 6'),
(30, 'Easy', '4x + 5 = 1'),
(37, 'Easy', '2x + 3 = 4x - 9'),
(39, 'Average', '84 - 32x = 11 + 2 - 10x');

-- --------------------------------------------------------

--
-- Table structure for table `fausti_oluf`
--

CREATE TABLE `fausti_oluf` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guadalupe_joyceantonette`
--

CREATE TABLE `guadalupe_joyceantonette` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `h_triple`
--

CREATE TABLE `h_triple` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `h_triple`
--

INSERT INTO `h_triple` (`SessionID`, `SessionType`, `Score`, `TimeSpent`, `TimeStamp`, `TimeStart`, `ExpressionAngry`, `ExpressionHappy`, `ExpressionSad`, `ExpressionSurprised`, `ExpressionMotivation`) VALUES
(4, 'Easy', 1, '00:01:16', 'Apr 29, 2023 - 04:22 PM', '29-04-2023 16:22:23', '0', '1', '1', '0', ''),
(5, 'Easy', 20, '18:09:28', 'Apr 29, 2023 - 08:24 PM', '29-04-2023 20:24:44', '12', '6', '10', '0', '1'),
(6, 'Average', 3, '23:26:02', 'May 05, 2023 - 02:34 PM', '05-05-2023 14:34:14', '0', '4', '2', '1', 'null');

-- --------------------------------------------------------

--
-- Table structure for table `macaraeg_jiabianca`
--

CREATE TABLE `macaraeg_jiabianca` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `martin_beethoven`
--

CREATE TABLE `martin_beethoven` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mendoza_danica`
--

CREATE TABLE `mendoza_danica` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mendoza_danica`
--

INSERT INTO `mendoza_danica` (`SessionID`, `SessionType`, `Score`, `TimeSpent`, `TimeStamp`, `TimeStart`, `ExpressionAngry`, `ExpressionHappy`, `ExpressionSad`, `ExpressionSurprised`, `ExpressionMotivation`) VALUES
(1, 'Easy', 1, '00:11:15', 'May 06, 2023 - 06:58 PM', '06-05-2023 18:58:19', '0', '2', '1', '0', 'null'),
(2, 'Easy', 20, '00:04:12', 'May 06, 2023 - 07:37 PM', '06-05-2023 19:37:47', '0', '10', '0', '0', 'null'),
(3, 'Average', 0, '00:00:52', 'May 06, 2023 - 07:49 PM', '06-05-2023 19:49:26', '0', '0', '0', '0', 'null');

-- --------------------------------------------------------

--
-- Table structure for table `montesa_bolby`
--

CREATE TABLE `montesa_bolby` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `montesa_bolby`
--

INSERT INTO `montesa_bolby` (`SessionID`, `SessionType`, `Score`, `TimeSpent`, `TimeStamp`, `TimeStart`, `ExpressionAngry`, `ExpressionHappy`, `ExpressionSad`, `ExpressionSurprised`, `ExpressionMotivation`) VALUES
(1, 'Easy', 0, '0', 'May 06, 2023 - 02:51 PM', '06-05-2023 14:51:21', '', '', '', '', ''),
(2, 'Easy', 20, '00:21:02', 'May 06, 2023 - 02:51 PM', '06-05-2023 14:51:21', '0', '10', '0', '0', 'null'),
(3, 'Average', 1, '00:03:51', 'May 06, 2023 - 03:15 PM', '06-05-2023 15:15:15', '0', '1', '0', '0', 'null');

-- --------------------------------------------------------

--
-- Table structure for table `montesa_piolojose`
--

CREATE TABLE `montesa_piolojose` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ramos_markpaul`
--

CREATE TABLE `ramos_markpaul` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ramos_markpaul`
--

INSERT INTO `ramos_markpaul` (`SessionID`, `SessionType`, `Score`, `TimeSpent`, `TimeStamp`, `TimeStart`, `ExpressionAngry`, `ExpressionHappy`, `ExpressionSad`, `ExpressionSurprised`, `ExpressionMotivation`) VALUES
(1, 'Easy', 20, '00:32:21', 'May 01, 2023 - 11:18 AM', '01-05-2023 11:18:33', '3', '19', '8', '3', ''),
(2, 'Average', 0, '00:00:02', 'May 01, 2023 - 11:50 AM', '01-05-2023 11:50:54', '3', '19', '8', '3', ''),
(3, 'Easy', 0, '00:03:07', 'May 01, 2023 - 11:53 AM', '01-05-2023 11:53:40', '0', '0', '0', '0', ''),
(4, 'Easy', 1, '00:52:36', 'May 01, 2023 - 12:23 PM', '01-05-2023 12:23:11', '0', '1', '0', '0', ''),
(5, 'Easy', 0, '0', 'May 01, 2023 - 01:17 PM', '01-05-2023 13:17:04', '', '', '', '', ''),
(6, 'Easy', 0, '0', 'May 01, 2023 - 01:17 PM', '01-05-2023 13:17:46', '', '', '', '', ''),
(7, 'Average', 20, '00:11:58', 'May 01, 2023 - 01:20 PM', '01-05-2023 13:20:18', '0', '2', '0', '0', ''),
(8, '', 0, '0', 'May 01, 2023 - 01:20 PM', '01-05-2023 13:20:18', '', '', '', '', ''),
(9, 'Difficult', 0, '00:00:15', 'May 01, 2023 - 01:33 PM', '01-05-2023 13:33:54', '0', '0', '0', '0', ''),
(10, 'Easy', 0, '0', 'May 01, 2023 - 01:34 PM', '01-05-2023 13:34:27', '', '', '', '', ''),
(11, 'Average', 20, '00:00:26', 'May 01, 2023 - 01:39 PM', '01-05-2023 13:39:25', '0', '2', '1', '0', ''),
(12, 'Difficult', 0, '00:00:05', 'May 01, 2023 - 01:42 PM', '01-05-2023 13:42:25', '0', '0', '0', '0', ''),
(13, 'Easy', 0, '0', 'May 01, 2023 - 01:42 PM', '01-05-2023 13:42:46', '', '', '', '', ''),
(14, 'Easy', 0, '0', 'May 01, 2023 - 01:46 PM', '01-05-2023 13:46:15', '', '', '', '', ''),
(15, 'Average', 0, '0', 'May 01, 2023 - 01:46 PM', '01-05-2023 13:46:26', '', '', '', '', ''),
(16, '', 0, '00:00:02', 'May 01, 2023 - 01:46 PM', '01-05-2023 13:46:26', '0', '0', '0', '0', ''),
(17, 'Easy', 0, '0', 'May 01, 2023 - 01:46 PM', '01-05-2023 13:46:55', '', '', '', '', ''),
(18, 'Easy', 20, '00:00:17', 'May 01, 2023 - 01:48 PM', '01-05-2023 13:48:26', '0', '2', '0', '0', ''),
(19, 'Average', 0, '00:00:04', 'May 01, 2023 - 01:50 PM', '01-05-2023 13:50:24', '0', '0', '0', '0', ''),
(20, 'Easy', 20, '00:00:41', 'May 01, 2023 - 01:50 PM', '01-05-2023 13:50:42', '0', '2', '1', '0', ''),
(21, 'Average', 0, '00:41:41', 'May 01, 2023 - 03:44 PM', '01-05-2023 15:44:25', '0', '0', '0', '0', ''),
(22, 'Easy', 0, '0', 'May 05, 2023 - 06:45 PM', '05-05-2023 18:45:12', '', '', '', '', ''),
(23, 'Average', 0, '00:01:51', 'May 06, 2023 - 10:39 AM', '06-05-2023 10:39:47', '0', '0', '0', '0', 'null'),
(24, 'Easy', 0, '00:41:47', 'May 06, 2023 - 10:41 AM', '06-05-2023 10:41:38', '0', '0', '0', '0', 'null'),
(25, 'Easy', 0, '00:01:17', 'May 06, 2023 - 03:20 PM', '06-05-2023 15:20:23', '0', '0', '0', '0', 'null'),
(26, 'Easy', 0, '00:00:13', 'May 06, 2023 - 03:21 PM', '06-05-2023 15:21:40', '0', '0', '0', '0', 'null'),
(27, 'Easy', 0, '03:35:00', 'May 06, 2023 - 03:21 PM', '06-05-2023 15:21:53', '0', '0', '0', '0', 'null');

-- --------------------------------------------------------

--
-- Table structure for table `section_list`
--

CREATE TABLE `section_list` (
  `SectionID` int(10) UNSIGNED NOT NULL,
  `GradeLevel` varchar(255) NOT NULL,
  `SectionName` varchar(255) NOT NULL,
  `AdviserName` varchar(255) NOT NULL,
  `AdviserMiddleName` varchar(255) NOT NULL,
  `AdviserSurname` varchar(255) NOT NULL,
  `AdviserTitle` varchar(255) NOT NULL,
  `SectionImage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `section_list`
--

INSERT INTO `section_list` (`SectionID`, `GradeLevel`, `SectionName`, `AdviserName`, `AdviserMiddleName`, `AdviserSurname`, `AdviserTitle`, `SectionImage`) VALUES
(1, '7', 'Rizal', 'Emilyn Ortencio', '', '', 'Ms', 'rizal.png'),
(2, '7', 'Bonifacio', 'Reynalyn Tolentino', '', '', 'Mr', 'bonifacio.png'),
(3, '7', 'Mabini', 'Jovy Afable', '', '', 'Mr', 'mabini.png'),
(4, '7', 'Aguinaldo', 'Reynalyn Tolentino', '', '', 'Mrs', 'aguinaldo.png'),
(5, '7', 'Jacinto', 'Mary Grace Ventura', '', '', 'Mrs', 'jacinto.png'),
(6, '7', 'Luna', 'Imelda Ramirez', '', '', 'Ms', 'luna.png'),
(7, '7', 'Del Pilar', 'Madelyn Co', '', '', 'Ms', 'del-pilar.png'),
(8, '7', 'Silang', 'Roy Callope', '', '', 'Mr', 'silang.png'),
(9, '7', 'Batumbakal', 'Emilyn Ortencio', '', '', '', ''),
(10, '7', 'Bonifacioz', 'Roy Callope', '', '', '', ''),
(31, '7', 'Plaridel', 'Imelda Batalla', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `UniqueID` varchar(255) NOT NULL,
  `UserEmail` varchar(255) NOT NULL,
  `Logged` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`SessionID`, `UniqueID`, `UserEmail`, `Logged`) VALUES
(1, 'BT2f00XXFiYYbLnP4wYgXHle3JdCyse59DPPTOyGNiGXbRBg8RImV4gBolMS3SXB', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(2, 'bwyribQQXvQvZfj6isP1rEPeMntEzB6NGOaanI71YcZhBfqp5A7ydpQrXqP95AqW', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(3, 'PGkvsapKyLziEwvEso8aq86IgvZCbI9Tht9wus6D0ODROhKibByGopDUOVkwx6XY', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(4, 'A6DTZHrLkLgOp7vKUYJppdLbcnaaZZFZymEKo0fm9yWCP0XMBjq1tQBwokEecsEp', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(5, 'od1h3UL7X0at0mdCmzSYKjZobzNbAlCQzBkL5hoppWI894UXKLdj99EneZtikiTj', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(6, 'jG7J5ntC1sD8hYMEM10Va93ezfysTgFTdY2NfdZlqlSRGWpGsS3fLthdGPpprcuB', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(7, 'EHSadnCBiz2au6J4GFqfGo2pwXSRVtLT6S8424MgNTjHIr87y0q155KEg6EbVK9Y', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(8, 'viFqGo6DqdoZ75TiGhcPdrLCyOj5MeSKOcfAokUTVQMIADug9woQ2GjZJVB1oZQd', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(9, 'IhFpYvwtxQnBOwZw3xs4wTXWWBUPMuoFrnn1MXU2JYOEfYg3QtmrTXKtERViW43C', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(10, '17P0g57CgKuiwXqOt0mbg6bJnadO1ZwfeHmxXmf20BZ7Aqyuo9flfLu9pmBT8Juk', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(11, 'bI9r9qzjWwtrOvv4mzEcBg3GWK2IUFMCoSgwGkWpqg1uo8rWgHpFN1iiiXbhNqLy', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(12, 'pAJyJEVkKxHocmfnBFt7KPs835ibHpjVbq60VLUOiTrYEKmEHUXcz9BrAClG2eUt', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(13, 'pbXgJ7ENzU8sEas5Gxeiz6AJpHwpOaZLsAUmNpkPbUFKLxlauWAOBpGZrrZSNjmL', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(14, '9BEagTRmQOkjN0cqxCtbOoqqXXXkpCDZE1UJsr2XfW2acbIzHvLIgBnbz3NOIpKu', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(15, '4Hxt4KihFKysiHlyGsTSeY7nci3sgufmIBKrt3IxpRXq4iBCDBPeATKEPASiUcIH', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(16, '5oPGzdre7Ky0K0HTQltoic8pYV5e4wq02gwjBP8jHHwHLei1wAGuYUOoRuqgNSfW', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(17, 'SNZrsZLwFMfIHacIOPWIFRxbOTDjvG1LRg0GYvxpN78idz0Ogije0L9sHqy3B6Wz', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(18, '99HdkRneiIQ75w4dKeQTjxCvnZ6tH75r9Ax5AtknA3MKwU6HYD7tX38qB5PH3gwW', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(19, 'FMvLkP8YdBBeMxPc4I34EyDBjIflOQKl1zKg2K2Ly5FCOEPXa22OOh5CBrqTZzaF', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(20, 'XpZ4PrwOqN0EVeSUoPFYwwmMsEG1Iw448gZ7Uun3PpUNOrJFtax12BHgFTrhntyN', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(21, 'NXaACQOfOa2MCbbEpv8lTvBTKQl9dV5FstS6OgrtDWlMsmnjmd7KXiA1I0n79M9f', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(22, 'eRJFqT78fiitZRmCzts2q4wshBYT2b5T9azk8cTvt8WYFDzXWJzWkncLwChjAnsc', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(23, 'dJZMER5dW84Yp1JoZcJjyVd8lab1pNpaMSzPj5S9ZuCElqtergS0eSvAhh3tSc7L', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(24, 'Hjpr72tqjS39nfHPUJ3yXeMh5F8U77L6gsr69L16zeVODWX6bg86XTwlOIrl50xv', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(25, 'CMDceyfk0L8eFJ98HpnxGfn9j9HDn9H7dcytIgHpKph2fTPMNZGgYFPc8uxeVaEf', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(26, 'PHRXvWXz4s7BbXAn1XqxqkXMydf6UCD90cnyeapdQMjr7kfKRWPBgg6LkvOUUvvZ', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(27, '62B5m8BT60OHX4ow8bClBFwcdtYPEYLUr5XJz0bUxEJ2YWeX5iB5NMCiMtYEds6y', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(28, 'iq0JpTvfWUMjE6f5DC75Y6WW1bTknVul7c83XjIWrRAGNwovbmLD8yraD8huUU5u', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(29, 'uXVgB99tmRk7iz6s8HCSymvFiVvU3WLws2VKwlMpBFfBBQovoByCqDoDHmvA0eEN', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(30, 'V99fxlc6EedCDVzcNDsmHvJPnLwrJamc9PraBAQnD2dAqbZeoZBOiCuYgU0uN2qE', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(31, '3MWJAaAj6lj0lxjR4bp1KNGjkwHONuvk7GbzF9hWVc1YAQPqhE7hjTiPatOdFTLr', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(32, 'O5I6Smc3KREXmvbytBmkRbjucxKv8WbYRDj8d3hBeAtFsNtJR7uAhr8unB9RzDjg', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(33, '8kZ7ubqf5Y8YNYtCL5jsnBpTC8sh8Gzeef9Or5U48fhTQRbuORyAnXLGIa0Maq0A', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(34, 'kdmPNvQ1Hx93mh80sCZAQGEOuG1HvivUvd06hhR2LfAuHsDV42UenmykRZdcsZcG', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(35, 'PQn51n6ZMyiyOz1fgucM3dX10Po2rNwduF2myJzE4wJ7vHAtEogwsEPgM7NwrwTD', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(36, 'l3rzFnTdZGkSFLRXFVYgUsQ4bSGZWuxSLl9B6HGHWbVnMZISO94PecPkspQqc0XQ', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(37, 'BEI5rvWF4C0fuAFwEjWxwUJTG57ytyjdV8zafbnaNOwgYRpXpRKNwFo4ajVLmzKe', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(38, 'yGaMzrlN2o5CJumdXc3LXXRLYTPM4FjYv1w8gE9SbtJaPpJlzN2pLj4JQaA39SaR', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(39, 'vBWDTQjYRz5TFeuZxsH3pI1r0zOOcY89SZ8JbWfexQkjNAjvVDhVfsoZ2jpGqRUz', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(40, 'IRB2ML6zhTsmKO0AwUV0be69RN4cs7eQScczGbyjKybgqkGz5F3BdYMtmcQpTIKG', 'randomstring@random', 'FALSE'),
(41, 'SaOUbmJqi1u9Mm6vLZJW3hFi5gI5mrjoQU7GGUR9FLmhhknaHbcyY3gwvsPomeYO', 'randomstring@random', 'FALSE'),
(42, 'KhXQSox0joaDCM4Y7v5yS5G3VbfBhr5WEQxNsKLKkDzVCMw3kN4f2CqtJoqkfXiX', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(43, '0mE7utZVBYBGMeLz9GtsowXM0neKweHnHvatmMwgTmwKIPEo8l5rZ54SOP0ZpHlm', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(44, '4sAk01Rk6eXthjzPDIGUzzIAOKZlWitKYxd5f6re4XfNjHzxhbrkvjWy3iedaYBm', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(45, 'GMvknRNEzY0VzdqDelccV0W4cO3xpBg6UwtlwjkPTCuuLH4PPSXLggfvlQECjOwa', 'randomstring@random', 'FALSE'),
(46, '0BKdnlWHClifDvnB7iLTXyuc4cosdZTa0roOVudQVBk8DiDgq8B9WthaiB3ZeFle', 'randomstring@random', 'FALSE'),
(47, 'pegONQlT4sUL8b7GZceE5nHpaN5YCAjGBnOLLm6ZHwAmkF15dQPIwUUccRPRcPXH', 'randomstring@random', 'FALSE'),
(48, 'ONC1saIqu4EemAOzTxclDnBzECF4Y6hNjXMD3jqp4s54O8HdXYCHgBQZpzpzejRP', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(49, 'kYxtcS8tywpiYqewkUFHXKypw3rM6f9O8iUN4Nc0mzKZUjYRXUGuEstb98CLYo2k', 'randomstring@random', 'FALSE'),
(50, '93I8yTGsyk6fbZASklVL4vcaZXbBvE6H9jOEnvFL0epEDZvPyU7HpGPJu8j4mrCa', 'randomstring@random', 'FALSE'),
(51, 'mgXr6OqA4EItrEh5wYbfFGGaHNDwOu6NtJrhMX6X7AQKHFEkHgWRDsk4GI6vyt1n', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(52, 'XhzNTdFfO4EsCTc6hfWavskZH9o4lsTgvLwivOHsQcISw6gC0Qmwaa2sWXs6SkUp', 'randomstring@random', 'FALSE'),
(53, 'p8govsoMzC9IGfd32jOLE1pIATnkvgbOduOwYoKOpadXKqf47FABijNsVzcvXh6c', 'randomstring@random', 'FALSE'),
(54, 'Oca0sonz4eRPzcjsRaVlEoeTIdmUNMrWaP0ZTDPlRGzRvanDNFNXBT8QY2AYwhK4', 'randomstring@random', 'FALSE'),
(55, '7VNhsWevNMualhmONoAEW92tuQUZ1w8T53nMLnM70TLY4SNxxoD1qjYguoy38MwA', 'randomstring@random', 'FALSE'),
(56, 'VTCBV3UXtq6vTfPXLhQKtDez2AOQmLZcrW83zrXVXHt5wP8j1UJSud2v8FSeOHWh', 'randomstring@random', 'FALSE'),
(57, 'UeLkNwOpk5tdACf7WG7DlB0vg3iTLz4Hs3MKlekMBglgL1BSkok4OPNU257TWDdY', 'randomstring@random', 'FALSE'),
(58, 'gFbjGALyxwkFFLFqoHbPJkUCPNbsFAMddPdco8vMwJA32hmDS2W6yf0C5voANt0l', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(59, 'JYx4mMTLmSd3aP6RLoIZ9XGmRUzz8yZYzWN72y03RgZoQ0w7FYGQrM9vUvlDF1VF', 'randomstring@random', 'FALSE'),
(60, 'NpVDSmrRHZmbtdxnrhvtsxfgtAOyqXyS4uo3UbIrx2qarq7UgbIdjre70hMj2tJl', 'randomstring@random', 'FALSE'),
(61, 'JgIfaERvGcU8ARweaitBZU6DVJXzlyEpcPjvDbDpIu19U02D0UjnF1ihMKcAsTnh', 'randomstring@random', 'FALSE'),
(62, 'ysnyxxVKdOLf5Er6FjZUmk5S0D2xsx056TPPjYwjeWYsTdXZ0RpnQJ1qukTMu3GV', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(63, 'eMYY24L7s8W4EygYHYbWEuzVzppkE751NY8IJHwWOnyINzBOpyyQxWXUFin377hQ', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(64, 'fhBpOdpXGymxSoVwdM1jdu0gZjJup5cMknFSNQ6CJy8FRsxvwFXupU0hFm8snTl9', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(65, 'VhEV6aL4Nt1SHLTydtiXE6upXNToExv3UdfyvH4DhRGc3fpviR2hjrmSmb0zJ4RA', 'randomstring@random', 'FALSE'),
(66, 'ddAKIvRjgsfd8JXVfLCsjI8DtOhtRTwLwF8Yw52uGU3hNXMjG0NgMYKos0Qnenae', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(67, 'yMfVx3qPam3PNrDKumCEu7f8TcnwQPFdpgZ7TenX54tYqlmfz48U7dYYZE50MmId', 'randomstring@random', 'FALSE'),
(68, 'gUSzJ2CZrK9D5Cunbrlnqr4PwhIs7pDO7FFHlNjBpvTpo3sYXeqMcIpDfSx5JLS2', 'randomstring@random', 'FALSE'),
(69, 'syKH9zns3hl10T43pGkq01fOU5PfZkUVb5SBHjJWnLOEgAsJJq5J1vG8CNdT9jTH', 'randomstring@random', 'FALSE'),
(70, '63Nipt1yCixQfOlT0o77i09ftOWWBlVBpcqelmzs6J2BrRn0QaFIPmaNSCyfq0JQ', 'randomstring@random', 'FALSE'),
(71, 'NQ0U29PgUcYoA8Gf5jnABvDUlO1sq8OHa3wYvUL345738eSuP47FdLNYBZSyAKmo', 'randomstring@random', 'FALSE'),
(72, 'uNxHCD2Xfq4yCOzm8dhjd1rf3BWqe1Xn7Xx0qZg4sH87wUCdneF9dhvXZZkACseA', 'randomstring@random', 'FALSE'),
(73, 'm39wISXTMvcsF2ymZnSUSb1Mf6mkVv46mGW0GM9UV4DXV00sySIbhN0XI6gREZ33', 'randomstring@random', 'FALSE'),
(74, 'gdGpmBJQw14AdWSkVK2CSZxqd8n8c4H3TWsmUDxU4CktxXKm9PrGto4s596Nx65I', 'randomstring@random', 'FALSE'),
(75, 'ruqG0BWTei1jD7i1GbjUZCiTtZyZfuTgFIucbzF53xcRsQLkxTEXTkaNiJ7B9wLz', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(76, 'cefdf30cKChR7rW38cttotZUeQXOQCKVN05K66AJiQwKnFr9e2eKwDN8757imGv1', 'randomstring@random', 'FALSE'),
(77, 'QL37TDhJuvDp5GOpZuXO9xnkGOrGSVZfREOzwlVgxSwAEobtDmAUKUv9KO0rU384', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(78, 'guiRLShAdjpTn23BnvCyoVN3X4ojxheXPvJWj6drTvLLdy85pEOTAvrnuXqA22o6', 'randomstring@random', 'FALSE'),
(79, 'vjYnN5FqjcZvyg3q6Va1hRriVDxtQ8l3sZmcAncaaj7PhJIWgXW514AcfDj4CB9T', 'randomstring@random', 'FALSE'),
(80, '1ENOFV8mwiLwPEKkvxtUPegsen1PldOrr6dTVaBQ6tPFMdQ9ZscKtAnmLU9DkFsA', 'randomstring@random', 'FALSE'),
(81, 'TMrwSZGnhyv6w1DvxoheBtxh5VnXLUtjUln3MdaFU389GTjbxx3iktN5mh8j6nHD', 'randomstring@random', 'FALSE'),
(82, '3vyWpEE3lE3F4Mv7EkCmQ0fC3OuSow8QYW5VIJpetN5vm1HodkP2FMbV993L7ieV', 'randomstring@random', 'FALSE'),
(83, 'Bw8rbBFba68VgQOKum45mLuwfVqCdJMtpPY4mLmrTgAIr3gC15Q9KTyKJFuYgUC9', 'randomstring@random', 'FALSE'),
(84, '8nCMDS9n5Jd3RmeiPcwLxDlJmcfRBE57a29BnJ6CtmeQpEORmhTCFU6Dg4ZcvhHu', 'randomstring@random', 'FALSE'),
(85, 'eeVbrz1VPT5zTIlqcMlT2KE8ykYiLZHh5onWgTQEK5C8R1FTPKzjF582K6Jk2Vz0', 'randomstring@random', 'FALSE'),
(86, '3DyrBoxZxq5EV37OVPrdkSUi8zYhzjkZWdSgWxZQxeJnhwrQVR4feGwhjNYv8Up1', 'randomstring@random', 'FALSE'),
(87, 'weGVNMW3D94xFPpu11506mo3kTWg8UKRCG0neVVqIJhaSUznLynbqygl0ayjlvcq', 'randomstring@random', 'FALSE'),
(88, 'AVEbd8CapHZ1ghxMOWZHxim5wTHEyBGnmuhGmxeSugk5V5mDrFKRfH5fe0w7tOlJ', 'randomstring@random', 'FALSE'),
(89, 'U5RWw8IqGJldnB20JFryeY9PrB3W46sAX94Wd70rAkJu09T7UqGkS7L2ozNYGbI0', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(90, 'H4S7XXkmRQhnekv22t2zay7FUCo9q1p0uCe9Naf9PMHxBnHROO4d0RIIXLhb8lFT', 'randomstring@random', 'FALSE'),
(91, '056B7tqeKal9vF0ALg8vN3FAemaGitiWajN6eLuDsZCIW43tyeyZQkKT12mFiJ8c', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(92, 'sVkzirGAhLbsQE17BhPqsGMgJHLuDlM6dSBvcrmMy8wDa70fgucYQ5jN8ghqq0CW', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(93, 'tC7l8HZTwXDn0jm4D0Ef6SGmx7isOeGAz2DjDxNDKYjAfxUgYj6aAMeY9dms2mLS', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(94, '0I6USdndNsQQaJtkhUkCAZKDUmNPlTaQD9aknzEWnquOPiKcr24yB1Wo1QknRkST', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(95, 'qIJy6YEcCzs8weSXujtJwQotETwf8L1QuLqxC1g3Xp8rKrFGoOWKJBdVLeyazkpo', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(96, 'Ibr2v1BoVHcjpw69pInnJr4h5t6GqDzBdQAoAufG47ojXHC8L5sDtlj0IQTAsLPd', 'delacruz.johnlorenz@sf.edu.ph', 'FALSE'),
(97, 'r2nU3zvL4fz5PLMlZ1xedp9PxOyGvNjU6688LTsWBkpdhyLqGG8Rvf4rc62DXOZ2', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(98, 'pSfHVIxwp0ChiuLFKBVf6xmOZsZIgkvsNFWdcvDv8JGFK2KNcV6h02kshmeGVznc', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(99, 'xdvqBripHAcTLM5YHH6FJgOTnVS46Yp5rVqTdHRw4vLbVYLkLYX4SBZFT3N7ZRNm', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(100, 'AgNKnilCcJb3FmBVTQp3IDqjdL29ppmL35TE5nL8g93tmjf214kPJaVIstAvky89', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(101, 'eElsLifC69V5hiTKBH3D5edZ2QZHrFvkcZzRQUoUhabeVf5ievU8J8OvQsWRxxOY', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(102, 'ZYTMyCCQ7618MoTBvW5GhtVCQRogMRMgavtW0AC6kVrmYNZ7XMMaFFsx1Hy28fKe', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(103, 'll8Ibk4fUgNReE6ZHNCftNvi5D56zrswpNElLyKXG0MUuDAP6tLDMJLtHQKR2zWK', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(104, 'Rz4NA7cTZioFzAm2aI3ZuZcR2x7hl8wtsiWoT9ExHxOEC09qQcZ5GGKs0sFIx8bG', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(105, 'tUimY00my5n3K024EgyNXUkIxG2RS6zgM6rXepDo6U7ErlLdtcC2T4yceEp2EMIe', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(106, 'NAIppqx0SPX8YQlsfldxosSMQbTIxxi22SlFjO2i32XxVvbY141m1pv9k2jWgYDG', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(107, 'MjNPXxZMxF4Nmzru5MxIc9aVaoM5hjIsWeLfEgcEpmL4ZsuaX4FYJG3nAmKme4lh', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(108, 'cEplCT3i2r7NirwZw4iRx5hBSySX2Hutq6G5vnn6huouS7eyHvQMVerHElIMTVyP', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(109, 'LD0wRCsbW5AfhPb81gcW8o4IAtexcVWmclnlwAG7AMoq5XegjzRvVqecCanQqPbX', 'randomstring@random', 'FALSE'),
(110, 'FaeVp3JbKVQNzln7DhdC4cX6zicF5EPlwwXrzbY0brcIwkHsExCvZwDuZ56JRJ8a', 'randomstring@random', 'FALSE'),
(111, 'on7L0ZaojY4Fw8YKS48hEKKoSvflIgFJ1qAMXollItYUdPTJIeFQhicTZHmfv0uI', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(112, 'zyzc1CrNhOndH4ktnAe5CAc8QtDY0grNgOwxz6mbZgCyH2cU1K6vnK2aNbuQXLNk', 'randomstring@random', 'FALSE'),
(113, '2jpunQz2w5u76HSVKZpgpQ93CB2RvnoPWGNqM8LqRUtAgLSpdkXD3eRBBGim88sA', 'randomstring@random', 'FALSE'),
(114, 'VZJ6fFwXXGpPgRxsoVTS8smRPiUsg2tCK9YilNkNgT626LB4bw1CnPIURLla4Chz', 'delacruz.johnlorenz@sf.edu.ph', 'FALSE'),
(115, 'DajIU9pvMTOcr1Zlg2q9Q1UgUnO7JDrNC6gRqXs6R8oXirdxX4N2YQYdszB6rHYl', 'delacruz.johnlorenz@sf.edu.ph', 'FALSE'),
(116, '08QqmIzfw5O4Bz87jukvRS1Ewd7ZL4CohRfXOxwZK5DtW24F3umO0mxw61OsJuMS', 'randomstring@random', 'FALSE'),
(117, 'ubFBaCxLtG8iWMFIJLNum40OElv1DvlysPsQ2RilJyDXyxUbufjiquvSSnV4blA1', 'randomstring@random', 'FALSE'),
(118, 'SpBxXcaThNhtE9yfzJp2YyIurCrFgbMmXK0kwjp9ClaoXXkrprpMxoi8qtj6HpDQ', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(119, 'waWYvD8tCMdmBTv3jIUG3cy0Iq6exmOvizyLVz6yaEncKoPSZMKgqqchzuRMLPfG', 'delacruz.johnlorenz@sf.edu.ph', 'FALSE'),
(120, 'k8Aacv2qqRlYEPZFsIJbp3Suo6mJx2aLUs1R5yQiAmolmzTQgW697cEt8BzoQ3NR', 'randomstring@random', 'FALSE'),
(121, 'rxadbGcKrG75ZVMB0o8dFqYGuf07oon9iPEMqqmNRZWMhkCIC2wLehLZIeBQuQoN', 'randomstring@random', 'FALSE'),
(122, 'UvsN8YGtO2QI5VOaVl89mMhCJYJc1CcjeI12oPFpdNh5w4O6KXUy4sun5fKHtpI3', 'randomstring@random', 'FALSE'),
(123, 'sG61jVECdr6YzQmdcA8YKjWLDq2xoEFivSvGkLGyX1IRSWX7bdMMcwKgXe9kUkfb', 'randomstring@random', 'FALSE'),
(124, 'An8bXW9gshmglT3ZViLtpMMf8tK5MWtPGj77AukwANYsF0VLxgBepBevNfro7zQ7', 'randomstring@random', 'FALSE'),
(125, 'r8xnWKOO22Rc6SxlJTpmC3K0iT5MzutPZ09ENgJXQfRRt9XKQ46ai8zC6VLv1WUN', 'randomstring@random', 'FALSE'),
(126, 'yHwpaUQi6TUvqWeiHRhfIr2RSe8FEI4Hha5xutOsVAqWEA2hIZTjpw3L0rJ9rxj5', 'randomstring@random', 'FALSE'),
(127, 'yHFy6iVdinowNy5XxQWnjSuMGO1eeMgyGSSOuWe6bwM6AaYZLwCwApQmhu3zBybi', 'randomstring@random', 'FALSE'),
(128, 'ODqxN08n12fBH4AyCdVZ9wQZAmMDkMIdfLzCGJf7u6pRmPDkEh9xuHVubsmUnP6n', 'randomstring@random', 'FALSE'),
(129, '6uIMBOlPQKLGNH5oz0fin6oa7f29GZrQ6qqNRcs2k94QAkdW16szran3b48SEHLJ', 'randomstring@random', 'FALSE'),
(130, 'EjFxtZMGHkryFgYQFk3Zc0c1UQ8W4liCbUySWlLklkMPmlIG4QTafYHz3HIWY7wX', 'randomstring@random', 'FALSE'),
(131, '8kskXhADmlG5I8ajUkqJz2i1IgGulToRTIZB1yjtQcMlR38Qd1BrRdYsLB7q0ClN', 'randomstring@random', 'FALSE'),
(132, 'EURZgQ9OdMKLqG3OetfJHQB4kdgghdUQ0SxNcI0isz5MC5XByYVkz5gD2FQQrlwU', 'randomstring@random', 'FALSE'),
(133, 'DTmGQ6chTA0KTpfT6VVLKRDvsQorFEHkcuPDta7zN1EorngEwpoHuRND8Wifd3Wa', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(134, '6vMsf2dCrurLhlgdusw35uniKWQdsnwb4kFwWxh4BKpNcPa6Uxj3XYfGNYM3FeEO', 'randomstring@random', 'FALSE'),
(135, '80tQKNEFaqF7swKS7szhIJL0aTWdH1GFcmP2A4CzQrrVhcenoZH607fRvWUy11aC', 'randomstring@random', 'FALSE'),
(136, 'fwO0bw9tHav3CiTjeWb4wkHzGn3ARlJYp3bKsLF3A8pbnjOLL8GBBJ5qdCrYx23o', 'randomstring@random', 'FALSE'),
(137, 'M7BfyBcP3UaR5MQZ25zRVclcuHv79pmxPTFWwue16uoDSC0zYuJc0gAptdqV0YoV', 'randomstring@random', 'FALSE'),
(138, 'EnvnOCzE0yJI5y6D6yjutx82g0XiHUTwg7vEWYKmIXi6jZThf4I1pYU98cAbYFmx', 'randomstring@random', 'FALSE'),
(139, 'kLEaos4UepNtEVkGKYPen4KfbI0oq3K3O1JoG3W6yQwRw1LcrxswkWSGHk2oqWoc', 'randomstring@random', 'FALSE'),
(140, 'k9m0M56503wfGynZEfbgYoQz7DldrgNZ9Axk0IFPEMQbRZi5ca3ZBoT9nKEPbjYV', 'randomstring@random', 'FALSE'),
(141, 'o1wwmsp2Sxw3gg0DU96al6mgZ5M11jidekNZtk41EetA3IoaeoJMla7eVCJRH8zh', 'randomstring@random', 'FALSE'),
(142, 'ouPrcy7nrjpvVFdynsgqhOUw5Jt3qbQxWjnt5fY6wgnXGFWPzBQF0RneylJC3ZPU', 'randomstring@random', 'FALSE'),
(143, '0lL0LK0XU39TAVrpuxlm3WgXJC1sTOzHT9RZ6rUXmbEknoXQ5nvzHB4HHuYWHU5F', 'randomstring@random', 'FALSE'),
(144, 'vXfjy3Hk4Ib3t5JTZrTGjtbfXifvR6wutezJEtnKgmMILAYj4w5HUTqL5qyPFuDu', 'randomstring@random', 'FALSE'),
(145, 'Dr0xgY3HN5Qg5roEDXErUHsKSaTRrp5ZiumUZsNdDIPJI8kHGYCRMsJgjf2IzNiq', 'randomstring@random', 'FALSE'),
(146, 'N2i9dRychtYCv9hsvcPqL5U1NhLhorFdsJY2IwoCQkUcWyLk3F21qvX8W0uLO9mE', 'randomstring@random', 'FALSE'),
(147, 'vJoV8HtPzfppGA0wsNoKqkV27FlnJKaEui45PSuI8NmO94zEGuduUAvdnSByElBB', 'randomstring@random', 'FALSE'),
(148, 'SJQnNRGfoW3IoFpG1flJRniTa68ZHvgDzQ6BBIzi9Kp4hzMxzydByBiyoEkYRAKL', 'randomstring@random', 'FALSE'),
(149, 'Uu7pRM9VXW6SxBpIjHMj2PsgcYDYjlISv8xYUbAgnTU5dPLfxMSmDROqoQs4sie6', 'randomstring@random', 'FALSE'),
(150, 'XR6Veu1TkLoyZrbch2aKUxZZLyikFEIHofXXNuAcNxioRmBRUxgQpPFTqnmK1VaX', 'randomstring@random', 'FALSE'),
(151, 'Ffh9wYmlecOoU9sJlsK8uEcXKvPj5l5aPvcIGWq4I7veDc8DK6zDRkaKusBhFkhp', 'randomstring@random', 'FALSE'),
(152, 'N9mR9wN7dPv2K175Yf7YPtLlkOKKxwj7WPFxEpnYD5tCfbceybNpfXFBCuBKVt8A', 'randomstring@random', 'FALSE'),
(153, 'k3HS1KwtqJDU9m5pnCDiXuJ9jzVJ5KXdpOcxTf2M4faih6kpL1aSQw7VvOkn2Jv6', 'randomstring@random', 'FALSE'),
(154, 'xMbe00fNyvQDWvyS5pv7IeUMRYesfDVWZhiC2XxgsZZJVuKZq8E2EkZhd7Nb6idD', 'randomstring@random', 'FALSE'),
(155, 'tSb0awqg7ZZ8NM9JPqQVMPzqmLXYAE54YtySq6OM6sLNr3JkGoKW35f2ywIWqxnk', 'randomstring@random', 'FALSE'),
(156, 'mTvRmDRhkAo1n0tEj0pJRvCbCzMPomiMot1TFhsiJvZfqlMQvKGxy43lP0MEXpTO', 'randomstring@random', 'FALSE'),
(157, 'lPpZxa1Wxl5Wmak5Nqj3ULmBPHXEY5dybDitVq3MPu84G0RPuw6BJH0RHePPMRKu', 'batalla.imelda@sf.edu.ph', 'FALSE'),
(158, 'xtXdvM66SSBcGdHkKNgWkVWh9cCOe6DxRBiFiPYicJTpfrKSIfSk01MDeY98Z5PQ', 'randomstring@random', 'FALSE'),
(159, 'zLdJ66W4tWudps67Z32xBxDSLGeGOGQHXznPDaJ1i6Lptp9iGW7rmKdVVPBZl2Vm', 'randomstring@random', 'FALSE'),
(160, 'pwPA1ugQT4qbmnLoousj0iMQfjNssVUUZZpuE6sxFfsWNafE4RZGWOAPa0PyEp29', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(161, '8NJIZqBCywmgHc9OM1QtKxSOz7ROJdvzowZFepUkumM1KurjR0eHkUOgkNequoPo', 'randomstring@random', 'FALSE'),
(162, 'UNpGlz4OIOmWIdCTW75195ZYBlQ0EC0FRB9y0qrWhZviwW1JRXvfyVFilIVMj38E', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(163, 'oHsAGcMwijHqqY5q4hhtAYrVBIt28Iwfewa8V97scsxWxufQ25lNeeJWPKoF22H1', 'bana.arne@sf.edu.ph', 'FALSE'),
(164, 'cGwWNKXuP7pW7s7VJPCNzWXDeBJFj6PHaaiKC0Hii4c3IJYvVfpQ3aT41jRQNS7V', 'bana.arne@sf.edu.ph', 'FALSE'),
(165, 'Mrcs49F8bvxzeXCJPQias74ZW8tIQPDgSv2Fjn5Rt6gDSV3SRwC2lMQLFEhDJIHW', 'bana.arne@sf.edu.ph', 'FALSE'),
(166, 'jVuDuWEjqEYWEYGFFG56W1TBTFEtME4cIkdcMV6K8pH7bsFeMXcuFETCTioAVS29', 'bana.arne@sf.edu.ph', 'FALSE'),
(167, '4Kf1xrxfFlYJMJTNdyokt7j0GSUUhAUylPwjghcXSZYcF12lPBZugFFsGcXlBy45', 'bana.arne@sf.edu.ph', 'FALSE'),
(168, 'zAGYeaqM8b1dhRZH0vZ2Jl3eDZ5rfMQFkcrv7B6T6EPHsOuL7jvWA1tPHJeiVil0', 'bana.arne@sf.edu.ph', 'FALSE'),
(169, 'r5dPbe4jm1KZMWYtGhitR3AN7UjQtcM7WGLzWC96cndqrpRVpfpSRwBjWI5tbGN8', 'randomstring@random', 'FALSE'),
(170, 'oytvQNHfFEKVYPVme4ccn5XkEC6zmZZweaGA6nyTfICIw6ItLnwNsSdecQq93Z6C', 'bana.arne@sf.edu.ph', 'FALSE'),
(171, 'vw6Z99zBgPwE5rWYuGmhCzF5B5nqdgFulNwuBvdAwQ6vGmKTgHkOtvjn2WnyPTpu', 'randomstring@random', 'FALSE'),
(172, '3GG8fNd2OM6J42BIASrypjd7eHaOHdE7yAwNNGD31LZIHJ8Ydy68qnqKGwVZBPCN', 'randomstring@random', 'FALSE'),
(173, 'Gn8LGHPSRQaT6rqeiAy1vQJt3BKRjXjcPTmB0Y34s9EVaAsq2p3KgHVRZRV2qyVd', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(174, 'DHwmBa5K14WZVE74RN9kYKPXHbvaOTEo1UZv1cX0FgL53G8brAxlpfk6G6Na5E9v', 'randomstring@random', 'FALSE'),
(175, 'g0GWA87Emsmjldk8W2jcHEdIkZvX9zz7rYadd3XTdIwnx6q2yEB6ZzeNT1eYeP38', 'tolentino.reynalyn@sf.edu.ph', 'FALSE'),
(176, 'y79jw5HzwEbLnSOciz4jVZTczkfQJI6WHsqtcccRkL7M4TmIMHWXvquOuw53w0Ji', 'randomstring@random', 'FALSE'),
(177, 'NPz1o1lwwBxwxTCSCXtQbb57pmKwa8UGsAXA6ie3W7tAj0kQq0M7zgb8PnlkBgdE', 'randomstring@random', 'FALSE'),
(178, '3vaROWYrkvibSJIejEBuEP8UMq6rbtkcOkP8RyFFhhfV8bfbTUQcJPjahhiv96hG', 'randomstring@random', 'FALSE'),
(179, 'qnrOorD6GKhcTe0mrKflqzWhN4YNKqtTimz4X5ZHzgy5Ag52qsTryEWirwYwNVzk', 'randomstring@random', 'FALSE'),
(180, 'KdlUjVBsfL1NCCzLu4Qjd4r2yDCc0c6m1huVI5q5eIT1vWD62ng7KzVqd4QZNf3y', 'randomstring@random', 'FALSE'),
(181, 'SbzvdlIkOXd83n9vT4UktBGdYSI0BoO8mOgjt7hj3mz2kdEO6NEZvqPk3xBS5y4H', 'randomstring@random', 'TRUE');

-- --------------------------------------------------------

--
-- Table structure for table `testing`
--

CREATE TABLE `testing` (
  `AccountID` int(11) NOT NULL,
  `GivenName` varchar(255) NOT NULL,
  `MiddleName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Birthdate` varchar(255) NOT NULL,
  `Age` int(11) NOT NULL,
  `Gender` varchar(25) NOT NULL,
  `GradeLevel` varchar(255) NOT NULL,
  `Section` varchar(255) NOT NULL,
  `GroupType` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_database`
--

CREATE TABLE `user_database` (
  `SessionID` int(11) NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `Answered` int(11) NOT NULL,
  `Unanswered` int(11) NOT NULL,
  `TimeSpent` double NOT NULL,
  `TimeStamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_logs`
--

CREATE TABLE `user_logs` (
  `inputID` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `input` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_email` varchar(255) NOT NULL,
  `session_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_logs`
--

INSERT INTO `user_logs` (`inputID`, `user`, `input`, `timestamp`, `user_email`, `session_id`) VALUES
(1, 'asdsa', 'sdsd', '2023-03-13 19:00:26', '', ''),
(213, 'User', 'testing lang', '2023-03-13 19:20:54', '', ''),
(214, 'User', 'what the', '2023-03-13 19:20:59', '', ''),
(215, 'User', 'testing lang', '2023-03-13 19:21:12', '', ''),
(216, 'User', 'o eto testing ha', '2023-03-13 19:23:17', '', ''),
(217, 'User', 'testing ulit to whiteboard!', '2023-03-13 19:23:33', '', ''),
(218, 'User', 'Hello there!', '2023-03-13 23:13:11', '', ''),
(219, 'User', 'testing', '2023-03-17 18:40:11', '', ''),
(220, 'User', 'testing', '2023-03-24 04:07:42', '', ''),
(221, 'User', '-23x-99=44x-15,', '2023-03-24 04:08:09', '', ''),
(222, 'User', '-1.25', '2023-03-24 04:08:23', '', ''),
(223, 'User', 'x = -1.25', '2023-03-24 04:08:31', '', ''),
(224, 'User', 'x = -0.9', '2023-03-26 22:37:02', '', ''),
(225, 'User', 'x = -0.90', '2023-03-26 22:37:04', '', ''),
(226, 'User', 'x=-0.9036144578313253', '2023-03-26 22:37:16', '', ''),
(227, 'User', 'x = -0.31', '2023-03-26 22:38:08', '', ''),
(228, 'User', 'x = -0.31', '2023-03-26 22:38:35', '', ''),
(229, 'User', 'asd', '2023-03-26 23:49:17', '', ''),
(230, 'User', 'tes', '2023-03-27 17:14:40', '', ''),
(231, 'User', 'testing', '2023-03-27 18:54:36', '', ''),
(232, 'User', '25x = 3x', '2023-03-28 01:19:54', '', ''),
(233, 'User', 'hello pia', '2023-03-28 01:20:06', '', ''),
(234, 'User', '39x=33x+5', '2023-03-28 01:21:46', '', ''),
(235, 'User', 'x = 0.83', '2023-03-28 01:22:11', '', ''),
(236, 'User', 'casda nixcasdfsdf', '2023-03-30 02:39:42', '', ''),
(237, 'User', '-1x-46=213', '2023-03-30 02:40:19', '', ''),
(238, 'User', 'x = -259', '2023-03-30 02:40:41', '', ''),
(239, 'User', 's23231231', '2023-03-30 02:42:47', '', ''),
(240, 'User', 'x2312313213', '2023-03-30 02:42:51', '', ''),
(241, 'User', 'a21312', '2023-03-30 02:43:03', '', ''),
(242, 'User', '12313x', '2023-03-30 02:43:09', '', ''),
(243, 'User', 'bobo ka', '2023-03-30 02:43:18', '', ''),
(244, 'User', 'idiot ka teacher', '2023-03-30 02:43:39', '', ''),
(245, 'User', 'tnga ako', '2023-03-30 02:43:51', '', ''),
(246, 'User', 'sadada', '2023-03-30 02:43:59', '', ''),
(247, 'User', 'dasdasd', '2023-03-30 02:44:00', '', ''),
(248, 'User', 'fgh', '2023-03-30 02:44:01', '', ''),
(249, 'User', 'fghf', '2023-03-30 02:44:02', '', ''),
(250, 'User', 'bobo ng developer', '2023-03-30 02:44:11', '', ''),
(251, 'User', 'tanga ka po', '2023-03-30 02:44:21', '', ''),
(252, 'User', 'boob bobobo ako', '2023-03-30 02:44:25', '', ''),
(253, 'User', 'asd', '2023-03-30 02:46:31', '', ''),
(254, 'User', 'asd', '2023-03-30 02:46:31', '', ''),
(255, 'User', 'asd', '2023-03-30 02:46:32', '', ''),
(256, 'User', 'as', '2023-03-30 02:46:32', '', ''),
(257, 'User', 'das', '2023-03-30 02:46:32', '', ''),
(258, 'User', 'd', '2023-03-30 02:46:32', '', ''),
(259, 'User', 'sad', '2023-03-30 02:46:32', '', ''),
(260, 'User', 'sa', '2023-03-30 02:46:32', '', ''),
(261, 'User', 'dsa', '2023-03-30 02:46:33', '', ''),
(262, 'User', 'ds', '2023-03-30 02:46:33', '', ''),
(263, 'User', 'ad', '2023-03-30 02:46:33', '', ''),
(264, 'User', 'sad', '2023-03-30 02:46:33', '', ''),
(265, 'User', 'sa', '2023-03-30 02:46:33', '', ''),
(266, 'User', 'dsa', '2023-03-30 02:46:34', '', ''),
(267, 'User', 'ds', '2023-03-30 02:46:34', '', ''),
(268, 'User', 'ad', '2023-03-30 02:46:34', '', ''),
(269, 'User', 'asdsa', '2023-03-30 02:46:42', '', ''),
(270, 'User', 'dsa', '2023-03-30 02:46:42', '', ''),
(271, 'User', 'd', '2023-03-30 02:46:43', '', ''),
(272, 'User', 'ad', '2023-03-30 02:46:43', '', ''),
(273, 'User', 'ad', '2023-03-30 02:46:43', '', ''),
(274, 'User', 'a', '2023-03-30 02:46:43', '', ''),
(275, 'User', 'd', '2023-03-30 02:46:43', '', ''),
(276, 'User', 'ad', '2023-03-30 02:46:44', '', ''),
(277, 'User', 'ad', '2023-03-30 02:46:44', '', ''),
(278, 'User', 'a', '2023-03-30 02:46:44', '', ''),
(279, 'User', 'dasdasd', '2023-03-30 02:46:45', '', ''),
(280, 'User', 'ad', '2023-03-30 02:46:45', '', ''),
(281, 'User', 'testsdfsf', '2023-03-30 22:44:24', '', ''),
(282, 'User', 'xzxz', '2023-03-31 00:27:01', '', ''),
(283, 'User', 'sadas', '2023-03-31 00:28:28', '', ''),
(284, 'User', 'd', '2023-03-31 00:28:28', '', ''),
(285, 'User', 'asd', '2023-03-31 00:28:28', '', ''),
(286, 'User', 'as', '2023-03-31 00:28:28', '', ''),
(287, 'User', 'das', '2023-03-31 00:28:28', '', ''),
(288, 'User', 'd', '2023-03-31 00:28:29', '', ''),
(289, 'User', 'as', '2023-03-31 00:28:29', '', ''),
(290, 'User', 'das', '2023-03-31 00:28:29', '', ''),
(291, 'User', 'ds', '2023-03-31 00:28:29', '', ''),
(292, 'User', 'ds', '2023-03-31 00:28:29', '', ''),
(293, 'User', 'd', '2023-03-31 00:28:30', '', ''),
(294, 'User', 's', '2023-03-31 00:28:30', '', ''),
(295, 'User', 'test', '2023-04-04 19:41:10', '', ''),
(296, 'User', 's', '2023-04-04 21:04:49', '', ''),
(297, 'User', 'asd', '2023-04-04 21:06:44', '', ''),
(298, 'User', 'testing', '2023-04-04 21:12:09', 'delacruz_johnlorenz', '15'),
(299, '', 'hello pi', '2023-04-04 21:19:02', '', ''),
(300, '', 'asd', '2023-04-04 21:19:44', 'delacruz_johnlorenz', ''),
(301, '', 'testing', '2023-04-04 21:21:17', 'delacruz_johnlorenz', ''),
(302, '', 'again', '2023-04-04 21:22:00', 'delacruz_johnlorenz', ''),
(303, '', 'a', '2023-04-04 21:22:46', 'delacruz_johnlorenz', ''),
(304, '', 'asda', '2023-04-04 21:23:43', 'delacruz_johnlorenz', ''),
(305, '', 'asd', '2023-04-04 21:25:08', 'delacruz_johnlorenz', ''),
(306, '', 'hellp', '2023-04-04 21:25:31', 'delacruz_johnlorenz', ''),
(307, '', 'asda', '2023-04-04 21:25:51', 'delacruz_johnlorenz', ''),
(308, '', 'asd', '2023-04-04 21:26:24', 'delacruz_johnlorenz', ''),
(309, '', 'asd', '2023-04-04 21:26:46', 'delacruz_johnlorenz', ''),
(310, '', 'zxcx', '2023-04-04 21:27:39', 'delacruz_johnlorenz', ''),
(311, '', 'asd', '2023-04-04 21:27:51', 'delacruz_johnlorenz', ''),
(312, '', 'xc', '2023-04-04 21:28:16', 'delacruz_johnlorenz', ''),
(313, '', 'asd', '2023-04-04 21:29:21', 'delacruz_johnlorenz', ''),
(314, 'John%20Lorenz', 'as', '2023-04-04 21:30:58', 'delacruz_johnlorenz', '15&John%20Lorenz'),
(315, '', 'z', '2023-04-04 21:31:29', 'delacruz_johnlorenz@15', ''),
(316, 'John%20Lorenz', 'zx', '2023-04-04 21:31:43', 'delacruz_johnlorenz', '15&John%20Lorenz'),
(317, 'John%20Lorenz', 'x', '2023-04-04 21:33:55', 'delacruz_johnlorenz', '15&John%20Lorenz'),
(318, 'John%20Lorenz', 'x', '2023-04-04 21:36:00', 'delacruz_johnlorenz', '15&John%20Lorenz'),
(319, 'John%20Lorenz', 'zx', '2023-04-04 21:36:39', 'delacruz_johnlorenz', '15&John%20Lorenz'),
(320, 'John%20Lorenz', 'xc', '2023-04-04 21:36:50', 'delacruz_johnlorenz', '15&John%20'),
(321, '15&John%20Lorenz', 'zx', '2023-04-04 21:39:06', 'delacruz_johnlorenz', '15&John%20Lorenz'),
(322, '15&John%20Lorenz', 'zx', '2023-04-04 21:40:09', 'delacruz_johnlorenz@15&John%20Lorenz', ''),
(323, '15&John%20Lorenz', 'zx', '2023-04-04 21:40:45', 'delacruz_johnlorenz@15&John%20Lorenz', ''),
(324, '15&John%20Lorenz', 'as', '2023-04-04 21:41:21', 'delacruz_johnlorenz@15&John%20Lorenz', ''),
(325, 'John%20Lorenz', 'zx', '2023-04-04 21:42:12', 'delacruz_johnlorenz', '15@John%20Lorenz'),
(326, 'John%20Lorenz', 'zx', '2023-04-04 21:42:38', 'delacruz_johnlorenz', '15'),
(327, 'John%20Lorenz', 'z', '2023-04-04 21:44:03', 'delacruz_johnlorenz', '15@John%20Lorenz'),
(328, 'John%20Lorenz', 'zx', '2023-04-04 21:46:16', 'delacruz_johnlorenz', '15@John%20Lorenz'),
(329, 'John%20Lorenz', 'zx', '2023-04-04 21:49:25', 'delacruz_johnlorenz', '15'),
(330, 'John_Lorenz', 'z', '2023-04-04 21:50:25', 'delacruz_johnlorenz', '15'),
(331, 'John Lorenz', 'hello there', '2023-04-04 21:51:51', 'delacruz_johnlorenz', '15'),
(332, 'John Lorenz', 'again test', '2023-04-04 21:52:53', 'delacruz_johnlorenz', '15'),
(333, 'John Lorenz', '-10 = 56x', '2023-04-08 00:01:44', 'delacruz_johnlorenz', '21'),
(334, 'John Lorenz', 'John Lorenz: -10 = 56x', '2023-04-08 00:02:30', 'delacruz_johnlorenz', '21'),
(335, 'John Lorenz', 'John Lorenz: -10 = 56x', '2023-04-08 00:02:38', 'delacruz_johnlorenz', '21'),
(336, 'John Lorenz', 'John Lorenz: -10 = 56x', '2023-04-08 00:03:24', 'delacruz_johnlorenz', '21'),
(337, 'John Lorenz', 'John Lorenz: -10 = 56x', '2023-04-08 00:04:07', 'delacruz_johnlorenz', '21'),
(338, 'John Lorenz', 'John Lorenz: -10 = 56x', '2023-04-08 00:07:01', 'delacruz_johnlorenz', '21'),
(339, 'John Lorenz', '-10 = 56x', '2023-04-08 00:07:07', 'delacruz_johnlorenz', '21'),
(340, 'John Lorenz', '-10 = 56x', '2023-04-08 00:08:25', 'delacruz_johnlorenz', '21'),
(341, 'John Lorenz', '-10 = 56x', '2023-04-08 00:09:00', 'delacruz_johnlorenz', '21'),
(342, 'John Lorenz', '2x + 3 = 2', '2023-04-08 00:14:12', 'delacruz_johnlorenz', '21'),
(343, 'John Lorenz', '2x + 3', '2023-04-08 00:14:21', 'delacruz_johnlorenz', '21'),
(344, 'John Lorenz', '15 - 35 = 56x', '2023-04-08 00:18:15', 'delacruz_johnlorenz', '21'),
(345, 'John Lorenz', ' 15 - 35 = 56x', '2023-04-08 00:19:20', 'delacruz_johnlorenz', '21'),
(346, 'John Lorenz', '15 - 35xxx = 56x', '2023-04-08 00:19:32', 'delacruz_johnlorenz', '21'),
(347, 'John Lorenz', '15 - 35 = 56ab', '2023-04-08 00:19:37', 'delacruz_johnlorenz', '21'),
(348, 'John Lorenz', 'bobo mo', '2023-04-08 01:47:25', 'delacruz_johnlorenz', '21'),
(349, 'John Lorenz', 'bobo mo', '2023-04-08 01:49:27', 'delacruz_johnlorenz', '21'),
(350, 'John Lorenz', 'bobo mo', '2023-04-08 01:49:46', 'delacruz_johnlorenz', '21'),
(351, 'John Lorenz', 'asd 2', '2023-04-08 01:49:59', 'delacruz_johnlorenz', '21'),
(352, 'John Lorenz', 'haha bobo', '2023-04-08 01:50:08', 'delacruz_johnlorenz', '21'),
(353, 'John Lorenz', 'gago ka', '2023-04-08 01:50:46', 'delacruz_johnlorenz', '21'),
(354, 'John Lorenz', 'test', '2023-04-08 01:50:54', 'delacruz_johnlorenz', '21'),
(355, 'John Lorenz', 'bobo ka', '2023-04-08 01:50:59', 'delacruz_johnlorenz', '21'),
(356, 'John Lorenz', 'bobo ka', '2023-04-08 01:52:16', 'delacruz_johnlorenz', '21'),
(357, 'John Lorenz', 'sorry lods', '2023-04-08 01:52:20', 'delacruz_johnlorenz', '21'),
(358, 'John Lorenz', '2x + 3', '2023-04-08 01:52:27', 'delacruz_johnlorenz', '21'),
(359, 'John Lorenz', '2x  + 3=  2', '2023-04-08 01:53:27', 'delacruz_johnlorenz', '21'),
(360, 'John Lorenz', 'gasga', '2023-04-08 01:54:28', 'delacruz_johnlorenz', '21'),
(361, 'John Lorenz', '2x -5', '2023-04-08 01:54:33', 'delacruz_johnlorenz', '21'),
(362, 'John Lorenz', 'bobo ka', '2023-04-08 01:59:38', 'delacruz_johnlorenz', '21'),
(363, 'John Lorenz', 'bobo ka', '2023-04-08 02:10:25', 'delacruz_johnlorenz', '21'),
(364, 'John Lorenz', '2x + 3', '2023-04-08 02:11:54', 'delacruz_johnlorenz', '21'),
(365, 'John Lorenz', 'bobo ka', '2023-04-08 02:13:57', 'delacruz_johnlorenz', '21'),
(366, 'John Lorenz', 'gago aasda', '2023-04-08 02:14:01', 'delacruz_johnlorenz', '21'),
(367, 'John Lorenz', 'testing lang', '2023-04-08 02:17:45', 'delacruz_johnlorenz', '21'),
(368, 'John Lorenz', 'my bad', '2023-04-08 02:17:52', 'delacruz_johnlorenz', '21'),
(369, 'John Lorenz', 'x = -0.35', '2023-04-08 02:19:34', 'delacruz_johnlorenz', '21'),
(370, 'John Lorenz', 'x = 0.36', '2023-04-08 02:19:40', 'delacruz_johnlorenz', '21'),
(371, 'John Lorenz', 'x = -0.36', '2023-04-08 02:19:49', 'delacruz_johnlorenz', '21'),
(372, 'John Lorenz', 'x = -0.36', '2023-04-08 02:23:52', 'delacruz_johnlorenz', '21'),
(373, 'John Lorenz', 'asda', '2023-04-08 02:46:04', 'delacruz_johnlorenz', '21'),
(375, 'John Lorenz', 'Help Button clicked', '2023-04-08 20:19:44', 'delacruz_johnlorenz', '21'),
(376, 'John Lorenz', 'Help Button Clicked', '2023-04-08 20:21:29', 'delacruz_johnlorenz', '21'),
(377, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 20:21:29', 'delacruz_johnlorenz', '21'),
(378, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 20:21:30', 'delacruz_johnlorenz', '21'),
(379, 'John Lorenz', 'Clear Button Clicked', '2023-04-08 20:21:31', 'delacruz_johnlorenz', '21'),
(380, 'John Lorenz', 'Help Button Clicked', '2023-04-08 20:21:36', 'delacruz_johnlorenz', '21'),
(381, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 20:21:37', 'delacruz_johnlorenz', '21'),
(382, 'John Lorenz', 'Help Button Clicked', '2023-04-08 20:21:39', 'delacruz_johnlorenz', '21'),
(383, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 20:25:04', 'delacruz_johnlorenz', '21'),
(384, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 20:25:12', 'delacruz_johnlorenz', '21'),
(385, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 20:26:39', 'delacruz_johnlorenz', '21'),
(386, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 20:26:50', 'delacruz_johnlorenz', '21'),
(387, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 20:26:51', 'delacruz_johnlorenz', '21'),
(388, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 20:26:52', 'delacruz_johnlorenz', '21'),
(389, 'John Lorenz', 'Help Button Clicked', '2023-04-08 20:26:55', 'delacruz_johnlorenz', '21'),
(390, 'John Lorenz', 'Help Button Clicked', '2023-04-08 20:27:05', 'delacruz_johnlorenz', '21'),
(391, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 20:28:27', 'delacruz_johnlorenz', '21'),
(392, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 20:28:30', 'delacruz_johnlorenz', '21'),
(393, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:01:24', 'delacruz_johnlorenz', '21'),
(394, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:01:28', 'delacruz_johnlorenz', '21'),
(395, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:01:28', 'delacruz_johnlorenz', '21'),
(396, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:01:29', 'delacruz_johnlorenz', '21'),
(397, '', '', '2023-04-08 22:01:43', '@Hint_Button_Clicked', ''),
(398, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:01:44', 'delacruz_johnlorenz', '21'),
(399, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:01:51', 'delacruz_johnlorenz', '21'),
(400, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:01:53', 'delacruz_johnlorenz', '21'),
(401, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:01:53', 'delacruz_johnlorenz', '21'),
(402, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:01:55', 'delacruz_johnlorenz', '21'),
(403, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:04:29', 'delacruz_johnlorenz', '21'),
(404, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:04:30', 'delacruz_johnlorenz', '21'),
(405, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:04:31', 'delacruz_johnlorenz', '21'),
(406, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:04:33', 'delacruz_johnlorenz', '21'),
(407, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:04:35', 'delacruz_johnlorenz', '21'),
(408, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:04:36', 'delacruz_johnlorenz', '21'),
(409, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:04:39', 'delacruz_johnlorenz', '21'),
(410, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:04:40', 'delacruz_johnlorenz', '21'),
(411, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:04:40', 'delacruz_johnlorenz', '21'),
(412, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:04:42', 'delacruz_johnlorenz', '21'),
(413, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:04:43', 'delacruz_johnlorenz', '21'),
(414, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:04:47', 'delacruz_johnlorenz', '21'),
(415, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:04:50', 'delacruz_johnlorenz', '21'),
(416, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:04:52', 'delacruz_johnlorenz', '21'),
(417, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:04:54', 'delacruz_johnlorenz', '21'),
(418, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:04:57', 'delacruz_johnlorenz', '21'),
(419, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:04:58', 'delacruz_johnlorenz', '21'),
(420, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:04:58', 'delacruz_johnlorenz', '21'),
(421, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:04:59', 'delacruz_johnlorenz', '21'),
(422, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:05:00', 'delacruz_johnlorenz', '21'),
(423, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:05:01', 'delacruz_johnlorenz', '21'),
(424, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:05:02', 'delacruz_johnlorenz', '21'),
(425, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:05:02', 'delacruz_johnlorenz', '21'),
(426, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:05:03', 'delacruz_johnlorenz', '21'),
(427, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:05:06', 'delacruz_johnlorenz', '21'),
(428, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:05:21', 'delacruz_johnlorenz', '21'),
(429, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:05:22', 'delacruz_johnlorenz', '21'),
(430, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:05:36', 'delacruz_johnlorenz', '21'),
(431, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:06:06', 'delacruz_johnlorenz', '21'),
(432, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:06:09', 'delacruz_johnlorenz', '21'),
(433, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:06:15', 'delacruz_johnlorenz', '21'),
(434, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:06:18', 'delacruz_johnlorenz', '21'),
(435, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:06:29', 'delacruz_johnlorenz', '21'),
(436, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:06:29', 'delacruz_johnlorenz', '21'),
(437, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:06:35', 'delacruz_johnlorenz', '21'),
(438, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:06:36', 'delacruz_johnlorenz', '21'),
(439, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:06:37', 'delacruz_johnlorenz', '21'),
(440, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:06:38', 'delacruz_johnlorenz', '21'),
(441, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:06:39', 'delacruz_johnlorenz', '21'),
(442, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:06:40', 'delacruz_johnlorenz', '21'),
(443, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:06:47', 'delacruz_johnlorenz', '21'),
(444, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:06:48', 'delacruz_johnlorenz', '21'),
(445, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:06:59', 'delacruz_johnlorenz', '21'),
(446, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:07:00', 'delacruz_johnlorenz', '21'),
(447, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:07:02', 'delacruz_johnlorenz', '21'),
(448, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:07:03', 'delacruz_johnlorenz', '21'),
(449, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:07:03', 'delacruz_johnlorenz', '21'),
(450, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:07:04', 'delacruz_johnlorenz', '21'),
(451, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:07:05', 'delacruz_johnlorenz', '21'),
(452, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:07:06', 'delacruz_johnlorenz', '21'),
(453, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:07:06', 'delacruz_johnlorenz', '21'),
(454, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:07:08', 'delacruz_johnlorenz', '21'),
(455, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:07:09', 'delacruz_johnlorenz', '21'),
(456, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:08:09', 'delacruz_johnlorenz', '21'),
(457, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:08:10', 'delacruz_johnlorenz', '21'),
(458, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:08:10', 'delacruz_johnlorenz', '21'),
(459, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:09:24', 'delacruz_johnlorenz', '21'),
(460, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:09:25', 'delacruz_johnlorenz', '21'),
(461, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:09:25', 'delacruz_johnlorenz', '21'),
(462, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:09:26', 'delacruz_johnlorenz', '21'),
(463, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:09:26', 'delacruz_johnlorenz', '21'),
(464, 'John Lorenz', 'Hint Button Clicked', '2023-04-08 22:09:27', 'delacruz_johnlorenz', '21'),
(465, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:13:51', 'delacruz_johnlorenz', '21'),
(466, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:14:09', 'delacruz_johnlorenz', '21'),
(467, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:14:15', 'delacruz_johnlorenz', '21'),
(468, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:15:36', 'delacruz_johnlorenz', '21'),
(469, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:17:01', 'delacruz_johnlorenz', '21'),
(470, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:17:19', 'delacruz_johnlorenz', '21'),
(471, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:17:27', 'delacruz_johnlorenz', '21'),
(472, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:17:54', 'delacruz_johnlorenz', '21'),
(473, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:17:55', 'delacruz_johnlorenz', '21'),
(474, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:18:48', 'delacruz_johnlorenz', '21'),
(475, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:18:57', 'delacruz_johnlorenz', '21'),
(476, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:19:03', 'delacruz_johnlorenz', '21'),
(477, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:20:37', 'delacruz_johnlorenz', '21'),
(478, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:20:38', 'delacruz_johnlorenz', '21'),
(479, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:21:04', 'delacruz_johnlorenz', '21'),
(480, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:21:07', 'delacruz_johnlorenz', '21'),
(481, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:21:27', 'delacruz_johnlorenz', '21'),
(482, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:22:15', 'delacruz_johnlorenz', '21'),
(483, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:22:16', 'delacruz_johnlorenz', '21'),
(484, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:22:17', 'delacruz_johnlorenz', '21'),
(485, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:22:29', 'delacruz_johnlorenz', '21'),
(486, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:22:40', 'delacruz_johnlorenz', '21'),
(487, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:23:58', 'delacruz_johnlorenz', '21'),
(488, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:24:03', 'delacruz_johnlorenz', '21'),
(489, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:24:11', 'delacruz_johnlorenz', '21'),
(490, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:24:24', 'delacruz_johnlorenz', '21'),
(491, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:24:26', 'delacruz_johnlorenz', '21'),
(492, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:24:31', 'delacruz_johnlorenz', '21'),
(493, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:24:35', 'delacruz_johnlorenz', '21'),
(494, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:25:18', 'delacruz_johnlorenz', '21'),
(495, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:25:27', 'delacruz_johnlorenz', '21'),
(496, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:26:25', 'delacruz_johnlorenz', '21'),
(497, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:26:29', 'delacruz_johnlorenz', '21'),
(498, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:27:37', 'delacruz_johnlorenz', '21'),
(499, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:28:20', 'delacruz_johnlorenz', '21'),
(500, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:28:22', 'delacruz_johnlorenz', '21'),
(501, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:28:22', 'delacruz_johnlorenz', '21'),
(502, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:36:13', 'delacruz_johnlorenz', '21'),
(503, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:36:14', 'delacruz_johnlorenz', '21'),
(504, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:36:16', 'delacruz_johnlorenz', '21'),
(505, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:36:18', 'delacruz_johnlorenz', '21'),
(506, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:36:57', 'delacruz_johnlorenz', '21'),
(507, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:36:58', 'delacruz_johnlorenz', '21'),
(508, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:37:01', 'delacruz_johnlorenz', '21'),
(509, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:37:02', 'delacruz_johnlorenz', '21'),
(510, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:37:04', 'delacruz_johnlorenz', '21'),
(511, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:37:04', 'delacruz_johnlorenz', '21'),
(512, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:30', 'delacruz_johnlorenz', '21'),
(513, '', '', '2023-04-08 22:37:30', '@Tutorial_Button_Clicked', ''),
(514, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:30', 'delacruz_johnlorenz', '21'),
(515, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:32', 'delacruz_johnlorenz', '21'),
(516, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:32', 'delacruz_johnlorenz', '21'),
(517, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:33', 'delacruz_johnlorenz', '21'),
(518, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:34', 'delacruz_johnlorenz', '21'),
(519, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:34', 'delacruz_johnlorenz', '21'),
(520, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:50', 'delacruz_johnlorenz', '21'),
(521, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:51', 'delacruz_johnlorenz', '21'),
(522, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:51', 'delacruz_johnlorenz', '21'),
(523, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:51', 'delacruz_johnlorenz', '21'),
(524, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:52', 'delacruz_johnlorenz', '21'),
(525, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:52', 'delacruz_johnlorenz', '21'),
(526, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:52', 'delacruz_johnlorenz', '21'),
(527, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:52', 'delacruz_johnlorenz', '21'),
(528, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:53', 'delacruz_johnlorenz', '21'),
(529, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:37:53', 'delacruz_johnlorenz', '21'),
(530, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:39:31', 'delacruz_johnlorenz', '21'),
(531, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:39:31', 'delacruz_johnlorenz', '21'),
(532, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:39:32', 'delacruz_johnlorenz', '21'),
(533, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:39:32', 'delacruz_johnlorenz', '21'),
(534, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:39:32', 'delacruz_johnlorenz', '21'),
(535, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:39:32', 'delacruz_johnlorenz', '21'),
(536, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:39:32', 'delacruz_johnlorenz', '21'),
(537, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:39:32', 'delacruz_johnlorenz', '21'),
(538, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:39:33', 'delacruz_johnlorenz', '21'),
(539, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:40:02', 'delacruz_johnlorenz', '21'),
(540, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:40:04', 'delacruz_johnlorenz', '21'),
(541, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:40:05', 'delacruz_johnlorenz', '21'),
(542, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:05', 'delacruz_johnlorenz', '21'),
(543, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:05', 'delacruz_johnlorenz', '21'),
(544, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:05', 'delacruz_johnlorenz', '21'),
(545, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:06', 'delacruz_johnlorenz', '21'),
(546, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:06', 'delacruz_johnlorenz', '21'),
(547, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:07', 'delacruz_johnlorenz', '21'),
(548, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:07', 'delacruz_johnlorenz', '21'),
(549, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:08', 'delacruz_johnlorenz', '21'),
(550, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:08', 'delacruz_johnlorenz', '21'),
(551, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:09', 'delacruz_johnlorenz', '21'),
(552, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:12', 'delacruz_johnlorenz', '21'),
(553, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:12', 'delacruz_johnlorenz', '21'),
(554, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:13', 'delacruz_johnlorenz', '21'),
(555, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:13', 'delacruz_johnlorenz', '21'),
(556, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:14', 'delacruz_johnlorenz', '21'),
(557, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:14', 'delacruz_johnlorenz', '21'),
(558, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:22', 'delacruz_johnlorenz', '21'),
(559, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:22', 'delacruz_johnlorenz', '21'),
(560, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:24', 'delacruz_johnlorenz', '21'),
(561, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:24', 'delacruz_johnlorenz', '21'),
(562, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:53', 'delacruz_johnlorenz', '21'),
(563, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:42:54', 'delacruz_johnlorenz', '21'),
(564, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:19', 'delacruz_johnlorenz', '21'),
(565, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:19', 'delacruz_johnlorenz', '21'),
(566, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:20', 'delacruz_johnlorenz', '21'),
(567, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:21', 'delacruz_johnlorenz', '21'),
(568, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:21', 'delacruz_johnlorenz', '21'),
(569, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:23', 'delacruz_johnlorenz', '21'),
(570, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:24', 'delacruz_johnlorenz', '21'),
(571, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:24', 'delacruz_johnlorenz', '21'),
(572, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:24', 'delacruz_johnlorenz', '21'),
(573, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:27', 'delacruz_johnlorenz', '21'),
(574, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:39', 'delacruz_johnlorenz', '21'),
(575, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:40', 'delacruz_johnlorenz', '21'),
(576, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:41', 'delacruz_johnlorenz', '21'),
(577, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:41', 'delacruz_johnlorenz', '21'),
(578, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:42', 'delacruz_johnlorenz', '21'),
(579, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:43:46', 'delacruz_johnlorenz', '21'),
(580, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:44:55', 'delacruz_johnlorenz', '21'),
(581, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:44:58', 'delacruz_johnlorenz', '21'),
(582, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:44:59', 'delacruz_johnlorenz', '21'),
(583, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:45:04', 'delacruz_johnlorenz', '21'),
(584, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:45:05', 'delacruz_johnlorenz', '21'),
(585, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:45:06', 'delacruz_johnlorenz', '21'),
(586, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:45:07', 'delacruz_johnlorenz', '21'),
(587, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:45:08', 'delacruz_johnlorenz', '21'),
(588, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:45:10', 'delacruz_johnlorenz', '21'),
(589, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:45:11', 'delacruz_johnlorenz', '21'),
(590, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:45:13', 'delacruz_johnlorenz', '21'),
(591, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:45:14', 'delacruz_johnlorenz', '21'),
(592, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:45:41', 'delacruz_johnlorenz', '21'),
(593, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:45:47', 'delacruz_johnlorenz', '21'),
(594, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:45:48', 'delacruz_johnlorenz', '21'),
(595, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:45:49', 'delacruz_johnlorenz', '21'),
(596, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:45:51', 'delacruz_johnlorenz', '21'),
(597, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:45:52', 'delacruz_johnlorenz', '21'),
(598, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:45:53', 'delacruz_johnlorenz', '21'),
(599, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:45:54', 'delacruz_johnlorenz', '21'),
(600, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:45:54', 'delacruz_johnlorenz', '21'),
(601, 'John Lorenz', 'Pen Button Clicked', '2023-04-08 22:45:55', 'delacruz_johnlorenz', '21'),
(602, 'John Lorenz', 'Help Button Clicked', '2023-04-08 22:45:56', 'delacruz_johnlorenz', '21'),
(603, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:45:57', 'delacruz_johnlorenz', '21'),
(604, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:45:59', 'delacruz_johnlorenz', '21'),
(605, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:46:01', 'delacruz_johnlorenz', '21'),
(606, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:46:14', 'delacruz_johnlorenz', '21'),
(607, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-08 22:46:15', 'delacruz_johnlorenz', '21'),
(608, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:22:58', 'delacruz_johnlorenz', '21'),
(609, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:23:03', 'delacruz_johnlorenz', '21'),
(610, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:23:03', 'delacruz_johnlorenz', '21'),
(611, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:23:37', 'delacruz_johnlorenz', '21'),
(612, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:23:37', 'delacruz_johnlorenz', '21'),
(613, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:23:46', 'delacruz_johnlorenz', '21'),
(614, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:23:47', 'delacruz_johnlorenz', '21'),
(615, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:23:47', 'delacruz_johnlorenz', '21'),
(616, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:23:47', 'delacruz_johnlorenz', '21'),
(617, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:24:04', 'delacruz_johnlorenz', '21'),
(618, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:24:05', 'delacruz_johnlorenz', '21'),
(619, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:24:06', 'delacruz_johnlorenz', '21'),
(620, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:25:36', 'delacruz_johnlorenz', '21'),
(621, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:26:07', 'delacruz_johnlorenz', '21'),
(622, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:26:23', 'delacruz_johnlorenz', '21'),
(623, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:26:24', 'delacruz_johnlorenz', '21'),
(624, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:26:28', 'delacruz_johnlorenz', '21'),
(625, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:26:28', 'delacruz_johnlorenz', '21'),
(626, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:26:29', 'delacruz_johnlorenz', '21'),
(627, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:26:30', 'delacruz_johnlorenz', '21'),
(628, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:26:38', 'delacruz_johnlorenz', '21'),
(629, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:26:39', 'delacruz_johnlorenz', '21'),
(630, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:31:53', 'delacruz_johnlorenz', '21'),
(631, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:31:53', 'delacruz_johnlorenz', '21'),
(632, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:31:54', 'delacruz_johnlorenz', '21'),
(633, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:32:04', 'delacruz_johnlorenz', '21'),
(634, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:32:11', 'delacruz_johnlorenz', '21'),
(635, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:32:55', 'delacruz_johnlorenz', '21'),
(636, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:33:13', 'delacruz_johnlorenz', '21'),
(637, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:33:14', 'delacruz_johnlorenz', '21'),
(638, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:33:30', 'delacruz_johnlorenz', '21'),
(639, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:33:35', 'delacruz_johnlorenz', '21'),
(640, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:34:16', 'delacruz_johnlorenz', '21'),
(641, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:34:59', 'delacruz_johnlorenz', '21'),
(642, 'John Lorenz', 'Help Button Clicked', '2023-04-09 00:35:01', 'delacruz_johnlorenz', '21'),
(643, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:35:02', 'delacruz_johnlorenz', '21'),
(644, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:35:40', 'delacruz_johnlorenz', '21'),
(645, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:35:40', 'delacruz_johnlorenz', '21'),
(646, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:35:45', 'delacruz_johnlorenz', '21'),
(647, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:35:45', 'delacruz_johnlorenz', '21'),
(648, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:38:42', 'delacruz_johnlorenz', '21'),
(649, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:38:59', 'delacruz_johnlorenz', '21'),
(650, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:38:59', 'delacruz_johnlorenz', '21'),
(651, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:39:00', 'delacruz_johnlorenz', '21'),
(652, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:39:00', 'delacruz_johnlorenz', '21'),
(653, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:39:01', 'delacruz_johnlorenz', '21'),
(654, 'John Lorenz', 'Help Button Clicked', '2023-04-09 00:39:20', 'delacruz_johnlorenz', '21'),
(655, 'John Lorenz', 'Help Button Clicked', '2023-04-09 00:39:25', 'delacruz_johnlorenz', '21'),
(656, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:39:34', 'delacruz_johnlorenz', '21'),
(657, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:39:35', 'delacruz_johnlorenz', '21'),
(658, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:41:00', 'delacruz_johnlorenz', '21'),
(659, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:41', 'delacruz_johnlorenz', '21'),
(660, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:41', 'delacruz_johnlorenz', '21'),
(661, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:43', 'delacruz_johnlorenz', '21'),
(662, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:43', 'delacruz_johnlorenz', '21'),
(663, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:44', 'delacruz_johnlorenz', '21'),
(664, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:44', 'delacruz_johnlorenz', '21'),
(665, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:45', 'delacruz_johnlorenz', '21'),
(666, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:46', 'delacruz_johnlorenz', '21'),
(667, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:46', 'delacruz_johnlorenz', '21'),
(668, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:46', 'delacruz_johnlorenz', '21'),
(669, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:47', 'delacruz_johnlorenz', '21'),
(670, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:47', 'delacruz_johnlorenz', '21'),
(671, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:47', 'delacruz_johnlorenz', '21'),
(672, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:47', 'delacruz_johnlorenz', '21'),
(673, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:47', 'delacruz_johnlorenz', '21'),
(674, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:47', 'delacruz_johnlorenz', '21'),
(675, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:48', 'delacruz_johnlorenz', '21'),
(676, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:48', 'delacruz_johnlorenz', '21'),
(677, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:48', 'delacruz_johnlorenz', '21'),
(678, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:48', 'delacruz_johnlorenz', '21'),
(679, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:48', 'delacruz_johnlorenz', '21'),
(680, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:49', 'delacruz_johnlorenz', '21'),
(681, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:49', 'delacruz_johnlorenz', '21'),
(682, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:49', 'delacruz_johnlorenz', '21'),
(683, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:49', 'delacruz_johnlorenz', '21'),
(684, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:50', 'delacruz_johnlorenz', '21'),
(685, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:50', 'delacruz_johnlorenz', '21'),
(686, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:50', 'delacruz_johnlorenz', '21'),
(687, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:51', 'delacruz_johnlorenz', '21'),
(688, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:51', 'delacruz_johnlorenz', '21'),
(689, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:51', 'delacruz_johnlorenz', '21'),
(690, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:51', 'delacruz_johnlorenz', '21'),
(691, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:52', 'delacruz_johnlorenz', '21'),
(692, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:52', 'delacruz_johnlorenz', '21'),
(693, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:53', 'delacruz_johnlorenz', '21'),
(694, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:53', 'delacruz_johnlorenz', '21'),
(695, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:50:54', 'delacruz_johnlorenz', '21'),
(696, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:25', 'delacruz_johnlorenz', '21'),
(697, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:26', 'delacruz_johnlorenz', '21'),
(698, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:26', 'delacruz_johnlorenz', '21'),
(699, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:27', 'delacruz_johnlorenz', '21'),
(700, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:27', 'delacruz_johnlorenz', '21'),
(701, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:28', 'delacruz_johnlorenz', '21'),
(702, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:28', 'delacruz_johnlorenz', '21'),
(703, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:28', 'delacruz_johnlorenz', '21'),
(704, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:29', 'delacruz_johnlorenz', '21'),
(705, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:29', 'delacruz_johnlorenz', '21'),
(706, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:29', 'delacruz_johnlorenz', '21'),
(707, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:30', 'delacruz_johnlorenz', '21'),
(708, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:30', 'delacruz_johnlorenz', '21'),
(709, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:30', 'delacruz_johnlorenz', '21'),
(710, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:31', 'delacruz_johnlorenz', '21'),
(711, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:31', 'delacruz_johnlorenz', '21'),
(712, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:31', 'delacruz_johnlorenz', '21'),
(713, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:32', 'delacruz_johnlorenz', '21'),
(714, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:32', 'delacruz_johnlorenz', '21'),
(715, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:33', 'delacruz_johnlorenz', '21'),
(716, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:33', 'delacruz_johnlorenz', '21'),
(717, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:34', 'delacruz_johnlorenz', '21'),
(718, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:34', 'delacruz_johnlorenz', '21'),
(719, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:36', 'delacruz_johnlorenz', '21'),
(720, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:37', 'delacruz_johnlorenz', '21'),
(721, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:37', 'delacruz_johnlorenz', '21'),
(722, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:37', 'delacruz_johnlorenz', '21'),
(723, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:39', 'delacruz_johnlorenz', '21'),
(724, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:39', 'delacruz_johnlorenz', '21'),
(725, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:40', 'delacruz_johnlorenz', '21'),
(726, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:40', 'delacruz_johnlorenz', '21'),
(727, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:40', 'delacruz_johnlorenz', '21'),
(728, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:54', 'delacruz_johnlorenz', '21'),
(729, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:54', 'delacruz_johnlorenz', '21'),
(730, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:54', 'delacruz_johnlorenz', '21'),
(731, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:51:56', 'delacruz_johnlorenz', '21'),
(732, 'John Lorenz', 'Help Button Clicked', '2023-04-09 00:52:29', 'delacruz_johnlorenz', '21'),
(733, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-09 00:52:33', 'delacruz_johnlorenz', '21'),
(734, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:52:35', 'delacruz_johnlorenz', '21'),
(735, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-09 00:52:35', 'delacruz_johnlorenz', '21'),
(736, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:52:44', 'delacruz_johnlorenz', '21'),
(737, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-09 00:52:51', 'delacruz_johnlorenz', '21'),
(738, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:52:51', 'delacruz_johnlorenz', '21'),
(739, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:52:55', 'delacruz_johnlorenz', '21'),
(740, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:52:56', 'delacruz_johnlorenz', '21'),
(741, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:53:05', 'delacruz_johnlorenz', '21'),
(742, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:53:06', 'delacruz_johnlorenz', '21'),
(743, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:53:07', 'delacruz_johnlorenz', '21'),
(744, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:53:45', 'delacruz_johnlorenz', '21'),
(745, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:53:47', 'delacruz_johnlorenz', '21'),
(746, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:54:22', 'delacruz_johnlorenz', '21'),
(747, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:54:26', 'delacruz_johnlorenz', '21'),
(748, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:54:40', 'delacruz_johnlorenz', '21'),
(749, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:54:43', 'delacruz_johnlorenz', '21'),
(750, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:54:44', 'delacruz_johnlorenz', '21'),
(751, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:54:46', 'delacruz_johnlorenz', '21'),
(752, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:55:37', 'delacruz_johnlorenz', '21'),
(753, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:55:38', 'delacruz_johnlorenz', '21'),
(754, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:55:39', 'delacruz_johnlorenz', '21'),
(755, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 00:55:39', 'delacruz_johnlorenz', '21'),
(756, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:01:24', 'delacruz_johnlorenz', '21'),
(757, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:01:26', 'delacruz_johnlorenz', '21'),
(758, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:02:00', 'delacruz_johnlorenz', '21'),
(759, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:02:01', 'delacruz_johnlorenz', '21'),
(760, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:02:16', 'delacruz_johnlorenz', '21'),
(761, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:30', 'delacruz_johnlorenz', '21'),
(762, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:31', 'delacruz_johnlorenz', '21'),
(763, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:38', 'delacruz_johnlorenz', '21'),
(764, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:38', 'delacruz_johnlorenz', '21'),
(765, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:39', 'delacruz_johnlorenz', '21'),
(766, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:39', 'delacruz_johnlorenz', '21'),
(767, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:39', 'delacruz_johnlorenz', '21'),
(768, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:42', 'delacruz_johnlorenz', '21'),
(769, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:43', 'delacruz_johnlorenz', '21'),
(770, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:43', 'delacruz_johnlorenz', '21'),
(771, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:45', 'delacruz_johnlorenz', '21'),
(772, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:51', 'delacruz_johnlorenz', '21'),
(773, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:03:52', 'delacruz_johnlorenz', '21'),
(774, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:04', 'delacruz_johnlorenz', '21'),
(775, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:05', 'delacruz_johnlorenz', '21'),
(776, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:05', 'delacruz_johnlorenz', '21'),
(777, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:12', 'delacruz_johnlorenz', '21'),
(778, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:26', 'delacruz_johnlorenz', '21'),
(779, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:26', 'delacruz_johnlorenz', '21'),
(780, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:27', 'delacruz_johnlorenz', '21');
INSERT INTO `user_logs` (`inputID`, `user`, `input`, `timestamp`, `user_email`, `session_id`) VALUES
(781, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:27', 'delacruz_johnlorenz', '21'),
(782, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:28', 'delacruz_johnlorenz', '21'),
(783, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:28', 'delacruz_johnlorenz', '21'),
(784, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:31', 'delacruz_johnlorenz', '21'),
(785, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:04:31', 'delacruz_johnlorenz', '21'),
(786, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:05:26', 'delacruz_johnlorenz', '21'),
(787, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:05:27', 'delacruz_johnlorenz', '21'),
(788, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:05:30', 'delacruz_johnlorenz', '21'),
(789, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:05:30', 'delacruz_johnlorenz', '21'),
(790, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:05:35', 'delacruz_johnlorenz', '21'),
(791, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:05:40', 'delacruz_johnlorenz', '21'),
(792, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:05:49', 'delacruz_johnlorenz', '21'),
(793, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:06:16', 'delacruz_johnlorenz', '21'),
(794, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:06:17', 'delacruz_johnlorenz', '21'),
(795, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:06:17', 'delacruz_johnlorenz', '21'),
(796, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:06:17', 'delacruz_johnlorenz', '21'),
(797, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:06:21', 'delacruz_johnlorenz', '21'),
(798, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:06:25', 'delacruz_johnlorenz', '21'),
(799, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:06:26', 'delacruz_johnlorenz', '21'),
(800, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:06:27', 'delacruz_johnlorenz', '21'),
(801, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:41:14', 'delacruz_johnlorenz', '21'),
(802, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:43:35', 'delacruz_johnlorenz', '21'),
(803, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:43:56', 'delacruz_johnlorenz', '21'),
(804, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:43:56', 'delacruz_johnlorenz', '21'),
(805, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:43:59', 'delacruz_johnlorenz', '21'),
(806, 'John Lorenz', 'Help Button Clicked', '2023-04-09 01:44:00', 'delacruz_johnlorenz', '21'),
(807, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:44:05', 'delacruz_johnlorenz', '21'),
(808, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:48:52', 'delacruz_johnlorenz', '21'),
(809, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:48:55', 'delacruz_johnlorenz', '21'),
(810, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:48:55', 'delacruz_johnlorenz', '21'),
(811, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:48:58', 'delacruz_johnlorenz', '21'),
(812, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:49:01', 'delacruz_johnlorenz', '21'),
(813, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:49:55', 'delacruz_johnlorenz', '21'),
(814, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:09', 'delacruz_johnlorenz', '21'),
(815, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:09', 'delacruz_johnlorenz', '21'),
(816, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:09', 'delacruz_johnlorenz', '21'),
(817, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:09', 'delacruz_johnlorenz', '21'),
(818, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:42', 'delacruz_johnlorenz', '21'),
(819, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:48', 'delacruz_johnlorenz', '21'),
(820, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:48', 'delacruz_johnlorenz', '21'),
(821, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:49', 'delacruz_johnlorenz', '21'),
(822, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:49', 'delacruz_johnlorenz', '21'),
(823, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:49', 'delacruz_johnlorenz', '21'),
(824, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:50', 'delacruz_johnlorenz', '21'),
(825, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:51', 'delacruz_johnlorenz', '21'),
(826, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:51', 'delacruz_johnlorenz', '21'),
(827, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:52', 'delacruz_johnlorenz', '21'),
(828, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:52', 'delacruz_johnlorenz', '21'),
(829, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:52', 'delacruz_johnlorenz', '21'),
(830, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:52', 'delacruz_johnlorenz', '21'),
(831, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:52', 'delacruz_johnlorenz', '21'),
(832, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:53', 'delacruz_johnlorenz', '21'),
(833, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:53', 'delacruz_johnlorenz', '21'),
(834, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:53', 'delacruz_johnlorenz', '21'),
(835, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:54', 'delacruz_johnlorenz', '21'),
(836, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:54', 'delacruz_johnlorenz', '21'),
(837, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:55', 'delacruz_johnlorenz', '21'),
(838, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:55', 'delacruz_johnlorenz', '21'),
(839, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:55', 'delacruz_johnlorenz', '21'),
(840, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:56', 'delacruz_johnlorenz', '21'),
(841, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:56', 'delacruz_johnlorenz', '21'),
(842, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:56', 'delacruz_johnlorenz', '21'),
(843, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:57', 'delacruz_johnlorenz', '21'),
(844, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:57', 'delacruz_johnlorenz', '21'),
(845, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:58', 'delacruz_johnlorenz', '21'),
(846, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:58', 'delacruz_johnlorenz', '21'),
(847, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:59', 'delacruz_johnlorenz', '21'),
(848, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:50:59', 'delacruz_johnlorenz', '21'),
(849, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:00', 'delacruz_johnlorenz', '21'),
(850, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:00', 'delacruz_johnlorenz', '21'),
(851, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:00', 'delacruz_johnlorenz', '21'),
(852, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:01', 'delacruz_johnlorenz', '21'),
(853, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:01', 'delacruz_johnlorenz', '21'),
(854, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:02', 'delacruz_johnlorenz', '21'),
(855, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:02', 'delacruz_johnlorenz', '21'),
(856, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:02', 'delacruz_johnlorenz', '21'),
(857, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:03', 'delacruz_johnlorenz', '21'),
(858, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:03', 'delacruz_johnlorenz', '21'),
(859, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:03', 'delacruz_johnlorenz', '21'),
(860, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:04', 'delacruz_johnlorenz', '21'),
(861, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:04', 'delacruz_johnlorenz', '21'),
(862, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:04', 'delacruz_johnlorenz', '21'),
(863, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:06', 'delacruz_johnlorenz', '21'),
(864, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:08', 'delacruz_johnlorenz', '21'),
(865, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:10', 'delacruz_johnlorenz', '21'),
(866, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:10', 'delacruz_johnlorenz', '21'),
(867, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:11', 'delacruz_johnlorenz', '21'),
(868, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:11', 'delacruz_johnlorenz', '21'),
(869, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:13', 'delacruz_johnlorenz', '21'),
(870, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:13', 'delacruz_johnlorenz', '21'),
(871, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:15', 'delacruz_johnlorenz', '21'),
(872, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:17', 'delacruz_johnlorenz', '21'),
(873, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:18', 'delacruz_johnlorenz', '21'),
(874, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:19', 'delacruz_johnlorenz', '21'),
(875, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:20', 'delacruz_johnlorenz', '21'),
(876, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:20', 'delacruz_johnlorenz', '21'),
(877, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:20', 'delacruz_johnlorenz', '21'),
(878, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:21', 'delacruz_johnlorenz', '21'),
(879, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:51:22', 'delacruz_johnlorenz', '21'),
(880, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:53:00', 'delacruz_johnlorenz', '21'),
(881, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:53:04', 'delacruz_johnlorenz', '21'),
(882, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:53:44', 'delacruz_johnlorenz', '21'),
(883, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:53:45', 'delacruz_johnlorenz', '21'),
(884, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:53:46', 'delacruz_johnlorenz', '21'),
(885, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 01:54:05', 'delacruz_johnlorenz', '21'),
(886, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 01:54:06', 'delacruz_johnlorenz', '21'),
(887, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 01:54:08', 'delacruz_johnlorenz', '21'),
(888, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 01:54:09', 'delacruz_johnlorenz', '21'),
(889, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:54:10', 'delacruz_johnlorenz', '21'),
(890, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:54:11', 'delacruz_johnlorenz', '21'),
(891, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 01:54:12', 'delacruz_johnlorenz', '21'),
(892, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 01:54:15', 'delacruz_johnlorenz', '21'),
(893, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:54:16', 'delacruz_johnlorenz', '21'),
(894, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:54:21', 'delacruz_johnlorenz', '21'),
(895, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:55:07', 'delacruz_johnlorenz', '21'),
(896, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:55:07', 'delacruz_johnlorenz', '21'),
(897, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:55:08', 'delacruz_johnlorenz', '21'),
(898, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:55:09', 'delacruz_johnlorenz', '21'),
(899, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:56:48', 'delacruz_johnlorenz', '21'),
(900, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:56:52', 'delacruz_johnlorenz', '21'),
(901, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:57:58', 'delacruz_johnlorenz', '21'),
(902, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:58:05', 'delacruz_johnlorenz', '21'),
(903, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:58:05', 'delacruz_johnlorenz', '21'),
(904, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:59:13', 'delacruz_johnlorenz', '21'),
(905, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:59:20', 'delacruz_johnlorenz', '21'),
(906, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:59:24', 'delacruz_johnlorenz', '21'),
(907, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:59:28', 'delacruz_johnlorenz', '21'),
(908, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:59:32', 'delacruz_johnlorenz', '21'),
(909, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:59:35', 'delacruz_johnlorenz', '21'),
(910, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:59:38', 'delacruz_johnlorenz', '21'),
(911, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 01:59:45', 'delacruz_johnlorenz', '21'),
(912, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:00:00', 'delacruz_johnlorenz', '21'),
(913, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:00:06', 'delacruz_johnlorenz', '21'),
(914, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:00:12', 'delacruz_johnlorenz', '21'),
(915, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:00:16', 'delacruz_johnlorenz', '21'),
(916, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:00:20', 'delacruz_johnlorenz', '21'),
(917, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:00:27', 'delacruz_johnlorenz', '21'),
(918, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:00:32', 'delacruz_johnlorenz', '21'),
(919, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:00:39', 'delacruz_johnlorenz', '21'),
(920, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:00:41', 'delacruz_johnlorenz', '21'),
(921, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:00:41', 'delacruz_johnlorenz', '21'),
(922, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:00:42', 'delacruz_johnlorenz', '21'),
(923, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:02:06', 'delacruz_johnlorenz', '21'),
(924, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:02:06', 'delacruz_johnlorenz', '21'),
(925, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:02:07', 'delacruz_johnlorenz', '21'),
(926, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:02:16', 'delacruz_johnlorenz', '21'),
(927, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:02:40', 'delacruz_johnlorenz', '21'),
(928, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:02:40', 'delacruz_johnlorenz', '21'),
(929, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:03:14', 'delacruz_johnlorenz', '21'),
(930, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:03:19', 'delacruz_johnlorenz', '21'),
(931, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:03:19', 'delacruz_johnlorenz', '21'),
(932, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:03:21', 'delacruz_johnlorenz', '21'),
(933, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:04:33', 'delacruz_johnlorenz', '21'),
(934, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:11:22', 'delacruz_johnlorenz', '21'),
(935, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:11:23', 'delacruz_johnlorenz', '21'),
(936, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:11:47', 'delacruz_johnlorenz', '21'),
(937, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:12:01', 'delacruz_johnlorenz', '21'),
(938, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:12:11', 'delacruz_johnlorenz', '21'),
(939, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:12:21', 'delacruz_johnlorenz', '21'),
(940, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:13:52', 'delacruz_johnlorenz', '21'),
(941, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:13:56', 'delacruz_johnlorenz', '21'),
(942, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:13:59', 'delacruz_johnlorenz', '21'),
(943, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:14:04', 'delacruz_johnlorenz', '21'),
(944, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:14:08', 'delacruz_johnlorenz', '21'),
(945, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:14:20', 'delacruz_johnlorenz', '21'),
(946, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:14:24', 'delacruz_johnlorenz', '21'),
(947, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 02:14:37', 'delacruz_johnlorenz', '21'),
(948, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:08:55', 'delacruz_johnlorenz', '21'),
(949, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:08:59', 'delacruz_johnlorenz', '21'),
(950, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:09:09', 'delacruz_johnlorenz', '21'),
(951, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:10', 'delacruz_johnlorenz', '21'),
(952, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:13', 'delacruz_johnlorenz', '21'),
(953, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:13', 'delacruz_johnlorenz', '21'),
(954, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:14', 'delacruz_johnlorenz', '21'),
(955, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:15', 'delacruz_johnlorenz', '21'),
(956, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:15', 'delacruz_johnlorenz', '21'),
(957, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:15', 'delacruz_johnlorenz', '21'),
(958, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:16', 'delacruz_johnlorenz', '21'),
(959, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:16', 'delacruz_johnlorenz', '21'),
(960, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:16', 'delacruz_johnlorenz', '21'),
(961, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:16', 'delacruz_johnlorenz', '21'),
(962, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:16', 'delacruz_johnlorenz', '21'),
(963, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:16', 'delacruz_johnlorenz', '21'),
(964, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:16', 'delacruz_johnlorenz', '21'),
(965, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:16', 'delacruz_johnlorenz', '21'),
(966, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:17', 'delacruz_johnlorenz', '21'),
(967, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:17', 'delacruz_johnlorenz', '21'),
(968, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:17', 'delacruz_johnlorenz', '21'),
(969, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:17', 'delacruz_johnlorenz', '21'),
(970, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:17', 'delacruz_johnlorenz', '21'),
(971, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:17', 'delacruz_johnlorenz', '21'),
(972, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:17', 'delacruz_johnlorenz', '21'),
(973, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:17', 'delacruz_johnlorenz', '21'),
(974, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:09:18', 'delacruz_johnlorenz', '21'),
(975, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-09 19:09:19', 'delacruz_johnlorenz', '21'),
(976, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:09:41', 'delacruz_johnlorenz', '21'),
(977, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-09 19:09:42', 'delacruz_johnlorenz', '21'),
(978, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:09:48', 'delacruz_johnlorenz', '21'),
(979, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:10:22', 'delacruz_johnlorenz', '21'),
(980, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:12:28', 'delacruz_johnlorenz', '21'),
(981, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:12:36', 'delacruz_johnlorenz', '21'),
(982, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:13:09', 'delacruz_johnlorenz', '21'),
(983, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:13:44', 'delacruz_johnlorenz', '21'),
(984, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-09 19:18:06', 'delacruz_johnlorenz', '21'),
(985, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:27:00', 'delacruz_johnlorenz', '21'),
(986, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:27:08', 'delacruz_johnlorenz', '21'),
(987, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:28:00', 'delacruz_johnlorenz', '21'),
(988, '', '', '2023-04-09 19:28:00', '@Pen_Button_Clicked', ''),
(989, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:28:16', 'delacruz_johnlorenz', '21'),
(990, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:36:57', 'delacruz_johnlorenz', '21'),
(991, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:37:19', 'delacruz_johnlorenz', '21'),
(992, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:38:37', 'delacruz_johnlorenz', '21'),
(993, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:38:41', 'delacruz_johnlorenz', '21'),
(994, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:38:41', 'delacruz_johnlorenz', '21'),
(995, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:39:34', 'delacruz_johnlorenz', '21'),
(996, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:39:38', 'delacruz_johnlorenz', '21'),
(997, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:39:41', 'delacruz_johnlorenz', '21'),
(998, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:39:41', 'delacruz_johnlorenz', '21'),
(999, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:39:42', 'delacruz_johnlorenz', '21'),
(1000, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:39:50', 'delacruz_johnlorenz', '21'),
(1001, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:40:10', 'delacruz_johnlorenz', '21'),
(1002, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:40:28', 'delacruz_johnlorenz', '21'),
(1003, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:40:33', 'delacruz_johnlorenz', '21'),
(1004, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:40:33', 'delacruz_johnlorenz', '21'),
(1005, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:40:35', 'delacruz_johnlorenz', '21'),
(1006, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:41:05', 'delacruz_johnlorenz', '21'),
(1007, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:41:08', 'delacruz_johnlorenz', '21'),
(1008, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:41:12', 'delacruz_johnlorenz', '21'),
(1009, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:44:59', 'delacruz_johnlorenz', '21'),
(1010, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:45:08', 'delacruz_johnlorenz', '21'),
(1011, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 19:45:11', 'delacruz_johnlorenz', '21'),
(1012, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:45:58', 'delacruz_johnlorenz', '21'),
(1013, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:00', 'delacruz_johnlorenz', '21'),
(1014, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:01', 'delacruz_johnlorenz', '21'),
(1015, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:03', 'delacruz_johnlorenz', '21'),
(1016, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:03', 'delacruz_johnlorenz', '21'),
(1017, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:04', 'delacruz_johnlorenz', '21'),
(1018, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:04', 'delacruz_johnlorenz', '21'),
(1019, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:05', 'delacruz_johnlorenz', '21'),
(1020, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:05', 'delacruz_johnlorenz', '21'),
(1021, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:06', 'delacruz_johnlorenz', '21'),
(1022, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:06', 'delacruz_johnlorenz', '21'),
(1023, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:06', 'delacruz_johnlorenz', '21'),
(1024, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:06', 'delacruz_johnlorenz', '21'),
(1025, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:10', 'delacruz_johnlorenz', '21'),
(1026, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:11', 'delacruz_johnlorenz', '21'),
(1027, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:12', 'delacruz_johnlorenz', '21'),
(1028, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:12', 'delacruz_johnlorenz', '21'),
(1029, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:13', 'delacruz_johnlorenz', '21'),
(1030, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:14', 'delacruz_johnlorenz', '21'),
(1031, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:14', 'delacruz_johnlorenz', '21'),
(1032, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:17', 'delacruz_johnlorenz', '21'),
(1033, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:18', 'delacruz_johnlorenz', '21'),
(1034, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:19', 'delacruz_johnlorenz', '21'),
(1035, 'John Lorenz', 'Hint Button Clicked', '2023-04-09 19:46:19', 'delacruz_johnlorenz', '21'),
(1036, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:00:35', 'delacruz_johnlorenz', '21'),
(1037, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:00:39', 'delacruz_johnlorenz', '21'),
(1038, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:00:45', 'delacruz_johnlorenz', '21'),
(1039, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:00:45', 'delacruz_johnlorenz', '21'),
(1040, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:00:46', 'delacruz_johnlorenz', '21'),
(1041, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:01:38', 'delacruz_johnlorenz', '21'),
(1042, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:01:43', 'delacruz_johnlorenz', '21'),
(1043, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:01:48', 'delacruz_johnlorenz', '21'),
(1044, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:01:48', 'delacruz_johnlorenz', '21'),
(1045, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:02:10', 'delacruz_johnlorenz', '21'),
(1046, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:05:20', 'delacruz_johnlorenz', '21'),
(1047, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:05:25', 'delacruz_johnlorenz', '21'),
(1048, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:05:25', 'delacruz_johnlorenz', '21'),
(1049, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:05:26', 'delacruz_johnlorenz', '21'),
(1050, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:05:50', 'delacruz_johnlorenz', '21'),
(1051, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:05:54', 'delacruz_johnlorenz', '21'),
(1052, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:05:55', 'delacruz_johnlorenz', '21'),
(1053, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:06:09', 'delacruz_johnlorenz', '21'),
(1054, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:08:22', 'delacruz_johnlorenz', '21'),
(1055, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:08:49', 'delacruz_johnlorenz', '21'),
(1056, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:08:54', 'delacruz_johnlorenz', '21'),
(1057, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:08:55', 'delacruz_johnlorenz', '21'),
(1058, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:08:58', 'delacruz_johnlorenz', '21'),
(1059, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:08:59', 'delacruz_johnlorenz', '21'),
(1060, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:09:03', 'delacruz_johnlorenz', '21'),
(1061, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:09:08', 'delacruz_johnlorenz', '21'),
(1062, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:09:10', 'delacruz_johnlorenz', '21'),
(1063, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:09:17', 'delacruz_johnlorenz', '21'),
(1064, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:09:18', 'delacruz_johnlorenz', '21'),
(1065, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:09:23', 'delacruz_johnlorenz', '21'),
(1066, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:09:28', 'delacruz_johnlorenz', '21'),
(1067, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:09:36', 'delacruz_johnlorenz', '21'),
(1068, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:10:36', 'delacruz_johnlorenz', '21'),
(1069, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:10:37', 'delacruz_johnlorenz', '21'),
(1070, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:10:41', 'delacruz_johnlorenz', '21'),
(1071, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:10:45', 'delacruz_johnlorenz', '21'),
(1072, 'John Lorenz', 'Pen Button Clicked', '2023-04-09 20:14:37', 'delacruz_johnlorenz', '21'),
(1073, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:20', 'delacruz_johnlorenz', '21'),
(1074, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:21', 'delacruz_johnlorenz', '21'),
(1075, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:21', 'delacruz_johnlorenz', '21'),
(1076, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:22', 'delacruz_johnlorenz', '21'),
(1077, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:22', 'delacruz_johnlorenz', '21'),
(1078, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:23', 'delacruz_johnlorenz', '21'),
(1079, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:23', 'delacruz_johnlorenz', '21'),
(1080, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:24', 'delacruz_johnlorenz', '21'),
(1081, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:24', 'delacruz_johnlorenz', '21'),
(1082, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:25', 'delacruz_johnlorenz', '21'),
(1083, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:26', 'delacruz_johnlorenz', '21'),
(1084, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:26', 'delacruz_johnlorenz', '21'),
(1085, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:27', 'delacruz_johnlorenz', '21'),
(1086, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:28', 'delacruz_johnlorenz', '21'),
(1087, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:28', 'delacruz_johnlorenz', '21'),
(1088, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:29', 'delacruz_johnlorenz', '21'),
(1089, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:29', 'delacruz_johnlorenz', '21'),
(1090, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:29', 'delacruz_johnlorenz', '21'),
(1091, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:29', 'delacruz_johnlorenz', '21'),
(1092, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:30', 'delacruz_johnlorenz', '21'),
(1093, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:30', 'delacruz_johnlorenz', '21'),
(1094, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:30', 'delacruz_johnlorenz', '21'),
(1095, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:30', 'delacruz_johnlorenz', '21'),
(1096, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:30', 'delacruz_johnlorenz', '21'),
(1097, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:31', 'delacruz_johnlorenz', '21'),
(1098, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:31', 'delacruz_johnlorenz', '21'),
(1099, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:32', 'delacruz_johnlorenz', '21'),
(1100, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:32', 'delacruz_johnlorenz', '21'),
(1101, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:34', 'delacruz_johnlorenz', '21'),
(1102, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:34', 'delacruz_johnlorenz', '21'),
(1103, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:35', 'delacruz_johnlorenz', '21'),
(1104, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:24:36', 'delacruz_johnlorenz', '21'),
(1105, 'John Lorenz', 'Pen Button Clicked', '2023-04-10 23:24:48', 'delacruz_johnlorenz', '21'),
(1106, 'John Lorenz', 'Pen Button Clicked', '2023-04-10 23:24:51', 'delacruz_johnlorenz', '21'),
(1107, 'John Lorenz', 'Pen Button Clicked', '2023-04-10 23:24:52', 'delacruz_johnlorenz', '21'),
(1108, 'John Lorenz', 'Pen Button Clicked', '2023-04-10 23:24:53', 'delacruz_johnlorenz', '21'),
(1109, 'John Lorenz', 'Help Button Clicked', '2023-04-10 23:24:54', 'delacruz_johnlorenz', '21'),
(1110, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:25:04', 'delacruz_johnlorenz', '21'),
(1111, 'John Lorenz', 'Hint Button Clicked', '2023-04-10 23:25:05', 'delacruz_johnlorenz', '21'),
(1112, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-10 23:25:06', 'delacruz_johnlorenz', '21'),
(1113, 'John Lorenz', 'Pen Button Clicked', '2023-04-10 23:25:10', 'delacruz_johnlorenz', '21'),
(1114, 'John Lorenz', 'Pen Button Clicked', '2023-04-10 23:25:10', 'delacruz_johnlorenz', '21'),
(1115, 'John Lorenz', 'Pen Button Clicked', '2023-04-10 23:25:10', 'delacruz_johnlorenz', '21'),
(1116, 'John Lorenz', 'Pen Button Clicked', '2023-04-10 23:25:11', 'delacruz_johnlorenz', '21'),
(1117, 'John Lorenz', 'Help Button Clicked', '2023-04-11 02:04:51', 'delacruz_johnlorenz', '21'),
(1118, 'John Lorenz', 'Help Button Clicked', '2023-04-11 02:04:58', 'delacruz_johnlorenz', '21'),
(1119, 'John Lorenz', 'Hint Button Clicked', '2023-04-11 02:05:19', 'delacruz_johnlorenz', '21'),
(1120, 'John Lorenz', 'Hint Button Clicked', '2023-04-11 02:05:24', 'delacruz_johnlorenz', '21'),
(1121, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-11 02:05:25', 'delacruz_johnlorenz', '21'),
(1122, 'John Lorenz', 'Pen Button Clicked', '2023-04-11 02:05:37', 'delacruz_johnlorenz', '21'),
(1123, 'John Lorenz', 'Help Button Clicked', '2023-04-11 02:07:04', 'delacruz_johnlorenz', '21'),
(1124, 'John Lorenz', 'Hint Button Clicked', '2023-04-11 02:07:55', 'delacruz_johnlorenz', '21'),
(1125, 'John Lorenz', 'Help Button Clicked', '2023-04-11 02:08:22', 'delacruz_johnlorenz', '21'),
(1126, 'John Lorenz', 'Trash Button Clicked', '2023-04-11 02:09:27', 'delacruz_johnlorenz', '21'),
(1127, 'John Lorenz', 'Trash Button Clicked', '2023-04-11 02:12:53', 'delacruz_johnlorenz', '21'),
(1128, 'John Lorenz', 'Trash Button Clicked', '2023-04-11 02:13:54', 'delacruz_johnlorenz', '21'),
(1129, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 02:57:11', 'delacruz_johnlorenz', '21'),
(1130, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 02:57:13', 'delacruz_johnlorenz', '21'),
(1131, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 02:57:15', 'delacruz_johnlorenz', '21'),
(1132, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 02:57:15', 'delacruz_johnlorenz', '21'),
(1133, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 02:58:51', 'delacruz_johnlorenz', '21'),
(1134, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 02:58:52', 'delacruz_johnlorenz', '21'),
(1135, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:04', 'delacruz_johnlorenz', '21'),
(1136, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:08', 'delacruz_johnlorenz', '21'),
(1137, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:09', 'delacruz_johnlorenz', '21'),
(1138, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:10', 'delacruz_johnlorenz', '21'),
(1139, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:10', 'delacruz_johnlorenz', '21'),
(1140, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:11', 'delacruz_johnlorenz', '21'),
(1141, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:11', 'delacruz_johnlorenz', '21'),
(1142, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:12', 'delacruz_johnlorenz', '21'),
(1143, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:12', 'delacruz_johnlorenz', '21'),
(1144, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:12', 'delacruz_johnlorenz', '21'),
(1145, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:12', 'delacruz_johnlorenz', '21'),
(1146, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:13', 'delacruz_johnlorenz', '21'),
(1147, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:13', 'delacruz_johnlorenz', '21'),
(1148, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:14', 'delacruz_johnlorenz', '21'),
(1149, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:14', 'delacruz_johnlorenz', '21'),
(1150, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:14', 'delacruz_johnlorenz', '21'),
(1151, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:14', 'delacruz_johnlorenz', '21'),
(1152, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:16', 'delacruz_johnlorenz', '21'),
(1153, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:16', 'delacruz_johnlorenz', '21'),
(1154, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:17', 'delacruz_johnlorenz', '21'),
(1155, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:17', 'delacruz_johnlorenz', '21'),
(1156, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:20', 'delacruz_johnlorenz', '21'),
(1157, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:20', 'delacruz_johnlorenz', '21'),
(1158, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:21', 'delacruz_johnlorenz', '21'),
(1159, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:21', 'delacruz_johnlorenz', '21'),
(1160, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:22', 'delacruz_johnlorenz', '21'),
(1161, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:22', 'delacruz_johnlorenz', '21'),
(1162, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:22', 'delacruz_johnlorenz', '21'),
(1163, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:23', 'delacruz_johnlorenz', '21'),
(1164, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:24', 'delacruz_johnlorenz', '21'),
(1165, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:28', 'delacruz_johnlorenz', '21'),
(1166, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:29', 'delacruz_johnlorenz', '21'),
(1167, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:30', 'delacruz_johnlorenz', '21'),
(1168, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:15:31', 'delacruz_johnlorenz', '21'),
(1169, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:18:16', 'delacruz_johnlorenz', '21'),
(1170, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:18:18', 'delacruz_johnlorenz', '21'),
(1171, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:18:59', 'delacruz_johnlorenz', '21'),
(1172, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:18:59', 'delacruz_johnlorenz', '21'),
(1173, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:19:00', 'delacruz_johnlorenz', '21'),
(1174, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:19:00', 'delacruz_johnlorenz', '21'),
(1175, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:19:35', 'delacruz_johnlorenz', '21'),
(1176, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:19:36', 'delacruz_johnlorenz', '21'),
(1177, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-12 03:37:06', 'delacruz_johnlorenz', '21'),
(1178, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 03:37:07', 'delacruz_johnlorenz', '21'),
(1179, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:37:08', 'delacruz_johnlorenz', '21'),
(1180, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:37:09', 'delacruz_johnlorenz', '21'),
(1181, 'John Lorenz', 'Help Button Clicked', '2023-04-12 03:37:10', 'delacruz_johnlorenz', '21'),
(1182, 'John Lorenz', 'Help Button Clicked', '2023-04-12 03:37:10', 'delacruz_johnlorenz', '21'),
(1183, 'John Lorenz', 'Help Button Clicked', '2023-04-12 03:37:11', 'delacruz_johnlorenz', '21'),
(1184, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:45:48', 'delacruz_johnlorenz', '21'),
(1185, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:45:51', 'delacruz_johnlorenz', '21'),
(1186, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-12 03:45:53', 'delacruz_johnlorenz', '21'),
(1187, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-12 03:45:54', 'delacruz_johnlorenz', '21'),
(1188, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-12 03:45:54', 'delacruz_johnlorenz', '21'),
(1189, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 03:45:54', 'delacruz_johnlorenz', '21'),
(1190, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 03:45:55', 'delacruz_johnlorenz', '21'),
(1191, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 03:45:55', 'delacruz_johnlorenz', '21'),
(1192, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:45:56', 'delacruz_johnlorenz', '21'),
(1193, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 03:45:56', 'delacruz_johnlorenz', '21'),
(1194, 'John Lorenz', 'Trash Button Clicked', '2023-04-13 04:40:41', 'delacruz_johnlorenz', '21'),
(1195, 'John Lorenz', 'Trash Button Clicked', '2023-04-13 04:40:52', 'delacruz_johnlorenz', '21'),
(1196, 'John Lorenz', 'Trash Button Clicked', '2023-04-12 18:00:38', 'delacruz_johnlorenz', '21'),
(1197, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:02', 'delacruz_johnlorenz', '21'),
(1198, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:03', 'delacruz_johnlorenz', '21'),
(1199, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:04', 'delacruz_johnlorenz', '21'),
(1200, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:04', 'delacruz_johnlorenz', '21'),
(1201, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:05', 'delacruz_johnlorenz', '21'),
(1202, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:05', 'delacruz_johnlorenz', '21'),
(1203, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:10', 'delacruz_johnlorenz', '21'),
(1204, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:12', 'delacruz_johnlorenz', '21'),
(1205, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:13', 'delacruz_johnlorenz', '21'),
(1206, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:17', 'delacruz_johnlorenz', '21'),
(1207, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:18', 'delacruz_johnlorenz', '21'),
(1208, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:19', 'delacruz_johnlorenz', '21'),
(1209, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:26', 'delacruz_johnlorenz', '21'),
(1210, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:27', 'delacruz_johnlorenz', '21'),
(1211, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:28', 'delacruz_johnlorenz', '21'),
(1212, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:28', 'delacruz_johnlorenz', '21'),
(1213, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:29', 'delacruz_johnlorenz', '21'),
(1214, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:29', 'delacruz_johnlorenz', '21'),
(1215, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:01:29', 'delacruz_johnlorenz', '21'),
(1216, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 18:01:32', 'delacruz_johnlorenz', '21'),
(1217, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:39', 'delacruz_johnlorenz', '21'),
(1218, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:41', 'delacruz_johnlorenz', '21'),
(1219, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:42', 'delacruz_johnlorenz', '21'),
(1220, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:43', 'delacruz_johnlorenz', '21'),
(1221, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:43', 'delacruz_johnlorenz', '21'),
(1222, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:45', 'delacruz_johnlorenz', '21'),
(1223, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:46', 'delacruz_johnlorenz', '21'),
(1224, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:46', 'delacruz_johnlorenz', '21'),
(1225, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:46', 'delacruz_johnlorenz', '21'),
(1226, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:47', 'delacruz_johnlorenz', '21'),
(1227, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:47', 'delacruz_johnlorenz', '21'),
(1228, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:35:49', 'delacruz_johnlorenz', '21'),
(1229, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:39:29', 'delacruz_johnlorenz', '21'),
(1230, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:40:29', 'delacruz_johnlorenz', '21'),
(1231, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:40:35', 'delacruz_johnlorenz', '21'),
(1232, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:41:42', 'delacruz_johnlorenz', '21'),
(1233, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:42:17', 'delacruz_johnlorenz', '21'),
(1234, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:42:20', 'delacruz_johnlorenz', '21'),
(1235, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:42:20', 'delacruz_johnlorenz', '21'),
(1236, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:42:22', 'delacruz_johnlorenz', '21'),
(1237, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:42:26', 'delacruz_johnlorenz', '21'),
(1238, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:42:31', 'delacruz_johnlorenz', '21'),
(1239, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:42:36', 'delacruz_johnlorenz', '21'),
(1240, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:42:37', 'delacruz_johnlorenz', '21'),
(1241, 'John Lorenz', 'Help Button Clicked', '2023-04-12 18:42:43', 'delacruz_johnlorenz', '21'),
(1242, 'John Lorenz', 'Help Button Clicked', '2023-04-12 18:42:44', 'delacruz_johnlorenz', '21'),
(1243, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:43:07', 'delacruz_johnlorenz', '21'),
(1244, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:43:08', 'delacruz_johnlorenz', '21'),
(1245, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:33', 'delacruz_johnlorenz', '21'),
(1246, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:34', 'delacruz_johnlorenz', '21'),
(1247, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:38', 'delacruz_johnlorenz', '21'),
(1248, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:38', 'delacruz_johnlorenz', '21'),
(1249, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:39', 'delacruz_johnlorenz', '21'),
(1250, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:40', 'delacruz_johnlorenz', '21'),
(1251, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:42', 'delacruz_johnlorenz', '21'),
(1252, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:43', 'delacruz_johnlorenz', '21'),
(1253, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:44', 'delacruz_johnlorenz', '21'),
(1254, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:45', 'delacruz_johnlorenz', '21'),
(1255, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:46', 'delacruz_johnlorenz', '21'),
(1256, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:45:48', 'delacruz_johnlorenz', '21'),
(1257, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:46:00', 'delacruz_johnlorenz', '21'),
(1258, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:46:02', 'delacruz_johnlorenz', '21'),
(1259, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:46:09', 'delacruz_johnlorenz', '21'),
(1260, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:46:10', 'delacruz_johnlorenz', '21'),
(1261, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:46:11', 'delacruz_johnlorenz', '21'),
(1262, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:46:11', 'delacruz_johnlorenz', '21'),
(1263, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:48:38', 'delacruz_johnlorenz', '21'),
(1264, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:48:39', 'delacruz_johnlorenz', '21'),
(1265, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:48:39', 'delacruz_johnlorenz', '21'),
(1266, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:48:40', 'delacruz_johnlorenz', '21'),
(1267, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:48:40', 'delacruz_johnlorenz', '21'),
(1268, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:51:19', 'delacruz_johnlorenz', '21'),
(1269, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:51:24', 'delacruz_johnlorenz', '21'),
(1270, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:51:29', 'delacruz_johnlorenz', '21'),
(1271, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:51:30', 'delacruz_johnlorenz', '21'),
(1272, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:52:02', 'delacruz_johnlorenz', '21'),
(1273, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:52:03', 'delacruz_johnlorenz', '21'),
(1274, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:52:04', 'delacruz_johnlorenz', '21'),
(1275, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 18:52:07', 'delacruz_johnlorenz', '21'),
(1276, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:08:23', 'delacruz_johnlorenz', '21'),
(1277, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:08:26', 'delacruz_johnlorenz', '21'),
(1278, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:08:26', 'delacruz_johnlorenz', '21'),
(1279, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:08:26', 'delacruz_johnlorenz', '21'),
(1280, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:08:27', 'delacruz_johnlorenz', '21'),
(1281, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:08:27', 'delacruz_johnlorenz', '21'),
(1282, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:08:28', 'delacruz_johnlorenz', '21'),
(1283, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:08:30', 'delacruz_johnlorenz', '21'),
(1284, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:08:44', 'delacruz_johnlorenz', '21'),
(1285, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:08:49', 'delacruz_johnlorenz', '21'),
(1286, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:10:48', 'delacruz_johnlorenz', '21'),
(1287, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:10:49', 'delacruz_johnlorenz', '21'),
(1288, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:10:50', 'delacruz_johnlorenz', '21'),
(1289, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:10:50', 'delacruz_johnlorenz', '21'),
(1290, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:10:51', 'delacruz_johnlorenz', '21'),
(1291, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:10:52', 'delacruz_johnlorenz', '21'),
(1292, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:11:09', 'delacruz_johnlorenz', '21'),
(1293, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:11:10', 'delacruz_johnlorenz', '21'),
(1294, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:11:10', 'delacruz_johnlorenz', '21'),
(1295, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:11:12', 'delacruz_johnlorenz', '21'),
(1296, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:11:12', 'delacruz_johnlorenz', '21'),
(1297, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:11:36', 'delacruz_johnlorenz', '21'),
(1298, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:11:37', 'delacruz_johnlorenz', '21'),
(1299, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:12:18', 'delacruz_johnlorenz', '21'),
(1300, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:12:19', 'delacruz_johnlorenz', '21'),
(1301, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:12:19', 'delacruz_johnlorenz', '21'),
(1302, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:12:21', 'delacruz_johnlorenz', '21');
INSERT INTO `user_logs` (`inputID`, `user`, `input`, `timestamp`, `user_email`, `session_id`) VALUES
(1303, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:12:21', 'delacruz_johnlorenz', '21'),
(1304, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:12:56', 'delacruz_johnlorenz', '21'),
(1305, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:12:57', 'delacruz_johnlorenz', '21'),
(1306, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:13:00', 'delacruz_johnlorenz', '21'),
(1307, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:13:00', 'delacruz_johnlorenz', '21'),
(1308, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:13:00', 'delacruz_johnlorenz', '21'),
(1309, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:13:00', 'delacruz_johnlorenz', '21'),
(1310, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:13:01', 'delacruz_johnlorenz', '21'),
(1311, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:13:01', 'delacruz_johnlorenz', '21'),
(1312, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:13:01', 'delacruz_johnlorenz', '21'),
(1313, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:13:01', 'delacruz_johnlorenz', '21'),
(1314, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:14:36', 'delacruz_johnlorenz', '21'),
(1315, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:14:36', 'delacruz_johnlorenz', '21'),
(1316, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:14:37', 'delacruz_johnlorenz', '21'),
(1317, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:14:39', 'delacruz_johnlorenz', '21'),
(1318, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:14:39', 'delacruz_johnlorenz', '21'),
(1319, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:15:30', 'delacruz_johnlorenz', '21'),
(1320, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:15:33', 'delacruz_johnlorenz', '21'),
(1321, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:18:46', 'delacruz_johnlorenz', '21'),
(1322, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:18:47', 'delacruz_johnlorenz', '21'),
(1323, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:18:47', 'delacruz_johnlorenz', '21'),
(1324, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:18:48', 'delacruz_johnlorenz', '21'),
(1325, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:18:59', 'delacruz_johnlorenz', '21'),
(1326, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:18:59', 'delacruz_johnlorenz', '21'),
(1327, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:19:00', 'delacruz_johnlorenz', '21'),
(1328, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:19:00', 'delacruz_johnlorenz', '21'),
(1329, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:19:01', 'delacruz_johnlorenz', '21'),
(1330, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:19:25', 'delacruz_johnlorenz', '21'),
(1331, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:19:28', 'delacruz_johnlorenz', '21'),
(1332, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:19:28', 'delacruz_johnlorenz', '21'),
(1333, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:19:29', 'delacruz_johnlorenz', '21'),
(1334, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:19:29', 'delacruz_johnlorenz', '21'),
(1335, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:19:30', 'delacruz_johnlorenz', '21'),
(1336, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:19:30', 'delacruz_johnlorenz', '21'),
(1337, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:19:30', 'delacruz_johnlorenz', '21'),
(1338, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:20:08', 'delacruz_johnlorenz', '21'),
(1339, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:20:12', 'delacruz_johnlorenz', '21'),
(1340, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:20:13', 'delacruz_johnlorenz', '21'),
(1341, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:20:28', 'delacruz_johnlorenz', '21'),
(1342, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:20:29', 'delacruz_johnlorenz', '21'),
(1343, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:20:29', 'delacruz_johnlorenz', '21'),
(1344, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:20:31', 'delacruz_johnlorenz', '21'),
(1345, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:21:10', 'delacruz_johnlorenz', '21'),
(1346, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:21:11', 'delacruz_johnlorenz', '21'),
(1347, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:21:12', 'delacruz_johnlorenz', '21'),
(1348, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:24:15', 'delacruz_johnlorenz', '21'),
(1349, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:24:17', 'delacruz_johnlorenz', '21'),
(1350, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:24:22', 'delacruz_johnlorenz', '21'),
(1351, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:24:24', 'delacruz_johnlorenz', '21'),
(1352, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:24:31', 'delacruz_johnlorenz', '21'),
(1353, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:24:36', 'delacruz_johnlorenz', '21'),
(1354, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 19:24:38', 'delacruz_johnlorenz', '21'),
(1355, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-12 23:29:32', 'delacruz_johnlorenz', '21'),
(1356, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:29:32', 'delacruz_johnlorenz', '21'),
(1357, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 23:30:10', 'delacruz_johnlorenz', '21'),
(1358, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-12 23:30:10', 'delacruz_johnlorenz', '21'),
(1359, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:30:12', 'delacruz_johnlorenz', '21'),
(1360, 'John Lorenz', 'Pen Button Clicked', '2023-04-12 23:30:13', 'delacruz_johnlorenz', '21'),
(1361, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:48:15', 'delacruz_johnlorenz', '21'),
(1362, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:48:19', 'delacruz_johnlorenz', '21'),
(1363, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:48:25', 'delacruz_johnlorenz', '21'),
(1364, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:48:27', 'delacruz_johnlorenz', '21'),
(1365, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:48:27', 'delacruz_johnlorenz', '21'),
(1366, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:48:28', 'delacruz_johnlorenz', '21'),
(1367, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:48:35', 'delacruz_johnlorenz', '21'),
(1368, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:48:36', 'delacruz_johnlorenz', '21'),
(1369, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:48:37', 'delacruz_johnlorenz', '21'),
(1370, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:49:12', 'delacruz_johnlorenz', '21'),
(1371, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:52:06', 'delacruz_johnlorenz', '21'),
(1372, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:52:52', 'delacruz_johnlorenz', '21'),
(1373, 'John Lorenz', 'Hint Button Clicked', '2023-04-12 23:53:07', 'delacruz_johnlorenz', '21'),
(1374, 'John Lorenz', 'Hint Button Clicked', '2023-04-13 03:27:28', 'delacruz_johnlorenz', '21'),
(1375, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-13 03:27:30', 'delacruz_johnlorenz', '21'),
(1376, 'John Lorenz', 'Hint Button Clicked', '2023-04-13 03:27:31', 'delacruz_johnlorenz', '21'),
(1377, 'John Lorenz', 'Hint Button Clicked', '2023-04-13 03:27:33', 'delacruz_johnlorenz', '21'),
(1378, 'John Lorenz', 'Hint Button Clicked', '2023-04-13 03:27:34', 'delacruz_johnlorenz', '21'),
(1379, 'John Lorenz', 'Pen Button Clicked', '2023-04-13 03:27:35', 'delacruz_johnlorenz', '21'),
(1380, 'John Lorenz', 'Pen Button Clicked', '2023-04-13 03:27:41', 'delacruz_johnlorenz', '21'),
(1381, 'John Lorenz', 'Trash Button Clicked', '2023-04-13 03:47:51', 'delacruz_johnlorenz', '21'),
(1382, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-13 03:56:40', 'delacruz_johnlorenz', '21'),
(1383, 'John Lorenz', 'Pen Button Clicked', '2023-04-13 03:56:41', 'delacruz_johnlorenz', '21'),
(1384, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-13 03:56:47', 'delacruz_johnlorenz', '21'),
(1385, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-13 03:56:50', 'delacruz_johnlorenz', '21'),
(1386, 'John Lorenz', 'Hint Button Clicked', '2023-04-14 04:12:14', 'delacruz_johnlorenz', '21'),
(1387, 'John Lorenz', 'Hint Button Clicked', '2023-04-14 04:12:16', 'delacruz_johnlorenz', '21'),
(1388, 'John Lorenz', 'Hint Button Clicked', '2023-04-14 04:12:17', 'delacruz_johnlorenz', '21'),
(1389, 'John Lorenz', 'Hint Button Clicked', '2023-04-14 04:12:19', 'delacruz_johnlorenz', '21'),
(1390, 'John Lorenz', 'Hint Button Clicked', '2023-04-14 04:13:39', 'delacruz_johnlorenz', '21'),
(1391, 'John Lorenz', 'Hint Button Clicked', '2023-04-14 04:13:41', 'delacruz_johnlorenz', '21'),
(1392, 'John Lorenz', 'Hint Button Clicked', '2023-04-14 04:13:47', 'delacruz_johnlorenz', '21'),
(1393, 'John Lorenz', 'Hint Button Clicked', '2023-04-14 04:13:50', 'delacruz_johnlorenz', '21'),
(1394, 'John Lorenz', 'Trash Button Clicked', '2023-04-13 19:59:31', 'delacruz_johnlorenz', '21'),
(1395, 'John Lorenz', 'Trash Button Clicked', '2023-04-16 01:02:43', 'delacruz_johnlorenz', '21'),
(1396, 'John Lorenz', 'Trash Button Clicked', '2023-04-16 01:08:38', 'delacruz_johnlorenz', '21'),
(1397, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:28:52', 'delacruz_johnlorenz', '21'),
(1398, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:29:08', 'delacruz_johnlorenz', '21'),
(1399, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:29:10', 'delacruz_johnlorenz', '21'),
(1400, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:29:11', 'delacruz_johnlorenz', '21'),
(1401, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:29:13', 'delacruz_johnlorenz', '21'),
(1402, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:29:14', 'delacruz_johnlorenz', '21'),
(1403, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:29:15', 'delacruz_johnlorenz', '21'),
(1404, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:29:21', 'delacruz_johnlorenz', '21'),
(1405, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:29:32', 'delacruz_johnlorenz', '21'),
(1406, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:29:50', 'delacruz_johnlorenz', '21'),
(1407, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:29:59', 'delacruz_johnlorenz', '21'),
(1408, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:29:59', 'delacruz_johnlorenz', '21'),
(1409, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:30:03', 'delacruz_johnlorenz', '21'),
(1410, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:30:08', 'delacruz_johnlorenz', '21'),
(1411, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:30:09', 'delacruz_johnlorenz', '21'),
(1412, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:30:31', 'delacruz_johnlorenz', '21'),
(1413, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:30:43', 'delacruz_johnlorenz', '21'),
(1414, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:30:58', 'delacruz_johnlorenz', '21'),
(1415, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:30:59', 'delacruz_johnlorenz', '21'),
(1416, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:00', 'delacruz_johnlorenz', '21'),
(1417, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:00', 'delacruz_johnlorenz', '21'),
(1418, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:00', 'delacruz_johnlorenz', '21'),
(1419, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:00', 'delacruz_johnlorenz', '21'),
(1420, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:00', 'delacruz_johnlorenz', '21'),
(1421, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:01', 'delacruz_johnlorenz', '21'),
(1422, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:01', 'delacruz_johnlorenz', '21'),
(1423, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:01', 'delacruz_johnlorenz', '21'),
(1424, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:01', 'delacruz_johnlorenz', '21'),
(1425, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:02', 'delacruz_johnlorenz', '21'),
(1426, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:02', 'delacruz_johnlorenz', '21'),
(1427, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:02', 'delacruz_johnlorenz', '21'),
(1428, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:03', 'delacruz_johnlorenz', '21'),
(1429, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:03', 'delacruz_johnlorenz', '21'),
(1430, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:03', 'delacruz_johnlorenz', '21'),
(1431, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:03', 'delacruz_johnlorenz', '21'),
(1432, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:04', 'delacruz_johnlorenz', '21'),
(1433, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:04', 'delacruz_johnlorenz', '21'),
(1434, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:04', 'delacruz_johnlorenz', '21'),
(1435, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:04', 'delacruz_johnlorenz', '21'),
(1436, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 01:31:04', 'delacruz_johnlorenz', '21'),
(1437, 'John Lorenz', 'Pen Button Clicked', '2023-04-16 01:31:49', 'delacruz_johnlorenz', '21'),
(1438, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 17:37:18', 'delacruz_johnlorenz', '21'),
(1439, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 17:38:40', 'delacruz_johnlorenz', '21'),
(1440, 'John Lorenz', 'Help Button Clicked', '2023-04-16 18:29:23', 'delacruz_johnlorenz', '21'),
(1441, 'John Lorenz', 'Help Button Clicked', '2023-04-16 18:29:27', 'delacruz_johnlorenz', '21'),
(1442, 'John Lorenz', 'Pen Button Clicked', '2023-04-16 18:31:32', 'delacruz_johnlorenz', '21'),
(1443, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 18:31:35', 'delacruz_johnlorenz', '21'),
(1444, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 18:31:35', 'delacruz_johnlorenz', '21'),
(1445, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 18:31:37', 'delacruz_johnlorenz', '21'),
(1446, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 18:31:41', 'delacruz_johnlorenz', '21'),
(1447, 'John Lorenz', 'Pen Button Clicked', '2023-04-16 18:31:42', 'delacruz_johnlorenz', '21'),
(1448, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 18:31:43', 'delacruz_johnlorenz', '21'),
(1449, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 18:31:44', 'delacruz_johnlorenz', '21'),
(1450, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 18:31:46', 'delacruz_johnlorenz', '21'),
(1451, 'John Lorenz', 'Pen Button Clicked', '2023-04-16 18:31:47', 'delacruz_johnlorenz', '21'),
(1452, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 18:31:47', 'delacruz_johnlorenz', '21'),
(1453, 'John Lorenz', 'Pen Button Clicked', '2023-04-16 18:31:47', 'delacruz_johnlorenz', '21'),
(1454, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 18:31:48', 'delacruz_johnlorenz', '21'),
(1455, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 18:33:08', 'delacruz_johnlorenz', '21'),
(1456, 'John Lorenz', 'Pen Button Clicked', '2023-04-16 18:33:08', 'delacruz_johnlorenz', '21'),
(1457, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 18:34:48', 'delacruz_johnlorenz', '21'),
(1458, 'John Lorenz', 'Pen Button Clicked', '2023-04-16 18:34:49', 'delacruz_johnlorenz', '21'),
(1459, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 18:50:28', 'delacruz_johnlorenz', '21'),
(1460, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 18:50:29', 'delacruz_johnlorenz', '21'),
(1461, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 19:12:59', 'delacruz_johnlorenz', '22'),
(1462, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 19:44:46', 'delacruz_johnlorenz', '25'),
(1463, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 19:45:02', 'delacruz_johnlorenz', '25'),
(1464, 'John Lorenz', 'Help Button Clicked', '2023-04-16 19:45:03', 'delacruz_johnlorenz', '25'),
(1465, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 19:45:03', 'delacruz_johnlorenz', '25'),
(1466, 'John Lorenz', 'Help Button Clicked', '2023-04-16 19:45:10', 'delacruz_johnlorenz', '25'),
(1467, 'John Lorenz', 'Help Button Clicked', '2023-04-16 19:45:12', 'delacruz_johnlorenz', '25'),
(1468, 'John Lorenz', 'Help Button Clicked', '2023-04-16 19:45:12', 'delacruz_johnlorenz', '25'),
(1469, 'John Lorenz', 'Help Button Clicked', '2023-04-16 19:45:15', 'delacruz_johnlorenz', '25'),
(1470, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 19:50:54', 'delacruz_johnlorenz', '25'),
(1471, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 19:50:55', 'delacruz_johnlorenz', '25'),
(1472, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 19:50:56', 'delacruz_johnlorenz', '25'),
(1473, 'John Lorenz', 'Help Button Clicked', '2023-04-16 19:51:35', 'delacruz_johnlorenz', '25'),
(1474, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 19:52:03', 'delacruz_johnlorenz', '25'),
(1475, 'John Lorenz', 'Pen Button Clicked', '2023-04-16 19:52:05', 'delacruz_johnlorenz', '25'),
(1476, 'John Lorenz', 'Help Button Clicked', '2023-04-16 19:52:06', 'delacruz_johnlorenz', '25'),
(1477, 'John Lorenz', 'Help Button Clicked', '2023-04-16 19:52:07', 'delacruz_johnlorenz', '25'),
(1478, 'John Lorenz', 'Pen Button Clicked', '2023-04-16 19:58:14', 'delacruz_johnlorenz', '25'),
(1479, 'John Lorenz', 'Pen Button Clicked', '2023-04-16 19:58:14', 'delacruz_johnlorenz', '25'),
(1480, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-16 20:07:02', 'delacruz_johnlorenz', '25'),
(1481, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 20:53:20', 'delacruz_johnlorenz', '28'),
(1482, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:50:50', 'delacruz_johnlorenz', '39'),
(1483, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:51:45', 'delacruz_johnlorenz', '39'),
(1484, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:52:29', 'delacruz_johnlorenz', '39'),
(1485, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:52:32', 'delacruz_johnlorenz', '39'),
(1486, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:53:07', 'delacruz_johnlorenz', '39'),
(1487, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:55:45', 'delacruz_johnlorenz', '39'),
(1488, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:55:55', 'delacruz_johnlorenz', '39'),
(1489, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:56:21', 'delacruz_johnlorenz', '39'),
(1490, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:56:40', 'delacruz_johnlorenz', '39'),
(1491, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:56:43', 'delacruz_johnlorenz', '39'),
(1492, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:56:45', 'delacruz_johnlorenz', '39'),
(1493, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:56:49', 'delacruz_johnlorenz', '39'),
(1494, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:56:52', 'delacruz_johnlorenz', '39'),
(1495, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:57:15', 'delacruz_johnlorenz', '39'),
(1496, 'John Lorenz', 'Hint Button Clicked', '2023-04-16 23:57:56', 'delacruz_johnlorenz', '39'),
(1497, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-19 04:32:42', 'delacruz_johnlorenz', '39'),
(1498, 'John Lorenz', 'Pen Button Clicked', '2023-04-19 04:32:44', 'delacruz_johnlorenz', '39'),
(1499, 'John Lorenz', 'Pen Button Clicked', '2023-04-18 20:21:59', 'delacruz_johnlorenz', '39'),
(1500, 'John Lorenz', 'Pen Button Clicked', '2023-04-18 20:22:10', 'delacruz_johnlorenz', '39'),
(1501, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-18 22:27:27', 'delacruz_johnlorenz', '39'),
(1502, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-18 22:27:28', 'delacruz_johnlorenz', '39'),
(1503, 'John Lorenz', 'Pen Button Clicked', '2023-04-18 22:27:29', 'delacruz_johnlorenz', '39'),
(1504, 'John Lorenz', 'Hint Button Clicked', '2023-04-18 22:27:31', 'delacruz_johnlorenz', '39'),
(1505, 'John Lorenz', 'Hint Button Clicked', '2023-04-18 22:27:32', 'delacruz_johnlorenz', '39'),
(1506, 'John Lorenz', 'Help Button Clicked', '2023-04-18 22:27:34', 'delacruz_johnlorenz', '39'),
(1507, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-19 02:55:22', 'delacruz_johnlorenz', '41'),
(1508, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 18:56:45', 'delacruz_johnlorenz', '41'),
(1509, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 18:56:49', 'delacruz_johnlorenz', '41'),
(1510, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 18:56:51', 'delacruz_johnlorenz', '41'),
(1511, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 18:56:52', 'delacruz_johnlorenz', '41'),
(1512, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 18:56:54', 'delacruz_johnlorenz', '41'),
(1513, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 18:59:51', 'delacruz_johnlorenz', '41'),
(1514, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:01:06', 'delacruz_johnlorenz', '41'),
(1515, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:03:52', 'delacruz_johnlorenz', '41'),
(1516, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:03:57', 'delacruz_johnlorenz', '41'),
(1517, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:03:59', 'delacruz_johnlorenz', '41'),
(1518, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:04:01', 'delacruz_johnlorenz', '41'),
(1519, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:05:04', 'delacruz_johnlorenz', '41'),
(1520, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:07:57', 'delacruz_johnlorenz', '41'),
(1521, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:08:01', 'delacruz_johnlorenz', '41'),
(1522, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:08:08', 'delacruz_johnlorenz', '41'),
(1523, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:08:10', 'delacruz_johnlorenz', '41'),
(1524, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:08:14', 'delacruz_johnlorenz', '41'),
(1525, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:08:15', 'delacruz_johnlorenz', '41'),
(1526, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:08:17', 'delacruz_johnlorenz', '41'),
(1527, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:08:21', 'delacruz_johnlorenz', '41'),
(1528, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:08:22', 'delacruz_johnlorenz', '41'),
(1529, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:08:23', 'delacruz_johnlorenz', '41'),
(1530, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:08:24', 'delacruz_johnlorenz', '41'),
(1531, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:08:25', 'delacruz_johnlorenz', '41'),
(1532, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:08:27', 'delacruz_johnlorenz', '41'),
(1533, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:08:28', 'delacruz_johnlorenz', '41'),
(1534, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:09:25', 'delacruz_johnlorenz', '41'),
(1535, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:09:27', 'delacruz_johnlorenz', '41'),
(1536, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:09:28', 'delacruz_johnlorenz', '41'),
(1537, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:09:28', 'delacruz_johnlorenz', '41'),
(1538, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:09:29', 'delacruz_johnlorenz', '41'),
(1539, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:09:32', 'delacruz_johnlorenz', '41'),
(1540, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:09:33', 'delacruz_johnlorenz', '41'),
(1541, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:09:33', 'delacruz_johnlorenz', '41'),
(1542, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:09:34', 'delacruz_johnlorenz', '41'),
(1543, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:09:34', 'delacruz_johnlorenz', '41'),
(1544, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:09:35', 'delacruz_johnlorenz', '41'),
(1545, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:09:35', 'delacruz_johnlorenz', '41'),
(1546, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:09:36', 'delacruz_johnlorenz', '41'),
(1547, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:09:36', 'delacruz_johnlorenz', '41'),
(1548, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:09:37', 'delacruz_johnlorenz', '41'),
(1549, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:09:37', 'delacruz_johnlorenz', '41'),
(1550, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:10:23', 'delacruz_johnlorenz', '41'),
(1551, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:10:24', 'delacruz_johnlorenz', '41'),
(1552, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:10:54', 'delacruz_johnlorenz', '41'),
(1553, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:10:56', 'delacruz_johnlorenz', '41'),
(1554, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:10:56', 'delacruz_johnlorenz', '41'),
(1555, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:10:57', 'delacruz_johnlorenz', '41'),
(1556, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:10:58', 'delacruz_johnlorenz', '41'),
(1557, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:10:59', 'delacruz_johnlorenz', '41'),
(1558, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:00', 'delacruz_johnlorenz', '41'),
(1559, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:11:02', 'delacruz_johnlorenz', '41'),
(1560, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:04', 'delacruz_johnlorenz', '41'),
(1561, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:06', 'delacruz_johnlorenz', '41'),
(1562, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:06', 'delacruz_johnlorenz', '41'),
(1563, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:06', 'delacruz_johnlorenz', '41'),
(1564, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:11:08', 'delacruz_johnlorenz', '41'),
(1565, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:11:08', 'delacruz_johnlorenz', '41'),
(1566, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:09', 'delacruz_johnlorenz', '41'),
(1567, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:32', 'delacruz_johnlorenz', '41'),
(1568, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:32', 'delacruz_johnlorenz', '41'),
(1569, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:11:33', 'delacruz_johnlorenz', '41'),
(1570, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:34', 'delacruz_johnlorenz', '41'),
(1571, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:11:35', 'delacruz_johnlorenz', '41'),
(1572, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:35', 'delacruz_johnlorenz', '41'),
(1573, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:35', 'delacruz_johnlorenz', '41'),
(1574, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:11:36', 'delacruz_johnlorenz', '41'),
(1575, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:37', 'delacruz_johnlorenz', '41'),
(1576, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:11:37', 'delacruz_johnlorenz', '41'),
(1577, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:11:38', 'delacruz_johnlorenz', '41'),
(1578, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:38', 'delacruz_johnlorenz', '41'),
(1579, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:11:38', 'delacruz_johnlorenz', '41'),
(1580, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:11:39', 'delacruz_johnlorenz', '41'),
(1581, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:40', 'delacruz_johnlorenz', '41'),
(1582, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:11:42', 'delacruz_johnlorenz', '41'),
(1583, 'John Lorenz', 'Help Button Clicked', '2023-04-21 19:33:01', 'delacruz_johnlorenz', '45'),
(1584, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 19:33:07', 'delacruz_johnlorenz', '45'),
(1585, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:33:08', 'delacruz_johnlorenz', '45'),
(1586, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 19:33:14', 'delacruz_johnlorenz', '45'),
(1587, 'John Lorenz', 'Pen Button Clicked', '2023-04-21 23:55:57', 'delacruz_johnlorenz', '45'),
(1588, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 23:56:56', 'delacruz_johnlorenz', '45'),
(1589, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 23:57:02', 'delacruz_johnlorenz', '45'),
(1590, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-21 23:57:03', 'delacruz_johnlorenz', '45'),
(1591, 'John Lorenz', 'Hint Button Clicked', '2023-04-21 23:57:03', 'delacruz_johnlorenz', '45'),
(1592, 'John Lorenz', 'Hint Button Clicked', '2023-04-21 23:57:05', 'delacruz_johnlorenz', '45'),
(1593, 'John Lorenz', 'Help Button Clicked', '2023-04-21 23:57:14', 'delacruz_johnlorenz', '45'),
(1594, 'John Lorenz', 'Help Button Clicked', '2023-04-21 23:57:16', 'delacruz_johnlorenz', '45'),
(1595, 'John Lorenz', 'Help Button Clicked', '2023-04-21 23:57:26', 'delacruz_johnlorenz', '45'),
(1596, 'John Lorenz', 'Help Button Clicked', '2023-04-21 23:59:27', 'delacruz_johnlorenz', '45'),
(1597, 'John Lorenz', 'Help Button Clicked', '2023-04-22 00:01:21', 'delacruz_johnlorenz', '45'),
(1598, 'John Lorenz', 'Hint Button Clicked', '2023-04-22 00:01:46', 'delacruz_johnlorenz', '45'),
(1599, 'John Lorenz', 'Help Button Clicked', '2023-04-22 00:01:47', 'delacruz_johnlorenz', '45'),
(1600, 'John Lorenz', 'Help Button Clicked', '2023-04-22 00:04:11', 'delacruz_johnlorenz', '45'),
(1601, 'John Lorenz', 'Help Button Clicked', '2023-04-22 00:04:37', 'delacruz_johnlorenz', '45'),
(1602, 'John Lorenz', 'Help Button Clicked', '2023-04-22 00:04:47', 'delacruz_johnlorenz', '45'),
(1603, 'John Lorenz', 'Help Button Clicked', '2023-04-22 00:05:10', 'delacruz_johnlorenz', '45'),
(1604, 'John Lorenz', 'Help Button Clicked', '2023-04-22 00:05:45', 'delacruz_johnlorenz', '45'),
(1605, 'John Lorenz', 'Help Button Clicked', '2023-04-22 00:06:42', 'delacruz_johnlorenz', '45'),
(1606, 'John Lorenz', 'Help Button Clicked', '2023-04-22 00:06:55', 'delacruz_johnlorenz', '45'),
(1607, 'John Lorenz', 'Pen Button Clicked', '2023-04-22 00:07:15', 'delacruz_johnlorenz', '45'),
(1608, 'John Lorenz', 'Pen Button Clicked', '2023-04-22 00:07:19', 'delacruz_johnlorenz', '45'),
(1609, 'John Lorenz', 'Pen Button Clicked', '2023-04-22 00:07:20', 'delacruz_johnlorenz', '45'),
(1610, 'John Lorenz', 'Pen Button Clicked', '2023-04-22 00:07:21', 'delacruz_johnlorenz', '45'),
(1611, 'John Lorenz', 'Pen Button Clicked', '2023-04-22 00:07:22', 'delacruz_johnlorenz', '45'),
(1612, 'John Lorenz', 'Pen Button Clicked', '2023-04-22 00:07:27', 'delacruz_johnlorenz', '45'),
(1613, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:45:28', 'delacruz_johnlorenz', '46'),
(1614, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:45:31', 'delacruz_johnlorenz', '46'),
(1615, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:45:31', 'delacruz_johnlorenz', '46'),
(1616, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:45:32', 'delacruz_johnlorenz', '46'),
(1617, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:45:32', 'delacruz_johnlorenz', '46'),
(1618, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:45:32', 'delacruz_johnlorenz', '46'),
(1619, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-25 02:46:13', 'delacruz_johnlorenz', '46'),
(1620, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:46:14', 'delacruz_johnlorenz', '46'),
(1621, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:46:16', 'delacruz_johnlorenz', '46'),
(1622, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:47:09', 'delacruz_johnlorenz', '46'),
(1623, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:47:10', 'delacruz_johnlorenz', '46'),
(1624, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:47:35', 'delacruz_johnlorenz', '46'),
(1625, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:47:37', 'delacruz_johnlorenz', '46'),
(1626, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:47:40', 'delacruz_johnlorenz', '46'),
(1627, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:47:51', 'delacruz_johnlorenz', '46'),
(1628, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:47:53', 'delacruz_johnlorenz', '46'),
(1629, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:47:53', 'delacruz_johnlorenz', '46'),
(1630, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:47:54', 'delacruz_johnlorenz', '46'),
(1631, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:47:54', 'delacruz_johnlorenz', '46'),
(1632, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:48:20', 'delacruz_johnlorenz', '46'),
(1633, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:48:21', 'delacruz_johnlorenz', '46'),
(1634, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:48:52', 'delacruz_johnlorenz', '46'),
(1635, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:48:54', 'delacruz_johnlorenz', '46'),
(1636, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:49:21', 'delacruz_johnlorenz', '46'),
(1637, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:49:21', 'delacruz_johnlorenz', '46'),
(1638, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:49:22', 'delacruz_johnlorenz', '46'),
(1639, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:49:23', 'delacruz_johnlorenz', '46'),
(1640, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 02:49:23', 'delacruz_johnlorenz', '46'),
(1641, 'John Lorenz', 'Help Button Clicked', '2023-04-25 03:22:22', 'delacruz_johnlorenz', '47'),
(1642, 'John Lorenz', 'Hint Button Clicked', '2023-04-25 03:22:24', 'delacruz_johnlorenz', '47'),
(1643, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-25 03:22:26', 'delacruz_johnlorenz', '47'),
(1644, 'John Lorenz', 'Pen Button Clicked', '2023-04-25 03:22:27', 'delacruz_johnlorenz', '47'),
(1645, 'John Lorenz', 'Help Button Clicked', '2023-04-25 03:22:28', 'delacruz_johnlorenz', '47'),
(1646, 'John Lorenz', 'Hint Button Clicked', '2023-04-26 03:30:54', 'delacruz_johnlorenz', '45'),
(1647, 'John Lorenz', 'Hint Button Clicked', '2023-04-28 19:32:40', 'delacruz_johnlorenz', '48'),
(1648, 'John Lorenz', 'Tutorial Button Clicked', '2023-04-28 19:32:46', 'delacruz_johnlorenz', '48'),
(1649, 'John Lorenz', 'Hint Button Clicked', '2023-04-28 19:32:52', 'delacruz_johnlorenz', '48'),
(1650, 'John Lorenz', 'Hint Button Clicked', '2023-04-28 19:33:41', 'delacruz_johnlorenz', '48'),
(1651, 'John Lorenz', 'Pen Button Clicked', '2023-04-28 19:43:30', 'delacruz_johnlorenz', '50'),
(1652, 'John Lorenz', 'Pen Button Clicked', '2023-04-28 19:43:36', 'delacruz_johnlorenz', '50'),
(1653, 'Chris', 'Help Button Clicked', '2023-04-28 21:49:27', 'cornell_chris', '8'),
(1654, 'Chris', 'Hint Button Clicked', '2023-04-28 21:49:29', 'cornell_chris', '8'),
(1655, 'Chris', 'Hint Button Clicked', '2023-04-28 21:49:31', 'cornell_chris', '8'),
(1656, 'Chris', 'Hint Button Clicked', '2023-04-28 21:49:31', 'cornell_chris', '8'),
(1657, 'Chris', 'Hint Button Clicked', '2023-04-28 21:49:32', 'cornell_chris', '8'),
(1658, 'Chris', 'Hint Button Clicked', '2023-04-28 21:49:33', 'cornell_chris', '8'),
(1659, 'Chris', 'Tutorial Button Clicked', '2023-04-28 21:49:33', 'cornell_chris', '8'),
(1660, 'Chris', 'Pen Button Clicked', '2023-04-28 21:49:34', 'cornell_chris', '8'),
(1661, 'Chris', 'Help Button Clicked', '2023-04-28 21:49:35', 'cornell_chris', '8'),
(1662, 'Chris', 'Help Button Clicked', '2023-04-29 00:01:31', 'cornell_chris', '124'),
(1663, 'Triple', 'Hint Button Clicked', '2023-04-29 00:24:47', 'h_triple', '5'),
(1664, 'Triple', 'Hint Button Clicked', '2023-04-29 00:24:48', 'h_triple', '5'),
(1665, 'Triple', 'Hint Button Clicked', '2023-04-29 00:24:48', 'h_triple', '5'),
(1666, 'Mark Paul', 'Help Button Clicked', '2023-05-01 03:21:25', 'ramos_markpaul', '1'),
(1667, 'Mark Paul', 'Hint Button Clicked', '2023-05-01 03:21:27', 'ramos_markpaul', '1'),
(1668, 'Mark Paul', 'Tutorial Button Clicked', '2023-05-01 03:21:28', 'ramos_markpaul', '1'),
(1669, 'Mark Paul', 'Pen Button Clicked', '2023-05-01 03:21:30', 'ramos_markpaul', '1'),
(1670, 'Mark Paul', 'Help Button Clicked', '2023-05-01 03:21:31', 'ramos_markpaul', '1'),
(1671, 'Mark Paul', 'Help Button Clicked', '2023-05-01 03:21:32', 'ramos_markpaul', '1'),
(1672, 'Mark Paul', 'Help Button Clicked', '2023-05-01 03:26:28', 'ramos_markpaul', '1'),
(1673, 'Mark Paul', 'Hint Button Clicked', '2023-05-01 03:26:29', 'ramos_markpaul', '1'),
(1674, 'Mark Paul', 'Tutorial Button Clicked', '2023-05-01 03:26:30', 'ramos_markpaul', '1'),
(1675, 'Mark Paul', 'Pen Button Clicked', '2023-05-01 03:26:30', 'ramos_markpaul', '1'),
(1676, 'Mark Paul', 'Tutorial Button Clicked', '2023-05-01 03:26:31', 'ramos_markpaul', '1'),
(1677, 'Mark Paul', 'Hint Button Clicked', '2023-05-01 03:26:31', 'ramos_markpaul', '1'),
(1678, 'Mark Paul', 'Tutorial Button Clicked', '2023-05-01 03:26:31', 'ramos_markpaul', '1'),
(1679, 'Mark Paul', 'Pen Button Clicked', '2023-05-01 03:26:32', 'ramos_markpaul', '1'),
(1680, 'Mark Paul', 'Tutorial Button Clicked', '2023-05-01 03:26:32', 'ramos_markpaul', '1'),
(1681, 'Mark Paul', 'Hint Button Clicked', '2023-05-01 03:26:33', 'ramos_markpaul', '1'),
(1682, 'Mark Paul', 'Pen Button Clicked', '2023-05-01 03:26:33', 'ramos_markpaul', '1'),
(1683, 'Mark Paul', 'Tutorial Button Clicked', '2023-05-01 03:26:35', 'ramos_markpaul', '1'),
(1684, 'Mark Paul', 'Hint Button Clicked', '2023-05-01 03:26:35', 'ramos_markpaul', '1'),
(1685, 'Mark Paul', 'Tutorial Button Clicked', '2023-05-01 03:26:35', 'ramos_markpaul', '1'),
(1686, 'Mark Paul', 'Pen Button Clicked', '2023-05-01 03:26:36', 'ramos_markpaul', '1'),
(1687, 'Mark Paul', 'Tutorial Button Clicked', '2023-05-01 03:26:37', 'ramos_markpaul', '1'),
(1688, 'Mark Paul', 'Pen Button Clicked', '2023-05-01 03:26:38', 'ramos_markpaul', '1'),
(1689, 'Mark Paul', 'Tutorial Button Clicked', '2023-05-01 03:26:40', 'ramos_markpaul', '1'),
(1690, 'Mark Paul', 'Hint Button Clicked', '2023-05-01 03:26:40', 'ramos_markpaul', '1'),
(1691, 'Mark Paul', 'Tutorial Button Clicked', '2023-05-01 03:26:41', 'ramos_markpaul', '1'),
(1692, 'Mark Paul', 'Pen Button Clicked', '2023-05-01 03:26:42', 'ramos_markpaul', '1'),
(1693, 'Mark Paul', 'Tutorial Button Clicked', '2023-05-01 03:26:42', 'ramos_markpaul', '1'),
(1694, 'Mark Paul', 'Hint Button Clicked', '2023-05-01 03:26:54', 'ramos_markpaul', '1'),
(1695, 'Mark Paul', 'Hint Button Clicked', '2023-05-01 03:26:56', 'ramos_markpaul', '1'),
(1696, 'Mark Paul', 'Help Button Clicked', '2023-05-01 03:26:58', 'ramos_markpaul', '1'),
(1697, 'Mark Paul', 'Help Button Clicked', '2023-05-01 03:27:05', 'ramos_markpaul', '1'),
(1698, 'Mark Paul', 'Hint Button Clicked', '2023-05-01 03:31:27', 'ramos_markpaul', '1'),
(1699, 'Triple', 'asd', '2023-05-03 03:59:12', 'h_triple', '5'),
(1700, 'Triple', 'Pen Button Clicked', '2023-05-03 03:59:29', 'h_triple', '5'),
(1701, 'Triple', 'Tutorial Button Clicked', '2023-05-03 03:59:29', 'h_triple', '5'),
(1702, 'Triple', 'Pen Button Clicked', '2023-05-03 03:59:30', 'h_triple', '5'),
(1703, 'Triple', 'a=0.9', '2023-05-04 17:56:53', 'h_triple', '5'),
(1704, 'Triple', 'z=73/-58', '2023-05-04 18:03:26', 'h_triple', '5'),
(1705, 'Triple', '12z - 73 = 70z', '2023-05-04 18:28:23', 'h_triple', '5'),
(1706, 'Triple', '12z - 73 = 70z', '2023-05-04 18:28:29', 'h_triple', '5'),
(1707, 'Triple', 'Hint Button Clicked', '2023-05-04 18:29:05', 'h_triple', '5'),
(1708, 'Triple', 'Hint Button Clicked', '2023-05-04 18:29:14', 'h_triple', '5'),
(1709, 'Triple', 'Hint Button Clicked', '2023-05-04 18:29:15', 'h_triple', '5'),
(1710, 'Triple', '12z - 70z = 73', '2023-05-04 18:29:24', 'h_triple', '5'),
(1711, 'Triple', '-58z = 73', '2023-05-04 18:32:51', 'h_triple', '5'),
(1712, 'Triple', 'z=-1.26', '2023-05-04 18:34:03', 'h_triple', '5'),
(1713, 'Triple', '74u+23=40u+26', '2023-05-04 18:34:26', 'h_triple', '6'),
(1714, 'Triple', 'u=0.09', '2023-05-04 18:36:13', 'h_triple', '6'),
(1715, 'Triple', 'w=-0.11', '2023-05-04 18:37:40', 'h_triple', '6'),
(1716, 'Triple', 't=-0.06', '2023-05-04 18:38:41', 'h_triple', '6'),
(1717, 'Triple', 'Hint Button Clicked', '2023-05-04 18:42:38', 'h_triple', '6'),
(1718, 'Triple', 'Hint Button Clicked', '2023-05-04 18:42:49', 'h_triple', '6'),
(1719, 'Triple', 'Hint Button Clicked', '2023-05-04 18:42:49', 'h_triple', '6'),
(1720, 'Triple', 'Hint Button Clicked', '2023-05-04 18:42:50', 'h_triple', '6'),
(1721, 'Triple', 'Hint Button Clicked', '2023-05-04 18:42:52', 'h_triple', '6'),
(1722, 'Triple', 'Hint Button Clicked', '2023-05-04 18:42:56', 'h_triple', '6'),
(1723, 'Triple', 'Hint Button Clicked', '2023-05-04 18:42:57', 'h_triple', '6'),
(1724, 'Triple', 'Pen Button Clicked', '2023-05-04 18:43:01', 'h_triple', '6'),
(1725, 'Triple', 'Pen Button Clicked', '2023-05-04 18:43:43', 'h_triple', '6'),
(1726, 'Triple', 'Pen Button Clicked', '2023-05-04 18:45:07', 'h_triple', '6'),
(1727, 'Triple', 'Help Button Clicked', '2023-05-04 18:45:14', 'h_triple', '6'),
(1728, 'Triple', 'Help Button Clicked', '2023-05-04 18:45:19', 'h_triple', '6'),
(1729, 'Triple', 'Pen Button Clicked', '2023-05-04 18:45:20', 'h_triple', '6'),
(1730, 'Triple', 'Help Button Clicked', '2023-05-04 18:45:23', 'h_triple', '6'),
(1731, 'Triple', 'Help Button Clicked', '2023-05-04 18:45:31', 'h_triple', '6'),
(1732, 'Triple', 'Help Button Clicked', '2023-05-04 18:45:35', 'h_triple', '6'),
(1733, 'Triple', 'Help Button Clicked', '2023-05-04 18:45:41', 'h_triple', '6'),
(1734, 'Triple', 'Help Button Clicked', '2023-05-04 18:45:59', 'h_triple', '6'),
(1735, 'Triple', 'Help Button Clicked', '2023-05-04 18:48:19', 'h_triple', '6'),
(1736, 'Triple', 'Help Button Clicked', '2023-05-04 18:48:32', 'h_triple', '6'),
(1737, 'Triple', 'Help Button Clicked', '2023-05-04 18:48:47', 'h_triple', '6'),
(1738, 'Triple', 'Help Button Clicked', '2023-05-04 18:49:09', 'h_triple', '6'),
(1739, 'Triple', 'Help Button Clicked', '2023-05-04 18:49:12', 'h_triple', '6'),
(1740, 'Triple', 'Help Button Clicked', '2023-05-04 18:49:47', 'h_triple', '6'),
(1741, 'Triple', 'Help Button Clicked', '2023-05-04 18:50:12', 'h_triple', '6'),
(1742, 'Triple', 'Help Button Clicked', '2023-05-04 18:50:26', 'h_triple', '6'),
(1743, 'Triple', 'Help Button Clicked', '2023-05-04 18:51:03', 'h_triple', '6'),
(1744, 'Triple', 'Help Button Clicked', '2023-05-04 18:51:29', 'h_triple', '6'),
(1745, 'Triple', 'Help Button Clicked', '2023-05-04 18:51:31', 'h_triple', '6'),
(1746, 'Triple', 'Tutorial Button Clicked', '2023-05-04 18:51:32', 'h_triple', '6'),
(1747, 'Triple', 'Pen Button Clicked', '2023-05-04 18:51:33', 'h_triple', '6'),
(1748, 'Triple', 'Help Button Clicked', '2023-05-04 18:51:35', 'h_triple', '6'),
(1749, 'Triple', 'Help Button Clicked', '2023-05-04 18:51:35', 'h_triple', '6'),
(1750, 'Triple', 'Help Button Clicked', '2023-05-04 18:52:27', 'h_triple', '6'),
(1751, 'Triple', 'Help Button Clicked', '2023-05-04 18:52:37', 'h_triple', '6'),
(1752, 'Triple', 'Help Button Clicked', '2023-05-04 18:53:01', 'h_triple', '6'),
(1753, 'Triple', 'Pen Button Clicked', '2023-05-04 19:11:09', 'h_triple', '6'),
(1754, 'Triple', 'Pen Button Clicked', '2023-05-04 19:11:11', 'h_triple', '6'),
(1755, 'Triple', 'as', '2023-05-04 19:53:25', 'h_triple', '6'),
(1756, 'Triple', '90', '2023-05-04 19:53:31', 'h_triple', '6'),
(1757, 'Triple', '90', '2023-05-04 19:53:38', 'h_triple', '6'),
(1758, 'Triple', 'Pen Button Clicked', '2023-05-04 22:40:52', 'h_triple', '6'),
(1759, 'Bolby', ' 44 = 11 - 44b + 69', '2023-05-05 18:51:25', 'montesa_bolby', '2'),
(1760, 'Bolby', 'Hint Button Clicked', '2023-05-05 18:51:30', 'montesa_bolby', '2'),
(1761, 'Bolby', 'Tutorial Button Clicked', '2023-05-05 18:51:33', 'montesa_bolby', '2'),
(1762, 'Bolby', 'Pen Button Clicked', '2023-05-05 18:51:34', 'montesa_bolby', '2'),
(1763, 'Bolby', 'Hint Button Clicked', '2023-05-05 18:51:35', 'montesa_bolby', '2'),
(1764, 'Bolby', 'Help Button Clicked', '2023-05-05 18:51:36', 'montesa_bolby', '2'),
(1765, 'Bolby', 'Help Button Clicked', '2023-05-05 18:51:37', 'montesa_bolby', '2'),
(1766, 'Bolby', ' 44 = 11 - 44b + 69', '2023-05-05 18:51:39', 'montesa_bolby', '2'),
(1767, 'Bolby', ' 44 = 11 - 44b + 69', '2023-05-05 18:52:01', 'montesa_bolby', '2'),
(1768, 'Bolby', ' 44 = 11 - 44b + 69', '2023-05-05 18:52:09', 'montesa_bolby', '2'),
(1769, 'Bolby', 'Hint Button Clicked', '2023-05-05 18:53:05', 'montesa_bolby', '2'),
(1770, 'Bolby', 'asdad', '2023-05-05 18:53:07', 'montesa_bolby', '2'),
(1771, 'Bolby', ' 44 = 11 - 44b + 69', '2023-05-05 18:53:53', 'montesa_bolby', '2'),
(1772, 'Bolby', ' 44 = 11 - 44b + 69', '2023-05-05 18:54:01', 'montesa_bolby', '2'),
(1773, 'Bolby', ' 44 = 11 - 44b + 69', '2023-05-05 18:54:45', 'montesa_bolby', '2'),
(1774, 'Bolby', ' 44 = 11 - 44b + 69', '2023-05-05 18:54:52', 'montesa_bolby', '2'),
(1775, 'Bolby', ' 44 = 11 - 44b + 69', '2023-05-05 18:55:53', 'montesa_bolby', '2'),
(1776, 'Bolby', '44=-44b+80', '2023-05-05 18:56:04', 'montesa_bolby', '2'),
(1777, 'Bolby', '44b=80-44', '2023-05-05 18:56:09', 'montesa_bolby', '2'),
(1778, 'Bolby', '44 = 11 - 44b + 69', '2023-05-05 18:56:15', 'montesa_bolby', '2'),
(1779, 'Bolby', '44 = 11 - 44b + 69', '2023-05-05 18:57:07', 'montesa_bolby', '2'),
(1780, 'Bolby', '44 = 11 - 44b + 69', '2023-05-05 18:57:13', 'montesa_bolby', '2'),
(1781, 'Bolby', 'bobo ka', '2023-05-05 18:57:29', 'montesa_bolby', '2'),
(1782, 'Bolby', 'b=0.82', '2023-05-05 18:57:42', 'montesa_bolby', '2'),
(1783, 'Bolby', 'q=0]', '2023-05-05 18:57:51', 'montesa_bolby', '2'),
(1784, 'Bolby', 'q=0', '2023-05-05 18:57:54', 'montesa_bolby', '2'),
(1785, 'Bolby', 't=0.1', '2023-05-05 18:57:59', 'montesa_bolby', '2'),
(1786, 'Bolby', 'u=2.35', '2023-05-05 18:58:04', 'montesa_bolby', '2'),
(1787, 'Bolby', 'b=2.21', '2023-05-05 18:58:10', 'montesa_bolby', '2'),
(1788, 'Bolby', 'r=0.3', '2023-05-05 18:58:15', 'montesa_bolby', '2'),
(1789, 'Bolby', 'k=0', '2023-05-05 18:58:18', 'montesa_bolby', '2'),
(1790, 'Bolby', 'w=1.38', '2023-05-05 18:58:22', 'montesa_bolby', '2'),
(1791, 'Bolby', 'z=-4', '2023-05-05 18:58:28', 'montesa_bolby', '2'),
(1792, 'Bolby', '=1.63', '2023-05-05 18:58:32', 'montesa_bolby', '2'),
(1793, 'Bolby', 'g=1.63', '2023-05-05 18:58:38', 'montesa_bolby', '2'),
(1794, 'Bolby', '3f=54,', '2023-05-05 19:18:18', 'montesa_bolby', '3'),
(1795, 'Bolby', '3f=54', '2023-05-05 19:18:23', 'montesa_bolby', '3'),
(1796, 'Bolby', 'f=54/3', '2023-05-05 19:18:34', 'montesa_bolby', '3'),
(1797, 'Bolby', 'f = 54/ 3', '2023-05-05 19:18:42', 'montesa_bolby', '3'),
(1798, 'Bolby', 'f=18', '2023-05-05 19:18:55', 'montesa_bolby', '3'),
(1799, 'Danica', 'Help Button Clicked', '2023-05-05 22:58:26', 'mendoza_danica', '1'),
(1800, 'Danica', 'Help Button Clicked', '2023-05-05 22:58:26', 'mendoza_danica', '1'),
(1801, 'Danica', 'Tutorial Button Clicked', '2023-05-05 22:58:40', 'mendoza_danica', '1'),
(1802, 'Danica', 'Help Button Clicked', '2023-05-05 22:59:28', 'mendoza_danica', '1'),
(1803, 'Danica', 'Help Button Clicked', '2023-05-05 22:59:28', 'mendoza_danica', '1'),
(1804, 'Danica', 'Tutorial Button Clicked', '2023-05-05 22:59:30', 'mendoza_danica', '1'),
(1805, 'Danica', 'Help Button Clicked', '2023-05-05 22:59:31', 'mendoza_danica', '1'),
(1806, 'Danica', 'Tutorial Button Clicked', '2023-05-05 22:59:31', 'mendoza_danica', '1'),
(1807, 'Danica', 'Help Button Clicked', '2023-05-05 22:59:33', 'mendoza_danica', '1'),
(1808, 'Danica', 'Tutorial Button Clicked', '2023-05-05 22:59:33', 'mendoza_danica', '1'),
(1809, 'Danica', 'Pen Button Clicked', '2023-05-05 22:59:39', 'mendoza_danica', '1'),
(1810, 'Danica', 'Help Button Clicked', '2023-05-05 22:59:48', 'mendoza_danica', '1'),
(1811, 'Danica', 'Pen Button Clicked', '2023-05-05 22:59:57', 'mendoza_danica', '1'),
(1812, 'Danica', '-84d = 110', '2023-05-05 23:00:01', 'mendoza_danica', '1'),
(1813, 'Danica', '-84d = 100', '2023-05-05 23:00:17', 'mendoza_danica', '1'),
(1814, 'Danica', 'Pen Button Clicked', '2023-05-05 23:00:35', 'mendoza_danica', '1'),
(1815, 'Danica', 'Hint Button Clicked', '2023-05-05 23:00:44', 'mendoza_danica', '1'),
(1816, 'Danica', 'Tutorial Button Clicked', '2023-05-05 23:00:44', 'mendoza_danica', '1'),
(1817, 'Danica', 'Hint Button Clicked', '2023-05-05 23:00:45', 'mendoza_danica', '1'),
(1818, 'Danica', 'Hint Button Clicked', '2023-05-05 23:00:47', 'mendoza_danica', '1'),
(1819, 'Danica', 'Hint Button Clicked', '2023-05-05 23:00:50', 'mendoza_danica', '1'),
(1820, 'Danica', 'Hint Button Clicked', '2023-05-05 23:00:50', 'mendoza_danica', '1'),
(1821, 'Danica', 'Hint Button Clicked', '2023-05-05 23:00:51', 'mendoza_danica', '1'),
(1822, 'Danica', 'd = -1.19', '2023-05-05 23:01:06', 'mendoza_danica', '1'),
(1823, 'Danica', 'h=-49.5', '2023-05-05 23:38:08', 'mendoza_danica', '2'),
(1824, 'Danica', 't=-0.58', '2023-05-05 23:38:12', 'mendoza_danica', '2'),
(1825, 'Danica', 'f=-3.14', '2023-05-05 23:38:19', 'mendoza_danica', '2'),
(1826, 'Danica', 'k=1.79', '2023-05-05 23:38:23', 'mendoza_danica', '2'),
(1827, 'Danica', 'x=80', '2023-05-05 23:38:27', 'mendoza_danica', '2'),
(1828, 'Danica', 'n=0.07', '2023-05-05 23:38:31', 'mendoza_danica', '2'),
(1829, 'Danica', 'y=-18.75', '2023-05-05 23:38:34', 'mendoza_danica', '2'),
(1830, 'Danica', 'p=-2.77', '2023-05-05 23:38:38', 'mendoza_danica', '2'),
(1831, 'Danica', 'v', '2023-05-05 23:38:43', 'mendoza_danica', '2'),
(1832, 'Danica', 'h=-0.73', '2023-05-05 23:38:44', 'mendoza_danica', '2'),
(1833, 'Danica', 'k=2.23', '2023-05-05 23:38:49', 'mendoza_danica', '2'),
(1834, 'Triple', 'Pen Button Clicked', '2023-05-06 00:31:05', 'h_triple', '6'),
(1835, 'John Lorenz', 'Trash Button Clicked', '2023-07-05 23:10:35', 'delacruz_johnlorenz', '51'),
(1836, 'John Lorenz', 'Trash Button Clicked', '2023-07-05 23:22:32', 'delacruz_johnlorenz', '51'),
(1837, 'John Lorenz', 'Trash Button Clicked', '2023-07-05 23:22:32', 'delacruz_johnlorenz', '51'),
(1838, 'John Lorenz', 'Trash Button Clicked', '2023-07-06 00:35:10', 'delacruz_johnlorenz', '51'),
(1839, 'John Lorenz', 'asdasd', '2023-07-06 00:35:12', 'delacruz_johnlorenz', '51'),
(1840, 'John Lorenz', 'asd', '2023-07-06 00:35:12', 'delacruz_johnlorenz', '51'),
(1841, 'John Lorenz', 'asd', '2023-07-06 00:35:12', 'delacruz_johnlorenz', '51'),
(1842, 'John Lorenz', 'asd', '2023-07-06 00:35:12', 'delacruz_johnlorenz', '51'),
(1843, 'John Lorenz', 'asd', '2023-07-06 00:35:13', 'delacruz_johnlorenz', '51'),
(1844, 'John Lorenz', 'asd', '2023-07-06 00:35:13', 'delacruz_johnlorenz', '51'),
(1845, 'John Lorenz', 'asd', '2023-07-06 00:35:13', 'delacruz_johnlorenz', '51'),
(1846, 'John Lorenz', 'Help Button Clicked', '2023-07-06 00:42:49', 'delacruz_johnlorenz', '51'),
(1847, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 00:46:03', 'delacruz_johnlorenz', '51'),
(1848, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 00:48:17', 'delacruz_johnlorenz', '51'),
(1849, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 00:48:19', 'delacruz_johnlorenz', '51'),
(1850, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 00:49:25', 'delacruz_johnlorenz', '51'),
(1851, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 01:58:20', 'delacruz_johnlorenz', '52');
INSERT INTO `user_logs` (`inputID`, `user`, `input`, `timestamp`, `user_email`, `session_id`) VALUES
(1852, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 01:58:36', 'delacruz_johnlorenz', '52'),
(1853, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 01:58:48', 'delacruz_johnlorenz', '52'),
(1854, 'John Lorenz', 'Tutorial Button Clicked', '2023-07-06 01:59:40', 'delacruz_johnlorenz', '52'),
(1855, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 01:59:41', 'delacruz_johnlorenz', '52'),
(1856, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:06:10', 'delacruz_johnlorenz', '52'),
(1857, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:07:13', 'delacruz_johnlorenz', '52'),
(1858, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:11:11', 'delacruz_johnlorenz', '52'),
(1859, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:14:53', 'delacruz_johnlorenz', '52'),
(1860, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:15:15', 'delacruz_johnlorenz', '52'),
(1861, 'John Lorenz', 'Tutorial Button Clicked', '2023-07-06 02:15:16', 'delacruz_johnlorenz', '52'),
(1862, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:15:17', 'delacruz_johnlorenz', '52'),
(1863, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:15:19', 'delacruz_johnlorenz', '52'),
(1864, 'John Lorenz', 'Help Button Clicked', '2023-07-06 02:20:14', 'delacruz_johnlorenz', '52'),
(1865, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:12', 'delacruz_johnlorenz', '52'),
(1866, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:16', 'delacruz_johnlorenz', '52'),
(1867, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:26', 'delacruz_johnlorenz', '52'),
(1868, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:27', 'delacruz_johnlorenz', '52'),
(1869, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:31', 'delacruz_johnlorenz', '52'),
(1870, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:36', 'delacruz_johnlorenz', '52'),
(1871, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:40', 'delacruz_johnlorenz', '52'),
(1872, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:41', 'delacruz_johnlorenz', '52'),
(1873, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:44', 'delacruz_johnlorenz', '52'),
(1874, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:46', 'delacruz_johnlorenz', '52'),
(1875, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:48', 'delacruz_johnlorenz', '52'),
(1876, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:48', 'delacruz_johnlorenz', '52'),
(1877, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:49', 'delacruz_johnlorenz', '52'),
(1878, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:49', 'delacruz_johnlorenz', '52'),
(1879, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:50', 'delacruz_johnlorenz', '52'),
(1880, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:45:51', 'delacruz_johnlorenz', '52'),
(1881, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:46:17', 'delacruz_johnlorenz', '52'),
(1882, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:49:53', 'delacruz_johnlorenz', '52'),
(1883, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:49:54', 'delacruz_johnlorenz', '52'),
(1884, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:49:57', 'delacruz_johnlorenz', '52'),
(1885, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:00', 'delacruz_johnlorenz', '52'),
(1886, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:01', 'delacruz_johnlorenz', '52'),
(1887, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:03', 'delacruz_johnlorenz', '52'),
(1888, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:04', 'delacruz_johnlorenz', '52'),
(1889, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:41', 'delacruz_johnlorenz', '52'),
(1890, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:42', 'delacruz_johnlorenz', '52'),
(1891, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:43', 'delacruz_johnlorenz', '52'),
(1892, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:44', 'delacruz_johnlorenz', '52'),
(1893, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:44', 'delacruz_johnlorenz', '52'),
(1894, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:46', 'delacruz_johnlorenz', '52'),
(1895, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:52', 'delacruz_johnlorenz', '52'),
(1896, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:53', 'delacruz_johnlorenz', '52'),
(1897, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:50:55', 'delacruz_johnlorenz', '52'),
(1898, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:51:07', 'delacruz_johnlorenz', '52'),
(1899, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:51:10', 'delacruz_johnlorenz', '52'),
(1900, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:51:12', 'delacruz_johnlorenz', '52'),
(1901, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:51:44', 'delacruz_johnlorenz', '52'),
(1902, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:51:46', 'delacruz_johnlorenz', '52'),
(1903, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:51:47', 'delacruz_johnlorenz', '52'),
(1904, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:51:50', 'delacruz_johnlorenz', '52'),
(1905, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:51:50', 'delacruz_johnlorenz', '52'),
(1906, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:52:36', 'delacruz_johnlorenz', '52'),
(1907, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:52:37', 'delacruz_johnlorenz', '52'),
(1908, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:54:33', 'delacruz_johnlorenz', '52'),
(1909, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:55:27', 'delacruz_johnlorenz', '52'),
(1910, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:55:28', 'delacruz_johnlorenz', '52'),
(1911, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:56:06', 'delacruz_johnlorenz', '52'),
(1912, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 02:56:08', 'delacruz_johnlorenz', '52'),
(1913, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:00:53', 'delacruz_johnlorenz', '52'),
(1914, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:00:54', 'delacruz_johnlorenz', '52'),
(1915, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:08:41', 'delacruz_johnlorenz', '52'),
(1916, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:09:43', 'delacruz_johnlorenz', '52'),
(1917, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:11:18', 'delacruz_johnlorenz', '52'),
(1918, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:11:22', 'delacruz_johnlorenz', '52'),
(1919, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:11:43', 'delacruz_johnlorenz', '52'),
(1920, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:12:12', 'delacruz_johnlorenz', '52'),
(1921, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:12:24', 'delacruz_johnlorenz', '52'),
(1922, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:13:01', 'delacruz_johnlorenz', '52'),
(1923, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:15:20', 'delacruz_johnlorenz', '52'),
(1924, 'John Lorenz', 'Pen Button Clicked', '2023-07-06 03:15:22', 'delacruz_johnlorenz', '52'),
(1925, 'Chris', 'Pen Button Clicked', '2023-07-21 18:01:33', 'cornell_chris', '129'),
(1926, 'Chris', 'Pen Button Clicked', '2023-07-21 18:03:08', 'cornell_chris', '130'),
(1927, 'Chris', 'Pen Button Clicked', '2023-07-21 18:04:32', 'cornell_chris', '130'),
(1928, 'Chris', 'Pen Button Clicked', '2023-07-21 18:05:13', 'cornell_chris', '130'),
(1929, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:28:57', 'delacruz_johnlorenz', '53'),
(1930, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:29:08', 'delacruz_johnlorenz', '53'),
(1931, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:29:18', 'delacruz_johnlorenz', '53'),
(1932, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:29:20', 'delacruz_johnlorenz', '53'),
(1933, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:29:46', 'delacruz_johnlorenz', '53'),
(1934, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:29:55', 'delacruz_johnlorenz', '53'),
(1935, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:02', 'delacruz_johnlorenz', '53'),
(1936, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:03', 'delacruz_johnlorenz', '53'),
(1937, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:09', 'delacruz_johnlorenz', '53'),
(1938, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:18', 'delacruz_johnlorenz', '53'),
(1939, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:27', 'delacruz_johnlorenz', '53'),
(1940, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:29', 'delacruz_johnlorenz', '53'),
(1941, 'John Lorenz', 'Hint Button Clicked', '2023-08-02 22:30:30', 'delacruz_johnlorenz', '53'),
(1942, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:31', 'delacruz_johnlorenz', '53'),
(1943, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:32', 'delacruz_johnlorenz', '53'),
(1944, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:36', 'delacruz_johnlorenz', '53'),
(1945, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:40', 'delacruz_johnlorenz', '53'),
(1946, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:42', 'delacruz_johnlorenz', '53'),
(1947, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:43', 'delacruz_johnlorenz', '53'),
(1948, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:44', 'delacruz_johnlorenz', '53'),
(1949, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:45', 'delacruz_johnlorenz', '53'),
(1950, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:47', 'delacruz_johnlorenz', '53'),
(1951, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:47', 'delacruz_johnlorenz', '53'),
(1952, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:48', 'delacruz_johnlorenz', '53'),
(1953, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:51', 'delacruz_johnlorenz', '53'),
(1954, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:51', 'delacruz_johnlorenz', '53'),
(1955, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:30:52', 'delacruz_johnlorenz', '53'),
(1956, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:01', 'delacruz_johnlorenz', '53'),
(1957, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:07', 'delacruz_johnlorenz', '53'),
(1958, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:15', 'delacruz_johnlorenz', '53'),
(1959, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:15', 'delacruz_johnlorenz', '53'),
(1960, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:16', 'delacruz_johnlorenz', '53'),
(1961, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:17', 'delacruz_johnlorenz', '53'),
(1962, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:18', 'delacruz_johnlorenz', '53'),
(1963, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:39', 'delacruz_johnlorenz', '53'),
(1964, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:41', 'delacruz_johnlorenz', '53'),
(1965, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:42', 'delacruz_johnlorenz', '53'),
(1966, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:52', 'delacruz_johnlorenz', '53'),
(1967, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:31:52', 'delacruz_johnlorenz', '53'),
(1968, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:32:04', 'delacruz_johnlorenz', '53'),
(1969, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:32:05', 'delacruz_johnlorenz', '53'),
(1970, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:32:12', 'delacruz_johnlorenz', '53'),
(1971, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:32:25', 'delacruz_johnlorenz', '53'),
(1972, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:32:26', 'delacruz_johnlorenz', '53'),
(1973, 'John Lorenz', 'q=0.01', '2023-08-03 00:09:50', 'delacruz_johnlorenz', '53'),
(1974, 'John Lorenz', 'x=-4', '2023-08-03 00:18:14', 'delacruz_johnlorenz', '53'),
(1975, 'John Lorenz', 'p=-0.35', '2023-08-03 00:20:45', 'delacruz_johnlorenz', '53'),
(1976, 'John Lorenz', 'Pen Button Clicked', '2023-08-03 00:32:03', 'delacruz_johnlorenz', '54'),
(1977, 'John Lorenz', 'Trash Button Clicked', '2023-08-03 00:32:13', 'delacruz_johnlorenz', '54'),
(1978, 'John Lorenz', 'Tutorial Button Clicked', '2023-08-03 00:32:14', 'delacruz_johnlorenz', '54'),
(1979, 'John Lorenz', 'Tutorial Button Clicked', '2023-08-03 00:32:15', 'delacruz_johnlorenz', '54'),
(1980, 'John Lorenz', 'Tutorial Button Clicked', '2023-08-03 00:32:25', 'delacruz_johnlorenz', '54'),
(1981, 'John Lorenz', 'Tutorial Button Clicked', '2023-08-03 00:36:35', 'delacruz_johnlorenz', '54'),
(1982, 'John Lorenz', 'Pen Button Clicked', '2023-08-03 00:37:01', 'delacruz_johnlorenz', '54'),
(1983, 'John Lorenz', 'Tutorial Button Clicked', '2023-08-03 00:37:02', 'delacruz_johnlorenz', '54'),
(1984, 'John Lorenz', 'Tutorial Button Clicked', '2023-08-03 00:37:04', 'delacruz_johnlorenz', '54'),
(1985, 'John Lorenz', 'Tutorial Button Clicked', '2023-08-03 00:37:05', 'delacruz_johnlorenz', '54'),
(1986, 'John Lorenz', 'Tutorial Button Clicked', '2023-08-03 00:37:06', 'delacruz_johnlorenz', '54'),
(1987, 'John Lorenz', 'Tutorial Button Clicked', '2023-08-03 00:37:08', 'delacruz_johnlorenz', '54'),
(1988, 'John Lorenz', 'jkj', '2023-08-03 00:37:15', 'delacruz_johnlorenz', '54'),
(1989, 'John Lorenz', 'kjkjklj', '2023-08-03 00:37:16', 'delacruz_johnlorenz', '54'),
(1990, 'John Lorenz', 'klklklk', '2023-08-03 00:37:18', 'delacruz_johnlorenz', '54'),
(1991, 'John Lorenz', 'lklkl', '2023-08-03 00:37:19', 'delacruz_johnlorenz', '54'),
(1992, 'John Lorenz', 'Trash Button Clicked', '2023-08-03 00:37:23', 'delacruz_johnlorenz', '54'),
(1993, 'John Lorenz', 'Hint Button Clicked', '2023-08-02 22:50:43', 'delacruz_johnlorenz', '54'),
(1994, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:50:46', 'delacruz_johnlorenz', '54'),
(1995, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:50:48', 'delacruz_johnlorenz', '54'),
(1996, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:51:00', 'delacruz_johnlorenz', '54'),
(1997, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:51:02', 'delacruz_johnlorenz', '54'),
(1998, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:51:10', 'delacruz_johnlorenz', '54'),
(1999, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:51:11', 'delacruz_johnlorenz', '54'),
(2000, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:51:14', 'delacruz_johnlorenz', '54'),
(2001, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:51:16', 'delacruz_johnlorenz', '54'),
(2002, 'John Lorenz', 'Help Button Clicked', '2023-08-02 22:51:21', 'delacruz_johnlorenz', '54');

-- --------------------------------------------------------

--
-- Table structure for table `user_request`
--

CREATE TABLE `user_request` (
  `UserID` int(10) UNSIGNED NOT NULL,
  `Subject` varchar(255) NOT NULL,
  `Message` text NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL,
  `RequestID` varchar(255) NOT NULL,
  `Timestamp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_request`
--

INSERT INTO `user_request` (`UserID`, `Subject`, `Message`, `Email`, `Role`, `Status`, `RequestID`, `Timestamp`) VALUES
(11, 'Hello', 'Try lang', 'tolentino.reynalyn@sf.edu.ph', 'Teacher', 'SOLVED', 'wDSByySXfViH8gceqltI4ojZlM8RjgL7uU5cVTp2ZqxCYJoEM2sbWNXCDfv8QA7S', 'Aug 01, 2023 - 09:56 PM'),
(12, 'Testing again', 'asdadadas', 'tolentino.reynalyn@sf.edu.ph', 'Teacher', 'SOLVED', 'TikBemlQ3PieWeo2N71FoFSvd5CvtLGR1KkSILsXYD2KaOXEFTpxw7NvsWfu646s', 'Aug 01, 2023 - 10:05 PM'),
(13, 'HAy hay ', 'heyhey', 'tolentino.reynalyn@sf.edu.ph', 'Teacher', 'UNSOLVED', 'gLSCSyQCsjtwvuIGiLxhUtF6y3szWQq3CrSQNo6PmTeFt3WkuwogfZoqbHmXI3vu', 'Aug 02, 2023 - 08:03 PM');

-- --------------------------------------------------------

--
-- Table structure for table `ververs_zawisza`
--

CREATE TABLE `ververs_zawisza` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `TimeSpent` varchar(255) NOT NULL,
  `TimeStamp` varchar(255) NOT NULL,
  `TimeStart` varchar(255) NOT NULL,
  `ExpressionAngry` varchar(255) NOT NULL,
  `ExpressionHappy` varchar(255) NOT NULL,
  `ExpressionSad` varchar(255) NOT NULL,
  `ExpressionSurprised` varchar(255) NOT NULL,
  `ExpressionMotivation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zxczx_asd`
--

CREATE TABLE `zxczx_asd` (
  `SessionID` int(10) UNSIGNED NOT NULL,
  `SessionType` varchar(255) NOT NULL,
  `Score` int(11) NOT NULL,
  `Answered` int(11) NOT NULL,
  `Unanswered` int(11) NOT NULL,
  `TimeSpent` double NOT NULL,
  `TimeStamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zxczx_asd`
--

INSERT INTO `zxczx_asd` (`SessionID`, `SessionType`, `Score`, `Answered`, `Unanswered`, `TimeSpent`, `TimeStamp`) VALUES
(1, 'Testing', 5, 14, 23, 0, '2023-03-17 19:23:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`AccountID`);

--
-- Indexes for table `cornell_chris`
--
ALTER TABLE `cornell_chris`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `delacruz_johnlorenz`
--
ALTER TABLE `delacruz_johnlorenz`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `delacruz_paulynjoy`
--
ALTER TABLE `delacruz_paulynjoy`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `dimagiba_suriad`
--
ALTER TABLE `dimagiba_suriad`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `doe_john`
--
ALTER TABLE `doe_john`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `equation_list`
--
ALTER TABLE `equation_list`
  ADD PRIMARY KEY (`EquationID`);

--
-- Indexes for table `fausti_oluf`
--
ALTER TABLE `fausti_oluf`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `guadalupe_joyceantonette`
--
ALTER TABLE `guadalupe_joyceantonette`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `h_triple`
--
ALTER TABLE `h_triple`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `macaraeg_jiabianca`
--
ALTER TABLE `macaraeg_jiabianca`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `martin_beethoven`
--
ALTER TABLE `martin_beethoven`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `mendoza_danica`
--
ALTER TABLE `mendoza_danica`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `montesa_bolby`
--
ALTER TABLE `montesa_bolby`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `montesa_piolojose`
--
ALTER TABLE `montesa_piolojose`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `ramos_markpaul`
--
ALTER TABLE `ramos_markpaul`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `section_list`
--
ALTER TABLE `section_list`
  ADD PRIMARY KEY (`SectionID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `testing`
--
ALTER TABLE `testing`
  ADD PRIMARY KEY (`AccountID`);

--
-- Indexes for table `user_database`
--
ALTER TABLE `user_database`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `user_logs`
--
ALTER TABLE `user_logs`
  ADD PRIMARY KEY (`inputID`);

--
-- Indexes for table `user_request`
--
ALTER TABLE `user_request`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `ververs_zawisza`
--
ALTER TABLE `ververs_zawisza`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `zxczx_asd`
--
ALTER TABLE `zxczx_asd`
  ADD PRIMARY KEY (`SessionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `AccountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `cornell_chris`
--
ALTER TABLE `cornell_chris`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `delacruz_johnlorenz`
--
ALTER TABLE `delacruz_johnlorenz`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `delacruz_paulynjoy`
--
ALTER TABLE `delacruz_paulynjoy`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dimagiba_suriad`
--
ALTER TABLE `dimagiba_suriad`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doe_john`
--
ALTER TABLE `doe_john`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `equation_list`
--
ALTER TABLE `equation_list`
  MODIFY `EquationID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `fausti_oluf`
--
ALTER TABLE `fausti_oluf`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guadalupe_joyceantonette`
--
ALTER TABLE `guadalupe_joyceantonette`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `h_triple`
--
ALTER TABLE `h_triple`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `macaraeg_jiabianca`
--
ALTER TABLE `macaraeg_jiabianca`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `martin_beethoven`
--
ALTER TABLE `martin_beethoven`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mendoza_danica`
--
ALTER TABLE `mendoza_danica`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `montesa_bolby`
--
ALTER TABLE `montesa_bolby`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `montesa_piolojose`
--
ALTER TABLE `montesa_piolojose`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ramos_markpaul`
--
ALTER TABLE `ramos_markpaul`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `section_list`
--
ALTER TABLE `section_list`
  MODIFY `SectionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;

--
-- AUTO_INCREMENT for table `testing`
--
ALTER TABLE `testing`
  MODIFY `AccountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `user_database`
--
ALTER TABLE `user_database`
  MODIFY `SessionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_logs`
--
ALTER TABLE `user_logs`
  MODIFY `inputID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2003;

--
-- AUTO_INCREMENT for table `user_request`
--
ALTER TABLE `user_request`
  MODIFY `UserID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `ververs_zawisza`
--
ALTER TABLE `ververs_zawisza`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zxczx_asd`
--
ALTER TABLE `zxczx_asd`
  MODIFY `SessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
