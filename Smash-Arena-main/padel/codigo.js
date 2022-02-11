//Obtener el usuario ver de que tipo es y mostrar solo las acciones disponibles para cada tipo de usuario.
if(obtenerDatosLogin().tipoUsu == "admin")
{//Solo se mostraran las opciones de los admin.
    document.getElementById("altaUsuario").style.display="none";
    document.getElementById("alquilarPista").style.display="none";
    document.getElementById("apuntarClase").style.display="none";
}else{
    document.getElementById("altaUsuario").style.display="none";
    document.getElementById("modificarUsuario").style.display="none";
    document.getElementById("altaPista").style.display="none";
    document.getElementById("crearClase").style.display="none";
}
function obtenerDatosLogin(){
    let sesion = CryptoJS.AES.decrypt(localStorage.getItem("session"),"clave");
    let sesionDes = JSON.parse(sesion.toString(CryptoJS.enc.Utf8));
    
    return sesionDes
}
// Hasta aquí.
//recuperarUsuarios();

//Añadir eventos , si se cargan de forma dinamica quitar de aquí para evitar errores de referencia antes de cargar.
document.getElementById('altaUsuario').addEventListener("click",mostrarFormulario,false);
document.getElementById('modificarUsuario').addEventListener("click",mostrarFormulario,false);
document.getElementById('altaPista').addEventListener("click",mostrarFormulario,false);
document.getElementById('alquilarPista').addEventListener("click",mostrarFormulario,false);
document.getElementById('crearClase').addEventListener("click",mostrarFormulario,false);
document.getElementById('apuntarClase').addEventListener("click",mostrarFormulario,false);
document.getElementById('listados').addEventListener("click",mostrarFormulario,false);
//document.getElementById('comboUsuarios').addEventListener("change",mostrarDatosUsuario,false);
//frmModificarUsuario.botonEnviar.addEventListener("click",modificarUsuario,false);
frmAltaClases.botonEnviar.addEventListener("click",altaClase,false);
frmAltaReserva.botonEnviar.addEventListener("click",hacerReserva,false);
frmAltaPista.botonEnviar.addEventListener("click",altaPista,false);
frmApuntarClase.botonEnviar.addEventListener("click",apuntarseClase,false);
frmListados.botonEnviar.addEventListener("click",manejadorListado,false);
document.getElementById("comboListados").addEventListener("change",mostrarFiltros,false);
document.getElementById("cerrarSesion").addEventListener("click",cerrarSesion,false);


//Creamos el objeto gestion y despues cargamos el documento XML
var oGestion = new Gestion();
var oXML = loadXMLDoc("xmlSMASH-ARENA.xml");


//Llamada a todas las funciones principales
cargarUsuarios();
cargarPistas();
cargarClases();
cargarReservas();
cargarComboPistas();
//recuperarUsuarios();
cargarComboClases();
                                        
function recuperarUsuarios(){

    // 1. Instanciar objeto AJAX
    let oAJAX = instanciarXHR();

    // 2. Construir URL y cadena de parametros
    var sURL = "recuperarUsuarios.php";
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
            oCapa.appendChild(document.createElement("OPTION"));
            oCapa.lastChild.value = usuario.dni;
            oCapa.lastChild.textContent = usuario.nombre;
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
     oAjax.open("GET", encodeURI("getUsuario.php?" + sParametros));

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
            console.log(usuario);
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
    var sURL = "updateUsuario.php";
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
    console.log(oAJAX.responseText);
}

function mostrarFormulario(oE){
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
    let idReserva = frmAltaReserva.idReserva.value;
    let nomReserva = frmAltaReserva.nombreReserva.value;
    let descripcionReserva = frmAltaReserva.descripcionReserva.value;
    
    let sErrores="";
    let bValido=true;
    //Control de errores antes de crear el objeto.
    let hoy = fechaHoy();



    
   let oExpReg = /^\d{8}[a-zA-Z]{1}$/; 
    if(!validaFormularios(idReserva,oExpReg))
    {
        bValido=false;
        frmAltaReserva.idReserva.classList.add("error");
        sErrores += "El DNI no tiene el formato correcto\n";
        frmAltaReserva.idReserva.focus();

    }
    else
        frmAltaReserva.idReserva.classList.remove("error");


     oExpReg = /^[\s\w]{4,40}$/; 
    if(!validaFormularios(nomReserva,oExpReg))
    {
        if(bValido)
        frmAltaReserva.idReserva.focus();
        
        bValido=false;
        frmAltaReserva.nombreReserva.classList.add("error");
        sErrores += "El nombre de la reserva no tiene el formato correcto\n";
    }
    else
    frmAltaReserva.nombreReserva.classList.remove("error");


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

    let pistaSelecionada = frmAltaReserva.comboPistas.value;
    if(frmAltaReserva.comboPistas.selectedIndex == 0)
    {
        bValido=false;
        sErrores += "Debe seleccionar una pista.";
    
    }


    if(bValido)
    {
        oReserva = new Reserva(nomReserva,descripcionReserva,fechaReserva,fechaFin,pistaSelecionada,idReserva);
        console.log(oReserva);

        alert(oGestion.altaReserva(oReserva));
        // Todo fue correcto borramos los datos.
        frmAltaReserva.reset(); 
        ocultarTodosFormularios();
    }
    else{
        alert(sErrores);
    }

}

