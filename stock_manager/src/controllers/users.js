const {request , response} =  require('express');
const pool = require('../db/conection');
const { userQueries } = require('../models/users');

// const users =  [
//     {id: 1, name: 'Jonh dohe'},
//     {id: 2, name: 'juan carlos'},
//     {id: 3, name: 'jose jose'},
// ];

const getAllUsers = async (req = request, res= response) => {

    let conn;
    try{
        conn=await pool.getConnection();
        const users = await conn.query(userQueries.getAll);
        res.send(users);
        //ORM Object Relational Model
        //Lo que hacen es manejar la logic de las consultas en el modelo, nosotros lo haremos con las queries
    } catch(error){
        res.status(500).send(error); //'Interna server error'
    return;
    } finally{
        if(conn) conn.end();
    }

}


const getUserById= async (req = request, res= response) => {
    const {id} = req.params;
    
    if(isNaN(id)){
        res.status(400).send("ID invalido");
        return;
    }

    let conn;
        try{
        conn= await pool.getConnection();
        const users = conn.query(userQueries.getById,[+id]);
        
        if(user.length === 0){
            res.status(404).send("user not found ");
            return;
        }
        res.send(user);

        } catch(error){
            res.status(500).send(error);
        } finally{
            if(conn) conn.end();

        }

}

//////////////////////////////////////TAREA
//TAREA

//Crear
const createUser= async(req= request, res = response) => {
    const {username,password,email} = req.body;

    if(!username || !password || !email){
        res.status(400).send("Bad request. Some fields are missing");
        return;
    }

    let conn;
    try{
        conn= await pool.getConnection();
        const user = await conn.query(userQueries.getByUsername,[username]);

        if(user.length > 0){
            res.status(409).send("user name yta esciste ");
            return;

        }

        const newUser = await conn.query(userQueries.create,[username,password,email]);


        if (newUser.affectedRows === 0){
            res.status(500).send("user no be created");
            return;
        }
        
       
        //console.log(newUser);
        res.status(201).send("User created succesfully");

    } catch(error){
        res.status(500).send(error);
        return;
    } finally{
        if (conn) conn.end();
    }


};

// Actualizar un usuario
const updateUser = (req = request, res = response) => {
    const {id} = req.params;
    const {name} = req.body;
  
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
  
    const user = users.find(user => user.id === +id);
  
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
  
    users.forEach(user=>{
      if(user.id===+id){
          user.name=name;
      }
  });
  res.send('user update succerfully');
  }



//Actualizar 
// const updateUser = (req = request, res= response) =>{


//     if(!user){
//         res.status(404).send("user not found ");
//         return;
//     }

//     users.forEach(user => {
//         if (user.id=== +id){
//             user.name=name;
//         }
//     });

//     res.send("usuario actucalizado ");

// }





//Eliminar
// const deleteUser =(req = request, res= response) =>{

//     if(!user){
//         res.status(404).send("user not found ");
//         return;
//     }

//     users.forEach(user => {
//         if (user.id=== +id){
//             user.name=name;
//         }
//     });

//     usuarios.splice(usuarios.findIndex((usuario) => usuario.id === +id), 1);//ESTE LO COPIE DE OTROI PROYECTO 

//     users.users.filter(user => user.id !== +id);
//     res.send("user borrado exitosamente");

// }


////

// Ruta para obtener un usuario por ID
// Eliminar un usuario
const deleteUser = (req = request, res = response) => {
    const { id } = req.params;
  
    if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
    }
  
    const index = users.findIndex((user) => user.id === +id);
    if (index === -1) {
      res.status(404).send('User not found');
      return;
    }
  
    users.splice(index, 1);
    res.status(204).send(); // 204 No Content indica éxito sin contenido adicional
  };





module.exports = { getAllUsers, getUserById,createUser,updateUser,deleteUser};

