const Server =require('./server');

const server = new Server();

//cuando se ejecuta una vez y se llena la BD se debe de comentar para evitar conflictos sobre todo si se corre sin intenet 
//no tumba nada pero es redundante ejecutarlo cada rato 

//server.seeder();

server.start();


