
(function () {
    'use strict';
    angular
        .module('miApp')
        .filter('formatoPrecio',formatoPrecio)
        .filter('formatofecha',formatofecha);
        function formatoPrecio() {
            return function(input) {
                if (isNaN(input) || input === null || input === undefined) {
                    return '0'; // Si el input es inválido, mostrar 0
                }
        
                // Redondear al entero más cercano
                let valorRedondeado = Math.round(input);
        
                // Formatear sin decimales
                let formatoFinal = new Intl.NumberFormat('es-CL', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(valorRedondeado);
        
                return formatoFinal;
            }
        }
        
        function formatofecha(){
            return function formatDate(date, format) {
                if(date){
                    if (typeof moment !== 'function') {
                        console.error("Error: Moment.js no está cargado como una dependencia global.");
                    // return "!momentJS";
                    }
                    // Validar que la fecha sea válida
                    if (!date || !moment(date).isValid()) {
                        console.error("Error: Fecha inválida proporcionada:", date);
                    //return "Fecha inválida";
                    }
                    try {
                        // Si no se proporciona formato, devolver la fecha relativa
                        moment.locale("es")
                        return format
                            ? moment(date).format(format)
                            : moment(date).fromNow(); // Por defecto, tiempo relativo
                    } catch (error) {
                        console.error("Error al formatear la fecha:", error);
                        //return "Error de formato";
                    }
                }
            };
    
        };
}());
