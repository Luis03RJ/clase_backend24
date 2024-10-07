

const express= require('express');

const app = express();

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

//Get obtener informacion 
app.get("/usuarios", (req, res) => {
    res.status(200).send({usuarios});
});

//para el cliente es 1 para el servidor es 0 
app.get("/usuarios/:id",(req,res)=> {
   // res.status(200).send(usuarios[usuarios.find]);
   const {id} =req.params;
   const usuario = usuarios.find((usuario)=> usuario.id== +id); 
  
   res.status(200).send(usuario);
});
//cambiamos el 0 a usuarios.find 




app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
