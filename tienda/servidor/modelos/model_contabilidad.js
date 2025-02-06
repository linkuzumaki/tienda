import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema; 
const ContabilidadSchema = new schema({
    fecha: { type: Date, required: true },
    idventa: { type: mongoose.Schema.Types.ObjectId, ref: 'Ventas', required: true },
    totalbruto: { type: Number, required: true, min: 0 },
    iva: { type: Number, required: true, min: 0 },
    totalSinIVA: { type: Number, required: true, min: 0 },
    ganancia: { type: Number, required: true, min: 0 },
    totalFinal: { type: Number, required: true, min: 0 }
}); 
let Contabilidad= mongoose.model('Contabilidad',ContabilidadSchema);
export { Contabilidad }