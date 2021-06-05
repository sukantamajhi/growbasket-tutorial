-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 05, 2021 at 04:48 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

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
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `username`, `email`, `message`) VALUES
(42, 'sukantamajhi', 'sukantamajhi799@gmail.com', 'Hello world'),
(43, 'sukantamajhi', 'sukantamajhi799@gmail.com', 'Hello world'),
(44, 'sukantamajhi', 'sukantamajhi799@gmail.com', 'Hello world'),
(45, 'sukantamajhi', 'sukantamajhi799@gmail.com', 'Hello world'),
(46, 'soumyajitbanerjee', 'banerjees705@gmail.com', 'Hii my name is sumo');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL COMMENT 'primary key',
  `username` varchar(30) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_link` varchar(500) NOT NULL,
  `price` int(11) NOT NULL,
  `redirect_link` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `username`, `product_name`, `product_link`, `price`, `redirect_link`) VALUES
(18, 'sukantamajhi', 'Aashirvaad Multigrain Atta 5 k', 'https://www.bigbasket.com/media/uploads/p/l/126906_7-aashirvaad-atta-whole-wheat.jpg', 376, 'https://www.bigbasket.com/pd/126906/aashirvaad-atta-whole-wheat-10-kg-pouch/?nc=as&q=ashirbad'),
(19, 'subhamaypanja', 'Onion', 'https://www.bigbasket.com/media/uploads/p/s/10000148_28-fresho-onion.jpg', 500, 'https://www.bigbasket/pd/40162470/fresho-potato-chandramukhi-2-kg/?nc=cl-prod-list&t_pg=&t_p=&t_s=cl'),
(20, 'sukantamajhi', 'Potato', 'https://www.bigbasket.com/media/uploads/p/l/10000159_25-fresho-potato.jpg', 18, 'https://www.bigbasket.com/pd/10000159/fresho-potato-1-kg/?nc=Best%20Sellers&t_pg=mar-hompage-t1&t_p='),
(21, 'arkadebmondol', 'Onion', 'https://www.bigbasket.com/media/uploads/p/s/40162470_1-fresho-potato-chandramukhi.jpg', 200, 'https://www.bigbasket.com/pd/40162470/fresho-potato-chandramukhi-2-kg/?nc=cl-prod-list&t_pg=&t_p=&t_'),
(22, 'sukantamajhi', 'potato', 'https://www.bigbasket.com/media/uploads/p/s/40162470_1-fresho-potato-chandramukhi.jpg', 400, 'https://www.bigbasket.com/pd/40162470/fresho-potato-chandramukhi-2-kg/?nc=cl-prod-list&t_pg=&t_p=&t_'),
(23, 'sukantamajhi', 'Lays Potato Chips - Calm Cream', 'https://www.bigbasket.com/media/uploads/p/l/294297_13-lays-potato-chips-calm-cream-onion-flavour.jpg', 10, 'https://www.bigbasket.com/pd/294297/lays-potato-chips-calm-cream-onion-flavour-28-g-pouch/?nc=L2Cate'),
(25, 'sukantamajhi', 'potato', 'https://www.bigbasket.com/media/uploads/p/s/40162470_1-fresho-potato-chandramukhi.jpg', 40, 'https://www.bigbasket.com/pd/40162470/fresho-potato-chandramukhi-2-kg/?nc=cl-prod-list&t_pg=&t_p=&t_'),
(26, 'sukantamajhi', 'Onion', 'https://www.bigbasket.com/media/uploads/p/s/10000148_28-fresho-onion.jpg', 200, 'https://www.bigbasket/pd/40162470/fresho-potato-chandramukhi-2-kg/?nc=cl-prod-list&t_pg=&t_p=&t_s=cl'),
(27, 'sukantamajhi', 'Fresho Apple - Red Delicious, ', 'https://www.bigbasket.com/media/uploads/p/s/40125216_1-fresho-potato-red.jpg', 100, 'https://www.bigbasket.com/pd/40033824/fresho-apple-red-delicious-regular-4-pcs/?nc=feat-prod&t_pg=l1'),
(28, 'sukantamajhi', 'potato', 'https://www.bigbasket.com/media/uploads/p/s/40162470_1-fresho-potato-chandramukhi.jpg', 40, 'https://www.bigbasket.com/pd/40162470/fresho-potato-chandramukhi-2-kg/?nc=cl-prod-list&t_pg=&t_p=&t_'),
(29, 'sukantamajhi', 'Fresho Apple - Red Delicious, Regular, 4 pcs (Approx. 530g - 640g)', 'https://www.bigbasket.com/media/uploads/p/l/40033824_19-fresho-apple-red-delicious-regular.jpg', 179, 'https://www.bigbasket.com/pd/40033824/fresho-apple-red-delicious-regular-4-pcs/?nc=feat-prod&t_pg=l1-cat-fruits-vegetables&t_p=cl-temp-1&t_s=feat-prod&t_pos_sec=3&t_pos_item=1&t_ch=desktop'),
(30, 'soumyajitbanerjee', 'Chings Hakka Noodles - Veg, 5x150 g Multipack', 'https://www.bigbasket.com/media/uploads/p/l/1204444_2-chings-hakka-noodles-veg.jpg', 130, 'https://www.bigbasket.com/pd/1204444/chings-hakka-noodles-veg-5x150-g/?nc=L2Category&t_pg=L2Cagegory&t_p=L2Category&t_s=L2Category&t_pos=3&t_ch=desktop');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `fname` text NOT NULL,
  `lname` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `fname`, `lname`, `email`, `password`) VALUES
(15, 'Sukanta Majhi', 'Sukanta', 'Majhi', 'sukantamajhi799@gmai', '1234'),
(16, 'sukantamajhi', 'Sukanta', 'Majhi', 'sukantamajhi799@gmai', '1234'),
(18, 'arkadebmondol', 'Arkadeb', 'Mondol', 'am@email.com', '1234'),
(19, 'Sukanta Majhi', 'Sukanta', 'Majhi', 'sukantamajhi799@gmai', 'Sukanta@'),
(20, 'shubhamaypanja', 'Shubhamay', 'Panja', 'shubhamay1001@gmail.', '1234'),
(21, 'indranilsarkar', 'Indranil', 'Sarkar', 'indra.nil2004@gmail.com', '123456'),
(22, 'soumyajitbanerjee', 'Soumyajit', 'Banerjee', 'banerjees705@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `product_image` varchar(1000) NOT NULL,
  `price` int(11) NOT NULL,
  `redirect_link` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `username`, `product_name`, `product_image`, `price`, `redirect_link`) VALUES
(20, 'soumyajitbanerjee', 'Potato', 'https://www.bigbasket.com/media/uploads/p/l/10000159_25-fresho-potato.jpg', 18, 'https://www.bigbasket.com/pd/10000159/fresho-potato-1-kg/?nc=Best%20Sellers&t_pg=mar-hompage-t1&t_p='),
(23, 'indranilsarkar', 'Lays Potato Chips - Calm Cream', 'https://www.bigbasket.com/media/uploads/p/l/294297_13-lays-potato-chips-calm-cream-onion-flavour.jpg', 10, 'https://www.bigbasket.com/pd/294297/lays-potato-chips-calm-cream-onion-flavour-28-g-pouch/?nc=L2Cate');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
