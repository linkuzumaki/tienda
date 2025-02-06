import mongoose from "mongoose";
const schema = mongoose.Schema;
let venta = new schema({
    fecha:{type:Date, required:true,default:Date.now},
    cliente:{type:schema.Types.ObjectId, ref:'Cliente'},
    carro:[{
        idprod:{type:schema.Types.ObjectId, ref:'Productos'},
        cantidad:{type:Number, required:true},
        precio:{type:Number, required:true},
        subtotal:{type:Number, required:true}
    }],
    total:{type:Number, required:true,default:0}
})
let Ventas = mongoose.model('Ventas',venta);
export { Ventas }