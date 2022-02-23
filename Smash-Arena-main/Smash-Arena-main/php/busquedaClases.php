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
    if($instructor != 'todos')
        $where .= " AND c.dni_instructor = '$instructor' ";

    if($acti != 'todas')
        $where .= " AND c.tipo_actividad = '$acti' ";

    $where .= " AND fecha_inicio BETWEEN '$diaIn' AND '$diaFin' ";

    //Consulta a clases_usuarios.
    $sql = "SELECT c.nombre , c.descripcion , c.capacidad , c.tipo_actividad ,u.nombre as instructor , c.fecha_inicio , c.hora_inicio FROM clases_usuarios as cu 
    INNER JOIN clase as c on cu.id_clase = c.id
    INNER JOIN usuarios as u on c.dni_instructor = u.dni
    WHERE cu.dni_usuario = '$usu' ".$where ;

    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    $arr=[];
    while ($fila = mysqli_fetch_assoc($resultados)) {   
    extract($fila);
        $arr[]=$fila;
    }

    echo json_encode($arr);
    ?>