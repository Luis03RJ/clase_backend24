

const express= require('express');

const app=express();

app.use(express.json());

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
   //NaN no es un numero 

   //console.log(typeof(+id));
   if(isNaN(id)){

    res.status(400).send({error:
        "El id debe ser un numero"
    });
    return;
   }
  // console.log(isNaN(id));


   const usuario = usuarios.find((usuario)=> usuario.id=== +id); 

   if (usuario === undefined) {
    res.status(404).send({ error: `El usuario con id ${id} no existe` });
    return;
  }




  
   res.status(200).send(usuario);
});
//cambiamos el 0 a usuarios.find 

//
  //POST
 //POST
app.post("/usuarios", (req, res) =>{
    //console.log(red.body);
    const {nombre, apellido, email}=req.body;
        //llamar las cosas IGUAL para que no haya comflicto 
    usuarios.push({id: usuarios.length +1, nombre, apellido, email});

    res.status(201).send("El usuario se agrego correctamente");
  });



app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
