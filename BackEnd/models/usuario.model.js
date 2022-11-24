const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Usuario = db.define("Usuario", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    correo: {
        allowNull: false,
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: true
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    esTiempoCompleto: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    id_departamento: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Departamento",
            key: "id"
        }
    },
    id_firma: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    estaActivo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
});

module.exports = Usuario;