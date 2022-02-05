const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../databases/config");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios'

        //Conexion a la base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORs
        this.app.use(cors());

        //lectura y parseo del body

        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuarioPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('el servidor esta escuchando en el puerto', this.port);
        })
    }

}

module.exports = Server