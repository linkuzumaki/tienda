angular.module('miApp')


    .config(function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false); // Deshabilita la información de depuración
    })
    .config(function ($locationProvider) {
        $locationProvider.hashPrefix(""); // Elimina el prefijo de hash (#)
    })
    .run(['$rootScope', '$state', function($rootScope, $state) {
        moment.locale("es"); // Configuración de localización
        $rootScope.$state = $state;
    }])
    .config(['$httpProvider', function ($httpProvider) {
        console.log("cargando $httpProvider")
        // Configuración de CORS para permitir peticiones cross-origin
        // $httpProvider.defaults.withCredentials = true;
        // $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.interceptors.push('authInterceptor'); // Interceptor para manejar la autenticación en cada petición
    }])
    // Configuración de transiciones
    .run(['$transitions', function ($transitions) {
        $transitions.onStart({ to: 'app.productos' }, function() {
            return $state.target('app.productos.listado'); // Redirige a 'listado' cuando entra a 'productos'
        });

    }])
    .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true
        });
    }]);
    
