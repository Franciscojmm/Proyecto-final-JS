<?php 
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "smasharena";
    $usuario   = "root";
    $password  = "";
    //Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
    //Debemos atacar a dos tablas, reserva y clases_usuarios y mostrar los datos de estas tablas respecto al usuario.

    //Consulta a clases_usuarios.
    $sql = "SELECT * FROM pista";
    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    $arr=[];
    while ($fila = mysqli_fetch_array($resultados)) {   
        $arr[]= new Pista($fila);
    }

    echo json_encode($arr);

    class Pista{
        // Atributos
        public $num_pista;
        public $nombre_pista;
        public $descripcion;
         
        // Constructor
        public function __construct($row){
            $this->num_pista = $row['num_pista'];
            $this->nombre_pista = $row['nombre_pista'];
            $this->descripcion = $row['Descripcion'];
           
        }
    }

    ?>