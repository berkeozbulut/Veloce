-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 25 Eki 2026, 20:19:33
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `veloce`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `messages`
--

CREATE TABLE `messages` (
  `m_id` int(11) NOT NULL,
  `m_firstName` varchar(100) DEFAULT NULL,
  `m_lastName` varchar(100) DEFAULT NULL,
  `m_email` varchar(100) DEFAULT NULL,
  `m_message` text DEFAULT NULL,
  `m_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `m_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `orders`
--

CREATE TABLE `orders` (
  `o_id` int(11) NOT NULL,
  `o_no` varchar(20) DEFAULT NULL,
  `o_products` text DEFAULT NULL,
  `o_pids` text DEFAULT NULL,
  `o_person` varchar(40) DEFAULT NULL,
  `o_address` varchar(100) DEFAULT NULL,
  `o_amount` decimal(10,2) DEFAULT NULL,
  `o_created_at` timestamp NULL DEFAULT current_timestamp(),
  `o_status` varchar(20) DEFAULT NULL,
  `u_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `products`
--

CREATE TABLE `products` (
  `p_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `p_name` varchar(50) NOT NULL,
  `p_active` tinyint(1) DEFAULT NULL,
  `p_stock` smallint(6) NOT NULL,
  `p_price` decimal(10,2) NOT NULL,
  `p_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `p_desc` text DEFAULT NULL,
  `p_disc` decimal(10,2) NOT NULL,
  `p_images` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `products`
--

INSERT INTO `products` (`p_id`, `u_id`, `p_name`, `p_active`, `p_stock`, `p_price`, `p_created_at`, `p_desc`, `p_disc`, `p_images`) VALUES
(2, 0, 'Agv K1 S Mono White Kapalı Kask', 1, 15, 11990.00, '2026-10-19 13:53:06', 'bbb', 0.00, '/uploads/agv-k1-s-mono-white-kapali-kask-0606c7.png'),
(3, 0, 'Agv K6 S Reeval White Red Grey Kapalı Kask', 1, 8, 31900.00, '2026-10-21 19:10:28', 'Eski motorum', 0.00, '/uploads/1792418250628.png'),
(4, 0, 'Agv K3 Mplk Striga Matt Black Blue Red Kapalı Kask', 1, 8, 16190.00, '2026-10-19 13:58:43', 'aaaa', 1.00, '/uploads/1792418323475.png'),
(7, 0, 'Agv Pista GP RR Electrum Limited Edition Kapalı Ka', 1, 3, 110790.00, '2026-10-19 14:00:16', 'U_id test', 33.00, '/uploads/1792418416358.png'),
(10, 6, 'Dainese Avro 5 Blk Anthracite Deri Mont', 1, 10, 51490.00, '2026-10-19 15:06:32', 'Harika kask', 29000.00, '/uploads/1792422392839.png'),
(11, 6, 'Dainese Hekla İron Gate ABSØLUTESHELL™ Pro 20k Mon', 1, 8, 63690.00, '2026-10-19 15:10:04', '22', 55.00, '/uploads/1792422604405.png'),
(12, 6, 'Dainese SuperSpeed Black Red Fluo Deri Pantolon', 1, 2, 45690.00, '2026-10-19 15:11:19', 'Görselsizz', 3333.00, '/uploads/1792422679712.png'),
(14, 6, 'Dainese Fiero Metal Black Red Lava White Deri Eldi', 1, 22, 29290.00, '2026-10-22 23:39:40', 'Eldiven', 0.00, '/uploads/1792423594278.png');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `u_firstName` varchar(100) DEFAULT NULL,
  `u_lastName` varchar(100) DEFAULT NULL,
  `u_email` varchar(100) DEFAULT NULL,
  `u_pass` varchar(255) DEFAULT NULL,
  `u_birthdate` date DEFAULT NULL,
  `u_role` tinyint(1) NOT NULL,
  `u_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`m_id`);

--
-- Tablo için indeksler `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`o_id`);

--
-- Tablo için indeksler `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`p_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `u_email` (`u_email`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `messages`
--
ALTER TABLE `messages`
  MODIFY `m_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `orders`
--
ALTER TABLE `orders`
  MODIFY `o_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `products`
--
ALTER TABLE `products`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

INSERT INTO `users` (`u_id`, `u_firstName`, `u_lastName`, `u_email`, `u_pass`, `u_birthdate`, `u_role`, `u_created_at`) VALUES
(21, 'admin', 'admin', 'test.admin@veloce.com', '$2b$10$UcQDncRI5C4ssU8qlANLze7wxpzm47ZaLueZSFiwUQ/i5NdXXduDy', '0001-01-01', 1, '2026-10-25 18:01:11'),
(22, 'kullanici', 'kullanici', 'test.kullanici@veloce.com', '$2b$10$G/mKwiMLBfk97cKPLsxF6eUjEGvHgZMv2yXe3gYd.p3B3SGg92Yry', '0001-01-01', 0, '2026-10-25 18:04:42');
COMMIT;