(function(){
    'use strict';

    angular
        .module('homeModule.homeServise',[])
        .service('homedb', homeService)

    /** @ngInject */
    function homeService($q,$http,appFactory){
        this.listaAvisos = function () {
            let validar = appFactory.getValidador();
            var defered = $q.defer();
            var promise = defered.promise;
            var config = { headers: validar.head };
            $http.post('/lista/avisos/',{})
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (err) {
                    defered.reject(err);
                });
            return promise;
        };
    }

}());