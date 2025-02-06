(function(){
    'use strict';

    angular
        .module('homeModule.aviso', [])
        .controller('AvisoCtrl', ['$scope', '$rootScope', '$state', '$stateParams', AvisoCtrl])

    /** @ngInject */
    function AvisoCtrl($scope, $rootScope, $state, $stateParams){
        $rootScope.$emit('hide/home/', { estado: true })
        console.log('abrir el control de ver el aviso')
        console.log($stateParams);
        $scope.aviso=$stateParams.info;
        $scope.showImage = function (file) {
            const modalElement = document.getElementById('lightboxModalAviso');
            const modal = new bootstrap.Modal(modalElement);
            const imagen = document.getElementById('galeria_light');
            imagen.src = file; 
            modal.show();
        };
    }

}());