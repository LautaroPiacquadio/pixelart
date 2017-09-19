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
var $superheroe = $('.superheroe');
var $accion = $('.accion');
var $body = $('body');
var clicked = false;

// ### Funciones ###

// Guardar el pixel-art como un .json
function guardarPixelArt() {
    var arte = [];
    $grillaPixeles.children().each(function(){
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
    cerrarModal('#modal-guardar');
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

// Pintar un pixel en la grilla
function pintarUno(event) {
    var color = $indicadorDeColor.css('background-color');
    $(event.target).css('background-color', color);
}

// Pintar los pixeles por los que pasa el mouse
function pintarVarios(event) {
    // Pintar los pixeles donde pasa el mouse si "clicked" es true
    if (clicked) {
        var color = $indicadorDeColor.css('background-color');
        $(event.target).css('background-color', color);
    }
}

// Cargo el superheroe
function cargarSuperheroe(event) {
    var id = $(event.target).attr('id');
    var superheroe = null;
    if (id === 'batman') {
        superheroe = batman;
    } else if (id === 'wonder') {
        superheroe = wonder;
    } else if (id === 'flash') {
        superheroe = flash;
    } else if (id === 'invisible') {
        superheroe = invisible;
    }

    if (superheroe) {
        cargarPixelart(superheroe);
    }
}

// Abrir modal
function abrirModal(event) {
    var id = $(event.target).attr('id');
    $('#modal-' + id).fadeIn(200, 'linear');
}

// Cerrar modal
function cerrarModal(id) {
    $(id).fadeOut(200, 'linear');
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

// Selecciono el color de la paleta
$paleta.click(seleccionarColor);

// Pinto en la grilla el pixel clickeado
$grillaPixeles.click(pintarUno);

// Si presiono el click "clicked" es true
$grillaPixeles.mousedown(function(){
    clicked = true;
});

// Si dejo de presionar el click "clicked" es false
$grillaPixeles.mouseup(function(){
    clicked = false;
});

// Pintar los pixeles por los que pasa el cursor si "clicked" es true
$grillaPixeles.mousemove(pintarVarios);

// Cargar superheroe
$superheroe.click(cargarSuperheroe);

// Activo una accion
$accion.click(abrirModal);

// Cerrar modal de descargar
$('#descargar-cerrar').click(function(){
    cerrarModal('#modal-descargar');
});

// Descargar pixelart en imagen
$('#descargar-aceptar').click(function(){
    descargarPixelArt();
});

// Cerrar modal de borrar
$('#borrar-cerrar').click(function(){
    cerrarModal('#modal-borrar');
});

// Borrar toda la grilla
$('#borrar-aceptar').click(function(){
    $grillaPixeles.children().each(function(){
        $(this).css('background-color', '#FFFFFF');
    });
    cerrarModal('#modal-borrar');
});

// Cerrar modal de guardar
$('#guardar-cerrar').click(function(){
    cerrarModal('#modal-guardar');
});

// Guardar pixelart
$('#guardar-aceptar').click(function(){
    guardarPixelArt();
});

// Cerrar modal de cargar
$('#cargar-cerrar').click(function() {
    cerrarModal('#modal-cargar');
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
                cargarPixelart(result.arte);
            }
        }
        fr.readAsText(file);
        cerrarModal('#modal-cargar');
    }
});
