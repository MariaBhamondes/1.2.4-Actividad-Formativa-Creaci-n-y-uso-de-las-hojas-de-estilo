$(document).ready(initiate_geolocation);

//Declaración de arreglo
var iconos = new Array(
    "a01d.png", "a01n.png", "a02d.png", "a02n.png", "a03d.png", "a03n.png", "a04d.png", "a04n.png",
    "a05d.png", "a05n.png", "a06d.png", "a06n.png", "c01d.png", "c01n.png", "c02d.png", "c02n.png",
    "c03d.png", "c03n.png", "c04d.png", "c04n.png", "d01d.png", "d01n.png", "d02d.png", "d02n.png",
    "d03d.png", "d03n.png", "f01d.png", "f01n.png", "r01d.png", "r01n.png", "r02d.png", "r02n.png",
    "r03d.png", "r03n.png", "r04d.png", "r04n.png", "r05d.png", "r05n.png", "r06d.png", "r06n.png",
    "s01d.png", "s01n.png", "s02d.png", "s02n.png", "s03d.png", "s03n.png", "s04d.png", "s04n.png",
    "s05d.png", "s05n.png", "s06d.png", "s06n.png", "t01d.png", "t01n.png", "t02d.png", "t02n.png",
    "t03d.png", "t03n.png", "t04d.png", "t04n.png", "t05d.png", "t05n.png", "u00d.png", "u00n.png"
);

function initiate_geolocation() {
    navigator.geolocation.getCurrentPosition(conocer_localizacion, error_localizacion);
}

//Función para validar errores de localización
function error_localizacion(error) {
    var mensaje_error = $("#mensaje_error_clima");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            mensaje_error.text("Usuario no permitió acceso a su ubicación");
            $("#error_clima_div").css("display", "block");
            break;

        case error.POSITION_UNAVAILABLE:
            mensaje_error.text("No se pudo detectar la posición");
            $("#error_clima_div").css("display", "block");
            break;

        case error.TIMEOUT:
            mensaje_error.text("El tiempo de recuperación de la localización se ha agotado");
            $("#error_clima_div").css("display", "block");
            break;

        default:
            mensaje_error.text("Lo sentimos, ha ocurrido un error desconocido");
            $("#error_clima_div").css("display", "block");
            break;
    }
}

//Función para obtener localización
function conocer_localizacion(position) {
    var latitud_proceso = position.coords.latitude;
    var longitud_proceso = position.coords.longitude;

    //Referencia función encargada del consumo del API de clima
    consumo_api_clima(latitud_proceso, longitud_proceso);
}

//Función consumo API clima
function consumo_api_clima(latitud, longitud) {

    //Consumir API del Clima
    $.get("https://api.weatherbit.io/v2.0/current?lat=" + latitud + "&lon=" + longitud + "&key=945a33ccd3ac42a19a2846c66ac7709e&lang=es", function (informacion) {
        //console.log(informacion.data[0]);

        //declaración e inicialiación de variables
        var mostrar_clima = $("#clima");
        var existe = false;
        var imagen = informacion.data[0].weather.icon;

        //verificar si existe el logo segun su código en el array iconos
        for (let i = 0; i < iconos.length; i++) {
            if (iconos[i] == imagen + ".png") {
                existe = true;
            }
        }
        //en caso de que no exista, se mantiene la imagen por defecto preestablecida

        //si existe la imagen, la ruta src de la imagen se modifica según el archivo html
        if (existe == true) {
            //Modificar ruta imágenes según su ubicación en las carpetas
            //#icon -> vistas: index, contacto, nosotros
            $("#icon").attr("src", "../resource/icons/" + imagen + ".png");
            //#icon_p -> vistas: perros, ninna, flaca, cachulo
            $("#icon_p").attr("src", "../../resource/icons/" + imagen + ".png");
            //icon_g -> vistas: gatos, ginger, lucifer, tommy
            $("#icon_g").attr("src", "../../resource/icons/" + imagen + ".png");
        }

        //modificar DOM para agregar información recopiladas sobre el tiempo en el html
        mostrar_clima.append("Bienvenido la temperatura actual en <b>" + informacion.data[0].city_name + "</b>");
        mostrar_clima.append(" es <b>" + informacion.data[0].temp + "°C </b>");
        mostrar_clima.append("<b>" + informacion.data[0].weather.description + "</b>");

        //hacer visible el div que contiene la información
        $("#clima_div").css("display", "block");
    });
}