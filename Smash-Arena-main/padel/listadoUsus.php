<?php 
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "smasharena";
    $usuario   = "root";
    $password  = "";
    //Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
    //Debemos atacar a dos tablas, reserva y clases_usuarios y mostrar los datos de estas tablas respecto al usuario.

    $where ="";

    if(isset($_GET['dni']))
    {
        extract($_GET);
       $where="WHERE dni = '".$dni."'";
    }
    //Consulta a clases_usuarios.
    $sql = "SELECT * FROM usuarios ".$where." order by admin DESC, instructor DESC ";
    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    $arr=[];
    while ($fila = mysqli_fetch_array($resultados)) {   
        $arr[]= new usu($fila);
    }

    echo json_encode($arr);

    class usu{
        // Atributos
        public $dni;
        public $nombre;
        public $edad;
        public $sexo;
        public $admin;
        public $instruc;
         
        // Constructor
        public function __construct($row){
            $this->dni = $row['dni'];
            $this->nombre = $row['nombre'];
            $this->edad = $row['edad'];
            $this->sexo = $row['sexo'];
            $this->admin = $row['admin'];
            $this->instruc = $row['instructor'];
        }
    }

    ?>