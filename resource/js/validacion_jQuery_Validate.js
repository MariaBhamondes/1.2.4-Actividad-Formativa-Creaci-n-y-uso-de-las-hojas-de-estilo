$(document).ready(function(){
    //Validar rut
    function validarRut(rut) {
        // variables
        suma = 0;
        multiplo = 2;
        rut = String(rut);

        // Despejar Puntos
        var valor = rut.replace('.','');

        // Despejar Guión
        valor = valor.replace('-','');
        
        // Aislar Cuerpo y Dígito Verificador
        cuerpo = valor.slice(0,-1);
        dv = valor.slice(-1).toUpperCase();
        
        // Formatear RUN
        rut.value = cuerpo + '-'+ dv
        
        //**Para ignorar el formato módulo 11 cuando se selecciona pasaporte */
        if($('input[name="tipo_documento"]:checked').val() === 'pasaporte'){
            return true;
        }

        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if(cuerpo.length < 7) {
            return false;
        }
                    
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
            return false; 
        }

        // Si todo sale bien, eliminar errores (decretar que es válido)
        return true;
    }
    


    //Registrar reglas de validacion módulo 11 rut
    $.validator.addMethod("rut", function(value, element){
        return validarRut(value);
    });


    //Invocar pluguin validate
    $("#formulario").validate({
        rules:{
            //Name de los inputs
            nombre:{
                required: true,
            },
            correo:{
                required:true,
                email: true,
            },
            ciudad:{
                required: true,
            },
            comentario:{
                required: true,
                minlength: 50,
            },
            documento:{
                required: true,
                rut: true,   
            }
        },
        messages:{
            nombre:{
                required: "*Debe ingresar su nombre completo."
            },
            correo:{
                required: "*Debe ingresar su correo electrónico.",
                email: "*Formato del correo electrónico no es válido."
            },
            ciudad:{
                required: "*Debe seleccionar una ciudad."
            },
            comentario:{
                required: "*Debe redactar un comentario para la ONG.",
                minlength: "*Debe ingresar al menos 50 caracteres."
            },
            documento:{
                required: "*Debe ingresar su número de documento.",
                rut: "*Formato del RUT es inválido.",
            }
        }
    });

    $("#limpiar").click(function() {
        $("#formulario").validate().resetForm();
    });


});
