import dotenv from "dotenv";
dotenv.config();

const GANANCIA_DEFAULT = parseFloat(process.env.GANANCIA) || 0;
const IVA_DEFAULT = parseFloat(process.env.IVA) || 0;

/**
 * Calcula la ganancia de un precio según un porcentaje dado.
 * Si el porcentaje es 0, usa el valor por defecto del entorno.
 */
function obtenerGanancia(precio, porcentaje) {
    const gananciaPorcentaje = porcentaje > 0 ? porcentaje : GANANCIA_DEFAULT;
    const ganancia = precio * (gananciaPorcentaje / 100);
    return { ganancia, precioFinal: precio + ganancia };
}

/**
 * Calcula el IVA de un precio según el porcentaje definido en el entorno.
 */
function calcularIVA(precio) {
    const iva = precio * (IVA_DEFAULT / 100);
    return { iva, precioFinal: precio + iva };
}

/**
 * Aplica un descuento a un precio según un porcentaje dado.
 */
function calcularDescuento(precio, porcentaje) {
    const descuento = (precio * porcentaje) / 100;
    return { descuento, precioFinal: precio - descuento };
}

/**
 * Calcula el precio neto con o sin descuento, aplicando ganancia e IVA correctamente.
 */
function calcularNeto(datos) {
    console.log("Datos recibidos para cálculo:", datos);
    let precioBase = datos.precio_bruto;
    let descuento = 0;
    let ganancia = GANANCIA_DEFAULT;
    let final =true;
    let mayorista = false;
    // precio a empresas
    if(mayorista){
        if(datos.descuento_estado){
            //con descuento
            let resultadoDescuento = calcularDescuento(datos.precio_bruto, datos.descuento);
            let resultado_ganancia = obtenerGanancia(resultadoDescuento.precioFinal,datos.ganancia);
            let resultadoIVAdes = calcularIVA(resultado_ganancia.precioFinal);
            // sin descuento
            let resultado_ganancia_nodes = obtenerGanancia(datos.precio_bruto,datos.ganancia);
            let resultadoIVA = calcularIVA(resultado_ganancia_nodes.precioFinal);
            
            let dato = {
                neto: resultadoIVA.precioFinal,  // Precio final con descuento + ganancia + IVA
                neto_des:resultadoIVAdes.precioFinal,
                ganancia: resultado_ganancia_nodes.ganancia,  // Ganancia sobre el precio con descuento
                ganacia_des:resultado_ganancia.ganancia,
                iva: resultadoIVA.iva,  // IVA calculado sobre el precio con descuento y ganancia
                iva_des:resultadoIVAdes.iva,
                descuento :resultadoDescuento.descuento,
            };
            return dato;
        }else{
            let resultado_ganancia = obtenerGanancia(datos.precio_bruto,datos.ganancia);
            let resultadoIVA = calcularIVA(resultado_ganancia.precioFinal);
            return {
                neto: resultadoIVA.precioFinal,  // Precio final con descuento + ganancia + IVA
                ganancia: resultado_ganancia.ganancia,  // Ganancia sobre el precio con descuento
                iva: resultadoIVA.iva,  // IVA calculado sobre el precio con descuento y ganancia
                descuento,
            };

        }
    }
    // Precio final al cliente
    if(final){
       
        if(datos.descuento_estado){
            //con descuento
            let resultado_ganancia_des = obtenerGanancia(datos.precio_bruto,datos.ganancia);
            let resultadoIVA_des = calcularIVA(resultado_ganancia_des.precioFinal);
            let resultado_des= calcularDescuento(resultadoIVA_des.precioFinal, datos.descuento);
            // sin descuento
            let resultado_ganancia = obtenerGanancia(datos.precio_bruto,datos.ganancia);
            let resultadoIVA = calcularIVA(resultado_ganancia.precioFinal);

            let dato = {
                neto_des:resultado_des.precioFinal,
                ganacia_des:resultado_ganancia_des.ganancia,
                iva_des:resultadoIVA_des.iva,
                descuento :resultado_des.descuento,
                neto: resultadoIVA.precioFinal,  // Precio final 
                ganancia: resultado_ganancia.ganancia,  // Ganancia 
                iva: resultadoIVA.iva,  // IVA
            };
            if(datos.ganancia == 0){
                dato.procentajeGanacia=ganancia;
            }
            return dato;
        }else{
            let resultado_ganancia = obtenerGanancia(datos.precio_bruto,datos.ganancia);
            let resultadoIVA = calcularIVA(resultado_ganancia.precioFinal);
            let dato = {
                neto: resultadoIVA.precioFinal,  // Precio final con descuento + ganancia + IVA
                ganancia: resultado_ganancia.ganancia,  // Ganancia sobre el precio con descuento
                iva: resultadoIVA.iva,  // IVA calculado sobre el precio con descuento y ganancia
                descuento,
            };
            if(datos.ganancia == 0){
                dato.procentajeGanacia=ganancia;
            }
            return dato;
        }
    }

    
}

export { calcularNeto };

