const Rol = require("./rol.model");
const Usuario = require("./usuario.model");

Usuario.belongsToMany(Rol, {
    through: "usuario_rol",
    foreignKey: "id_usuario"
});

Rol.belongsToMany(Usuario, {
    through: "usuario_rol",
    foreignKey: "id_rol",
});

module.exports = {
    Rol,
    Usuario
}

