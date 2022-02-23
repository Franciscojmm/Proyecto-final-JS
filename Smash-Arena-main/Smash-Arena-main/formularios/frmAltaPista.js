frmAltaPista.botonEnviar.addEventListener("click",altaPista,false);


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
                frmAltaPista.reset(); 
                ocultarTodosFormularios();
            }
            alert(text);
        });
    });
}