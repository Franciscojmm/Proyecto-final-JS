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
    $sql="INSERT INTO clase(nombre,descripcion,capacidad,tipo_actividad,dni_instructor,fecha_inicio,hora_inicio) VALUES('$data->nombre','$data->descripcion','$data->capacidad','$data->tipo','$data->instructor','$data->fecha','$data->hora')";
    $resultado = mysqli_query($conexion,$sql);
    echo "Alta Clase Ok";
?>