<?php 
extract($_POST);
$usu=json_decode($datos);
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "smasharena";
$usuario   = "root";
$password  = "";
// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
// Consulta SQL para obtener los datos de los actores.
$sql = "update usuarios set nombre='$usu->nombre', edad='$usu->edad', sexo='$usu->sexo', instructor='$usu->instructor' where dni='$usu->dni'";
$resultado = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
echo $resultado;
?>