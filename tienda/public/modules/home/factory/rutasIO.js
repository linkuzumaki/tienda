angular
    .module('homeModule.iofactory',[])
    .factory('iofactory',iofactory)
function iofactory(appFactory, $rootScope, AuthService) {
    console.log("RUTAS IO CARGADO")
    
    //notificaciones
    
    const info = {
        desconectar:(socket)=>{
            if (socket){
                socket.emit('/cerrar/seccion/')
            }
            
        },
    };
    return info;
}
