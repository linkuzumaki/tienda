
angular.module('homeModule.home', [])
    .controller('HomeController', ['$scope', '$rootScope','$state',
        function ($scope, $rootScope,$state) {
            $scope.$emit('/pagina',$state.$current.name)

            $scope.message = "Bienvenido a la página de inicio.";
            console.log($scope.message);
            $scope.ventas =[]
            $scope.iniciar_venta=function(){
                $scope.ventas.push({fecha:moment(),productos:[]})
            }

        }]);
