var form = document.getElementById("formulario");

//Función validar campos
function validaCampo(id){
    var dato = document.getElementById(id).value;

    if(dato.trim().length === 0){
        document.getElementById(id).focus();
        document.getElementById("error_" + id).innerHTML= "*Complete correctamente el campo " + id;
        return false;
    }
    else{
        document.getElementById("error_" + id).style.display="none";
        return true;
    }
}


//Arrays con los campos
let id_campos = ["nombre", "email", "documento", "ciudad", "comentario"];


//Funcion botón enviar
function enviarDatos(e){
    //guardar campos que no tienen datos
    let campo_no_valido = [];
    var contador = 0;

    //agregar a la lista campo_no_valido los input que no tienen datos
    for (let i = 0; i < id_campos.length; i++) {
        if(!validaCampo(id_campos[i])){
            campo_no_valido.push(id_campos[i]);
            contador += 1;
        }
    }

    //validar que el largo de la lista campo_no_valido sea 0 para enviar
    if(contador == 0 ){
        alert("ENVÍO EXITOSO \n \nLos datos han sido enviado satisfactoriamente");

    }
    else{
        e.preventDefault();
        document.getElementById("message").innerHTML="LOS SIGUIENTES <b>"+ contador + "</b> CAMPOS ESTÁN <b>VACÍOS </b> <hr>";
        var listado;
        for (let i = 0; i < campo_no_valido.length; i++) {
            var li = document.createElement('li');
            var p = document.createElement('p');
            listado = "- "+campo_no_valido[i].toUpperCase();
            p.append(document.createTextNode(listado));
            document.querySelector("#message").appendChild(li).appendChild(p);
        }
    } 
}



