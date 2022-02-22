<?php 
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "smasharena";
    $usuario   = "root";
    $password  = "";
    // Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));

    // Consulta SQL para obtener los datos de los actores.
    $sql = "SELECT num_pista,nombre_pista FROM pista group by num_pista";
    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    $pistas=[];

    while ($fila = mysqli_fetch_assoc($resultados)) {
        extract($fila);
        // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
        $pistas[]="<option value='$num_pista'>".$nombre_pista."</option>";
    }

    mysqli_close($conexion);

    // función de PHP que convierte a formato JSON el array.
    echo json_encode($pistas); 

?>