(function () {
    'use strict';

    angular
        .module('productoModule.calculoFactory', [])
        .factory('calculosFactory', calculosFactory)


    function calculosFactory() {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        // Definir la estructura esperada del JSON
        const esquema = {
            "categoria": "string",
            "codigo": "string",
            "descripcion": "string",
            "descuento": "number",
            "descuento_estado": "boolean",
            "duracion_descuento": "number",
            "fechaI": "string", // Validaremos si es fecha válida
            "ganancia": "number",
            "marca": "string",
            "nombre": "string",
            "precio_bruto": "number",
            "precio_descuento": "number",
            "precio_ganancia": "number",
            "precio_iva": "number",
            "precio_iva_des": ["number", "null"], // Puede ser número o null
            "precio_neto": "number",
            "precio_neto_des": ["number", "null"]
        };
        function obtenerDuracionMs(duracionTexto) {
            let cantidadDias = parseInt(duracionTexto);
        
            // Manejo especial para textos como "un dia"
            if (isNaN(cantidadDias)) {
                if (duracionTexto.toLowerCase() === "un dia" || duracionTexto.toLowerCase() === "1 dia"  || duracionTexto.toLowerCase() === "un día") {
                    cantidadDias = 1;
                } else {
                    console.error(`❌ Error: Duración desconocida (${duracionTexto})`);
                    return 0;
                }
            }
        
            return moment.duration(cantidadDias, 'days').asMilliseconds();
        }
        let calculos = {
            validarParaCalcular: (datos) => {
                if (datos.precio_bruto == 0 || datos.precio_bruto == null || datos.precio_bruto == undefined) {
                    Toast.fire({
                        icon:"warning",
                        title:"Agrege un precio bruto",
                        text:"Precio bruto debe ser mayor a 0",
                        customClass: {
                            title: 'swal-text-color'  // Clases personalizadas
                        }
                    })
                    return false
                }
                if (datos.descuento_estado) {
                    if (datos.descuento == 0 || datos.descuento == null || datos.descuento == undefined) {
                        Toast.fire({
                            icon:"warning",
                            title:"Agrege un descuento",
                            text:"Agrege un porcentaje de descuento, debe ser mayor a 0",
                            customClass: {
                                title: 'swal-text-color'  // Clases personalizadas
                            }
                        })
                        return false
                    }
                }
                return true;
            },
            validarParaGuardar: function (producto) {
                const errores = [];
                const duracionMs = obtenerDuracionMs(producto.duracion_descuento)
                // Validaciones
                const validaciones = [
                    { campo: 'nombre', mensaje: 'El nombre del producto es obligatorio.', condicion: producto.nombre && producto.nombre.trim().length > 0 },
                    { campo: 'marca', mensaje: 'La marca del producto es obligatoria.', condicion: producto.marca && producto.marca.trim().length > 0 },
                    { campo: 'categoria', mensaje: 'La categoría del producto es obligatoria.', condicion: producto.categoria && producto.categoria.trim().length > 0 },
                    { campo: 'descripcion', mensaje: 'La descripción del producto es obligatoria.', condicion: producto.descripcion && producto.descripcion.trim().length > 0 },
                    { campo: 'codigo', mensaje: 'El código del producto es obligatorio y debe ser numérico.', condicion: producto.codigo && /^\d+$/.test(producto.codigo) },
                    { campo: 'precio_bruto', mensaje: 'El precio bruto debe ser mayor a 0.', condicion: producto.precio_bruto && producto.precio_bruto > 0 },
                    { campo: 'precio_iva', mensaje: 'El precio IVA debe ser mayor o igual a 0.', condicion: producto.precio_iva >= 0 },
                    { campo: 'precio_neto', mensaje: 'El precio neto debe ser la suma del precio bruto + ganacia + el IVA.', condicion: producto.precio_neto === (producto.precio_bruto + producto.precio_ganancia + producto.precio_iva) },
                    { campo: 'ganancia', mensaje: 'La ganancia no puede ser negativa.', condicion: producto.ganancia >= 0 },
                    { campo: 'duracion_descuento', mensaje: 'La duración del descuento debe ser positiva.', condicion: !producto.descuento_estado ||  duracionMs > 0 },
                    { campo: 'descuento', mensaje: 'El descuento debe ser entre 1 y 100 si está activo.', condicion: !producto.descuento_estado || (producto.descuento > 0 && producto.descuento <= 100) },

                    // Validaciones de descuento
                    {
                        campo: 'precio_descuento',
                        mensaje: 'El precio con descuento debe ser menor que el precio bruto si hay descuento.',
                        condicion: !producto.descuento_estado || (producto.precio_descuento > 0 && producto.precio_descuento < producto.precio_bruto)
                    },
                    {
                        campo: 'precio_iva_des',
                        mensaje: 'El precio IVA con descuento debe ser correcto.',
                        condicion: !producto.descuento_estado || (producto.precio_iva_des !== null && producto.precio_iva_des >= 0)
                    },
                    {
                        campo: 'precio_neto_des',
                        mensaje: 'El precio neto con descuento debe ser correcto.',
                        condicion: !producto.descuento_estado || (producto.precio_neto_des !== null && producto.precio_neto_des === (producto.precio_bruto - producto.precio_descuento  +producto.precio_ganancia_des + producto.precio_iva_des))
                    },

                    // Validaciones de fecha
                    {
                        campo: 'fechaI',
                        mensaje: 'La fecha de inicio debe ser válida.',
                        condicion: moment(producto.fechaI, moment.ISO_8601, true).isValid()
                    },
                    {
                        campo: 'fechaF',
                        mensaje: 'La fecha de fin debe ser válida si hay descuento.',
                        condicion: !producto.descuento_estado || moment(producto.fechaF, moment.ISO_8601, true).isValid()
                    },
                    {
                        campo: 'fechaF',
                        mensaje: 'La fecha de fin debe ser igual o posterior a la fecha de inicio.',
                        condicion: !producto.descuento_estado || moment(producto.fechaI).isSameOrBefore(moment(producto.fechaF))
                    }
                ];

                // Recorrer validaciones y recolectar errores
                validaciones.forEach(validacion => {
                    if (!validacion.condicion) {
                        errores.push({ campo: validacion.campo, mensaje: validacion.mensaje });
                    }
                });

                if (errores.length > 0) {
                    console.error("❌ Errores encontrados:", errores);
                    return { valido: false, errores };
                }

                console.log("✅ Producto válido");
                return { valido: true, errores: [] };

            }
        }
        return calculos;
    }

}());