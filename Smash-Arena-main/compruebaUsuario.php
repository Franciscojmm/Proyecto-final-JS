<?php
session_cache_limiter();
session_start();


extract($_GET);
$oUsu = json_decode($usuario);

// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "","smasharena"); //or die(mysqli_error($conexion));
//mysqli_query($conexion,"utf8");


// Consulta SQL para obtener los datos de los centros.
$sql = "select count(*) as existe from usuarios where Nombre ='".$oUsu->nombre."' AND DNI='".$oUsu->contraseña."'";

$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$fila = mysqli_fetch_assoc($resultados);
$datos = $fila['existe']; 
   
mysqli_close($conexion);

$_SESSION['nombre']=$oUsu->nombre;
$_SESSION['contrasena']=$oUsu->contraseña;
// función de PHP que convierte a formato JSON el array.
echo $datos; 

?>