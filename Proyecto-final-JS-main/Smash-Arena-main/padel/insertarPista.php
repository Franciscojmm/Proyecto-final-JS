<?php
$json = file_get_contents('php://input');
$data = json_decode($json);

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "smasharena";
$usuario   = "root";
$password  = "";
// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));

// Consulta SQL para obtener los datos de los actores.
$sql="SELECT COUNT(num_pista) AS cuenta FROM PISTA WHERE num_pista=$data->numero";
$resultado = mysqli_query($conexion,$sql);
$resultado=mysqli_fetch_array($resultado);
if($resultado['cuenta']<>0){
    echo "Ya hay una pista con ese número";
}else {
    $sql = "INSERT INTO pista VALUES($data->numero,'$data->nombre','$data->descripcion')";
    $resultado = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    echo "Alta pista OK";
}

?>