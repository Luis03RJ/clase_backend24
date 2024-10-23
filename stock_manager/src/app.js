// const express= require('express');

// const app =express();

// app.get('/', (req, res) => {
//     res.send("Hello wordl");
// });

// app.listen(3000, () => {
//     console.log('Example app listenining on port 3000');
// });


const {Server} =  require('./server');

const server = new Server();

server.start();
