// No modifiques estas funciones a menos que sepas MUY BIEN lo que estas haciendo!

// Abre una ventana para guardar nuestro arte en un archivo pixel-art.png
function guardarPixelArt() {
    var nombre = $("#input-nombre").val();
    if (!nombre) {
        nombre = "pixel-art"
    }
    html2canvas($grillaPixeles, {
        onrendered: function(canvas) {
            theCanvas = canvas;
            canvas.toBlob(function(blob) {
                saveAs(blob, nombre + ".png");
            });
        }
    });
    $('#modal').css('display', 'none');
}

// Carga a un superheroe predefinido
function cargarSuperheroe(superheroe) {
    var $pixeles = $("#grilla-pixeles div");
    for (var i = 0; i < superheroe.length; i++) {
        $pixeles[i].style.backgroundColor = superheroe[i];
    }
}
