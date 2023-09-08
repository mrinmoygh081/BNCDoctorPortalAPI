-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20230711.6a6929c361
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 08, 2023 at 04:24 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doctorportal`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `booking_date` datetime NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `p_id`, `booking_date`, `datetime`) VALUES
(17, 31, '2023-07-31 00:00:00', '2023-08-18 10:10:09'),
(18, 32, '2023-07-31 00:00:00', '2023-08-18 10:10:09'),
(19, 32, '2023-07-31 00:00:00', '2023-08-18 10:10:09'),
(20, 32, '2023-07-31 00:00:00', '2023-08-18 10:10:09'),
(21, 33, '2023-08-02 00:00:00', '2023-08-18 10:10:09'),
(22, 34, '2023-08-03 00:00:00', '2023-08-18 10:10:09'),
(23, 37, '2023-09-08 00:00:00', '2023-08-18 10:10:09'),
(24, 38, '2023-09-08 00:00:00', '2023-08-18 10:10:09'),
(25, 39, '2023-10-08 00:00:00', '2023-08-18 10:10:09'),
(26, 40, '2023-09-08 00:00:00', '2023-08-18 10:10:09'),
(27, 41, '2023-10-08 00:00:00', '2023-08-18 10:10:09'),
(28, 33, '0000-00-00 00:00:00', '2023-08-18 10:10:09'),
(29, 33, '0000-00-00 00:00:00', '2023-08-18 10:10:09'),
(30, 42, '0000-00-00 00:00:00', '2023-08-18 10:10:09'),
(31, 43, '0000-00-00 00:00:00', '2023-08-18 10:10:09'),
(32, 44, '2023-08-19 00:00:00', '2023-08-18 10:10:09'),
(33, 45, '0000-00-00 00:00:00', '2023-08-18 10:10:09'),
(34, 46, '2023-08-26 00:00:00', '2023-08-18 04:51:44'),
(35, 47, '2023-08-19 00:00:00', '2023-08-18 04:52:19'),
(36, 48, '2023-08-19 00:00:00', '2023-08-18 05:43:50'),
(37, 49, '2023-08-18 00:00:00', '2023-08-18 05:46:01'),
(38, 49, '2023-08-18 00:00:00', '2023-08-18 05:47:32'),
(39, 51, '2023-08-19 03:31:25', '2023-08-19 03:32:23'),
(40, 51, '2023-08-20 03:32:37', '2023-08-19 03:32:54'),
(41, 52, '2023-09-03 03:31:26', '2023-09-03 03:32:29'),
(42, 33, '2023-09-04 04:21:43', '2023-09-04 04:21:50'),
(43, 33, '2023-09-07 17:41:40', '2023-09-07 17:41:47');

-- --------------------------------------------------------

--
-- Table structure for table `casehistory`
--

CREATE TABLE `casehistory` (
  `ch_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `date` varchar(65) NOT NULL,
  `system` varchar(45) NOT NULL,
  `image` varchar(155) NOT NULL,
  `remarks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `casehistory`
--

INSERT INTO `casehistory` (`ch_id`, `p_id`, `date`, `system`, `image`, `remarks`) VALUES
(1, 31, '07-05-2020', 'GT', 'url3', 'remarks'),
(2, 32, '07-05-2020', 'GT', 'url3', 'remarks'),
(3, 33, '2023-09-07T17:42:00.497Z', 'Gastric', '1694108535229-OPL-Oil-Room-Setup.jpg', 'HEllo');

-- --------------------------------------------------------

--
-- Table structure for table `casereporing`
--

CREATE TABLE `casereporing` (
  `cr_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `system` varchar(45) NOT NULL,
  `image` varchar(155) NOT NULL,
  `remarks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cravings`
--

