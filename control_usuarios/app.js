

const express= require('express');

const app = express();
//Get obtener informacion 
app.get("/usuarios", (req, res) => {

    const usuarios= [
        {
            id: 1,
            nombre:"juan",
            apellido:"perez",
            email:"juanperez@gmail.com",
        },
        {
            id: 2,
            nombre:"carlos",
            apellido:"perez",
            email:"juanperez@gmail.com",
        },

    ];
    res.status(200).send(usuarios);
});


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
