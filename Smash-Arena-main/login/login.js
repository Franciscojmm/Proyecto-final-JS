
frmLogin.botonEnviar.addEventListener("click",iniciasesion,false);
document.getElementById("registro").addEventListener("click",irAlRegistro,false);
frmAltaUsuario.botonEnviar.addEventListener("click",registroUsu,false);

if(localStorage.getItem('session')!=null)
{
    let sesion = JSON.parse(localStorage.getItem("session"));
    frmLogin.usuario.value = sesion.nombre;
    frmLogin.contraseña.value = sesion.contraseña;
}

function iniciasesion(){
    //Comprobación que el usuario está registrado en la base de datos.

    let nombreUsu = frmLogin.usuario.value;
    let contra = frmLogin.contraseña.value;

    comprobarUsuario(nombreUsu,contra);
   
}

function irAlRegistro()
{
    document.getElementById("frmLogin").style.display="none";
    document.getElementById("frmAltaUsuario").style.display="block";
}
function registroUsu(){
    var oAjax = instanciarXHR();
            var sParametros = "usuario=";
            let sNombreUsuario = document.querySelector(".nombreUsuario").value;     
            let sDNI = document.querySelector(".dniUsuario").value;     
            let iEdad = document.querySelector(".Edad").value;     
            let bSexo;
            let bInstructor;

            if(document.getElementById('radioSexoHombreAltaUsuario').checked){
                bSexo=true;
            }else {
                bSexo=false;
            }
            if(document.getElementsByName('checkInstructor')[0].checked){
                bInstructor=true;
            }else {
                bInstructor=false;
            }
            sParametros += JSON.stringify({nombre : sNombreUsuario , contrasena : sDNI , edad : iEdad , sexo : bSexo , instruct : bInstructor , funcion : "insertar" });
            oAjax.open("GET", encodeURI("../compruebaUsuario.php?" + sParametros)); //Cambiar a POST los insert son con POST.
            oAjax.addEventListener("readystatechange", procesoRespuestaInsercion, false);
            oAjax.send();
}

function comprobarUsuario(nombreUsu,contra) {
            // Instanciar objeto Ajax
            var oAjax = instanciarXHR();
            let funcionLLamada = "obtenerUsu";
            // Parametros
            var sParametros = "usuario=";
            sParametros += JSON.stringify({nombre : nombreUsu , contrasena : contra , funcion : funcionLLamada});

            //Configurar la llamada --> Asincrono por defecto
            oAjax.open("GET", encodeURI("../compruebaUsuario.php?" + sParametros));

            //Asociar manejador de evento de la respuesta
            oAjax.addEventListener("readystatechange", procesoRespuestaConsulta, false);

            //Hacer la llamada
            oAjax.send();
        }

        function procesoRespuestaInsercion(){
            var oAjax = this;

            if (oAjax.readyState == 4 && oAjax.status == 200) {

                console.log(oAjax.responseText);
                var oRespuesta = oAjax.responseText;

                if(oRespuesta == "Correcto")//Se inserto.
                {
                     alert("Se inserto el usuario de forma correcta.");
                     document.getElementById("frmLogin").style.display="block";
                     document.getElementById("frmAltaUsuario").style.display="none";
                }
                else//No existe
                {
                    alert("Usuario no registrado de forma correcta.");
                }
                
                }
            }


        function procesoRespuestaConsulta() {
            var oAjax = this;
            let nombreUsu = frmLogin.usuario.value;
            let contra = frmLogin.contraseña.value;

            // Proceso la respuesta cuando llega
            if (oAjax.readyState == 4 && oAjax.status == 200) {

                console.log(oAjax.responseText);
                var oRespuesta = oAjax.responseText;

                if(oRespuesta != 0)//Existe el usuario y puede entrar.
                {
                     localStorage.setItem("session",JSON.stringify({nombre : nombreUsu , contraseña : contra}));
                     window.location="../padel/index.html";
                }
                else//No existe
                {
                    alert("Usuario no rregistrado.");
                }
                
                }
            }
        
         function instanciarXHR() {
            var xhttp = null;

            if (window.XMLHttpRequest) {
                xhttp = new XMLHttpRequest();
            } else // code for IE5 and IE6
            {
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            return xhttp;
        }

