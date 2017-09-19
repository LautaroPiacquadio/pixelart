var nombreColores = ['White', 'LightYellow',
    'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque',
    'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan','Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed',
    'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed', 'Pink', 'LightPink',
    'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon', 'Brown',
    'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown', 'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
    'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine', 'MediumSeaGreen', 'SeaGreen', 'ForestGreen',
    'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen', 'Chartreuse',
    'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen', 'LightGreen', 'PaleGreen', 'PaleTurquoise', 'AquaMarine',
    'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue', 'LightSeaGreen', 'CadetBlue',
    'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan', 'PowderBlue', 'LightBlue',
    'SkyBlue', 'LightSkyBlue', 'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue', 'MediumSlateBlue',
    'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue', 'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
    'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid', 'BlueViolet', 'DarkViolet',
    'DarkOrchid', 'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray', 'DimGray',
    'LightSlateGray', 'DarkSlateGray', 'Black'
];

// ### Variables ###
var $indicadorDeColor = $('#indicador-de-color');
var $colorPersonalizado = $('#color-personalizado');
var $paleta = $('#paleta');
var $grillaPixeles = $('#grilla-pixeles');
var $grillaPixelesChildrens = $grillaPixeles.children();
var $body = $('body');
var clicked = false;

// ### Funciones ###

// Guardar el pixel-art como un .json
function guardarPixelArt() {
    var arte = [];
    $grillaPixelesChildrens.each(function(){
        arte.push($(this).css('background-color'));
    })
    var nombre = $("#input-nombre-guardar").val();
    if (!nombre) {
        nombre = "pixel-art"
    }
    var resultado = {
        arte: arte
    }
    var blob = new Blob([JSON.stringify(resultado, null, 2)], { type: "application/json" });
    saveAs(blob, nombre + ".json");
    $('#modal-guardar').fadeOut(200, 'linear');
}

// Genero la paleta de colores con los colores correspondientes
function generarPaletaDeColores() {
    nombreColores.forEach(function(color){
        var $color = $('<div>').addClass('color-paleta').css('background-color', color);
        $paleta.append($color);
    });
}

// Genero la grilla de pixeles (1750 pixeles)
function generarGrillaDePixeles() {
    for (var pixel = 0; pixel <= 1748; pixel++) {
        var $pixel = $('<div>');
        $grillaPixeles.append($pixel);
    }
}

// Seleccionar el color de la paleta al clickear en uno
function seleccionarColor(event) {
    var color = $(event.target).css('background-color');
    $indicadorDeColor.css('background-color', color);
    $body.animate({ 'background-color': color }, 1000, 'linear');
}

// Pintar en la grilla
function pintar(event) {
    $(event.target).click(function(){
        var color = $indicadorDeColor.css('background-color');
        $(event.target).css('background-color', color);
    });

    // Si presiono el click "clicked" es true
    $(event.target).mousedown(function(){
        clicked = true;
    });

    // Si dejo de presionar el click "clicked" es false
    $(event.target).mouseup(function(){
        clicked = false;
    });

    // Cuando muevo el mouse
    $(event.target).mousemove(function(){
        // Pintar los pixeles donde pasa el mouse si "clicked" es true
        if (clicked) {
            var color = $indicadorDeColor.css('background-color');
            $(event.target).css('background-color', color);
        }
    });
}

// Por defecto el indicador de color está en blanco
$indicadorDeColor.css('background-color', 'white');

$colorPersonalizado.change(function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = $colorPersonalizado.val();
    // Completar para que cambie el indicador-de-color al colorActual
    $indicadorDeColor.css('background-color', colorActual);
});

generarPaletaDeColores();
generarGrillaDePixeles();

// ### Eventos ###
$paleta.click(seleccionarColor);

$grillaPixeles.click(pintar);

// Cargar superheroes
$('#batman').click(function(){
    cargarSuperheroe(batman);
});

$('#wonder').click(function(){
    cargarSuperheroe(wonder);
});

$('#flash').click(function(){
    cargarSuperheroe(flash);
});

$('#invisible').click(function(){
    cargarSuperheroe(invisible);
});

// Abrir modal de descargar
$('#descargar').click(function(){
    $('#modal-descargar').fadeIn(200, 'linear');
});

// Cerrar modal de descargar
$('#descargar-cerrar').click(function(){
    $('#modal-descargar').fadeOut(200, 'linear');
});

// Descargar pixelart en imagen
$('#descargar-aceptar').click(function(){
    descargarPixelArt();
});

// Abrir modal de borrar
$('#borrar').click(function(){
    $('#modal-borrar').fadeIn(200, 'linear');
});

// Cerrar modal de borrar
$('#borrar-cerrar').click(function(){
    $('#modal-borrar').fadeOut(200, 'linear');
});

// Borrar toda la grilla
$('#borrar-aceptar').click(function(){
    $grillaPixelesChildrens.each(function(){
        $(this).css('background-color', '#FFFFFF');
    });
    $('#modal-borrar').fadeOut(200, 'linear');
});

// Abrir modal de guardar
$('#guardar').click(function(){
    $('#modal-guardar').fadeIn(200, 'linear');
});

// Cerrar modal de guardar
$('#guardar-cerrar').click(function(){
    $('#modal-guardar').fadeOut(200, 'linear');
});

// Guardar pixelart
$('#guardar-aceptar').click(function(){
    guardarPixelArt();
});

// Abrir modal de cargar
$('#cargar').click(function(){
    $('#modal-cargar').fadeIn(200, 'linear');
});

// Cerrar modal de cargar
$('#cargar-cerrar').click(function(){
    $('#modal-cargar').fadeOut(200, 'linear');
});

// Cargo el pixelart guardado como json
$('#cargar-aceptar').submit(function(event){
    event.preventDefault();
    var $cargarFile = $('#cargar-file');
    var file = $cargarFile[0].files[0];
    if (file) {
        fr = new FileReader();
        fr.onload = function(data) {
            var result = JSON.parse(fr.result);
            var error = fr.error;
            if (!error && result.arte) {
                cargarSuperheroe(result.arte);
            }
        }
        fr.readAsText(file);
        $('#modal-cargar').fadeOut(200, 'linear');
    }
});
