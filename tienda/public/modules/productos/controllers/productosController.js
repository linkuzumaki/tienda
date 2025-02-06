(function () {
    'use strict';

    angular
        .module('productoModule.producto',[])
        .controller('ProductosController', productosController)

    productosController.$inject = ['$scope','$state'];

    function productosController($scope,$state) {
        $scope.$emit('/pagina',$state.$current.name)
        console.log("ProductosController")

    }

}());