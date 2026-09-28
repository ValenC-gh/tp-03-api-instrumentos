const fs = require("node:fs/promises");

async function leerArchivo(ruta) {
  try {
    const contenido = await fs.readFile(ruta, "utf-8");
    const datos = JSON.parse(contenido);
    return datos;
  } catch (error) {console.error("Error al leer el archivo:", error);}
}

module.exports = { leerArchivo };