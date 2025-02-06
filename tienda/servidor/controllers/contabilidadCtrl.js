
import { Contabilidad } from "../modelos/model_contabilidad.js";
import{calcularNeto} from "../modulos/calcular.js";
import dotenv from "dotenv";
dotenv.config();
export default function (app) {
    // Lista de registros de contabilidad
    const listaContabilidad = async (req, res) => {
        const registros = await Contabilidad.find().populate('idventa');
        res.json(registros);
    }

    // Obtener un registro de contabilidad por ID
    const obtenerContabilidadPorID = async (req, res) => {
        const registro = await Contabilidad.findById(req.params.id).populate('idventa');
        res.json(registro);
    }

    // Crear un registro de contabilidad
    const crearContabilidad = async (req, res) => {
        const nuevoRegistro = new Contabilidad(req.body);
        await nuevoRegistro.save();
        res.json({ mensaje: 'Registro de contabilidad creado', registro: nuevoRegistro });
    }

    // Actualizar un registro de contabilidad por ID
    const actualizarContabilidad = async (req, res) => {
        const registroActualizado = await Contabilidad.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('idventa');
        res.json({ mensaje: 'Registro de contabilidad actualizado', registro: registroActualizado });
    }

    // Eliminar un registro de contabilidad por ID
    const eliminarContabilidad = async (req, res) => {
        await Contabilidad.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Registro de contabilidad eliminado' });
    }

    // obtener valores por defecto
    const getValores= async (req, res) => {
        res.json({iva:process.env.IVA,ganancia:process.env.GANANCIA})
    }
    // calcular neto
    const calcularPrecioNeto= (req, res) => {
        const datos = req.body;
        let valores = calcularNeto(datos) 
        res.json(valores)
    }


    app.get('/contabilidad/', listaContabilidad);
    app.get('/contabilidad/:id', obtenerContabilidadPorID);
    app.post('/contabilidad/', crearContabilidad);
    app.put('/contabilidad/:id', actualizarContabilidad);
    app.delete('/contabilidad/:id', eliminarContabilidad);
    app.get('/obtener/valores/', getValores);
    app.post('/calcular/neto/',calcularPrecioNeto)
}