
'use strict';

angular
  .module('miApp')
  .factory('appFactory', appFactory);

/** @ngInject */
function appFactory($rootScope, $state, $q) {
  let dato = {
      mensaje: function (mensaje, estado, tipo, title) {
          // Función auxiliar para mostrar mensajes con SweetAlert
          const mostrarMensaje = (icono, titulo, texto) => {
              swal.fire({ icon: icono, title: titulo, text: texto });
          };

          const mensajeReturn = (icono, titulo) => {
            return Swal.fire({
                title: titulo,
                icon: icono,
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
            });
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
              confirm: {
                  3: () => { 
                      return mensajeReturn('info', title);
                  }
              }
          };

          // Ejecutar la acción si existe
          if (tipo === 'confirm' && estado === 3) {
              return acciones[tipo][estado]();
          }

          acciones[tipo]?.[estado]?.();
      }
  };
  return dato;
}

