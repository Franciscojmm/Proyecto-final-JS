
frmLogin.botonEnviar.addEventListener("click",iniciasesion,false);
document.getElementById("registro").addEventListener("click",irAlRegistro,false);
frmAltaUsuario.botonEnviar.addEventListener("click",registroUsu,false);
//var CryptoJS = require("crypto-js");

if(localStorage.getItem('session')!=null)
{
   
    //Descifrar la sesion del usuario.
    let sesion = CryptoJS.AES.decrypt(localStorage.getItem("session"),"clave");
    let sesionDes = JSON.parse(sesion.toString(CryptoJS.enc.Utf8));
    frmLogin.usuario.value = sesionDes.nombre;
    frmLogin.contraseña.value = sesionDes.contraseña;
}
function cerrarRegistro(){
    document.getElementById("frmAltaUsuario").style.display = "none";
    frmAltaUsuario.reset();
    document.getElementById("frmLogin").style.display="block";
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
    document.getElementById("btnCancelarAltaUsuario").addEventListener("click",cerrarRegistro);
}
function registroUsu(){
    //var oAjax = instanciarXHR();
            var sParametros = "usuario=";
            let sNombreUsuario = document.querySelector(".nombreUsuario").value;     
            let sDNI = document.querySelector(".dniUsuario").value;     
            let iEdad = document.querySelector(".Edad").value;     
            let bSexo;
            let bInstructor;
            let bValido = true;
            let sErrores="";


    let  oExpReg = /^\d{8}[a-zA-Z]{1}$/; 
    if(!oExpReg.test(sDNI))
    {
        document.querySelector(".dniUsuario").focus();
        bValido=false;
        document.querySelector(".dniUsuario").classList.add("error");
        sErrores += "El DNI no tiene el formato correcto\n";
    }
    else
    document.querySelector(".dniUsuario").classList.remove("error");

            if(document.getElementById('radioSexoHombreAltaUsuario').checked){
                bSexo=true;
            }else {
                bSexo=false;
            }
            
            sParametros += JSON.stringify({nombre : sNombreUsuario , contrasena : sDNI , edad : iEdad , sexo : bSexo , funcion : "insertar" });
            /*oAjax.open("GET", encodeURI("../compruebaUsuario.php?" + sParametros)); //Cambiar a POST los insert son con POST.
            oAjax.addEventListener("readystatechange", procesoRespuestaInsercion, false);
            oAjax.send();*/
            
            if(bValido)
            $.post("./php/compruebaUsuario.php",   // URL
                sParametros,               // Parámetros (ninguno en este caso)
                procesoRespuestaInsercion,  // Callback
                "text");            // Tipo de respuesta del servidor
            else
            alert(sErrores);    
}

function comprobarUsuario(nombreUsu,contra) {
            // Instanciar objeto Ajax
            var oAjax = instanciarXHR();
            let funcionLLamada = "obtenerUsu";
            // Parametros
            var sParametros = "usuario=";
            sParametros += JSON.stringify({nombre : nombreUsu , contrasena : contra , funcion : funcionLLamada});
            //Configurar la llamada --> Asincrono por defecto
            oAjax.open("GET", encodeURI("./php/compruebaUsuario.php?" + sParametros));
            //Asociar manejador de evento de la respuesta
            oAjax.addEventListener("readystatechange", procesoRespuestaConsulta, false);
            //Hacer la llamada
            oAjax.send();
        }

        function procesoRespuestaInsercion(oRespuesta, textStatus, jqXHR){
            /*var oAjax = this;
            if (oAjax.readyState == 4 && oAjax.status == 200) {

                console.log(oAjax.responseText);
                var oRespuesta = oAjax.responseText; */
                if(oRespuesta == "Correcto")//Se inserto.
                {
                     alert("Usted se ha registrado de forma correcta.");
                     document.getElementById("frmLogin").style.display="block";
                     document.getElementById("frmAltaUsuario").style.display="none";
                }
                else//No existe
                {
                    alert("Hubo un problema al registrarse (Revise sus datos).");
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

                if(oRespuesta != "")//Existe el usuario y puede entrar.
                {
                let usu = (parseInt(oRespuesta) == 1 ? "admin":"estandar");
                let val = JSON.stringify({nombre : nombreUsu , contraseña : contra , tipoUsu : usu});
                     localStorage.setItem("session",CryptoJS.AES.encrypt(val, "clave").toString());
                     window.location="./padel/index.html";
                }
                else//No existe
                    alert("Usuario no registrado.");
                
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

