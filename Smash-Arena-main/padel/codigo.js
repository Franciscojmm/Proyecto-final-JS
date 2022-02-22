document.querySelector("#clases").addEventListener("click",apuntarseClase);
//Si no se ha realizado el login se manda a la página de login.
if(localStorage.getItem("session") == null)
{
    alert("Debe logearse antes de acceder a nuestra web.");
    window.location="../login/login.html";
}
else
var datosSesion = obtenerDatosLogin();

//Para coger los datos del usuario.
function obtenerDatosLogin(){
    let sesion = CryptoJS.AES.decrypt(localStorage.getItem("session"),"clave");
    let sesionDes = JSON.parse(sesion.toString(CryptoJS.enc.Utf8));
    
    return sesionDes
}
//Obtener el usuario ver de que tipo es y mostrar solo las acciones disponibles para cada tipo de usuario.
if(obtenerDatosLogin().tipoUsu == "admin")
{//Solo se mostraran las opciones de los admin.
    document.getElementById("altaUsuario").style.display="none";
    document.getElementById("alquilarPista").style.display="none";
    document.getElementById("apuntarClase").style.display="none";
    document.getElementById("datosUsus").style.display="none";
    cargaListadosOps("usuAdmin");
}else{
    document.getElementById("altaUsuario").style.display="none";
    document.getElementById("modificarUsuario").style.display="none";
    document.getElementById("altaPista").style.display="none";
    document.getElementById("crearClase").style.display="none";
    cargaListadosOps("usuEst");
    cargarDatosUsuario();
}

function cargaListadosOps(usu){
    if(usu=="usuEst")
    document.getElementById("comboListados").innerHTML+='<option value="clases">Listado de Clases</option><option value="reservas">Listado de Reservas entre dos fechas</option>';

    else
    document.getElementById("comboListados").innerHTML+='<option value="usuarios">Listado de Usuarios</option><option value="pistas">Listado de Pistas</option><option value="buscarUsuarioPorDNI">Buscar usuario por DNI</option>';
}

// Hasta aquí.

//Añadir eventos , si se cargan de forma dinamica quitar de aquí para evitar errores de referencia antes de cargar.
document.getElementById('altaUsuario').addEventListener("click",mostrarFormulario,false);
document.getElementById('modificarUsuario').addEventListener("click",mostrarFormulario,false);
document.getElementById('altaPista').addEventListener("click",mostrarFormulario,false);
document.getElementById('alquilarPista').addEventListener("click",mostrarPistas,false);
document.getElementById('crearClase').addEventListener("click",mostrarFormulario,false);
document.getElementById('apuntarClase').addEventListener("click",mostrarClases,false);
document.getElementById('listados').addEventListener("click",mostrarFormulario,false);
document.querySelector("#clases").addEventListener("click",apuntarseClase);
//document.getElementById('comboUsuarios').addEventListener("change",mostrarDatosUsuario,false);
//frmModificarUsuario.botonEnviar.addEventListener("click",modificarUsuario,false);
frmAltaClases.botonEnviar.addEventListener("click",altaClase,false);
frmAltaReserva.botonEnviar.addEventListener("click",hacerReserva,false);
frmAltaPista.botonEnviar.addEventListener("click",altaPista,false);
frmListados.botonEnviar.addEventListener("click",manejadorListado,false);
document.getElementById("comboListados").addEventListener("change",mostrarFiltros,false);
document.getElementById("cerrarSesion").addEventListener("click",cerrarSesion,false);
frmLlamadaClases.botonFiltrado.addEventListener("click",filtrarBusquedaClases,false);
frmLlamadaReservas.botonFiltrado.addEventListener("click",filtrarBusquedasPistas,false);

//variable global
var oTabla="";

                                        
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