CREATE TABLE `cravings` (
  `craving_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `cravings` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cravings`
--

INSERT INTO `cravings` (`craving_id`, `p_id`, `cravings`) VALUES
(1, 32, 'HEllo211'),
(2, 33, 'Hello'),
(3, 51, '[\"FISH\"]');

-- --------------------------------------------------------

--
-- Table structure for table `familyhistory`
--

CREATE TABLE `familyhistory` (
  `familyhistory_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `p_infective` varchar(45) NOT NULL,
  `p_noninfective` varchar(45) NOT NULL,
  `p_surgical` varchar(45) NOT NULL,
  `p_obs_gynae` varchar(45) NOT NULL,
  `p_parity` varchar(45) NOT NULL,
  `m_infective` varchar(45) NOT NULL,
  `m_noninfective` varchar(45) NOT NULL,
  `m_surgical` varchar(45) NOT NULL,
  `m_obs_gynae` varchar(45) NOT NULL,
  `m_parity` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `familyhistory`
--

INSERT INTO `familyhistory` (`familyhistory_id`, `p_id`, `p_infective`, `p_noninfective`, `p_surgical`, `p_obs_gynae`, `p_parity`, `m_infective`, `m_noninfective`, `m_surgical`, `m_obs_gynae`, `m_parity`) VALUES
(1, 31, 'ds', 'fsdf', 'fdsf', 'fsdffs', 'asd', 'das', 'sada', 'as', 'sa', 'assss'),
(2, 33, 'aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii', 'jjj'),
(3, 32, 'aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii', 'jjj'),
(4, 35, 'aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii', 'jjj'),
(5, 51, 'aaa', 'ccc', 'eee', 'ggg', 'ijj', 'bbb', 'ddd', 'fff', 'hhh', 'jkk'),
(6, 52, 'Hair Loss', '', '', '', '', '', '', '', 'Nothing', '');

-- --------------------------------------------------------

--
-- Table structure for table `generalities`
--

CREATE TABLE `generalities` (
  `generalities_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `sweat` varchar(45) NOT NULL,
  `skin` varchar(55) NOT NULL,
  `teeth_gum` varchar(55) NOT NULL,
  `tongue` varchar(55) NOT NULL,
  `mental` varchar(55) NOT NULL,
  `thirst` varchar(55) NOT NULL,
  `dreams` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `generalities`
--

INSERT INTO `generalities` (`generalities_id`, `p_id`, `sweat`, `skin`, `teeth_gum`, `tongue`, `mental`, `thirst`, `dreams`) VALUES
(1, 23, 'sweat2', 'skin2', '2teeth_gum32', 'tongue2', 'no mental2', 'thirst2', 'no dream2'),
(2, 51, 'No Sweat', 'Hello', 'Yellow', 'Tasteless', 'Nope', 'Low Thirst', 'Very Dreams');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `p_id` int(11) NOT NULL,
  `patient_id` varchar(25) NOT NULL,
  `name` varchar(55) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `age` varchar(3) NOT NULL,
  `sex` varchar(12) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`p_id`, `patient_id`, `name`, `phone`, `age`, `sex`, `address`) VALUES
(31, '122p', 'Mrinmoy Ghosh', '08240491818', '20', 'Transparent', 'PATHAKPARA'),
(32, '13', 'Mrinmoy Ghosh', '08240491818', '20', 'Transparent', 'PATHAKPARA'),
(33, 'ABCW12', 'M Ghosh', '789456123', '26', 'Male', 'PATHAKPARA, sdf'),
(34, 'ABCW123', 'M Ghosh', '789456123', '26', 'Male', 'PATHAKPARA, sdf'),
(35, 'ABCW13', 'M Ghosh', '08240491818', '25', 'Male', 'PATHAKPARA'),
(36, 'ABCW15', 'M Ghosh', '08240491818', '25', 'Male', 'PATHAKPARA'),
(37, 'MRIN213', 'M', 'Ghosh', '26', 'Male', 'Milki, Malda'),
(38, 'MRIN123', 'Baban', 'Ghosh', '26', 'Male', 'Milki, Malda'),
(39, 'MRIN124', 'Twishani', 'Adhikary', '19', 'Female', 'Hyderpur, Malda, West Bengal'),
(40, 'PAT1', 'Soumodip Ghosh', '8240491818', '26', 'Male', 'Pathakpara, Milki, Malda'),
(41, 'PAT2', 'Jyotirmoy Sammadar', '987456123', '16', '', 'Amrity, Malda'),
(42, 'ABC213', 'Moumita Ghosh', '08240491818', '25', 'Female', 'PATHAKPARA'),
(43, 'ABC2133', 'S Ghosh', '08240491818', '20', 'Male', 'PATHAKPARA'),
(44, 'ABC789', 'Soumo Ghosh', '97456132', '19', 'Male', 'PATHAKPARA'),
(45, 'BAC12', 'Baban Ghosh', '08240491818', '26', 'Male', 'PATHAKPARA'),
(46, 'AB12', 'Mrinmoy Ghosh', '08240491818', '20', 'Male', 'PATHAKPARA'),
(47, 'ABC12', 'Somnath', '08240491818', '20', '', 'PATHAKPARA'),
(48, 'ABC124', 'Mrinmoy Ghosh', '08240491818', '121', 'Male', 'PATHAKPARA'),
(49, 'ABC123', 'Mrinmoy Ghosh', '8240491818', '23', 'Male', 'PATHAKPARA'),
(50, 'APC213', 'Rinku Ghosh', '8240491818', '53', 'Female', 'Milki, Malda'),
(51, 'APC1', 'Ashim Ghosh', '8972589433', '57', 'Male', 'Milki, Malda, Pathakpara'),
(52, 'TEST1', 'Soumodip Ghosh', '8240491818', '19', 'Male', 'Milki, Malda, West Bengal');

-- --------------------------------------------------------

--
-- Table structure for table `personalhistory`
--

CREATE TABLE `personalhistory` (
  `personalhistory_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `infective_history` varchar(255) NOT NULL,
  `injuries` varchar(55) NOT NULL,
  `vaccination` varchar(55) NOT NULL,
  `surgical` varchar(55) NOT NULL,
  `addiction` varchar(35) NOT NULL,
  `marital_status` varchar(15) NOT NULL,
  `num_child` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personalhistory`
--

INSERT INTO `personalhistory` (`personalhistory_id`, `p_id`, `infective_history`, `injuries`, `vaccination`, `surgical`, `addiction`, `marital_status`, `num_child`) VALUES
(1, 31, 'HEllo', 'Leg injured', 'Covid', 'No', 'No', 'Always S', '10'),
(2, 32, 'HEllo2', 'Leg 22', 'Covid2', 'No2', 'No2', 'Unmarrie', '1'),
(3, 51, '[\"Pox\",\"Measles\",\"Scabies\",\"Leprosy\",\"Ringworm\",\"Pleurisy\"]', 'Nope', 'Covid', 'Nope', 'Smoking', 'Married', '2'),
(4, 52, '[\"Pox\",\"Amoebiasis\",\"Koch\'s\"]', '', '', '', '', 'Widow', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `fullname`) VALUES
(1, 'admin', 'admin@213', 'Mrinmoy Ghosh');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `p_id` (`p_id`);

--
-- Indexes for table `casehistory`
--
ALTER TABLE `casehistory`
  ADD PRIMARY KEY (`ch_id`);

--
-- Indexes for table `casereporing`
--
ALTER TABLE `casereporing`
  ADD PRIMARY KEY (`cr_id`);

--
-- Indexes for table `cravings`
--
ALTER TABLE `cravings`
  ADD PRIMARY KEY (`craving_id`);

--
-- Indexes for table `familyhistory`
--
ALTER TABLE `familyhistory`
  ADD PRIMARY KEY (`familyhistory_id`);

--
-- Indexes for table `generalities`
--
ALTER TABLE `generalities`
  ADD PRIMARY KEY (`generalities_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `personalhistory`
--
ALTER TABLE `personalhistory`
  ADD PRIMARY KEY (`personalhistory_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `casehistory`
--
ALTER TABLE `casehistory`
  MODIFY `ch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `casereporing`
--
ALTER TABLE `casereporing`
  MODIFY `cr_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cravings`
--
ALTER TABLE `cravings`
  MODIFY `craving_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `familyhistory`
--
ALTER TABLE `familyhistory`
  MODIFY `familyhistory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `generalities`
--
ALTER TABLE `generalities`
  MODIFY `generalities_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `personalhistory`
--
ALTER TABLE `personalhistory`
  MODIFY `personalhistory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
