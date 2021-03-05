-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2021 at 08:41 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL COMMENT 'primary key',
  `product_name` varchar(30) NOT NULL,
  `product_link` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `redirect_link` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `product_link`, `price`, `redirect_link`) VALUES
(1, 'potato', 'https://www.bigbasket.com/media/uploads/p/s/40162470_1-fresho-potato-chandramukhi.jpg', 40, 'https://www.bigbasket.com/pd/40162470/fresho-potato-chandramukhi-2-kg/?nc=cl-prod-list&t_pg=&t_p=&t_'),
(2, 'Onion', 'https://www.bigbasket.com/media/uploads/p/s/10000148_28-fresho-onion.jpg', 50, 'https://www.bigbasket.com/pd/10000204/fresho-tomato-local-500-g/?nc=l3category&t_pg=L3Categories&t_p'),
(3, 'Tomatro', 'https://www.bigbasket.com/media/uploads/p/s/10000204_16-fresho-tomato-local.jpg', 40, 'https://www.bigbasket.com/pd/40162470/fresho-potato-chandramukhi-2-kg/?nc=cl-prod-list&t_pg=&t_p=&t_'),
(4, 'Red Potato', 'https://www.bigbasket.com/media/uploads/p/s/40125216_1-fresho-potato-red.jpg', 50, 'https://www.bigbasket.com/pd/40125216/fresho-potato-red-1-kg/?nc=l3category&t_pg=L3Categories&t_p=l3');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `fname` text NOT NULL,
  `lname` text NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `fname`, `lname`, `email`, `password`) VALUES
(1, 'Sukanta Majhi', 'Sukanta', 'Majhi', 'sukantamajhi799@gmai', '12'),
(2, 'Sukanta Majhi', 'Sukanta', 'Majhi', 'sukantamajhi799@gmai', '12'),
(3, 'SHUBHAMAY PANJA', 'SHUBHAMAY', 'PANJA', 'sukantamajhi9211@gma', '12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
