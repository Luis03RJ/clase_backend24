const {request , response} =  require('express');

// const users =  [
//     {id: 1, name: 'Jonh dohe'},
//     {id: 2, name: 'juan carlos'},
//     {id: 3, name: 'jose jose'},
// ];

const getAll = async (req = request, res= response) => {

    let conn;
    try{
        conn=await pool.getConnection();
        const users = await conn.query('SELECT * FROM users');

        res.send(users);
    } catch(error){
        res.status(500).send("Internal server error");
    return;
    } finally{
        if(conn) conn.end();


    }

}


















const getById= (req = request, res= response) => {
    const {id} = req.params;
    
    if(isNaN(id)){
        res.status(400).send("ID invalido");
        return;
    }

    const user = users.find(users => users.id === +id);    
                                //con + id comvetimos en id en numero ya que es cadena 
                                //=== valida igualdad y el mismo tipo 
    
                                
    if(!user){
        res.status(404).send("user not found ");
        return;
    }

    res.send(user);
}

//////////////////////////////////////TAREA
//TAREA

//Crear
const createUser= (req= request, res = response) => {
    const {name} = req.body;

    if(!name){
        res.status(400).send("Bad request. The name field is missing");
    }

    const user = users.find(users => users.name === name);

    if(user){
        res.status(409).send('user existe');
        return;

    }
    user.push({id: users.length + 1, name});
    res.send("user created exitosamente");
}


//Actualizar 
const updateUser = (req = request, res= response) =>{


    if(!user){
        res.status(404).send("user not found ");
        return;
    }

    users.forEach(user => {
        if (user.id=== +id){
            user.name=name;
        }
    });

    res.send("usuario actucalizado ");

}


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





module.exports = { getAll, getById,createUser,updateUser,deleteUser};

