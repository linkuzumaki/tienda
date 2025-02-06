import mongoose from "mongoose";
const schema = mongoose.Schema;
let producto = new schema({
    fecha:{type:Date},
    codigo:{type:String, required:true},
    nombre:{type:String,required:true},
    marca:{type:String},
    categoria:{type:String},
    descripcion:{type:String},
    cantidad:{type:Number,required:true},
    ganancia:{type:Number},
    tipoVenta:{type:String,required:true},
    precio_bruto:{type:Number,required:true},
    precio_neto:{type:Number, required:true},
    precio_neto_des:{type:Number,default:0},
    descuento_estado:{type:Boolean,default:false},
    descuento:{type:Number,default:0},
    precio_descuento:{type:Number,default:0},
    duracion_descuento:{type:String},
    fechaI:{type:Date},
    fechaF:{type:Date},
    precio_iva: {type:Number,default:0},
    precio_iva_des: {type:Number,default:0},
    precio_ganancia_des: {type:Number,default:0},
    precio_ganancia: {type:Number,default:0},
})
let Productos = mongoose.model('Productos',producto);
export { Productos }