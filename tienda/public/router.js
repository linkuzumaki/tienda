

angular.module('miApp', ['ui.router', 'oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // Ruta por defecto
        $urlRouterProvider.otherwise('/home');

        // Configuración de estados


        // Función para cargar módulos
        function loadModule(modulePath) {
            return ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(modulePath);
            }];
        }

        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: "theme/content.html",
                controller: "MainController",
                resolve: {
                    load: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ['./assets/js/app.js']
                        });
                    }],
                }
            })
            .state('app.home', {
                url: '/home',
                templateUrl: 'modules/home/home.html',
                controller: 'HomeController',
                data: { pageTitle: "Inicio" }, 
                resolve: {
                    load: loadModule('modules/home/home.module.js'),
                    
                }
            })
            .state('app.productos', {
                url: '/productos',
                templateUrl: 'modules/productos/productos.html',
                controller: 'ProductosController',
                abstract: true,  // Hace que este estado solo sirva como contenedor
                data: { pageTitle: "Productos" },
                resolve: {
                    load: loadModule('modules/productos/productos.module.js'),
                }
            })
            .state('app.productos.listado', {
                url: '/listado',
                templateUrl: 'modules/productos/views/listado.html',
                controller: 'ListaProductoController',
                data: { pageTitle: "Lista de Productos" }
            })
            .state('app.productos.crear', {
                url: '/crear',
                templateUrl: 'modules/productos/views/crearProducto.html',
                controller: 'CrearProductoController',
                data: { pageTitle: "Crear Producto" }
            })
            // Redirigir automáticamente a 'listado' cuando el usuario ingresa a 'productos'
        $urlRouterProvider.when('/productos', '/productos/listado');
    }]);
