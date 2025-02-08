(function(){
    'use strict';

    angular
        .module('productoModule.listaProducto',[])
        .controller('ListaProductoController', ListaProductoController)
        ListaProductoController.$inject = ['$scope','$rootScope','$state','productodb','calculosFactory','appFactory'];
    /** @ngInject */
    function ListaProductoController($scope,$rootScope,$state,productodb,calculosFactory,appFactory){
        $scope.listaProductos=[];
        let hoyStr =  moment().startOf('day').toDate();
        $scope.hoy = hoyStr;
        $scope.loadfecha=false;
        $scope.loadUpdateProd=false;
        $scope.prod_;
        $scope.productoTemporal ={};
      
        async function listasProductos(){
            try {
                let lista = await productodb.listaProducto();
                console.log(lista);
                setTimeout(function() {
                    console.log('Cargando productos...');
                    $scope.$apply(()=>{
                        $scope.listaProductos = lista;
                    });
                }, 1000);
            } catch (error) {
                $scope.listaProductos=[] 
            }
        };
        listasProductos();

        function calcularDuracion(producto) {
            let fechai = moment(producto.fechaI);
            let fechaf = producto.fechaF ? moment(producto.fechaF).endOf('day') : moment().endOf('day'); 
            // Convertir a formato legible
            let dur = moment.duration(fechaf.diff(fechai)).humanize();
            return dur;
        };
        async function actualizarProducto(productos) {
            let estado = calculosFactory.validarParaGuardar(productos);
            // Función auxiliar para restablecer el estado del producto con mensaje
            const resetProducto = (mensaje, estado,tipo, titulo) => {
                setTimeout(() => {
                    $scope.$apply(() => {
                        $scope.loadUpdateProd= false;
                        if (mensaje) {
                            appFactory.mensaje(mensaje, estado, tipo, titulo);
                        }
                    });
                }, 1000);
            };
            if (estado.valido) {
                try {
                    let resultado = await productodb.actualizarProducto(productos);
                    console.log(resultado);
                    if (resultado) {
                        resetProducto('Producto actualizado correctamente.', 2, 'normal', '¡ Actualización exitosa !');
                        // Si la actualización es exitosa, aplicamos los cambios al producto original
                        angular.copy($scope.productoTemporal, producto);
                        $scope.productoBackup = angular.copy($scope.productoTemporal); // Actualizar respaldo
                    }
                } catch (error) {
                    resetProducto(`Error al actualizar : ${error.message}`, 0, 'normal', 'Error de actualización');
                    angular.copy($scope.productoBackup, producto);
                    angular.copy($scope.productoBackup, $scope.productoTemporal);
                }
            } else {
                console.error("Los datos ingresados no son válidos");
                // Concatenar todos los mensajes de error en un solo string
                let mensajeErrores = estado.errores.map(item => `- ${item.mensaje}`).join('\n');
                // Enviar un único mensaje con todos los errores
                resetProducto(`Corrige los siguientes errores:\n${mensajeErrores}`, 1, 'normal', 'Errores de actualización');
                angular.copy($scope.productoBackup, producto);
                angular.copy($scope.productoBackup, $scope.productoTemporal);
            }
        };
        async function eliminarProducto(prod) {
            try {
                // Mostrar mensaje de confirmación
                const estado = await appFactory.mensaje('', 3, 'confirm', '¿Estás seguro de eliminar el producto?');
                if (estado.isConfirmed) {
                    // Intentar eliminar el producto
                    await productodb.eliminarProducto(prod._id);
                    // Actualizar la lista de productos
                    listasProductos();
                    // Mostrar mensaje de éxito
                    appFactory.mensaje("El producto ha sido eliminado correctamente.", 2, 'normal', "¡Eliminación exitosa!");
        
                } else {
                    // Mostrar mensaje de cancelación
                    appFactory.mensaje( "Operación cancelada por el usuario.",1, 'normal', "Eliminación no confirmada" );
                }
        
            } catch (error) {
                // Manejo de errores
                appFactory.mensaje(
                    "Lo sentimos, no se ha podido eliminar el producto. Intente nuevamente.",0, 'normal', "¡Problema al eliminar el producto!"
                );
            }
        }
        

        $scope.seleccionandoProd=function(prod){
            $scope.productoBackup = angular.copy(prod);  // Guardamos una copia antes de editar
            $scope.productoTemporal = angular.copy(prod); // Copia para edición

        }
        $scope.addfecha=function(prod){
            
            setTimeout(function() {
                $scope.$apply(()=>{
                    if( prod.fechaI){
                        prod.fechaI = moment(prod.fechaI).toDate();
                    }else{
                        prod.fechaI = moment().startOf('day').toDate();
                    }
                    if( prod.fechaF){
                        prod.fechaF = moment(prod.fechaF).toDate();
                    }else{
                        prod.fechaF = moment().endOf('day').toDate();
                    }
                    setTimeout(() => {
                        $scope.$apply(()=>{
                            $scope.loadfecha=true;
                        })
                    }, 2000);
                    
                })
            },1000)
        }
        $scope.calcular=async function(producto){
           console.log("actualizar calculos")
           let estado_validacion = calculosFactory.validarParaCalcular(producto);
            if(estado_validacion){
                try {
                    let resultados = await productodb.calcularNeto(producto);
                    console.log(resultados);
                    if(resultados){
                        setTimeout(function() {
                            $scope.$apply(()=>{
                                producto.ganacia =resultados.procentajeGanacia;
                                producto.precio_ganancia = resultados.ganancia;
                                producto.precio_neto = resultados.neto;
                                producto.precio_iva = resultados.iva;
                                producto.precio_descuento=resultados.descuento;
                                producto.precio_iva_des=resultados.iva_des;
                                producto.precio_neto_des=resultados.neto_des;
                                producto.precio_ganancia_des = resultados.ganacia_des;
                                producto.duracion_descuento =calcularDuracion(producto)
                            });
                        }, 1000);
                    }
                }catch{
                    console.log("error");
                }
            }
        }
        $scope.actualizarProd=async function(prod){
            console.log("actualizar prod")
            $scope.loadUpdateProd=true;
            actualizarProducto(prod)

        }
        $scope.cancelarEdicion = function() {
            if ($scope.productoBackup) {
                angular.copy($scope.productoBackup, $scope.productoTemporal);
            }
        };
        $scope.eliminar_prod=function(prod){
            eliminarProducto(prod)
        }

    }

}());