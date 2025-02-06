import { Caja } from "../modelos/model_caja";
export default function (app) {
     // Lista de cajas
    const listaCajas = async (req, res) => {
        const cajas = await Caja.find().populate('idconta');
        res.json(cajas);
    }
    
    // Obtener una caja por ID
    const obtenerCajaPorID = async (req, res) => {
        const caja = await Caja.findById(req.params.id).populate('idconta');
        res.json(caja);
    }
    
    // Crear una caja
    const crearCaja = async (req, res) => {
        for (let id of req.body.idconta) {
            const existeEnOtraCaja = await Caja.findOne({ idconta: id });
            if (existeEnOtraCaja) {
                return res.status(400).json({ mensaje: 'Un registro de contabilidad solo puede estar en un cierre de caja' });
            }
        }
        
        const nuevaCaja = new Caja(req.body);
        await nuevaCaja.save();
        res.json({ mensaje: 'Caja creada', caja: nuevaCaja });
        /*const nuevaCaja = new Caja(req.body);
        await nuevaCaja.save();
        res.json({ mensaje: 'Caja creada', caja: nuevaCaja });*/
    }
    
    // Actualizar una caja por ID
    const actualizarCaja = async (req, res) => {
        const cajaActualizada = await Caja.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('idconta');
        res.json({ mensaje: 'Caja actualizada', caja: cajaActualizada });
    }
    
    // Eliminar una caja por ID
    const eliminarCaja = async (req, res) => {
        await Caja.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Caja eliminada' });
    }
    
    app.get('/cajas/', listaCajas);
    app.get('/cajas/:id', obtenerCajaPorID);
    app.post('/cajas/', crearCaja);
    app.put('/cajas/:id', actualizarCaja);
    app.delete('/cajas/:id', eliminarCaja);
}