// main.controller.js
angular.module('miApp')
    .controller('MainController', ['$scope', '$rootScope', '$state',
        function ($scope, $rootScope, $state) {
            // Configuración inicial
            console.log("main controller")
            $scope.$on('/pagina',(event,pag)=>{
                console.log(pag)
                $scope.verhome = (pag === 'app.productos.listado' || pag === 'app.productos.crear');
            })
    }]);
