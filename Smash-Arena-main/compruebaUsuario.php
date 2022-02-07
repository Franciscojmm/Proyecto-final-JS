<?php
//session_cache_limiter();
//session_start();


extract($_GET);
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
    $sql = "select count(*) as existe from usuarios where Nombre ='".$oUsu->nombre."' AND DNI='".$oUsu->contraseña."'";

    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    
    $fila = mysqli_fetch_assoc($resultados);
    $datos = $fila['existe']; 
       
    mysqli_close($conexion);
    
    $_SESSION['nombre']=$oUsu->nombre;
    $_SESSION['contrasena']=$oUsu->contraseña;
    // función de PHP que convierte a formato JSON el array.
    echo $datos; 
      
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

?>