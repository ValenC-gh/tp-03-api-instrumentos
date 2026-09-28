const express = require("express");
const path = require("node:path");
const { leerArchivo } = require("./archivos");

const PORT = 3000;
const rutaArchivo = path.join(__dirname,"..","datos","instrumentos.json");

async function main() {
    try {
        const datos = await leerArchivo(rutaArchivo);
        console.log("Datos leídos del archivo:", datos);

        const app = express();
        app.use(express.json());

//aqui agregamos la ruta para la pagina principal Bienvenida
        app.get("/", (req, res) => {
            res.json({"message": "Bienvenido a la API de instrumentos musicales"});
        });

//aqui agregamos la ruta para obtener todos los instrumentos
    //    app.get("/api/instrumentos", (req, res) => {
    //        res.json(datos);
    //   });

//aqui agregamos la ruta para mostrar los instrumentos y filtrarlos
        app.get("/api/instrumentos", (req, res) => {
            const { familia } = req.query;
            if (!familia) return res.json(datos);
            const instrumentosFiltrados = datos.filter(
            (instrumento) => instrumento.familia.toLowerCase() === String(familia).toLowerCase());
            res.json(instrumentosFiltrados);
        });

//aqui agregamos la ruta para obtener un instrumento por su id
        app.get("/api/instrumentos/:id", (req, res) => {    
            const id = Number(req.params.id);
            const instrumento = datos.find((instrumento) => instrumento.id === id);
            if (!instrumento) {
                return res.status(404).json({ error: "Instrumento no encontrado" });
            }
            res.json(instrumento);
        });

// Creación en memoria
        app.post("/api/instrumentos", (req, res) => {
            const { nombre, familia, origen, descripcion, disponible } = req.body;
            if (!nombre ||!familia ||!origen ||!descripcion ||disponible === undefined ) {
                return res.status(400).json({
                    error: "nombre, familia, origen, descripcion y disponible son obligatorios",
                });
            }

            const ultimoId = datos.length === 0 ? 0 : datos[datos.length - 1].id;
            const nuevoInstrumento = {
                id: ultimoId + 1,
                nombre,
                familia,
                origen,
                descripcion,
                disponible,
            };

            datos.push(nuevoInstrumento);
            res.status(201).json(nuevoInstrumento);
        });

//aqui dejamos escuchando al servidor siempre al final
        app.listen(PORT, () => {    
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error en la aplicación:", error);
        process.exitCode = 1;

    }
}   
main();