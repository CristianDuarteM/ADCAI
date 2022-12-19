const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Usuario_rol = db.define("usuario_rol", {
    id_usuario:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Usuario",
            key: "id"
        }
    },
    id_rol:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Rol",
            key: "id"
        }
    }
});

module.exports = Usuario_rol;