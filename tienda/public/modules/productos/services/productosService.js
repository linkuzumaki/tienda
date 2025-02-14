(function(){
    'use strict';

    angular
        .module('productoModule.productoService',[])
        .service('productodb', productodb)

    /** @ngInject */
    function productodb($q,$http){

        this.getValores = function () {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('/obtener/valores/')
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (err) {
                    defered.reject(err);
                });
            return promise;
        };
        this.calcularNeto=function(productos){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post('/calcular/neto/',productos)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (err) {
                    defered.reject(err);
                });
            return promise;
        }
        this.guardarProducto=function(productos){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post('/guardar/producto/', productos)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (err) {
                    defered.reject(err);
                });
            return promise;
        };
        this.listaProducto = function(){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('/productos/')
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (err) {
                    defered.reject(err);
                });
            return promise;
        };
        this.actualizarProducto =function(producto){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.put(`/actualizar/producto/${producto._id}`, producto)
                .then(function (response) {
                    defered.resolve(response.data);
                })
                .catch(function (err) {
                    defered.reject(err);
                });
            return promise;    
        };
        this.eliminarProducto=function(prodID){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.delete(`/eliminar/producto/${prodID}`)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (err) {
                    defered.reject(err);
                });
            return promise;
        }
    }

}());