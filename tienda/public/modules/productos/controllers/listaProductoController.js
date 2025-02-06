(function(){
    'use strict';

    angular
        .module('productoModule.listaProducto',[])
        .controller('ListaProductoController', ListaProductoController)
        ListaProductoController.$inject = ['$scope','$rootScope','$state','productodb'];
    /** @ngInject */
    function ListaProductoController($scope,$rootScope,$state,productodb){
        $scope.listaProductos=[];
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

        $scope.calcular=function(producto){
            $rootScope.procesarcalcularNeto(producto)
        }

    }

}());