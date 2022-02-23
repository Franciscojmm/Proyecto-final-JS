document.getElementById('comboUsuarios').addEventListener("change",mostrarDatosUsuario,false);
frmModificarUsuario.botonEnviar.addEventListener("click",modificarUsuario,false);
recuperarUsuarios();


function recuperarUsuarios(){

    // 1. Instanciar objeto AJAX
    let oAJAX = instanciarXHR();

    // 2. Construir URL y cadena de parametros
    var sURL = "../php/recuperarUsuarios.php";
    var sParametros = "";

    // 3. Definir manejador de eventos 
    oAJAX.addEventListener("readystatechange", procesoRespuestaRecuperarUsuarios, false);

    // 4. Definir la comunicacion asincrona --> true
    oAJAX.open("POST", encodeURI(sURL), true);

    // 5. Establecer cabecera POST
    oAJAX.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // 6. Peticion al servidor
    oAJAX.send();
}

function procesoRespuestaRecuperarUsuarios(){
    let oAJAX = this;
    if (oAJAX.readyState == 4 && oAJAX.status == 200) {
        var oUsuarios = JSON.parse(oAJAX.responseText);

        let oCapa = document.getElementById('comboUsuarios');
        while(oCapa.hasChildNodes()){
            oCapa.removeChild(oCapa.firstChild);
        }
        oCapa.appendChild(document.createElement("OPTION"))
        oCapa.lastChild.value = "nulo";
        oCapa.lastChild.textContent = "Selecciona un usuario...";
        for(let usuario of oUsuarios){
            let admin = parseInt(usuario.admin);
            console.log(admin);
            if(admin!=1){
                oCapa.appendChild(document.createElement("OPTION"));
                oCapa.lastChild.value = usuario.dni;
                oCapa.lastChild.textContent = usuario.nombre;
            }
        }
    }
  
}

function mostrarDatosUsuario(){
    // Instanciar objeto Ajax
    sDNI= document.querySelector("#comboUsuarios").value;
    if (sDNI!="nulo") {  
    var oAjax = instanciarXHR();

    // Parametros
    var sParametros = "dni=";
    sParametros += sDNI;

    //Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", encodeURI("../php/getUsuario.php?" + sParametros));

    //Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", procesoRespuestaGetDNI, false);

    //Hacer la llamada
    oAjax.send();
   }else{
       alert("Seleccione un usuario");
       frmModificarUsuario.reset();
   }
}

//Modificar Usuario
function modificarUsuario() {
    let sNombreUsuario = document.querySelector(".nombreUsuarioModificar").value;
    let sDNI = document.getElementById("comboUsuarios").value;          
    let iEdad = parseInt(document.querySelector(".edadModificar").value);
    let bSexo;
    let bInstructor;
    let sErrores="";
    let bValido=true;

    if(document.getElementById('radioSexoHombre').checked){
        bSexo="M";
    }else {
        bSexo="F";
    }
    if(document.getElementById('checkInstructorModificar').checked){
        bInstructor = "S";
    } else {
        bInstructor = "N";
    }

    if(document.getElementById("comboUsuarios").selectedIndex == 0)
    {
        sErrores += "Debe seleccionar un usuario al que modificar.\n";
        bValido=false;
    }

    let oExpReg = /^[\sa-zA-Z]{3,40}$/; 
    if(!validaFormularios(sNombreUsuario,oExpReg))
    {
        bValido=false;
        document.querySelector(".nombreUsuarioModificar").classList.add("error");
        sErrores += "El usuario no tiene el formato correcto\n";
        document.querySelector(".nombreUsuarioModificar").focus();
    }
    else
    document.querySelector(".nombreUsuarioModificar").classList.remove("error");

    oExpReg = /^\d{1,3}$/; 
    if(!validaFormularios(iEdad,oExpReg))
    {
        if(bValido)
        document.querySelector(".edadModificar").focus();

        bValido=false;
        document.querySelector(".edadModificar").classList.add("error");
        sErrores += "La edad no tiene el formato correcto\n";
    }
    else
    document.querySelector(".edadModificar").classList.remove("error");
    



if(bValido){
        updateUsuario(sDNI,sNombreUsuario,iEdad,bSexo,bInstructor);
        recuperarUsuarios();
        frmModificarUsuario.reset();
        ocultarTodosFormularios();
}else
alert(sErrores);
}

function updateUsuario(sDNI,sNombreUsuario,iEdad,bSexo,bInstructor){
    // 1. Instanciar objeto AJAX
    let oAJAX = instanciarXHR();
    // 2. Construir URL y cadena de parametros
    var sURL = "../php/updateUsuario.php";
    var sParametros = "datos=";
    sParametros+=JSON.stringify({dni:sDNI,
                  nombre:sNombreUsuario,
                  edad:iEdad,
                  sexo:bSexo,
                  instructor:bInstructor});
    // 3. Definir manejador de eventos 
    oAJAX.addEventListener("readystatechange", procesoRespuestaUpdateUsuario, false);

    // 4. Definir la comunicacion asincrona --> true
    oAJAX.open("POST", encodeURI(sURL), true);

    // 5. Establecer cabecera POST
    oAJAX.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // 6. Peticion al servidor
    oAJAX.send(sParametros);
}

function procesoRespuestaUpdateUsuario(){
    let oAJAX=this;
    if (oAJAX.readyState == 4 && oAJAX.status == 200) {
        alert("Modificar Ok");
    }
}