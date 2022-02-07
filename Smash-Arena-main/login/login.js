
frmLogin.botonEnviar.addEventListener("click",iniciasesion,false);
document.getElementById("registro").addEventListener("click",irAlRegistro,false);


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

function comprobarUsuario(nombreUsu,contra) {
            // Instanciar objeto Ajax
            var oAjax = instanciarXHR();

            // Parametros
            var sParametros = "usuario=";
            sParametros += JSON.stringify({nombre : nombreUsu , contraseña : contra})

            //Configurar la llamada --> Asincrono por defecto
            oAjax.open("GET", encodeURI("../compruebaUsuario.php?" + sParametros));

            //Asociar manejador de evento de la respuesta
            oAjax.addEventListener("readystatechange", procesoRespuestaConsulta, false);

            //Hacer la llamada
            oAjax.send();

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

