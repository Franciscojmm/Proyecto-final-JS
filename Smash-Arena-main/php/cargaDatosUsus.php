<?php 
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "smasharena";
    $usuario   = "root";
    $password  = "";
    $dni= $_GET['id'];
    //echo $dni;
    $XML ='<datos>';
    //Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
    //Debemos atacar a dos tablas, reserva y clases_usuarios y mostrar los datos de estas tablas respecto al usuario.

    //Consulta a clases_usuarios.
    $sql = "SELECT c.id as idClase, c.nombre as nombreClase ,c.descripcion, c.capacidad ,c.tipo_actividad,u.nombre as instructor,c.fecha_inicio,c.hora_inicio FROM clases_usuarios INNER JOIN clase as c ON id_clase=c.id INNER JOIN usuarios as u ON c.dni_instructor=u.dni 
    WHERE clases_usuarios.dni_usuario=$dni order by c.fecha_inicio,c.hora_inicio";

    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

    $XML.='<Clases>';
    while ($fila = mysqli_fetch_array($resultados)) {   
    extract($fila);
    $XML .='<clase>';
        $XML .='<idClase>'.$idClase.'</idClase>';
        $XML .='<nombreClase>'.$nombreClase.'</nombreClase>';
        $XML .='<descripcion>'.$descripcion.'</descripcion>';
        $XML .='<capacidad>'.$capacidad.'</capacidad>';
        $XML .='<tipoActividad>'.$tipo_actividad.'</tipoActividad>';
        $XML .='<instructor>'.$instructor.'</instructor>';
        $XML .='<fechaIn>'.$fecha_inicio.'</fechaIn>';
        $XML .='<horaIn>'.$hora_inicio.'</horaIn>';
    $XML .='</clase>';
}
$XML.="</Clases>";



//Consulta a reservas.
$sql = "SELECT r.id_pista,p.nombre_pista,r.nombre as nombreReserva, r.dia_reserva,r.hora_inicio,r.hora_fin,r.descripcion FROM reserva as r 
INNER JOIN pista as p on r.id_pista=p.num_pista where r.dni_usuario=$dni order by r.dia_reserva,r.hora_inicio";

$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

    $XML.='<Reservas>';
    while ($fila = mysqli_fetch_array($resultados)) {   
    extract($fila);
    $XML .='<reserva>';
        $XML .='<idPista>'.$id_pista.'</idPista>';
        $XML .='<nombrePista>'.$nombre_pista.'</nombrePista>';
        $XML .='<nombreReserva>'.$nombreReserva.'</nombreReserva>';
        $XML .='<diaReserva>'.$dia_reserva.'</diaReserva>';
        $XML .='<horaIn>'.$hora_inicio.'</horaIn>';
        $XML .='<horaFin>'.$hora_fin.'</horaFin>';
        $XML .='<descripcion>'.$descripcion.'</descripcion>';
    $XML .='</reserva>';
}
$XML.="</Reservas>";

    mysqli_close($conexion);
    // función de PHP que convierte a formato JSON el array.
    $XML .='</datos>';
    echo $XML; 
?>
