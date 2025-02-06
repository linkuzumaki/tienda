
import http from 'http';
import fs from 'fs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();



const app = express();
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3080 ;
// Variables globales
const __file = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__file);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para interpretar JSON en el body
app.use(express.json()); // ¡IMPORTANTE! Sin esto, req.body será undefined
// Configuración de HTTPS con los archivos generados
const options = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem')
};
// cargamos los controladores
import contabilidadCtrl from './controllers/contabilidadCtrl.js';
import productosCtrl from './controllers/productosCtrl.js';
// Crear el servidor HTTPS correctamente
//const server = https.createServer(options, app);
const server = http.createServer(app);
// creamos los controladores
contabilidadCtrl(app)
productosCtrl(app)

// Escuchar en el puerto especificado
await mongoose.connect(uri);
server.listen(port, async () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

