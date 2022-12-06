const express = require("express");
const cors = require("cors");
const db = require("../db/conexion");

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.appPaths = {
            auth: "/api/auth",
            departamentos: "/api/departamentos",
            facultades: "/api/facultades",
            firmas: "/api/firmas",
            periodo:  "/api/periodo",
            roles: "/api/roles",
            usuarios: "/api/usuarios",
        };

        //Conectar con la base de datos
        this.conexionDB();

        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    async conexionDB() {
        try {
            await db.authenticate();
            console.log("Base de datos en linea");
        } catch (error) {
            throw new Error();
        }
    }

    middlewares(){
        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static("public"));
    }

    routes(){
        this.app.use(this.appPaths.auth, require("../routes/auth.routes"));
        this.app.use(this.appPaths.departamentos, require("../routes/departamento.routes"));
        this.app.use(this.appPaths.facultades, require("../routes/facultades.routes"));
        this.app.use(this.appPaths.firmas, require("../routes/firmas.routes"));
        this.app.use(this.appPaths.periodo, require("../routes/periodo.routes"));
        this.app.use(this.appPaths.roles, require("../routes/roles.routes"));
        this.app.use(this.appPaths.usuarios, require("../routes/usuarios.routes"));
    }

    escuchar(){
        this.app.listen(this.port, () => {
            console.log("Servidor en linea - puerto: ", this.port);
        });
    }
}

module.exports = Server;