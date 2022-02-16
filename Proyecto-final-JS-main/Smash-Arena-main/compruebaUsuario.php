<?php
//session_cache_limiter();
//session_start();


extract($_REQUEST);
$oUsu = json_decode($usuario);
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "","smasharena"); //or die(mysqli_error($conexion));
//mysqli_query($conexion,"utf8");
$funcionAsig = $oUsu->funcion;

switch($oUsu->funcion)
{
    case "obtenerUsu" :
        obtenerUsu($conexion,$oUsu);
        break;
    case "insertar" :
        insertarUsu($conexion,$oUsu);    
        break;    
}

function obtenerUsu($conexion, $oUsu){
    $sql = "select count(*) as existe, admin from usuarios where Nombre ='".$oUsu->nombre."' AND DNI='".$oUsu->contrasena."'";

    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion)); 
    $fila = mysqli_fetch_assoc($resultados);
    $numResul = $fila['existe']; 
       
    if($numResul > 0)
        echo $fila['admin'];
    else 
        echo "";
    //$_SESSION['nombre']=$oUsu->nombre;
    //$_SESSION['contrasena']=$oUsu->contrasena;
    // función de PHP que convierte a formato JSON el array.
}

function insertarUsu($conexion,$oUsu){
    $sexo="";
    $ins="";
    if($oUsu->sexo)
        $sexo='M';
    else 
        $sexo='F';

    if($oUsu->instruct)
        $ins="S";
    else
        $ins="N";    

    $sql = "INSERT INTO usuarios values('".$oUsu->contrasena."','".$oUsu->nombre."','".$oUsu->edad."','".$sexo."', 0 ,'".$ins."')";
    mysqli_query($conexion,$sql);

    echo("Correcto");
}

mysqli_close($conexion);

?>