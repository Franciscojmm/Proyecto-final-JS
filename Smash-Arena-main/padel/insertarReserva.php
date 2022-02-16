<?php
    extract($_POST);
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "smasharena";
    $usuario   = "root";
    $password  = "";
    // Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
    $valido=true;
    $sql="SELECT * FROM reserva WHERE id_pista=$idPista AND dia_reserva='$fecha'";
    $resultados = mysqli_query($conexion,$sql);

    while($fila=mysqli_fetch_assoc($resultados)){
        extract($fila);
        $fechaReservaInicio = new DateTime($fecha." ".$horaInicio);
        $fechaReservaFin = new DateTime($fecha." ".$horaFin);

        $fechaReservaInicioBD = new DateTime($dia_reserva." ".$hora_inicio);
        $fechaReservaFinBD = new DateTime($dia_reserva." ".$hora_fin);

        if($fechaReservaFin>=$fechaReservaInicioBD && $fechaReservaInicio<=$fechaReservaFinBD ){
            $valido=false;
        }
    }
    if($valido){
    $sql="INSERT INTO reserva(dni_usuario,id_pista,nombre,dia_reserva,hora_inicio,hora_fin,descripcion) VALUES('$dni','$idPista','$nombre','$fecha','$horaInicio','$horaFin','$descripcion')";
    $resultado = mysqli_query($conexion,$sql) or die("Error en la reserva, intentelo de nuevo");
    $datos['mensaje'] ="Se ha realizado la reserva correctamente";
    } else {
        $datos['mensaje'] = "No se puede realizar una reserva a esa hora";
    }

    echo json_encode($datos);
?>