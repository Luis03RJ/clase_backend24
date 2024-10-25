const {request , response} =  require('express');

const users =  [
    {id: 1, name: 'Jonh dohe'},
    {id: 2, name: 'juan carlos'},
    {id: 3, name: 'jose jose'},
]

const getAll = (req = request, res= response) => {
    res.send(users);
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


module.exports = { getAll, getById };
