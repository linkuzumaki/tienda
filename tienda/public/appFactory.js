
'use strict';

angular
  .module('miApp')
  .factory('appFactory', appfactory)

/** @ngInject */
function appfactory($rootScope, $state, $q) {
  let dato = {
      mensaje: function (mensaje, estado, tipo, title) {
          // Función auxiliar para mostrar mensajes con SweetAlert
          const mostrarMensaje = (icono, titulo, texto) => {
              swal.fire({ icon: icono, title: titulo, text: texto });
          };

          // Configuración de los mensajes según tipo y estado
          const acciones = {
              toast: {
                  0: () => { /* Acción para toast estado 0 */ },
                  1: () => { /* Acción para toast estado 1 */ },
                  2: () => { /* Acción para toast estado 2 */ }
              },
              normal: {
                  0: () => mostrarMensaje('error', `Error en: ${title}`, mensaje),
                  1: () => mostrarMensaje('warning', `Problema en: ${title}`, mensaje),
                  2: () => mostrarMensaje('success', title, mensaje)
              },
              return: {
                  0: () => { /* Acción para return estado 0 */ },
                  1: () => { /* Acción para return estado 1 */ },
                  2: () => { /* Acción para return estado 2 */ }
              }
          };

          // Ejecutar la acción si existe
          acciones[tipo]?.[estado]?.();
      }
  };
  return dato;
}

