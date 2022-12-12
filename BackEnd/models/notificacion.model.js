const { DataTypes } = require("sequelize");
const db = require("../db/conexion");
const Usuario = require("./usuario.model");

const Notificacion = db.define("notificacion", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: "id"
        }
    },
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_lectura: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    leido: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
});

module.exports = Notificacion;