function procesoRespuestaGetDNI(){
    let oAJAX = this;
    if (oAJAX.readyState == 4 && oAJAX.status == 200) {
        let oUsuario=JSON.parse(oAJAX.responseText);
        for(let usuario of oUsuario){
            document.querySelector(".nombreUsuarioModificar").value = usuario.nombre;
            document.querySelector(".edadModificar").value = usuario.edad;
            if(usuario.sexo=="M"){
                document.getElementById('radioSexoHombre').checked = true;
            }else {
                document.getElementById('radioSexoMujer').checked = true;
            }
            if(usuario.instructor=="S"){
                document.getElementById("checkInstructorModificar").checked = true;
            }else {
                document.getElementById("checkInstructorModificar").checked = false;
            }
        }   
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
function mostrarPistas(){
    ocultarTodosFormularios();
    $.get("../php/mostrarPistas.php",procesoRespuestaGetPistas,'json');
}
function procesoRespuestaGetPistas(datos, textStatus, jqXHR) {
    let oCapa=document.querySelector(".formularios");
    document.querySelector("#datosUsus").innerHTML="";
    document.querySelector("#clases").innerHTML="";
    if(document.querySelector("#pistas")==null){
        var div = document.createElement("div");
        div.classList.add("row");
        div.id="pistas";
        oCapa.appendChild(div);
    }else {
        ocultarTodosFormularios();
        document.querySelector("#pistas").innerHTML="";
        var div = document.querySelector("#pistas");
    }
    for(let pista of datos){
        div.innerHTML+='<div class="card" style="margin:auto; width:auto;"><img src="../img/pistapadel.jpg" class="card-img-top" alt="" style="width:23rem"><div class="card-body"><h5 class="card-title">'+pista.nombre_pista+'</h5><p class="card-text">'+pista.Descripcion+'</p><button  value = "'+pista.num_pista+'" class="btn btn-primary">Alquilar</button></div></div>';
    }
    document.querySelector("#pistas").addEventListener("click",mostrarAltaPista);
    console.log(datos);
}
/* Mostrar un alert y borrar los datos del formulario.*/
function mostrarAltaPista(oEvento){
    oE = oEvento || window.event;
    console.log(oE.target);
    if(oE.target.nodeName=='BUTTON'){
        let oCapa = document.querySelector("#pistas");
        oCapa.innerHTML="";
        document.querySelector("#frmAltaReserva").style.display="block";
        let iIDPista = oE.target.value;
        localStorage.setItem('idpista',iIDPista);
    }

}
function mostrarFormulario(oE){
    ocultarTodosFormularios();
    if(document.querySelector("#pistas")!=null)
    document.querySelector("#pistas").innerHTML="";
    oEvento = oE || window.event;
    oFormulario = oEvento.srcElement;
    let idForm = oFormulario.dataset.formu;
    //Cogerlo mejor con data-set.
    console.log(idForm);
    console.log(document.querySelector("#"+idForm));
    console.log("formularios"+"/"+idForm+".html");
    //Oculto todos los formularios menos este
    $("form:not(#"+idForm+")").hide("normal");
    // Verifico si ya he cargado el formulario antes
    if (document.querySelector("#"+idForm) == null){
        $("#divfrmModificarUsuario").load("../formularios"+"/"+idForm+".html",
            function() {
                $.getScript("../formularios"+"/"+idForm+".js");
                $("#"+idForm).show("normal");
                //recuperarUsuarios();
            });
    } else {
        // Lo muestro si está oculto
       // $("#"+idForm).parent().show("normal");
       $("#"+idForm).show("normal");
    }
}
//borrarTabla
function borrarTabla() {
    let oTabla = document.querySelector(".table");
    if(oTabla != null){
        oTabla.remove();
    }
}
//Reservar Pista
function hacerReserva()
{
    let nomReserva = frmAltaReserva.nombreReserva.value;
    let descripcionReserva = frmAltaReserva.descripcionReserva.value;
    let fechaInicio = frmAltaReserva.diaReserva.value;
    
    let sErrores="";
    let bValido=true;
    //Control de errores antes de crear el objeto.
    let hoy = fechaHoy();

    let oExpReg = /^[\s\w]{4,40}$/; 
    if(!validaFormularios(nomReserva,oExpReg))
    {
        if(bValido)
        frmAltaReserva.nombreReserva.focus();
        
        bValido=false;
        frmAltaReserva.nombreReserva.classList.add("error");
        sErrores += "El nombre de la reserva no tiene el formato correcto\n";
    }
    else
    frmAltaReserva.nombreReserva.classList.remove("error");

    oExpReg = /^[\s\w]{4,40}$/; 
    if(!validaFormularios(descripcionReserva,oExpReg))
    {
        if(bValido)
        frmAltaReserva.descripcionReserva.focus();
        
        bValido=false;
        frmAltaReserva.descripcionReserva.classList.add("error");
        sErrores += "La descripcion de la reserva no tiene el formato correcto\n";
    }
    else
    frmAltaReserva.descripcionReserva.classList.remove("error");


  //Para hacer la fecha de inicio y de fin con sus horas.
  if(frmAltaReserva.diaReserva.value != "")
  {
  var fechaReserva = new Date(frmAltaReserva.diaReserva.value);
  
  }
  else
  {
  sErrores += "Introduzca una fecha.\n";
  frmAltaReserva.diaReserva.focus();
  bValido=false;
  }

  if(frmAltaReserva.horaInicioReserva.value != "")
  {
  var StringInicioReserva = frmAltaReserva.horaInicioReserva.value;
  let arrayHora = StringInicioReserva.split(":");
  fechaReserva.setHours(arrayHora[0]);
  fechaReserva.setMinutes(arrayHora[1]);
  var fechaFin = new Date (fechaReserva);
  fechaFin.setHours(fechaReserva.getHours()+1);
  horaInicio = frmAltaReserva.horaInicioReserva.value;
  horaFin = fechaFin.getHours()+":"+(fechaFin.getMinutes()<10?'0':'') + fechaFin.getMinutes();

  }
  else
  {
  sErrores += "Introduzca una hora.\n";
  bValido=false;
  frmAltaReserva.horaInicioReserva.focus();

  }

   
  //Ya tenemos la fecha inicio y fin.


    if(fechaReserva < hoy)
    {
        sErrores += "La fecha seleccionada es inferior a la actual.\n";
        bValido = false;
    }
    if(bValido)
    {
        let iIDPista = localStorage.getItem('idpista');
        let sDNIUsuario = datosSesion.contraseña;
        insertarReserva(nomReserva,descripcionReserva,fechaInicio,horaInicio,horaFin,iIDPista,sDNIUsuario);
        // Todo fue correcto borramos los datos.
        frmAltaReserva.reset(); 
        ocultarTodosFormularios();
    }
    else{
        alert(sErrores);
    }

}
function insertarReserva(nomReserva,descripcionReserva,fechaInicio,horaInicio,horaFin,iIDPista,sDNIUsuario){
    console.log(fechaInicio);
    console.log(horaInicio);
    console.log(horaFin);
    $.ajax({
        url:"../php/insertarReserva.php",
        method: "POST",
        data: { nombre: nomReserva,
                descripcion: descripcionReserva,
                fecha: fechaInicio,
                horaInicio: horaInicio,
                horaFin: horaFin,
                idPista: iIDPista,
                dni: sDNIUsuario 
            },
        dataType: 'json',
        success: procesarInsertarReserva    
    });
}
function procesarInsertarReserva(datos,textStatus,jqXHR){
    alert(datos.mensaje);
}
//Alta Clase
function altaClase(){        
    let sNombreClase = document.querySelector(".nombreClase").value;     
    let sDescripcionClase = document.querySelector(".descripcionClase").value;
    console.log(document.querySelector('.diaInicioClase').value);     
    let dtDiaInicio = document.querySelector('.diaInicioClase').value;
    let horaInicio = document.querySelector(".horaInicioClase").value;    
    let iDuracion = document.querySelector("#duracionClase").value;
    let iCapacidad = document.querySelector('.capacidadClase').value;     
    let sTipoClase = document.querySelector('.tipoClase').value;     
    let idInstructor = document.querySelector('.idInstructorClase').value;
    let dtHoy = fechaHoy();
    let sErrores="";
    let bValido=true;

    oExpReg = /^[\w\s]{4,40}$/; 
    if(!validaFormularios(sNombreClase,oExpReg))
    {
        if(bValido)
        document.querySelector(".nombreClase").focus();

        bValido=false;
        document.querySelector(".nombreClase").classList.add("error");
        sErrores += "El nombre de la clase no tiene el formato correcto\n";
    }
    else
    document.querySelector(".nombreClase").classList.remove("error");



    oExpReg = /^[\w\s]{4,40}$/;
        if(!validaFormularios(sDescripcionClase,oExpReg))
    {
        if(bValido)
        document.querySelector(".descripcionClase").focus();
        bValido=false;
        document.querySelector(".descripcionClase").classList.add("error");
        sErrores += "La descripcion de la clase no tiene el formato correcto\n";
    }
    else
    document.querySelector(".descripcionClase").classList.remove("error");


    //Fechas y horas.
    if(document.querySelector('.diaInicioClase').value == "" )
    {
        bValido=false;
        sErrores+="Las fechas estan incompletas.\n";
    }

    if(document.querySelector(".horaInicioClase").value == "")
    {
        bValido=false;
        sErrores+="Las horas estan incompletas.\n";
 
    }

    //
    if(document.querySelector("#duracionClase").value == "")
    {
        bValido=false;
        sErrores+="La duración no puede estar vacía.\n";
        document.querySelector("#duracionClase").classList.add("error");
    }else {
        document.querySelector("#duracionClase").classList.remove("error");
    }
    oExpReg = /^\d{1,2}$/;
        if(!validaFormularios(iCapacidad,oExpReg))
    {
        if(bValido)
        document.querySelector(".capacidadClase").focus();
        bValido=false;
        document.querySelector(".capacidadClase").classList.add("error");
        sErrores += "La capacidad de la clase no tiene el formato correcto\n";
    }
    else
    document.querySelector(".capacidadClase").classList.remove("error");





    oExpReg = /^[\w\s]{4,40}$/;
        if(!validaFormularios(sTipoClase,oExpReg))
    {
        if(bValido)
        document.querySelector(".tipoClase").focus();
        bValido=false;
        document.querySelector(".tipoClase").classList.add("error");
        sErrores += "El tipo de clase no tiene el formato correcto\n";
    }
    else
    document.querySelector(".tipoClase").classList.remove("error");




    oExpReg = /^\d{8}[a-zA-Z]{1}$/; 
    if(!validaFormularios(idInstructor,oExpReg))
    {
        if(bValido)
        document.querySelector(".idInstructorClase").focus();
        bValido=false;
        document.querySelector(".idInstructorClase").classList.add("error");
        sErrores += "El id del instructor no tiene el formato correcto\n";
    }
    else
    document.querySelector(".idInstructorClase").classList.remove("error");





if(bValido){

    if(dtDiaInicio < dtHoy){
        alert("Las fechas introducidas son menores al dia y hora actual");
    }else {
            insertarClase(sNombreClase,sDescripcionClase,dtDiaInicio,horaInicio,iDuracion,iCapacidad,sTipoClase,idInstructor);
    }
}
else{
    alert(sErrores);
}
}
function insertarClase(sNombreClase,sDescripcionClase,dtDiaInicio,horaInicio,iDuracion,iCapacidad,sTipoClase,idInstructor){
    var sParametros = { nombre:sNombreClase,
                        descripcion:sDescripcionClase,
                        fecha:dtDiaInicio,
                        hora:horaInicio,
                        duracion:iDuracion,
                        capacidad: iCapacidad,
                        tipo:sTipoClase,
                        instructor:idInstructor};
    fetch("../php/insertarClase.php",{ method: 'POST', 
                                body: JSON.stringify(sParametros), 
                                headers:{
                                  'Content-Type': 'application/json'
                                }
                            })
    .then(function(response){
        response.text().then(function(text){
            alert(text);
            frmAltaClases.reset();
            ocultarTodosFormularios();
        });
    });
}

//Alta Pista
function altaPista(){
    let sNombrePista = document.querySelector(".nombrePista").value;
    let iIDPista = document.querySelector(".numeroPista").value;
    let sDescripcion = document.querySelector("#sDescripcionPista").value;
    let sErrores="";
    let bValido=true;


    let oExpReg = /^[\s\w]{4,40}$/;  
    if(!validaFormularios(sNombrePista,oExpReg))
    {
        bValido=false;
        document.querySelector(".nombrePista").classList.add("error");
        sErrores += "El DNI no tiene el formato correcto\n";
        document.querySelector(".nombrePista").focus();

    }
    else
    document.querySelector(".nombrePista").classList.remove("error");


     oExpReg = /^[\d]{1,4}$/; 
    if(!validaFormularios(iIDPista,oExpReg))
    {
        if(bValido)
        document.querySelector(".numeroPista").focus();
        
        bValido=false;
        document.querySelector(".numeroPista").classList.add("error");
        sErrores += "El nombre de la reserva no tiene el formato correcto\n";
    }
    else
    document.querySelector(".numeroPista").classList.remove("error");
    if(sDescripcion==""){
        bValido=false;
        document.querySelector("#sDescripcionPista").classList.add("error");
        sErrores += "La descripcion no puede estar vacía\n";
    }else
        document.querySelector("#sDescripcionPista").classList.remove("error");

    if(bValido)
    {

        insertarPista(sNombrePista,iIDPista,sDescripcion);
    }
    else{
        alert(sErrores);
    }

}
function insertarPista(sNombrePista,iIDPista,sDescripcion){
    var sParametros = { nombre:sNombrePista,
                        numero:iIDPista,
                        descripcion:sDescripcion};
    fetch("../php/insertarPista.php",{ method: 'POST', 
                                body: JSON.stringify(sParametros), 
                                headers:{
                                  'Content-Type': 'application/json'
                                }
                            })
    .then(function(response){
        response.text().then(function(text){
            if(text=="Alta pista OK"){
                cargarComboPistas();
                frmAltaPista.reset(); 
                ocultarTodosFormularios();
            }
            alert(text);
        });
    });
}
function mostrarClases(){
    document.querySelector("#datosUsus").innerHTML="";
    if(document.querySelector("#pistas")!=null)
    document.querySelector("#pistas").innerHTML="";
    ocultarTodosFormularios();
    $.get("../php/mostrarClases.php?dni="+datosSesion.contraseña,procesoRespuestaGetClases,'json');
}
function procesoRespuestaGetClases(datos, textStatus, jqXHR){
    oTabla = "<table class='table'><tr><th>Nombre</th><th>Descripcion</th><th>Capacidad</th><th>Actividad</th><th>Fecha</th><th>Hora</th><th>Plazas Libres</th><th>Opcion</th><tr>";
    for(let c of datos){
        let fecha = new Date(c.fecha_inicio);
        let horas = c.hora_inicio.split(":");
        horas.pop();
        fecha.setHours(horas[0]);
        fecha.setMinutes(horas[1]);
        let fechas = c.fecha_inicio.split("-");
        console.log(fecha);
        if(fecha>fechaHoy() && c.dni_instructor != datosSesion.contraseña ){
        if((parseInt(c.plazasLibres)>0 && c.estaClase==false) || c.estaClase==true){
                oTabla+="<tr><td>"+c.nombre+"</td><td>"+c.descripcion+"</td><td>"+c.capacidad+"</td><td>"+c.tipo_actividad+"</td><td>"+fechas[2]+"-"+fechas[1]+"-"+fechas[0]+"</td><td>"+horas[0]+":"+horas[1]+"</ td><td>"+c.plazasLibres+"</td>";
                if(c.estaClase==true){
                    oTabla+="<td><button style=background-color:#F67474; data-dni="+datosSesion.contraseña+" data-clase="+c.id+" value='cancelar'>Cancelar Clase</td></tr>";
                }else {
                    oTabla+="<td><button style=background-color:#D1EA82; data-dni="+datosSesion.contraseña+" data-clase="+c.id+" value='apuntarse'>Apuntarse Clase</td></tr>";
                }
            }
        }   
    }
    document.querySelector("#clases").innerHTML=oTabla;
}

//Apuntarse Clase
function apuntarseClase(oEvento) {
    oE=oEvento || window.event;
    if(oE.target.nodeName=="BUTTON"){
        let oBtn = oE.target;
        $.get("../php/apuntarseClase.php?dni="+datosSesion.contraseña+"&clase="+oBtn.dataset.clase+"&opcion="+oBtn.value+"&capacidad="+oBtn.dataset.capacidad,procesoRespuestaApuntarseClase,'json');
    }
}
function procesoRespuestaApuntarseClase(datos, textStatus, jqXHR){
    alert(datos.respuesta);
    mostrarClases();
}
function cargarDatosUsuario(){
    $.get("../php/cargaDatosUsus.php?id='"+datosSesion.contraseña+"'",procesoRespuestaCargaUsus,'XML');
}
function procesoRespuestaCargaUsus(datos, textStatus, jqXHR) {
    console.log(datos);
    construirDatosUsu(datos);
}
function construirDatosUsu(oXML){

       let capaDatos = document.querySelector(".dat-clases");
        oClases = oXML.getElementsByTagName("clase");
        //capaDatos.innerHTML="<h4>Sus Clases :</h4><br>"
        for(let oCLase of oClases){

            let oTabla = document.createElement("table");
            oTabla.classList.add("table");
            oTabla.classList.add("datosUsuarios");
            oTabla.classList.add("table-info");
            let oTHead = oTabla.createTHead();
            let oFila = oTHead.insertRow(-1);
            let oTH = document.createElement("TH");
            oTH.textContent = "Clase";
            oTH.setAttribute("colspan",2);
            oFila.appendChild(oTH);

            let oTBody = oTabla.createTBody();

            llenaTablas(oTBody,oCLase,"nombreClase", "Clase :");
            llenaTablas(oTBody,oCLase,"descripcion", "Descripción :");
            llenaTablas(oTBody,oCLase,"capacidad", "Capacidad :");
            llenaTablas(oTBody,oCLase,"tipoActividad", "Actividad :");
            llenaTablas(oTBody,oCLase,"instructor", "Instructor :");
            llenaTablas(oTBody,oCLase,"fechaIn", "Fechan Inicio :");
            llenaTablas(oTBody,oCLase,"horaIn", "Hora Inicio :");

            capaDatos.appendChild(oTabla);
        }
        capaDatos = document.querySelector(".dat-reservas");
        oReservas = oXML.getElementsByTagName("reserva");
        //capaDatos.innerHTML="<h4>Sus Reservas :</h4><br>";
        for(let oReserva of oReservas){
            let oTabla = document.createElement("table");
            oTabla.classList.add("table");
            oTabla.classList.add("datosUsuarios");
            oTabla.classList.add("table-success");
            let oTHead = oTabla.createTHead();
            let oFila = oTHead.insertRow(-1);
            let oTH = document.createElement("TH");
            oTH.textContent = "Reserva";
            oTH.setAttribute("colspan",2);
            oFila.appendChild(oTH);

            let oTBody = oTabla.createTBody();
            oFila = oTBody.insertRow(-1);

            llenaTablas(oTBody,oReserva,"nombrePista", "Nombre Pista :");
            llenaTablas(oTBody,oReserva,"nombreReserva", "Nombre Reserva :");
            llenaTablas(oTBody,oReserva,"diaReserva", "Dia de la reserva :");
            llenaTablas(oTBody,oReserva,"horaIn", "Hora Inicio :");
            llenaTablas(oTBody,oReserva,"horaFin", "Hora Fin :");
            llenaTablas(oTBody,oReserva,"descripcion", "Descripción :");

            capaDatos.appendChild(oTabla);
        }

}

function llenaTablas(cuerpo , objeto , dato , mensaje){
        let oFila = cuerpo.insertRow(-1);

        let oCelda = oFila.insertCell(-1);
        oCelda.innerHTML = "<b>"+mensaje+"</b>";
        oCelda = oFila.insertCell(-1);
        oCelda.textContent=objeto.getElementsByTagName(dato)[0].textContent;
}

//Cargar pistas desde XML
function cargarPistas(){
    //Cargarmos las pista desde el XML
    oPistas = oXML.getElementsByTagName("pista");
    for(let oPista of oPistas){
        let nombrePista = oPista.getElementsByTagName("nombre")[0].textContent;
        let numeroPista = oPista.getElementsByTagName("numero")[0].textContent;
        
        oGestion.altaPista(new Pista(nombrePista,numeroPista));
    }
}



//Oculta todos los formularios
function ocultarTodosFormularios() {
    let oFormularios = document.querySelectorAll("form");
    for(let oFor of oFormularios){
        oFor.style.display = "none";
    }
    document.getElementById("datosUsus").innerHTML="";
    document.getElementById("resuls").innerHTML="";
    document.getElementById("clases").innerHTML="";
}

//Manejador de Listados
function manejadorListado(){
    let oCombo = document.querySelector("#comboListados");
    let oOption = oCombo.children[oCombo.selectedIndex];
    switch(oOption.value){
        case "nulo":
            alert("Debes seleccionar un listado");
            break;
        case "usuarios":
            ocultarTodosFormularios();
            listadoUsuarios();
            break;
        case "pistas":
            ocultarTodosFormularios();
            listadoPistas();
            break;
        case "clases":
            ocultarTodosFormularios();
            listadoClase();
            break;
        case "reservas":
            ocultarTodosFormularios();
            listadoReserva();
            break;
        case "buscarUsuarioPorDNI":
            ocultarTodosFormularios();
            listadoBuscarUsuario();
            break;            
    }
}

//Listado de usuarios
function listadoUsuarios(){

    $.get("../php/listadoUsus.php",procesoRespuestaGetUsus,'json');
    frmListados.reset();
}

function procesoRespuestaGetUsus(data)
{
    let color="";
    let tabla = "<table border='1' class='table'>";
    tabla += "<th>DNI</th><th>NOMBRE</th><th>EDAD</th><th>SEXO</th><th>ADMIN</th><th>INSTRUCTOR</th>";
    for(let oUsu of data){
        if(oUsu.admin == 1)
            color = '#F0F3A0';
        else{
            if(oUsu.instruc == 'S')
            color = '#A3E4D7';
            else
            color = '#EDBB99';
        }
        tabla+="<tr style='background-color:"+color+"'> <td>"+oUsu.dni+"</td>  <td>"+oUsu.nombre+"</td>  <td>"+oUsu.edad+"</td>  <td>"+oUsu.sexo+"</td>   <td>"+oUsu.admin+"</td>   <td>"+oUsu.instruc+"</td>  </tr>"
    }
    tabla+="<table>";
    document.getElementById("resuls").innerHTML=tabla;
}

//listadoPistas
function listadoPistas(){
    $.get("../php/listadoPistas.php",procesoRespuestaGetListaPistas,'json');
    frmListados.reset();
}
function procesoRespuestaGetListaPistas(data)
{
    let tabla = "<table border='1' class='table'>";
    tabla += "<th>NUMERO PISTA</th><th>NOMBRE</th><th>DESCRIPCION</th>";
    for(let oPista of data){
        tabla+="<tr> <td>"+oPista.num_pista+"</td>  <td>"+oPista.nombre_pista+"</td>  <td>"+oPista.descripcion+"</td> </tr>"
    }
    tabla+="<table>";
    document.getElementById("resuls").innerHTML=tabla;
}

//listadoClase
function listadoClase(){
    frmLlamadaClases.reset();

   document.getElementById("frmLlamadaClases").style="display:block";    

    if(sessionStorage.getItem("combos")==null) // Solo los carga si no estan cargados antes.
    {
   $.getJSON("../php/cargarCombosFiltros.php", function(result){

    sessionStorage.setItem("combos",JSON.stringify(result)); //Lo metemos en sesion para que cuando se cierre la pestaña se recargue.

    for(let tipo of result.tipos)
        document.getElementById("comboActividades").innerHTML+=tipo;

    for(let instructor of result.instructores)
        document.getElementById("comboInstructores").innerHTML+=instructor;

  });

}
else{
    document.getElementById("comboActividades").innerHTML='<option value="todas">Todas las Actividades</option>';
    document.getElementById("comboInstructores").innerHTML='<option value="todos">Todos los Instructores</option>';

    for(let tipo of JSON.parse(sessionStorage.getItem("combos")).tipos)
        document.getElementById("comboActividades").innerHTML+=tipo;

    for(let instructor of JSON.parse(sessionStorage.getItem("combos")).instructores)
        document.getElementById("comboInstructores").innerHTML+=instructor;
}

    frmListados.reset();
}
//Filtrado de clases.
function filtrarBusquedaClases(){
    let diaIn = frmLlamadaClases.diaIn.value;
    let diaFin = frmLlamadaClases.diaFin.value;
    let instructorBus = frmLlamadaClases.comboInstructores.value;
    let actividadBus = frmLlamadaClases.comboActividades.value;

    if (diaIn == '' || diaFin == '')
        alert("Debe rellenar las fechas de busqueda.");
        else{
            $.getJSON("../php/busquedaClases.php",{usu : datosSesion.contraseña, diaIn : diaIn , diaFin: diaFin , instructor : instructorBus , acti : actividadBus},function(result){
                console.log(result);
                let primeraInser="";
                let segundaInser="";
                oTabla = "<table style='text-align : center' class='table table-striped table-dark table-bordered'><tr class='table-info'><th>Nombre</th><th>Descripcion</th><th>Capacidad</th><th>Instructor</th><th>Actividad</th><th>Fecha</th><th>Hora</th></tr>";
                let fecha = new Date();  
               for(let clase of result){

                fecha=new Date(clase.fecha_inicio)  

               if(fecha >= fechaHoy())
               primeraInser += "<tr><td>"+clase.nombre+"</td> <td>"+clase.descripcion+"</td> <td>"+clase.capacidad+"</td>  <td>"+clase.instructor+"</td>  <td>"+clase.tipo_actividad+"</td> <td>"+clase.fecha_inicio+"</td>  <td>"+clase.hora_inicio+"</td></tr>";
               else 
               segundaInser += "<tr><td>"+clase.nombre+"</td> <td>"+clase.descripcion+"</td> <td>"+clase.capacidad+"</td>  <td>"+clase.instructor+"</td>  <td>"+clase.tipo_actividad+"</td> <td>"+clase.fecha_inicio+"</td>  <td>"+clase.hora_inicio+"</td></tr>";

               }
               oTabla += "<tr class='table-warning'><td colspan='7'><b>Pendientes</b></td></tr>";
               oTabla += primeraInser;
               oTabla += "<tr class='table-warning'><td colspan='7'><b>Pasadas</b></td></tr>";
               oTabla += segundaInser;
               oTabla+="</table>";

               document.getElementById("resuls").innerHTML = oTabla;
            });
        }

}

//Listado de reserva entre dos fecha
function listadoReserva(){
    ocultarTodosFormularios();
   cargarFiltrosReservas();
   document.getElementById("frmLlamadaReservas").style.display="block";

}
function cargarFiltrosReservas(){
    
    $.getJSON("../php/cargarComboReserva.php", function(result){
        document.getElementById("comboPis").innerHTML='<option value="todasPis">Todas las pistas</option>';
        for(let pista of result)
        document.getElementById("comboPis").innerHTML+=pista;
    });

}

function filtrarBusquedasPistas(){
    let diaIn = frmLlamadaReservas.diaIn.value;
    let diaFin = frmLlamadaReservas.diaFin.value;
    let pista = frmLlamadaReservas.comboPis.value;
    
    if (diaIn == '' || diaFin == '')
        alert("Debe rellenar las fechas de busqueda.");
        else{
            $.getJSON("../php/busquedaReserva.php",{usu : datosSesion.contraseña, diaIn : diaIn , diaFin: diaFin , pista: pista},function(result){
                console.log(result);
                let primeraInser="";
                let segundaInser="";
                oTabla = "<table style='text-align : center' class='table table-striped table-dark table-bordered'><tr class='table-info'><th>Pista</th><th>Nombre Reserva</th><th>Dia</th><th>Hora inicio</th><th>Hora Fin</th><th>Descripcion</th></tr>";
                let fecha = new Date();  
               for(let pista of result){

                fecha=new Date(pista.dia_reserva);  
               if(fecha >= fechaHoy())
               primeraInser += "<tr><td>"+pista.nombre_pista+"</td> <td>"+pista.nombre+"</td> <td>"+pista.dia_reserva+"</td>  <td>"+pista.hora_inicio+"</td>  <td>"+pista.hora_fin+"</td> <td>"+pista.descripcion+"</td>  </tr>";
               else 
               segundaInser += "<tr><td>"+pista.nombre_pista+"</td> <td>"+pista.nombre+"</td> <td>"+pista.dia_reserva+"</td>  <td>"+pista.hora_inicio+"</td>  <td>"+pista.hora_fin+"</td> <td>"+pista.descripcion+"</td>  </tr>";

               }
               oTabla += "<tr class='table-warning'><td colspan='6'><b>Pendientes</b></td></tr>";
               oTabla += primeraInser;
               oTabla += "<tr class='table-warning'><td colspan='6'><b>Pasadas</b></td></tr>";
               oTabla += segundaInser;
               oTabla+="</table>";

               document.getElementById("resuls").innerHTML = oTabla;
            });
        }


}
//listado de un usuario buscado por un DNI 
function listadoBuscarUsuario(){
    let sDNI  = document.querySelector("#iDNIBuscar").value;
    $.get("../php/listadoUsus.php?dni="+sDNI,procesoRespuestaGetUsus,'json');
    mostrarFiltros();
}

//mostrarFiltros
function mostrarFiltros(){
    let oInput1 = document.getElementById("fechaInicioListado");
    let oSpan1 = document.getElementById("lblFechaInicio");
    let oInput2 = document.getElementById("fechaFinListado");
    let oSpan2 = document.getElementById("lblFinInicio");
    let oSpanDNI = document.getElementById("lblDNIBuscar");
    let oInputDNI = document.getElementById("iDNIBuscar")
    if(oInput1==null){
        oInput1= document.createElement("input");
        oSpan1= document.createElement("Span");
        oInput2= document.createElement("input");
        oSpan2= document.createElement("Span");
    }
    if (oInputDNI == null) {
        oInputDNI= document.createElement("input");
        oSpanDNI= document.createElement("Span");
    }
    switch(document.getElementById('comboListados').value){
        case "reservas":
            oInputDNI.remove();
            oSpanDNI.remove();
            oInput1.setAttribute("type","date");
            oInput1.setAttribute("id","fechaInicioListado");
            oInput1.classList.add("form-control");
            frmListados.insertBefore(oInput1,frmListados.botonEnviar);
            oSpan1.setAttribute("id","lblFechaInicio");
            oSpan1.textContent = "Fecha Inicio";
            oSpan1.classList.add("input-group-text");
            frmListados.insertBefore(oSpan1,oInput1);

            oInput2.setAttribute("type","date");
            oInput2.setAttribute("id","fechaFinListado");
            oInput2.classList.add("form-control");
            oInput2.classList.add("mb-4");
            frmListados.insertBefore(oInput2,frmListados.botonEnviar);
            oSpan2.setAttribute("id","lblFinInicio");
            oSpan2.textContent = "Fecha Fin";
            oSpan2.classList.add("input-group-text");
            frmListados.insertBefore(oSpan2,oInput2);
            break;
        case "buscarUsuarioPorDNI":
            oInput1.remove();
            oSpan1.remove();
            oInput2.remove();
            oSpan2.remove();
            oInputDNI.setAttribute("type","text");
            oInputDNI.setAttribute("id","iDNIBuscar");
            oInputDNI.classList.add("form-control");
            oInputDNI.classList.add("mb-4");
            frmListados.insertBefore(oInputDNI,frmListados.botonEnviar);
            oSpanDNI.setAttribute("id","lblDNIBuscar");
            oSpanDNI.textContent = "DNI";
            oSpanDNI.classList.add("input-group-text");
            frmListados.insertBefore(oSpanDNI,oInputDNI);
            break;

        default:
            oInput1.remove();
            oSpan1.remove();
            oInput2.remove();
            oSpan2.remove();
            oInputDNI.remove();
            oSpanDNI.remove();
            break;
    }
}

//Funcion para cargar los XML
function loadXMLDoc(filename)
{
	if (window.XMLHttpRequest)
	  {
	  xhttp=new XMLHttpRequest();
	  }
	else // code for IE5 and IE6
	  {
	  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xhttp.open("GET",filename,false);
	
	xhttp.send();
	
	return xhttp.responseXML;
} 


function fechaHoy(){return new Date(Date.now())};

function validaFormularios(campoAValidar , expresionComprobar){
    
    if(!expresionComprobar.test(campoAValidar)){
        return false;
       
    } else{
        return true;
    }
}

function cerrarSesion(){
    localStorage.removeItem("session");
    window.location="../login/login.html";
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