//Alta Clase
function altaClase(){     
    let iIdClase = document.querySelector(".idClase").value;     
    let sNombreClase = document.querySelector(".nombreClase").value;     
    let sDescripcionClase = document.querySelector(".descripcionClase").value;     
    let dtDiaInicio = new Date(document.querySelector('.diaInicioClase').value);
    let horaInicio = new Date("1/1/1 "+document.querySelector(".horaInicioClase").value);
    dtDiaInicio.setHours(horaInicio.getHours());
    dtDiaInicio.setMinutes(horaInicio.getMinutes());     
    let dtDiaFin = new Date(document.querySelector('.diaFinClase').value);
    let horaFin = new Date ("1/1/1 "+document.querySelector(".horaFinClase").value);
    dtDiaFin.setHours(horaFin.getHours());
    dtDiaFin.setMinutes(horaFin.getMinutes());
    let iCapacidad = document.querySelector('.capacidadClase').value;     
    let sTipoClase = document.querySelector('.tipoClase').value;     
    let idInstructor = document.querySelector('.idInstructorClase').value;
    let dtHoy = fechaHoy();
    let sErrores="";
    let bValido=true;



    let oExpReg = /^\d{1,3}$/; 
    if(!validaFormularios(iIdClase,oExpReg))
    {
        document.querySelector(".idClase").focus();
        bValido=false;
        document.querySelector(".idClase").classList.add("error");
        sErrores += "El id de la clase no tiene el formato correcto\n";
    }
    else
    document.querySelector(".idClase").classList.remove("error");



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
    if(document.querySelector('.diaInicioClase').value == "" || document.querySelector('.diaFinClase').value=="")
    {
        bValido=false;
        sErrores+="Las fechas estan incompletas.\n";
    }

    if(document.querySelector(".horaInicioClase").value == "" || document.querySelector(".horaFinClase").value == "")
    {
        bValido=false;
        sErrores+="Las horas estan incompletas.\n";
    }

    //
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

    if(dtDiaFin < dtHoy || dtDiaInicio < dtHoy){
        alert("Las fechas introducidas son menores al dia y hora actual");
    }else {
        if(dtDiaInicio < dtDiaFin){
            alert(oGestion.altaClase(new Clase(iIdClase,sNombreClase,sDescripcionClase,dtDiaInicio,dtDiaFin,iCapacidad,sTipoClase,idInstructor)));
            cargarComboClases();
            frmAltaClases.reset();
            ocultarTodosFormularios();
        }else {
            alert("La fecha de inicio es mayor a la fecha de fin");
        }
    }
}
else{
    alert(sErrores);
}
}
//Alta Pista
function altaPista(){
    let sNombrePista = document.querySelector(".nombrePista").value;
    let iIDPista = document.querySelector(".numeroPista").value;
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


    if(bValido)
    {
        alert(oGestion.altaPista(new Pista(sNombrePista,iIDPista)));
        cargarComboPistas();

        frmAltaPista.reset(); 
        ocultarTodosFormularios();
    }
    else{
        alert(sErrores);
    }

}

