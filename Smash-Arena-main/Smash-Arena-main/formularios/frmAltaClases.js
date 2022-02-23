frmAltaClases.botonEnviar.addEventListener("click",altaClase,false);

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