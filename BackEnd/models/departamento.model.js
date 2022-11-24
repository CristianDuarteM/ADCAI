const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Departamento = db.define("Departamento", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_facultad: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: "Facultad",
            key: "id"
        }
    },
    director: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: "Usuario",
            key: "id"
        }
    }
});

module.exports = Departamento;