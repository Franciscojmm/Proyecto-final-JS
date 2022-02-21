<?php 
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "smasharena";
    $usuario   = "root";
    $password  = "";
    // Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));

    // Consulta SQL para obtener los datos de los actores.
    $sql = "SELECT tipo_actividad FROM clase group by tipo_actividad";
    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    $tipos=[];

    while ($fila = mysqli_fetch_assoc($resultados)) {
        extract($fila);
        // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
        $tipos[]="<option value='$tipo_actividad'>".$tipo_actividad."</option>";
    }

    $sql = "SELECT dni_instructor,u.nombre as nom FROM clase inner JOIN usuarios as u on u.dni = dni_instructor group by dni_instructor";
    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    $instructores=[];

    while ($fila = mysqli_fetch_assoc($resultados)) {
        extract($fila);
        // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
        $instructores[]="<option value='$dni_instructor'>".$nom."</option>";
    }

    $datos['tipos']=$tipos;
    $datos['instructores']=$instructores;

    mysqli_close($conexion);

    // función de PHP que convierte a formato JSON el array.
    echo json_encode($datos); 

?>