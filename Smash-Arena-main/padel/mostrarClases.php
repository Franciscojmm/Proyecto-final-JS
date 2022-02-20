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

    // Consulta SQL para obtener los datos de los actores.
    $sql = "select * from clase";
    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    
    while ($fila = mysqli_fetch_assoc($resultados)) {
        // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
        $datos[] = $fila;
        extract($fila);
        $sql2 = "select count(dni_usuario) as contador from clases_usuarios WHERE dni_usuario='$dni' AND id_clase=$id";
        $resultados2 = mysqli_query($conexion,$sql2) or die(mysqli_error($conexion));
        $resultado= mysqli_fetch_assoc($resultados2);
        if($resultado['contador']==1){
            $datos[$contador]["estaClase"]=true;
        }else {
            $datos[$contador]["estaClase"]=false;
        }
        $sql2 = "select count(dni_usuario) as contador from clases_usuarios WHERE id_clase=$id";
        $resultados3 = mysqli_query($conexion,$sql2) or die(mysqli_error($conexion));
        $resultado2= mysqli_fetch_assoc($resultados3);
        $datos[$contador]["plazasLibres"]=$fila["capacidad"]-$resultado2['contador'];
        $contador++;
    }
    mysqli_close($conexion);

    // función de PHP que convierte a formato JSON el array.
    echo json_encode($datos); 

?>