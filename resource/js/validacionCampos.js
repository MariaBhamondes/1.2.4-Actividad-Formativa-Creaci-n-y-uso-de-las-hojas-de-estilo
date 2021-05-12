var form = document.getElementById("formulario");


var contador = 0;

 //Función validar campos vacíos
function validaCampo(id) {
    var dato = document.getElementById(id).value;
    if (dato.trim().length === 0) {
        document.getElementById("error_" + id).innerHTML = "*Complete correctamente el campo " + id;
        return false;
    } else if (id == 'documento' && dato.trim() == '-') {
        document.getElementById("error_" + id).innerHTML = "*Complete correctamente el campo " + id;
        document.getElementById(id).value = "";
        return false;
    } else {
        document.getElementById("error_" + id).style.display = "none";
        return true;
    }
}

function validarLargo(id){
    var dato = document.getElementById(id).value;
    if(dato.trim().length < 50){
        document.getElementById("error_largo_comentario").innerHTML="*Largo mínimo debe ser 50 caracteres";
        return false;
    }else{
        document.getElementById("error_largo_comentario").style.display="none";
        return true;
    } 
}


function conocerCheckeado(id){
    var dato = document.getElementById(id);
    var tipo_documento;
    if(dato.checked){
        tipo_documento = dato.value;
        
        console.log(tipo_documento);
    }
}


function validarRut(){
    var rut = document.getElementById('documento');
    if(document.getElementById('rut').checked){
        // Despejar Puntos
        var valor = rut.value.replace('.','');

        // Despejar Guión
        valor = valor.replace('-','');
        
        // Aislar Cuerpo y Dígito Verificador
        cuerpo = valor.slice(0,-1);
        dv = valor.slice(-1).toUpperCase();
        
        // Formatear RUN
        rut.value = cuerpo + '-'+ dv
        
        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if(cuerpo.length < 7) {
            return false;
        }
        
        // Calcular Dígito Verificador
        suma = 0;
        multiplo = 2;
        
        // Para cada dígito del Cuerpo
        for(let i = 1; i <= cuerpo.length; i++) {
            // Obtener su Producto con el Múltiplo Correspondiente
            index = multiplo * valor.charAt(cuerpo.length - i);
            
            // Sumar al Contador General
            suma = suma + index;
            
            // Consolidar Múltiplo dentro del rango [2,7]
            if(multiplo < 7) { 
                multiplo = multiplo + 1; 
            } 
            else { 
                multiplo = 2; 
            }
        
        }
        
        // Calcular Dígito Verificador en base al Módulo 11
        dvEsperado = 11 - (suma % 11);
        
        // Casos Especiales (0 y K)
        dv = (dv == 'K')?10:dv;
        dv = (dv == 0)?11:dv;
        
        // Validar que el Cuerpo coincide con su Dígito Verificador
        if(dvEsperado != dv) { 
            //document.getElementById('error_rut').innerHTML("Rut ingresado es inválido");
            return false; 
        }
        
        // Si todo sale bien, eliminar errores (decretar que es válido)
        return true;
    }

    /*if(rutValido == true){
        document.getElementById('error_rut').style.display="none";
    }else{
        alert("Aumento");
        contador += 1;
    }*/
}







//Arrays con los campos
let id_campos = ["nombre", "email", "documento", "ciudad", "comentario"];



//Funcion botón enviar
function enviarDatos(e){
    contador = 0;
    var validarRutFuncion = validarRut();
    if (validarRutFuncion == false){
        e.preventDefault();
    }


    var validarLargoComentario = validarLargo('comentario');
    
    //agregar a la lista campo_no_valido los input que no tienen datos
    for (let i = 0; i < id_campos.length; i++) {
        if(!validaCampo(id_campos[i])){
            contador ++;
        }
    }
    //validar que el largo de la lista campo_no_valido sea 0 para enviar
    if(contador == 0 && validarLargoComentario == true){
        alert("ENVÍO EXITOSO \n \nLos datos han sido enviado satisfactoriamente");

    }
    else{
        e.preventDefault();
    } 
}


