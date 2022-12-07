const express = require("express");
const cors = require("cors");
const db = require("../db/conexion");

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.appPaths = {
            asignaturas: "/api/asignaturas",
            auth: "/api/auth",
            cai: "/api/cai",
            departamentos: "/api/departamentos",
            estados: "/api/estados",
            facultades: "/api/facultades",
            firmas: "/api/firmas",
            periodos:  "/api/periodos",
            plan_estudios: "/api/plan_estudios",
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
        this.app.use(this.appPaths.asignaturas, require("../routes/asignaturas.routes"));
        this.app.use(this.appPaths.auth, require("../routes/auth.routes"));
        this.app.use(this.appPaths.cai, require("../routes/cai.routes"));
        this.app.use(this.appPaths.departamentos, require("../routes/departamentos.routes"));
        this.app.use(this.appPaths.estados, require("../routes/estados.routes"));
        this.app.use(this.appPaths.facultades, require("../routes/facultades.routes"));
        this.app.use(this.appPaths.firmas, require("../routes/firmas.routes"));
        this.app.use(this.appPaths.periodos, require("../routes/periodos.routes"));
        this.app.use(this.appPaths.plan_estudios, require("../routes/plan_estudios.routes"));
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