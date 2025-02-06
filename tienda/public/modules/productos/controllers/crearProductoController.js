(function(){
    'use strict';

    angular
        .module('productoModule.crearProducto',['productoModule.calculoFactory','miAPP'])
        .controller('CrearProductoController', CrearProductoController)
        CrearProductoController.$inject = ['$scope','$rootScope','$state','productodb','calculosFactory','appFactory'];
    /** @ngInject */
    function CrearProductoController($scope,$rootScope,$state,productodb,calculosFactory,appFactory){
        $scope.loadTableCalculos = false;
        $scope.loadSaveProd=false;
        $scope.producto = {
            precio_bruto: 0,
            ganancia:0,
            descuento_estado:false,
            descuento:0,
            precio_neto:0,
            precio_descuento:0
        };
    
        // Obtener la fecha de hoy en formato YYYY-MM-DD
        let hoyStr =  moment().startOf('day').toDate();
        $scope.hoy = hoyStr;
        $scope.producto.fechaI =hoyStr

        // funciones
        function calcularDuracion(producto) {
            let fechai = moment(producto.fechaI);
            let fechaf = producto.fechaF ? moment(producto.fechaF).endOf('day') : moment().endOf('day'); 
            // Convertir a formato legible
            let dur = moment.duration(fechaf.diff(fechai)).humanize();
            return dur;
        };
        async function calcularNeto(){
            $scope.loadTableCalculos = true;
            let estado_validacion = calculosFactory.validarParaCalcular($scope.producto);
            if(estado_validacion){
                try {
                    let resultados = await productodb.calcularNeto($scope.producto);
                    if(resultados){
                        setTimeout(function() {
                            $scope.$apply(()=>{
                                $scope.producto.ganacia =resultados.procentajeGanacia;
                                $scope.producto.precio_ganancia = resultados.ganancia;
                                $scope.producto.precio_neto = resultados.neto;
                                $scope.producto.precio_iva = resultados.iva;
                                $scope.producto.precio_descuento=resultados.descuento;
                                $scope.producto.precio_iva_des=resultados.iva_des;
                                $scope.producto.precio_neto_des=resultados.neto_des;
                                $scope.producto.precio_ganancia_des = resultados.ganacia_des;
                                $scope.producto.duracion_descuento =calcularDuracion($scope.producto)
                            });
                        }, 1000);
                    }
                } catch (error) {
                    console.error("problema en el calculo: " + error.message)
                }finally{
                    setTimeout(function() {
                        $scope.$apply(()=>{
                            $scope.loadTableCalculos = false;
                        })
                    }, 1000);
                }
                
            }else{
                $scope.loadTableCalculos = false;
            }
            
        };
        async function guardarProducto(productos) {
            let estado = calculosFactory.validarParaGuardar(productos);
            // Función auxiliar para restablecer el estado del producto con mensaje
            const resetProducto = (mensaje, estado,tipo, titulo) => {
                setTimeout(() => {
                    $scope.$apply(() => {
                        $scope.loadSaveProd = false;
                        $scope.producto = {};
                        if (mensaje) {
                            appFactory.mensaje(mensaje, estado, tipo, titulo);
                        }
                    });
                }, 1000);
            };
            if (estado.valido) {
                try {
                    let resultado = await productodb.guardarProducto(productos);
                    if (resultado) {
                        resetProducto('Producto guardado correctamente.', 2, 'normal', '¡Guardado exitoso!');
                    }
                } catch (error) {
                    resetProducto(`Error al guardar: ${error.message}`, 0, 'normal', 'Error de Guardado');
                }
            } else {
                console.error("Los datos ingresados no son válidos");
                // Concatenar todos los mensajes de error en un solo string
                let mensajeErrores = estado.errores.map(item => `- ${item.mensaje}`).join('\n');
                // Enviar un único mensaje con todos los errores
                resetProducto(`Corrige los siguientes errores:\n${mensajeErrores}`, 1, 'normal', 'Errores de Validación');
            }
        }
        // funciones views 
        // Función para actualizar la fecha final mínima
        $scope.actualizarMinFechaFinal = function() {
            if ($scope.producto.fechaI) {
                let fechaInicio = moment($scope.producto.fechaI);

                // Si la fecha final es menor que la fecha inicial, se resetea
                if ($scope.producto.fechaF && moment($scope.producto.fechaF).isBefore(fechaInicio)) {
                    $scope.producto.fechaF = null;
                }
            }
        };

        $scope.calcularNeto= async function(){
            $scope.loadTableCalculos = false;
            $scope.producto.precio_neto=0;
            calcularNeto();
        }
        $scope.guardarProducto=function(productos){
            console.log("guardar productos")
            $scope.loadSaveProd=true;
            guardarProducto(productos);
        }


    }

}());