-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-02-2022 a las 21:02:48
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `smasharena`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clase`
--

CREATE TABLE `clase` (
  `id` int(3) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `capacidad` int(3) NOT NULL,
  `tipo_actividad` varchar(30) NOT NULL,
  `dni_instructor` varchar(9) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `hora_inicio` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clase`
--

INSERT INTO `clase` (`id`, `nombre`, `descripcion`, `capacidad`, `tipo_actividad`, `dni_instructor`, `fecha_inicio`, `hora_inicio`) VALUES
(1, 'Clase 1', 'Clase de padel , para principiantes.', 15, 'Principiantes', '12345678a', '2022-02-08', '00:00:00'),
(3, 'Clase padel', 'Clase padel', 2, 'Clase padel', '34562784W', '0000-00-00', '21:31:00'),
(6, 'Clase padel', 'Clase padel', 2, 'Clase padel', '34562784W', '0000-00-00', '00:00:00'),
(8, 'asda ada', 'asda ada', 3, 'asd ada', '34562784W', '2022-02-21', '21:49:00'),
(9, 'adasd ada', 'asd ads', 4, 'ad ad ', '98765432N', '2022-02-25', '18:53:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases_usuarios`
--

CREATE TABLE `clases_usuarios` (
  `dni_usuario` varchar(9) NOT NULL,
  `id_clase` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pista`
--

CREATE TABLE `pista` (
  `num_pista` int(3) NOT NULL,
  `nombre_pista` varchar(30) NOT NULL,
  `Descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pista`
--

INSERT INTO `pista` (`num_pista`, `nombre_pista`, `Descripcion`) VALUES
(2, 'Pista 3', ''),
(3, 'Pista 3', ''),
(4, 'Pista 31', ''),
(5, 'Pista 3', ''),
(45, 'Pista 3', '45'),
(54, 'Pista 54', ''),
(366, 'Pista 366', '366'),
(546, 'Pista 31', '546');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_reserva` int(6) NOT NULL,
  `dni_usuario` varchar(9) NOT NULL,
  `id_pista` int(3) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `dia_reserva` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` int(11) NOT NULL,
  `dia_fin` int(11) NOT NULL,
  `descripcion` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `edad` int(3) NOT NULL,
  `sexo` char(1) NOT NULL,
  `admin` int(1) NOT NULL,
  `instructor` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`dni`, `nombre`, `edad`, `sexo`, `admin`, `instructor`) VALUES
('12345678a', 'admin', 18, 'M', 1, 'N'),
('34562784W', 'Enrique Pastor', 50, 'M', 0, 'S'),
('87654321X', 'Pepe Juan', 24, 'M', 0, 'N'),
('98765432N', 'Maria ', 27, 'F', 0, 'S');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clase`
--
ALTER TABLE `clase`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dni_instructor` (`dni_instructor`);

--
-- Indices de la tabla `clases_usuarios`
--
ALTER TABLE `clases_usuarios`
  ADD PRIMARY KEY (`dni_usuario`,`id_clase`),
  ADD KEY `id_clase` (`id_clase`);

--
-- Indices de la tabla `pista`
--
ALTER TABLE `pista`
  ADD PRIMARY KEY (`num_pista`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `dni_usuario` (`dni_usuario`),
  ADD KEY `id_pista` (`id_pista`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clase`
--
ALTER TABLE `clase`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(6) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clase`
--
ALTER TABLE `clase`
  ADD CONSTRAINT `clase_ibfk_1` FOREIGN KEY (`dni_instructor`) REFERENCES `usuarios` (`dni`);

--
-- Filtros para la tabla `clases_usuarios`
--
ALTER TABLE `clases_usuarios`
  ADD CONSTRAINT `clases_usuarios_ibfk_1` FOREIGN KEY (`dni_usuario`) REFERENCES `usuarios` (`dni`),
  ADD CONSTRAINT `clases_usuarios_ibfk_2` FOREIGN KEY (`id_clase`) REFERENCES `clase` (`id`);

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`dni_usuario`) REFERENCES `usuarios` (`dni`),
  ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`id_pista`) REFERENCES `pista` (`num_pista`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
