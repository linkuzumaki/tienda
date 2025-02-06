import fs from 'fs';
import path from 'path'; // Para manejar rutas de archivos
import crypto from 'crypto';
import { SignedXml } from 'xml-crypto';
import { DOMParser } from 'xmldom'; // Corrección aquí
import { dirname } from 'path';   
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
// Variables globales
const __file = fileURLToPath(import.meta.url);
const __dirname = dirname(__file);
async function generarBoletaSII(Detalle) {
    const boleta = {
        Encabezado: {
            IdDoc: {
                TipoDTE: 39, // 39 es el código para boletas electrónicas
                Folio: 123456, // Número único de la boleta
                FchEmis: new Date().toISOString().slice(0, 10), // Fecha de emisión en formato AAAA-MM-DD
            },
            Emisor: {
                RUTEmisor: "12345678-9", // RUT de la empresa emisora
                RznSoc: "Mi Empresa S.A.", // Razón social del emisor
                GiroEmis: "Venta de productos", // Giro de la empresa
                Acteco: 123456, // Código de actividad económica
                DirOrigen: "Av. Principal 123, Santiago", // Dirección
                CmnaOrigen: "Santiago", // Comuna
            },
            Receptor: {
                RUTRecep: "11111111-1", // RUT del cliente
                RznSocRecep: "Juan Pérez", // Nombre del cliente
                DirRecep: "Calle Falsa 456", // Dirección del cliente
                CmnaRecep: "Providencia", // Comuna del cliente
            },
        },
        Detalle: Detalle,
        Totales: {
            MntTotal: Detalle.reduce((total, item) => total + item.MontoItem, 0), // Calcula el total dinámicamente
        },
    };

    // Generar el archivo JSON de la boleta
    try {
        // Crear la carpeta "boleta" si no existe
        const directorio = path.join(__dirname, "boleta");
        if (!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio);
        }
        // Generar el archivo JSON de la boleta dentro de la carpeta "boleta"
        let nombre_boleta = new mongoose.Types.ObjectId();
        const ruta_boleta = path.join(directorio, `${nombre_boleta}.json`);
        fs.writeFileSync(ruta_boleta, JSON.stringify(boleta, null, 2));
        console.log("Boleta generada con éxito y guardada en la carpeta boleta como boleta.json");
        // Firma del XML
        await firmarBoletaXML(boleta);
        let ruta = ruta_boleta.replace(/\\/g, "/");
        let list = ruta.split("C:/Users/linku/Desktop/tienda/")[1];
        return {'ruta':list, 'nombre':`${nombre_boleta}.json`}
    } catch (error) {
        console.error("Error al generar la boleta:", error);
    }
}

// Función para firmar la boleta electrónicamente (con XML firmado)
async function firmarBoletaXML(boleta) {
    try {
        const xml = `
            <Documento Id="DOC123">
                <Encabezado>
                    <IdDoc>
                        <TipoDTE>${boleta.Encabezado.IdDoc.TipoDTE}</TipoDTE>
                        <Folio>${boleta.Encabezado.IdDoc.Folio}</Folio>
                    </IdDoc>
                    <Emisor>
                        <RUTEmisor>${boleta.Encabezado.Emisor.RUTEmisor}</RUTEmisor>
                        <RznSoc>${boleta.Encabezado.Emisor.RznSoc}</RznSoc>
                    </Emisor>
                </Encabezado>
            </Documento>
        `;
        
        // Firmar el XML (requiere una clave privada configurada)
        const privateKey = fs.readFileSync("../cert/key.pem","utf8"); // Ruta de tu clave privada
        const doc = new DOMParser().parseFromString(xml);
        const signature = new sign.SignedXml();

        // Configurar el algoritmo de digest
        signature.addReference("/*", ["http://www.w3.org/2000/09/xmldsig#enveloped-signature"], "http://www.w3.org/2001/04/xmlenc#sha256");

        signature.signingKey = privateKey;
        signature.computeSignature(xml);

        const signedXML = signature.getSignedXml();
        const filePath = path.join(__dirname, "boleta", "boleta_firmada.xml");
        fs.writeFileSync(filePath, signedXML);
        console.log("Boleta firmada y guardada en la carpeta boleta como boleta_firmada.xml");
    } catch (error) {
        console.error("Error al firmar el XML:", error);
    }
}

const boletas={
    crear_boleta_sii : generarBoletaSII
}
export { boletas };
