angular.module("productoModule", [
  {
    name: "productoModule.producto",
    files: ["modules/productos/controllers/productosController.js"],
  },
  {
    name: "productoModule.crearProducto",
    files: ["modules/productos/controllers/crearProductoController.js"],
  },
  {
    name: "productoModule.listaProducto",
    files: ["modules/productos/controllers/listaProductoController.js"],
  },
  {
    name: "productoModule.productoService",
    files: ["modules/productos/services/productosService.js"],
  },
  {
    name: "productoModule.calculoFactory",
    files: ["modules/productos/factory/calculosFactory.js"],
  },
  {
    files: ["appFactory.js"],
  },
]);
