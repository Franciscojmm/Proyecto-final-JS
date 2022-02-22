<?php 
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "smasharena";
    $usuario   = "root";
    $password  = "";
    
    extract($_GET);

    //echo $dni;
    //Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
    //Debemos atacar a dos tablas, reserva y clases_usuarios y mostrar los datos de estas tablas respecto al usuario.

    $where = "";
    
    if($pista != 'todasPis')
        $where .= " AND id_pista = '$pista' ";

    $where .= " AND dia_reserva BETWEEN '$diaIn' AND '$diaFin' ";

    //Consulta a clases_usuarios.
    $sql = "SELECT p.nombre_pista,r.nombre,r.dia_reserva,r.hora_inicio,r.hora_fin,r.hora_fin, r.descripcion FROM reserva as r 
    INNER JOIN pista as p on r.id_pista=p.num_pista
    WHERE r.dni_usuario = '$usu' ".$where ;

    //echo $sql;

    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    $arr=[];
    while ($fila = mysqli_fetch_assoc($resultados)) {   
    extract($fila);
        $arr[]=$fila;
    }

    echo json_encode($arr);
    ?>