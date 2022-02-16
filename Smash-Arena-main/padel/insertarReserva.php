<?php
    extract($_POST);
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "smasharena";
    $usuario   = "root";
    $password  = "";
    // Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
    $sql="SELECT * FROM reserva WHERE id_pista=$idPista AND dia_reserva='$fecha'";
    $resultados = mysqli_query($conexion,$sql);
    echo $sql;
    while($fila=mysqli_fetch_assoc($resultados)){
        $fechaReservaInicio = new DateTime($fecha." ".$horaInicio);
        $fechaReservaFin = new DateTime($fecha." ".$horaFin);
        echo $fechaReservaFin->format('Y-m-d H:i:sP');
    }
    /*18
    19:00-horafin
    20:00-horainicio
    21*/

    $sql="INSERT INTO reserva(dni_usuario,id_pista,nombre,dia_reserva,hora_inicio,hora_fin,descripcion) VALUES('$dni','$idPista','$nombre','$fecha','$horaInicio','$horaFin','$descripcion')";
    echo $sql;
    $resultado = mysqli_query($conexion,$sql) or die("Error en la reserva, intentelo de nuevo");
?>