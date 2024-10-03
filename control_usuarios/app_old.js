

const express= require('express');

const app = express();
//Get obtener informacion 
app.get("/", (req, res) => {
    res.status(200).send("Hola mundo!!!");
});

app.get("/prueba", (req, res) => {
    res.status(200).send("Hola mundo!!!");
});



//POST crear/acceder a un nuevo recuro
app.post("/", (req, res) => {
    res.status(200).send("Hola desde POST!!!");
});
//put es otro metodo de envio de datos
//PUT actualizar un recurso
app.put("/", (req, res) => {
    res.status(200).send("Hola desde PUT!!!");
});

//PATCH actualizar recurso parcialmente
app.patch("/", (req, res) => {
    res.status(200).send("Hola desde PACHT!!!");
});

//Delete elimina un recurso 
app.delete("/", (req, res) => {
    res.status(200).send("Hola desde Deline!!!");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});


