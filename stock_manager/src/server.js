const express = require ('express')

//const app = express();

class Server {
    constructor(){
        //this.app=app;
        this.app=express();
        this.port = 3000;
        this.app.use(express.json());
    }

    start(){
        this.app.listen(3000, () => {
            console.log('Server listening on port '+ this.port);
        });
        }

}


   
module.exports={Server};

