-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-02-2024 a las 06:24:15
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `electrotools_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

CREATE TABLE `accounts` (
  `id` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `username` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`id`, `createdAt`, `updatedAt`, `username`, `email`, `password`, `avatar`, `user_id`) VALUES
(1, '2024-02-25 01:13:22', '2024-02-25 01:16:00', 'YoElDante', 'dante@mail.com', '$2a$10$YJl1tOPDJmbbnxXwUe1RS.V6iUsav0nuvKem9InkiYu/Zgoqs/Rd2', 'C:\\workspace\\DigitalHouse\\Dante\\grupo_2_herramientasElectricas\\img\\users\\user1708823601908.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `order_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `account_id` int(10) UNSIGNED NOT NULL,
  `solddate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productbrands`
--

CREATE TABLE `productbrands` (
  `id` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productbrands`
--

INSERT INTO `productbrands` (`id`, `createdAt`, `updatedAt`, `name`) VALUES
(1, '2024-02-09 03:16:09', '2024-02-09 03:16:09', 'dewalt'),
(2, '2024-02-09 03:17:47', '2024-02-09 03:17:47', 'bosch'),
(3, '2024-02-09 03:19:07', '2024-02-09 03:19:07', 'makita'),
(4, '2024-02-09 03:20:12', '2024-02-09 03:20:12', 'stanley'),
(5, '2024-02-09 03:21:41', '2024-02-09 03:21:41', 'black&decker');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productdetails`
--

CREATE TABLE `productdetails` (
  `id` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `voltage` varchar(10) NOT NULL,
  `frequency` varchar(10) NOT NULL,
  `power` varchar(10) NOT NULL,
  `extras` text NOT NULL,
  `manual` varchar(255) DEFAULT NULL,
  `product_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productdetails`
--

INSERT INTO `productdetails` (`id`, `createdAt`, `updatedAt`, `voltage`, `frequency`, `power`, `extras`, `manual`, `product_id`) VALUES
(1, '2024-02-09 04:22:45', '2024-02-09 05:04:08', '220V', '1650rpm', '800W', 'Con función reversa.\r\nCuenta con función destornillador.\r\nIncluye función percutor.\r\nVelocidad máxima de rotación: 1650rpm.\r\nPosee control de torque.\r\nTiene luz led.\r\nDimensiones: 7.5\'\' de ancho, 7.9\'\' de alto y 6.9\'\' de largo.', 'https://www.manual.ar/dewalt/dcd709/manual', 1),
(2, '2024-02-09 04:34:58', '2024-02-09 05:04:32', '220V', '3200rpm', '710W', 'Con función reversa.\r\nViene con caja de cartón.\r\nCuenta con función destornillador.\r\nIncluye función percutor.\r\nEjecuta 5500 golpes por minuto.\r\nVelocidad máxima de rotación: 3200rpm.\r\nDimensiones: 75mm de ancho, 204mm de alto y 296mm de largo.', 'https://www.manual.ar/makita/hp1630/manual', 2),
(3, '2024-02-09 05:06:53', '2024-02-09 05:06:53', '220V', '220rpm', '3.6W', 'Destornillador eléctrico compacto\r\nEs inalámbrico\r\nPotencia de 3.6W\r\nVelocidad de rotación de entre 220rpm\r\nTorque máximo: 6Nm\r\nIncluye adaptador de ca.\r\nMandril de 3.6mm\r\nIluminación LED para mejor visibilidad', 'https://www.manual.ar/makita/df001dw/manual', 3),
(4, '2024-02-09 05:12:37', '2024-02-09 05:12:37', '220V', '8500rpm', '2200W', 'Apta para un disco de 180 mm de diámetro.\r\nTrae interruptor gatillo.\r\nSu potencia es de 2200 W.\r\nVelocidad máxima de rotación de 8500 rpm.\r\nEs antipolvo y protege al motor de la suciedad entrante.\r\nCuenta con protección contra sobrecarga.\r\nPosee freno automático por atascamiento.\r\nTiene botón de bloqueo de disco.\r\nEl largo del cable es de 1.95 m.\r\nPesa 5.5 kg.\r\nIncluye: llave.', 'https://www.manual.ar/makita/ga7020/manual', 4),
(5, '2024-02-09 05:12:37', '2024-02-09 05:12:37', '220V', '50Hz', '2200W', 'Permite taladrar sin percusión, taladrar con percusión y cincelar.\r\nRota a una velocidad mínima de 0rpm y una velocidad máxima de 1500rpm.\r\nCon 2.6J de impacto, ideal para trabajos de perforación en el hogar.\r\nPerfora hormigón de hasta 26mm, metal de 13mm y madera de 30mm.\r\nEjecuta 5500 golpes por minuto.\r\nUtiliza encastre SDS Plus de 10mm de diámetro.\r\nTiene embrague de seguridad para mayor protección.\r\nPesa 2.6 kg.\r\nDiseño ergonómico con encastre SDS Plus y embrague de seguridad para un manejo seguro y cómodo.', 'https://www.manual.ar/dewalt/d25133k/manual', 5),
(6, '2024-02-09 05:17:55', '2024-02-09 05:17:55', '220V', '4000rpm', '2200W', 'Permite taladrar sin percusión, taladrar con percusión y cincelar.\r\nRota a una velocidad mínima de 0rpm y una velocidad máxima de 4000rpm.\r\nCon 3.2J de impacto, ideal para trabajos de perforación en el hogar.\r\nPerfora hormigón de hasta 28mm, metal de 13mm y madera de 30mm.\r\nEjecuta 4000 golpes por minuto.\r\nUtiliza encastre SDS Plus de 10mm de diámetro.\r\nTiene embrague de seguridad para mayor protección.\r\nPesa 2.8 kg.\r\nIncluye maletín.', 'https://www.manual.ar/bosch/gbh-2-28-d-professional/manual', 6),
(7, '2024-02-09 05:17:55', '2024-02-09 05:17:55', '220V', '12000rpm', '710W', 'Apta para un disco de 115 mm de diámetro.\r\nAlcanza una profundidad de corte de 65 mm.\r\nTrae interruptor tecla.\r\nSu potencia es de 710 W.\r\nVelocidad máxima de rotación de 12000 rpm.\r\nTiene botón de bloqueo de disco.\r\nEl largo del cable es de 2 m.\r\nPesa 1.8 kg.\r\nProtector de disco incorporado.', 'https://www.manual.ar/bosch/gws-700-professional/manual', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productimages`
--

CREATE TABLE `productimages` (
  `id` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_id` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productimages`
--

INSERT INTO `productimages` (`id`, `createdAt`, `updatedAt`, `product_id`, `image`) VALUES
(1, '2024-02-09 05:53:59', '2024-02-09 05:53:59', 1, 'dewalt/atornillador/img1.webp'),
(2, '2024-02-09 05:53:59', '2024-02-09 05:53:59', 1, 'dewalt/atornillador/img2.webp'),
(3, '2024-02-09 05:56:56', '2024-02-09 05:56:56', 1, 'dewalt/atornillador/img3.webp'),
(4, '2024-02-09 05:56:56', '2024-02-09 05:56:56', 1, 'dewalt/atornillador/img4.webp'),
(5, '2024-02-09 05:57:17', '2024-02-09 05:57:17', 1, 'dewalt/atornillador/img5.webp'),
(6, '2024-02-09 05:58:01', '2024-02-09 05:58:01', 2, 'makita/taladro/img1.webp'),
(7, '2024-02-09 05:58:01', '2024-02-09 05:58:01', 2, 'makita/taladro/img2.webp'),
(8, '2024-02-09 05:58:22', '2024-02-09 05:58:22', 2, 'makita/taladro/img3.webp'),
(9, '2024-02-09 05:58:22', '2024-02-09 05:58:22', 2, 'makita/taladro/img4.webp'),
(10, '2024-02-09 05:58:35', '2024-02-09 05:58:35', 2, 'makita/taladro/img5.webp'),
(11, '2024-02-09 05:59:05', '2024-02-09 05:59:05', 3, 'makita/atornillador/img1.webp'),
(12, '2024-02-09 05:59:05', '2024-02-09 05:59:05', 3, 'makita/atornillador/img2.webp'),
(13, '2024-02-09 05:59:34', '2024-02-09 05:59:34', 3, 'makita/atornillador/img3.webp'),
(14, '2024-02-09 05:59:34', '2024-02-09 05:59:34', 3, 'makita/atornillador/img4.webp'),
(15, '2024-02-09 05:59:47', '2024-02-09 05:59:47', 3, 'makita/atornillador/img5.webp'),
(16, '2024-02-09 06:00:16', '2024-02-09 06:00:16', 4, 'makita/amoladoraAngular/img1.webp'),
(17, '2024-02-09 06:00:16', '2024-02-09 06:00:16', 4, 'makita/amoladoraAngular/img2.webp'),
(18, '2024-02-09 06:00:35', '2024-02-09 06:00:35', 4, 'makita/amoladoraAngular/img3.webp'),
(19, '2024-02-09 06:00:35', '2024-02-09 06:00:35', 4, 'makita/amoladoraAngular/img4.webp'),
(20, '2024-02-09 06:00:47', '2024-02-09 06:00:47', 4, 'makita/amoladoraAngular/img5.webp'),
(21, '2024-02-09 06:01:13', '2024-02-09 06:01:13', 5, 'dewalt/rotomartilloPercutor/img1.webp'),
(22, '2024-02-09 06:01:13', '2024-02-09 06:01:13', 5, 'dewalt/rotomartilloPercutor/img2.webp'),
(23, '2024-02-09 06:01:36', '2024-02-09 06:01:36', 5, 'dewalt/rotomartilloPercutor/img3.webp'),
(24, '2024-02-09 06:01:36', '2024-02-09 06:01:36', 5, 'dewalt/rotomartilloPercutor/img4.webp'),
(25, '2024-02-09 06:01:57', '2024-02-09 06:01:57', 5, 'dewalt/rotomartilloPercutor/img5.webp'),
(26, '2024-02-09 06:02:31', '2024-02-09 06:02:31', 6, 'bosch/rotomartilloElectroneumático/img1.webp'),
(27, '2024-02-09 06:02:31', '2024-02-09 06:02:31', 6, 'bosch/rotomartilloElectroneumático/img2.webp'),
(28, '2024-02-09 06:02:50', '2024-02-09 06:02:50', 6, 'bosch/rotomartilloElectroneumático/img3.webp'),
(29, '2024-02-09 06:02:50', '2024-02-09 06:02:50', 6, 'bosch/rotomartilloElectroneumático/img4.webp'),
(30, '2024-02-09 06:03:02', '2024-02-09 06:03:02', 6, 'bosch/rotomartilloElectroneumático/img5.webp'),
(31, '2024-02-09 06:03:27', '2024-02-09 06:03:27', 7, 'bosch/amoladoraAngular/img1.webp'),
(32, '2024-02-09 06:03:27', '2024-02-09 06:03:27', 7, 'bosch/amoladoraAngular/img2.webp'),
(33, '2024-02-09 06:04:00', '2024-02-09 06:04:00', 7, 'bosch/amoladoraAngular/img3.webp'),
(34, '2024-02-09 06:04:00', '2024-02-09 06:04:00', 7, 'bosch/amoladoraAngular/img4.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `name` varchar(25) NOT NULL,
  `productbrand_id` int(10) UNSIGNED NOT NULL,
  `model` varchar(25) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `units` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `createdAt`, `updatedAt`, `name`, `productbrand_id`, `model`, `description`, `price`, `units`) VALUES
(1, '2024-02-09 04:20:13', '2024-02-09 04:40:29', 'Taladro Atornillador', 1, 'DCD709B', 'Taladro Atornillador Percusión 1/2 13mm Dewalt Dcd709b', 320000, 6),
(2, '2024-02-09 04:32:47', '2024-02-09 04:40:45', 'Taladro percutor atornill', 3, 'HP1630', 'Taladro percutor atornillador eléctrico de 13mm Makita HP1630 710W + accesorio con caja de cartón 22', 102500, 8),
(3, '2024-02-09 04:37:33', '2024-02-09 04:41:18', 'Atornillador Inalámbrico', 3, 'DF001DW', 'Atornillador Inalámbrico Makita 3.6v Df001dw + Accesesorios Color Turquesa Frecuencia 50', 102000, 4),
(4, '2024-02-09 05:09:27', '2024-02-09 05:09:27', 'Amoladora Angular', 3, 'GA7020', 'Amoladora Angular Makita GA7020 color turquesa 2200 W 220 V + accesorio', 215000, 5),
(5, '2024-02-09 05:09:27', '2024-02-09 05:09:27', 'Rotomartillo Percutor', 1, 'D25133K', 'Amoladora Angular Makita GA7020 color turquesa 2200 W 220 V + accesorio', 265000, 3),
(6, '2024-02-09 05:14:54', '2024-02-09 05:14:54', 'Rotomartillo Electroneumá', 2, 'GBH 2-28 D', 'Rotomartillo electroneumático Bosch Professional GBH 2-28 D azul con 850W de potencia 220V.', 335000, 2),
(7, '2024-02-09 05:14:54', '2024-02-09 05:14:54', 'Amoladora Angular', 2, 'Gws 700 Professional', 'Amoladora Bosch Angular Gws 700 Professional Azul 12.000 Rpm Frecuencia 220', 89000, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `birthday` date NOT NULL,
  `phone` varchar(20) NOT NULL,
  `street` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `zipcode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `createdAt`, `updatedAt`, `firstname`, `lastname`, `birthday`, `phone`, `street`, `city`, `country`, `zipcode`) VALUES
(1, '2024-02-25 01:13:22', '2024-02-25 01:13:22', 'Dante', 'Delprato', '1987-02-05', '3516115500', 'Francisca Graneros d', 'Catamarca', 'Argentina', '4700');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_accounts_users1_idx` (`user_id`);

--
-- Indices de la tabla `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderdetail_order_id` (`order_id`),
  ADD KEY `orderdetail_product_id` (`product_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_account_id` (`account_id`);

--
-- Indices de la tabla `productbrands`
--
ALTER TABLE `productbrands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `productdetails`
--
ALTER TABLE `productdetails`
  ADD PRIMARY KEY (`id`,`product_id`),
  ADD KEY `fk_productdetails_products1_idx` (`product_id`);

--
-- Indices de la tabla `productimages`
--
ALTER TABLE `productimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productimages_product_id` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_productbrand_id` (`productbrand_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productbrands`
--
ALTER TABLE `productbrands`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productdetails`
--
ALTER TABLE `productdetails`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `productimages`
--
ALTER TABLE `productimages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `fk_accounts_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetail_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orderdetail_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_accounts` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

--
-- Filtros para la tabla `productdetails`
--
ALTER TABLE `productdetails`
  ADD CONSTRAINT `fk_productdetails_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `productimages`
--
ALTER TABLE `productimages`
  ADD CONSTRAINT `productimages_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `product_productbrand_id` FOREIGN KEY (`productbrand_id`) REFERENCES `productbrands` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
