const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Retroalimentacion = db.define("retroalimentacion", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: "Usuario",
            key: "id"
        }
    },
    id_periodo_docente: {
        type: DataTypes.INTEGER,
        references: {
            model: "Periodo_docente",
            key: "id"
        }
    },
    docencia:{
        type: DataTypes.STRING
    },
    investigacion:{
        type: DataTypes.STRING
    },
    extension:{
        type: DataTypes.STRING
    },
    administracion:{
        type: DataTypes.STRING
    },
    representacion:{
        type: DataTypes.STRING
    },
    otras:{
        type: DataTypes.STRING
    },
    rol:{
        type: DataTypes.STRING
    }
});

module.exports = Retroalimentacion;