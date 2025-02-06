import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;
const CajaSchema = new schema({
    fechaInicio: { type: Date, required: true },
    fechafinal: { type: Date },
    idconta: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contabilidad', required: true }],
    totalbruto: { type: Number, required: true, min: 0 },
    iva: { type: Number, required: true, min: 0 },
    totalSinIVA: { type: Number, required: true, min: 0 },
    ganancia: { type: Number, required: true, min: 0 },
    totalFinal: { type: Number, required: true, min: 0 }
}); 
let Caja= mongoose.model('Caja',CajaSchema);
export { Caja }