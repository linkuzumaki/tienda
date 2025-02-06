import { Ventas } from "../modelos/model_venta";
export default function(app){
    //  lista de ventas
    const listaVentas = async (req,res)=>{
        const ventas = await Ventas.find().populate('Productos');
        res.json(ventas);
    }
    // venta por id
    const ventaId = async (req, res)=>{
        const venta = await Ventas.findById(req.params.id).populate('Productos');
        res.json(venta);
    }
    // crear ventas
    const crearVenta = async (req, res)=>{
        const nuevaVenta = new Ventas(req.body);
        await nuevaVenta.save();
        res.json({ mensaje: 'Venta creada', venta: nuevaVenta });
    }
    // actualizar ventas
    const actualizarVenta = async (req, res)=>{
        const ventaActualizada = await Ventas.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('Productos');
        res.json({ mensaje: 'Venta actualizada', venta: ventaActualizada });
    }
    // eliminar ventas
    const eliminarVenta = async (req, res)=>{
        await Ventas.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Venta eliminada' });
    }
    app.get('/ventas/',listaVentas)
    app.get('/ventas/:id', ventaId)
    app.post('/ventas/', crearVenta)
    app.put('/ventas/:id', actualizarVenta)
    app.delete('/ventas/:id', eliminarVenta)
}