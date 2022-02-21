-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-02-2022 a las 22:05:15
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
(1, 'Clase de Iniciacion', 'Clase de padel para principiantes.', 15, 'Principiantes', '49092388S', '2022-02-08', '16:15:00'),
(2, 'Remates', 'Clase de remates para niveles principiantes-medio.', 5, 'Principiantes-medio', '27586487M', '2022-01-04', '16:00:00'),
(3, 'Movimientos por la pista', 'Clase de padel basados en el movimiento de la pista para principiantes', 6, 'Principiantes', '64238516T', '2022-02-07', '19:00:00'),
(4, 'Clase Avanzada', 'Clase de nivel avanzado', 8, 'Alto', '49092388S', '2022-02-14', '16:45:00'),
(5, 'Clase de saques experto', 'Clase de saques para nivel avanzado', 10, 'Alto', '64238516T', '2022-03-01', '17:30:00'),
(6, 'Clase de uso de pared', 'Clase de nivel medio para aprender a usar la pared', 5, 'Medio', '64238516T', '2022-02-22', '17:00:00'),
(7, 'Clase de tipos de golpes', 'Clase de tipos de golpes a la bola', 7, 'Medio-alto', '27586487M', '2022-03-14', '18:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases_usuarios`
--

CREATE TABLE `clases_usuarios` (
  `dni_usuario` varchar(9) NOT NULL,
  `id_clase` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clases_usuarios`
--

INSERT INTO `clases_usuarios` (`dni_usuario`, `id_clase`) VALUES
('23561487M', 4),
('23561487M', 5),
('23561487M', 7),
('25479638W', 1),
('49095874X', 2),
('49095874X', 6),
('52637887J', 1),
('52637887J', 2),
('52637887J', 3),
('52637887J', 6),
('65824193C', 7);

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
(1, 'Pista1', 'Pista numero 1'),
(2, 'Pista2', 'Pista numero 2'),
(3, 'Pista3', 'Pista numero 3'),
(4, 'Pista4', 'Pista numero 4'),
(5, 'Pista5', 'Pista numero 5'),
(6, 'Pista6', 'Pista numero 6'),
(7, 'Pista7', 'Pista numero 7');

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
  `hora_fin` time NOT NULL,
  `descripcion` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id_reserva`, `dni_usuario`, `id_pista`, `nombre`, `dia_reserva`, `hora_inicio`, `hora_fin`, `descripcion`) VALUES
(1, '23561487M', 5, 'Reserva de Miguel Angel', '2022-02-22', '17:15:00', '18:15:00', 'Reserva con amigos'),
(2, '25479638W', 2, 'Reserva de Paco', '2022-02-17', '21:00:00', '22:00:00', 'Reserva con Familia'),
(3, '49095874X', 1, 'Reserva de Carlos', '2022-03-11', '17:30:00', '18:30:00', 'Reserva con amigos'),
(4, '65824193C', 6, 'Reserva de Sonia', '2022-03-23', '20:15:00', '21:15:00', 'Reserva con amigos'),
(5, '65824193C', 4, 'Reserva de Sonia', '2022-04-12', '18:00:00', '19:00:00', 'Reserva con familia'),
(6, '27586487M', 5, 'Reserva de Alejandro', '2022-02-10', '18:30:00', '19:30:00', 'Reserva para clases'),
(7, '49092388S', 3, 'Reserva de Jose Antonio', '2022-02-17', '17:15:00', '18:15:00', 'Reserva para clases'),
(8, '64238516T', 4, 'Reserva de Manuela', '2022-03-23', '21:00:00', '22:00:00', 'Reserva para clases');

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
('23561487M', 'Miguel Angel', 52, 'M', 0, 'N'),
('25479638W', 'Paco', 20, 'M', 0, 'N'),
('27586487M', 'Alejandro', 29, 'M', 0, 'S'),
('40157896J', 'Alba', 34, 'F', 0, 'N'),
('49092388S', 'Jose Antonio', 45, 'M', 0, 'S'),
('49095874X', 'Carlos', 37, 'M', 0, 'N'),
('52637887J', 'Lucia', 46, 'F', 0, 'N'),
('64238516T', 'Manuela', 28, 'F', 0, 'S'),
('65824193C', 'Sonia', 42, 'F', 0, 'N');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
