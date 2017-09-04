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

// Variable jQuery para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var $indicadorDeColor = $('#indicador-de-color');
var $colorPersonalizado = $('#color-personalizado');
var $paleta = $('#paleta');
var $grillaPixeles = $('#grilla-pixeles');

function generarPaletaDeColores() {
    nombreColores.forEach(function(color){
        var $color = $('<div>').addClass('color-paleta').css('background-color', color);
        $paleta.append($color);
    });
}

function generarGrillaDePixeles() {
    for (var pixel = 0; pixel <= 1750; pixel++) {
        var $pixel = $('<div>');
        $grillaPixeles.append($pixel);
    }
}

$colorPersonalizado.change(function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = $colorPersonalizado.val();
    // Completar para que cambie el indicador-de-color al colorActual
    $indicadorDeColor.css('background-color', colorActual);
});

generarPaletaDeColores();
generarGrillaDePixeles();

var $colores = $('.color-paleta');
$colores.each(function(){
    $(this).click(function(){
        var color = $(this).css('background-color');
        $indicadorDeColor.css('background-color', color);
    });
});

var clicked = false;

$grillaPixeles.children().each(function(){
    $(this).click(function(){
        var color = $indicadorDeColor.css('background-color');
        $(this).css('background-color', color);
    });

    $(this).mousedown(function(){
        clicked = true;
    });

    $(this).mouseup(function(){
        clicked = false;
    });
});

$grillaPixeles.children().hover(function(event){
    if (clicked) {
        var color = $indicadorDeColor.css('background-color');
        $(event.target).css('background-color', color);
    }
});

$('#borrar').click(function(){
    $grillaPixeles.children().each(function(){
        $(this).css('background-color', '#FFFFFF');
    });
});

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
