<?php 
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "smasharena";
    $usuario   = "root";
    $password  = "";
    // Creamos la conexión al servidor.
    $contador=0;
    extract($_GET);
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));

    if($opcion=="apuntarse"){
        $sql = "INSERT INTO clases_usuarios VALUES ('$dni','$clase')";
        $datos['respuesta']="Se ha apuntado correctamente en la clase";

    }else {
        $sql = "DELETE FROM clases_usuarios WHERE dni_usuario='$dni' AND id_clase=$clase";
        $datos['respuesta']="Se ha borrado correctamente en la clase";
    }
    try{
        $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    }catch(Exception $e){
        $datos['respuesta']="Se ha producido un error intentelo de nuevo";
    }


    mysqli_close($conexion);


    echo json_encode($datos); 
?>