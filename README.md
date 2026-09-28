Aqui estamos realizando el primer practico donde ponemos a prueba la creacion y ejecucion de un servidor, donde usamos de prueba un arraid que tiene de objetos instrumentos.

Clonar el repositorio e instalar las dependencias:

npm install

la ejecucion del programa es con "npm start" en los scrips esta configurado para que sea asi

El servidor queda escuchando en `http://localhost:3000`.
El servidor se detiene con Ctrol + C

GET `/` Mensaje de bienvenida de la API
GET `/api/instrumentos` Lista todos los instrumentos
GET `/api/instrumentos?familia=viento` Filtra por familia (sin distinguir mayúsculas)
GET `/api/instrumentos/:id` Detalle de un instrumento por id
POST `/api/instrumentos` Crea un instrumento en memoria

El cuerpo del POST es
{
  "nombre": "Saxofón alto",
  "familia": "viento",
  "origen": "Bélgica",
  "descripcion": "Instrumento de viento con lengüeta simple.",
  "disponible": false
}


La funcion de "express.json" Es un middleware de Express que interpreta el cuerpo de las solicitudes cuyo encabezado Content-Type sea application/json y lo deja disponible en
req.body. Sin este middleware, req.body sería undefined en el POST.








