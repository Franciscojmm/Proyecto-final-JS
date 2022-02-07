-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-02-2022 a las 13:38:33
-- Versión del servidor: 10.1.35-MariaDB
-- Versión de PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
  `fechan_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clase`
--

INSERT INTO `clase` (`id`, `nombre`, `descripcion`, `capacidad`, `tipo_actividad`, `dni_instructor`, `fecha_inicio`, `fechan_fin`) VALUES
(1, 'Clase 1', 'Clase de padel , para principiantes.', 15, 'Principiantes', '12345678a', '2022-02-08', '2022-02-10');

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
  `nombre_pista` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
('12345678a', 'admin', 18, 'M', 1, 'N');

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
  ADD PRIMARY KEY (`id_reserva`);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
