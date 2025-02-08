
import { Productos } from "../modelos/model_productos.js";
export default function(app){
    // lista de productos
    const  listaProductos = async (req, res)=>{
        const productos = await Productos.find();
        res.json(productos);
    }
    // obtener producto por ID
    const  obtenerProductoPorID = async (req, res)=>{
        const producto = await Productos.findById(req.params.id);
        res.json(producto);
    }
    // crear un producto
    const  crearProducto = async (req, res)=>{
        console.log("producto neuvo a guardar")
        console.log(req.body)
        const nuevoProducto = new Productos(req.body);
        await nuevoProducto.save();
        res.json({ mensaje: 'Producto creado', producto: nuevoProducto });
    }
    // actualizar un producto por ID
    const  actualizarProducto = async (req, res)=>{
        let id=req.params.id;
        let datos=req.body;
        const productoActualizado = await Productos.findByIdAndUpdate(req.params.id,datos, { new: true });
        res.json({ mensaje: 'Producto actualizado', producto: productoActualizado });
    }
    // eliminar un producto por ID
    const  eliminarProducto = async (req, res)=>{
        let id = req.params.id;
        await Productos.findByIdAndDelete(id);
        res.json({ mensaje: 'Producto eliminado' });
    }
    
    app.get('/productos/',listaProductos);
    app.get('/productos/:id', obtenerProductoPorID);
    app.post('/guardar/producto/', crearProducto);
    app.put('/actualizar/producto/:id', actualizarProducto);
    app.delete('/eliminar/producto/:id', eliminarProducto);
}