
async function venta(lista){
    // Calcular el total bruto
    const totalBruto = lista.reduce((total, item) => total + item.MontoItem, 0);
    // Calcular IVA (19%)
    const iva = totalBruto * 0.19;
    
    // Total sin IVA
    const totalSinIVA = totalBruto - iva;
    
    // Calcular ganancia (30% del total sin IVA)
    const gananciaPorcentaje = 0.30;
    const ganancia = totalSinIVA * gananciaPorcentaje;
    
    // Total final después de restar la ganancia
    const totalFinal = totalSinIVA - ganancia;
    return {totalbruto: totalBruto, ganancia: ganancia,iva:iva,totalSinIVA:totalSinIVA,totalFinal:totalFinal}    
}
async function cerrar_caja(lista){
    /*let lista =[
        {totalbruto: 5000, ganancia: 1215,iva:950,totalSinIVA:4050,totalFinal:2835},
        {totalbruto: 10000, ganancia:2430 ,iva:1900,totalSinIVA:8100,totalFinal:5670}
    ]*/
    const sumaTotales = lista.reduce((acc, item) => {
        acc.totalbruto += item.totalbruto;
        acc.ganancia += item.ganancia;
        acc.iva += item.iva;
        acc.totalSinIVA += item.totalSinIVA;
        acc.totalFinal += item.totalFinal;
        return acc;
    }, { totalbruto: 0, ganancia: 0, iva: 0, totalSinIVA: 0, totalFinal: 0 });

    return sumaTotales;
    
}
let contabilidad = {
    venta: venta,
    cerrar_caja: cerrar_caja
}
export { contabilidad }