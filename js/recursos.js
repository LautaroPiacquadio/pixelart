// No modifiques estas funciones a menos que sepas MUY BIEN lo que estas haciendo!

// Abre una ventana para guardar nuestro arte en un archivo pixel-art.png
function descargarPixelArt() {
    var nombre = $("#input-nombre-descargar").val();
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
    cerrarModal('#modal-descargar');
}

// Carga a un superheroe predefinido
function cargarPixelart(superheroe) {
    var $pixeles = $("#grilla-pixeles div");
    for (var i = 0; i < superheroe.length; i++) {
        $pixeles[i].style.backgroundColor = superheroe[i];
    }
}
