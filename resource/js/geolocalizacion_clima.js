$(document).ready(initiate_geolocation);


function initiate_geolocation() {
    navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_errors);
}

function handle_errors(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("user did not share geolocation data");
            break;

        case error.POSITION_UNAVAILABLE:
            alert("could not detect current position");
            break;

        case error.TIMEOUT:
            alert("retrieving position timed out");
            break;

        default:
            alert("unknown error");
            break;
    }
}

function handle_geolocation_query(position) {
    var latitud_proceso = position.coords.latitude;
    var longitud_proceso = position.coords.longitude;

    //Consumir API del Clima
    $.get("https://api.weatherbit.io/v2.0/current?lat=" + latitud_proceso + "&lon=" + longitud_proceso + "&key=945a33ccd3ac42a19a2846c66ac7709e&lang=es", calculando);
    var mostrar_clima = $("#clima");

    /*$.each(data, function(i, valor){
            console.log(data[i]);
        });
        console.log("---------------");
        console.log(data[0]);
*/

    function calculando(data) {
        var info = data.data;
        var ciudad = "";
        var temperatura = "";
        var descripcion = "";
        var imagen = "";
        var existe = false;

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

        for (let i = 0; i < info.length; i++) {
            ciudad = info[i].city_name;
            temperatura = info[i].temp;
            descripcion = info[i].weather.description;
            imagen = info[i].weather.icon;
        }

        for (let i = 0; i < iconos.length; i++) {
            if (iconos[i] == imagen + ".png") {
                existe = true;
            }
        }
        if (existe == true) {
            $("#icon").attr("src", "../resource/icons/" + imagen + ".png");
        }

        mostrar_clima.append("Bienvenido la temperatura actual en <b>" + ciudad.toUpperCase() + "</b>");
        mostrar_clima.append(" es <b>" + temperatura + "°C </b>");
        mostrar_clima.append("<b>" + descripcion + "</b>");
    };
}