//Apuntarse Clase
function apuntarseClase() {
    let sDNI = document.querySelector(".dniUsuarioApuntarseClase").value;
    let indexCombo = document.querySelector("#comboClasesApuntarseClase").selectedIndex;
    let iIDClase = document.querySelector("#comboClasesApuntarseClase")[indexCombo].value;
    let bValido = true;
    let sErrores="";

   let  oExpReg = /^\d{8}[a-zA-Z]{1}$/; 
    if(!validaFormularios(sDNI,oExpReg))
    {
        document.querySelector(".dniUsuarioApuntarseClase").focus();
        bValido=false;
        document.querySelector(".dniUsuarioApuntarseClase").classList.add("error");
        sErrores += "El DNI no tiene el formato correcto\n";
    }
    else
    document.querySelector(".dniUsuarioApuntarseClase").classList.remove("error");


    if(document.querySelector("#comboClasesApuntarseClase").selectedIndex == 0)
    {
        sErrores+= "Debe seleccionar una clase.";
        bValido = false;
    }

    if(bValido)
    {
    alert(oGestion.apuntarseClase(sDNI,iIDClase));
    }
    else
    alert(sErrores); //Avisar al profe de que mire su funcion de apuntarse a clase.
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

//Cargar los usuarios desde el XML
function cargarUsuarios() {
    var oUsuarios = oXML.getElementsByTagName("usuario");
    for(let oUsu of oUsuarios){
        let sNombreUsuario = oUsu.getElementsByTagName("nombre")[0].textContent;
        let sDNI = oUsu.getElementsByTagName("dni")[0].textContent;
        let iEdad = oUsu.getElementsByTagName("edad")[0].textContent;
        let bSexo = oUsu.getElementsByTagName("sexo")[0].textContent;
        let bInstructor = oUsu.getElementsByTagName("instructor")[0].textContent;
        if(bSexo=="Masculino"){
            bSexo=true;
        }else {
            bSexo=false
        }
        if(bInstructor=="Si"){
            bInstructor=true
        }else {
            bInstructor=false;
        }
        oGestion.altaUsuario(new Usuario(sNombreUsuario,sDNI,iEdad,bSexo,bInstructor)); 
    }
}

//Oculta todos los formularios
function ocultarTodosFormularios() {
    let oFormularios = document.querySelectorAll("form");
    for(let oFor of oFormularios){
        oFor.style.display = "none";
    }
}

//Crea el combo de pistas para alquilarlas 
function cargarComboPistas() {
    let oCapa = document.getElementById("comboPistas");
    while(oCapa.hasChildNodes()){
        oCapa.removeChild(oCapa.firstChild);
    }
    oCapa.appendChild(document.createElement("OPTION"))
    oCapa.lastChild.value = "nulo";
    oCapa.lastChild.textContent = "Selecciona una pista..."
    for (oPista of oGestion.aPistas){
        oCapa.appendChild(document.createElement("OPTION"));
        oCapa.lastChild.value = oPista.id;
        oCapa.lastChild.textContent = oPista.nombre;
    }
    
}

//Carga las clase desde el XML
function cargarClases(){
    var oClases = oXML.getElementsByTagName("clase");
    for(oCla of oClases){
        let iIDClase = oCla.getElementsByTagName("iIdClase")[0].textContent;
        let sNombre = oCla.getElementsByTagName("sNombre")[0].textContent;
        let sDescripcion = oCla.getElementsByTagName("sDescripcion")[0].textContent;
        let dtInicio = new Date(oCla.getElementsByTagName("dtInicio")[0].textContent);
        let dtFin = new Date(oCla.getElementsByTagName("dtFin")[0].textContent);
        let iCapacidad = parseInt(oCla.getElementsByTagName("iCapacidad")[0].textContent);
        let sTipoActividad = oCla.getElementsByTagName("sTipoActividad")[0].textContent;
        let siIdInstructor = oCla.getElementsByTagName("siIdInstructor")[0].textContent;

        oGestion.altaClase(new Clase(iIDClase,sNombre,sDescripcion,dtInicio,dtFin,iCapacidad,sTipoActividad,siIdInstructor));
    }
}

//Crea el combo de clases para apuntarse a ellas
function cargarComboClases(){
    let oCapa = frmApuntarClase.comboClasesApuntarseClase;
    while(oCapa.hasChildNodes()){
        oCapa.removeChild(oCapa.firstChild);
    }
    oCapa.appendChild(document.createElement("OPTION"))
    oCapa.lastChild.value = "nulo";
    oCapa.lastChild.textContent = "Selecciona una clase...";
    for(let clase of oGestion.aClases){
        oCapa.appendChild(document.createElement("OPTION"));
        oCapa.lastChild.value = clase.ID;
        oCapa.lastChild.textContent = clase.Nombre+" "+clase.Inicio.toLocaleDateString("es-ES")+" "+clase.Inicio.getHours()+"H";
    }
}

//Cargar reservas desde el XML
function cargarReservas(){
    let oReservas = oXML.querySelectorAll("reserva");
    for(oRes of oReservas){
        let sNombreReserva = oRes.querySelector("nombre").textContent;
        let sDescripcion = oRes.querySelector("descripcion").textContent;
        let dtFechaReserva = new Date(oRes.querySelector("fechaReserva").textContent);
        let dtFechaFin = new Date(oRes.querySelector("fechaFin").textContent);
        let iIDPista = oRes.querySelector("idPista").textContent;
        let sDNIReserva = oRes.querySelector("usuarioReserva").textContent;

        oGestion.altaReserva(new Reserva(sNombreReserva, sDescripcion, dtFechaReserva, dtFechaFin, iIDPista, sDNIReserva));

    }
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
    let oTabla = document.createElement("table");
    let oCapa = document.querySelector(".formularios");
    let oTH = document.createElement("th");
    let oUsuarios = oGestion.usuarios;

    oTabla.classList.add("table");
  

    let cabecera = oTabla.createTHead();


    let filaCabecera = cabecera.insertRow(-1);
    let celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "DNI";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Nombre Completo";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Edad";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Sexo";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Es Instructor";

    let cuerpo = oTabla.createTBody();

    for(let oUsu of oUsuarios){
        let filaCuerpo = cuerpo.insertRow(-1);
        let celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oUsu.DNI;

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oUsu.NombreAp;

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oUsu.Edad;

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oUsu.Sexo?"Masculino":"Femenino";

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oUsu.EsInstructor?"Si":"No";

    }
    oCapa.appendChild(oTabla);
    frmListados.reset();
  
}

//listadoPistas
function listadoPistas(){
    let oTabla = document.createElement("table");
    let oCapa = document.querySelector(".formularios");
    let oTH = document.createElement("th");
    let oPistas = oGestion.pistas;

    oTabla.classList.add("table");
  

    let cabecera = oTabla.createTHead();


    let filaCabecera = cabecera.insertRow(-1);
    let celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "ID";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Nombre";

    let cuerpo = oTabla.createTBody();

    for(oPis of oPistas){
        let filaCuerpo = cuerpo.insertRow(-1);
        let celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oPis.id;

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oPis.nombre;
    }
    oCapa.appendChild(oTabla);
    frmListados.reset();
}

//listadoClase
function listadoClase(){
    let oTabla = document.createElement("table");
    let oCapa = document.querySelector(".formularios");
    let oTH = document.createElement("th");
    let oClases = oGestion.clases;

    oTabla.classList.add("table");
  

    let cabecera = oTabla.createTHead();


    let filaCabecera = cabecera.insertRow(-1);
    let celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "ID";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Nombre";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Descripcion";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Fecha Inicio";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Fecha Fin";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Capacidad";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Tipo actividad";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Nombre Instructor";

    let cuerpo = oTabla.createTBody();

    for(oCla of oClases){
        let filaCuerpo = cuerpo.insertRow(-1);
        let celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oCla.ID;

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oCla.Nombre;

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oCla.Descripcion;

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oCla.Inicio.toLocaleDateString("es-ES")+" "+ oCla.Inicio.getUTCHours()+":"+oCla.Inicio.getMinutes()+"H";

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oCla.Fin.toLocaleDateString("es-ES")+" "+ oCla.Fin.getUTCHours()+":"+oCla.Fin.getMinutes()+"H";

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oCla.Capacidad;

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oCla.Actividad;

        let oInstructor = oGestion.buscarUsuario(oCla.Instructor);

        celdaCuerpo = filaCuerpo.insertCell(-1);
        celdaCuerpo.textContent = oInstructor.NombreAp;
    }

    oCapa.appendChild(oTabla);
    frmListados.reset();
}
//Listado de reserva entre dos fecha
function listadoReserva(){
    let dtFechaInicio = document.querySelector("#fechaInicioListado").value;
    let dtFechaFin = document.querySelector("#fechaFinListado").value
    let oTabla = document.createElement("table");
    let oCapa = document.querySelector(".formularios");
    let oTH = document.createElement("th");
    let oReservas = [];
    for(oPis of oGestion.pistas){
        for(oRes of oPis.reservas){
            oReservas.push(oRes);
        }
    }

    oTabla.classList.add("table");
  

    let cabecera = oTabla.createTHead();


    let filaCabecera = cabecera.insertRow(-1);
    let celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Nombre";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Descripcion";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Fecha Inicio";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Fecha Fin";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "ID Pista";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "DNI Usuario";

    let cuerpo = oTabla.createTBody();
    if(dtFechaInicio=="" || dtFechaFin == ""){
        for(oRes of oReservas){
            let filaCuerpo = cuerpo.insertRow(-1);
            let celdaCuerpo = filaCuerpo.insertCell(-1);
            celdaCuerpo.textContent = oRes.Nombre;
    
            celdaCuerpo = filaCuerpo.insertCell(-1);
            celdaCuerpo.textContent = oRes.Descripcion;
    
            celdaCuerpo = filaCuerpo.insertCell(-1);
            celdaCuerpo.textContent = oRes.fechaIni.toLocaleDateString("es-ES")+" "+ oRes.fechaIni.getUTCHours()+":"+oRes.fechaIni.getMinutes()+"H";
    
            celdaCuerpo = filaCuerpo.insertCell(-1);
            celdaCuerpo.textContent = oRes.fechaFin.toLocaleDateString("es-ES")+" "+ oRes.fechaFin.getUTCHours()+":"+oRes.fechaFin.getMinutes()+"H";
    
            celdaCuerpo = filaCuerpo.insertCell(-1);
            celdaCuerpo.textContent = oRes.pista;

            celdaCuerpo = filaCuerpo.insertCell(-1);
            celdaCuerpo.textContent = oRes.dniReserva;
        }
    }else {
        dtFechaInicio = new Date(dtFechaInicio);
        dtFechaFin = new Date(dtFechaFin);

        for(oRes of oReservas){
            if(oRes.fechaIni>=dtFechaInicio && oRes.fechaFin <= dtFechaFin){
                let filaCuerpo = cuerpo.insertRow(-1);
                let celdaCuerpo = filaCuerpo.insertCell(-1);
                celdaCuerpo.textContent = oRes.Nombre;
        
                celdaCuerpo = filaCuerpo.insertCell(-1);
                celdaCuerpo.textContent = oRes.Descripcion;
        
                celdaCuerpo = filaCuerpo.insertCell(-1);
                celdaCuerpo.textContent = oRes.fechaIni.toLocaleDateString("es-ES")+" "+ oRes.fechaIni.getUTCHours()+":"+oRes.fechaIni.getMinutes()+"H";
        
                celdaCuerpo = filaCuerpo.insertCell(-1);
                celdaCuerpo.textContent = oRes.fechaFin.toLocaleDateString("es-ES")+" "+ oRes.fechaFin.getUTCHours()+":"+oRes.fechaFin.getMinutes()+"H";
        
                celdaCuerpo = filaCuerpo.insertCell(-1);
                celdaCuerpo.textContent = oRes.pista;
    
                celdaCuerpo = filaCuerpo.insertCell(-1);
                celdaCuerpo.textContent = oRes.dniReserva;
            }   
        }
    }


    oCapa.appendChild(oTabla);
    frmListados.reset();
    mostrarFiltros()

}
//listado de un usuario buscado por un DNI 
function listadoBuscarUsuario(){
    let sDNI  = document.querySelector("#iDNIBuscar").value;
    let oTabla = document.createElement("table");
    let oCapa = document.querySelector(".formularios");
    let oTH = document.createElement("th");
    let oUsu = oGestion.buscarUsuario(sDNI);
    if(oUsu == null){
        alert("Debes introducir un DNI correcto");
    }else {
    oTabla.classList.add("table");
  

    let cabecera = oTabla.createTHead();


    let filaCabecera = cabecera.insertRow(-1);
    let celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "DNI";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Nombre Completo";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Edad";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Sexo";

    oTH = document.createElement("th");
    celdaCabecera = filaCabecera.appendChild(oTH);
    celdaCabecera.textContent = "Es Instructor";

    let cuerpo = oTabla.createTBody();
    let filaCuerpo = cuerpo.insertRow(-1);
    let celdaCuerpo = filaCuerpo.insertCell(-1);
    celdaCuerpo.textContent = oUsu.DNI;

    celdaCuerpo = filaCuerpo.insertCell(-1);
    celdaCuerpo.textContent = oUsu.NombreAp;

    celdaCuerpo = filaCuerpo.insertCell(-1);
    celdaCuerpo.textContent = oUsu.Edad;

    celdaCuerpo = filaCuerpo.insertCell(-1);
    celdaCuerpo.textContent = oUsu.Sexo?"Masculino":"Femenino";

    celdaCuerpo = filaCuerpo.insertCell(-1);
    celdaCuerpo.textContent = oUsu.EsInstructor?"Si":"No";
    oCapa.appendChild(oTabla);
    }
    frmListados.reset();
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