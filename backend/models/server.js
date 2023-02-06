const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const db = require("../db/conexion");


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.appPaths = {
            actividades_administracion: "/api/actividadesAdministracion",
            actividades_extension: "/api/actividadesExtension",
            actividades_investigacion: "/api/actividadesInvestigacion",
            actividades_otras: "/api/otrasActividades",
            asignaturas: "/api/asignaturas",
            auth: "/api/auth",
            cai: "/api/cai",
            departamentos: "/api/departamentos",
            //estados: "/api/estados",
            evidencias: "/api/evidencias",
            facultades: "/api/facultades",
            firmas: "/api/firmas",
            notas: "/api/notas",
            notificaciones: "/api/notificaciones",
            periodos:  "/api/periodos",
            plan_estudios: "/api/plan_estudios",
            representaciones: "/api/representaciones",
            //roles: "/api/roles",
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
            throw new Error(error);
        }
    }

    middlewares(){
        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static("public"));
        this.app.use('/pdfs', express.static("uploads"));

        //FileUpload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.appPaths.actividades_administracion, require("../routes/actividades_administracion.routes"));
        this.app.use(this.appPaths.actividades_extension, require("../routes/actividades_extension.routes"));
        this.app.use(this.appPaths.actividades_investigacion, require("../routes/actividades_investigacion.routes"));
        this.app.use(this.appPaths.actividades_otras, require("../routes/actividades_otras.routes"));
        this.app.use(this.appPaths.asignaturas, require("../routes/asignaturas.routes"));
        this.app.use(this.appPaths.auth, require("../routes/auth.routes"));
        this.app.use(this.appPaths.cai, require("../routes/cai.routes"));
        this.app.use(this.appPaths.departamentos, require("../routes/departamentos.routes"));
        //this.app.use(this.appPaths.estados, require("../routes/estados.routes"));
        this.app.use(this.appPaths.evidencias, require("../routes/evidencias.routes"));
        this.app.use(this.appPaths.facultades, require("../routes/facultades.routes"));
        this.app.use(this.appPaths.firmas, require("../routes/firmas.routes"));
        this.app.use(this.appPaths.notas, require("../routes/notas.routes")),
        this.app.use(this.appPaths.notificaciones, require("../routes/notificaciones.routes"));
        this.app.use(this.appPaths.periodos, require("../routes/periodos.routes"));
        this.app.use(this.appPaths.plan_estudios, require("../routes/plan_estudios.routes"));
        this.app.use(this.appPaths.representaciones, require("../routes/representaciones.routes"));
        //this.app.use(this.appPaths.roles, require("../routes/roles.routes"));
        this.app.use(this.appPaths.usuarios, require("../routes/usuarios.routes"));
    }

    escuchar(){
        this.app.listen(this.port, () => {
            console.log("Servidor en linea - puerto: ", this.port);
        });
    }
}

module.exports = Server;