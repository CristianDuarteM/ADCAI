const Rol = require("./rol.model");
const Usuario = require("./usuario.model");
const Facultad = require("./facultad.model");
const Departamento = require("./departamento.model");
const Usuario_rol = require("./usuario_rol.model");
const Firma = require("./firma.model");
const Periodo = require("./periodo.model");
const Periodo_docente = require("./periodo_docente.model");
const Estado = require("./estado.model");
const Plan_estudio = require("./plan_estudio.model");
const Asignatura = require("./asignatura.model");

Usuario.belongsToMany(Rol, {
    through: "usuario_rol",
    foreignKey: "id_usuario"
});
Rol.belongsToMany(Usuario, {
    through: "usuario_rol",
    foreignKey: "id_rol",
});

Usuario.belongsToMany(Periodo, {
    through: "periodo_docente",
    foreignKey: "id_usuario"
});
Periodo.belongsToMany(Usuario, {
    through: "periodo_docente",
    foreignKey: "id_periodo",
});

Departamento.hasMany(Usuario, {
    foreignKey: "id_departamento"
});
Usuario.belongsTo(Departamento, {
    foreignKey: "id_departamento"
});

Facultad.hasMany(Departamento, {
    foreignKey: "id_facultad"
});
Departamento.belongsTo(Facultad, {
    foreignKey: "id_facultad"
});

Facultad.hasMany(Plan_estudio, {
    foreignKey: "id_facultad"
});
Plan_estudio.belongsTo(Facultad, {
    foreignKey: "id_facultad"
});

Firma.hasOne(Usuario, {
    foreignKey: "id_firma"
});
Usuario.belongsTo(Firma, {
    foreignKey: "id_firma"
});

Plan_estudio.hasMany(Asignatura, {
    foreignKey: "id_programa"
});
Asignatura.belongsTo(Plan_estudio, {
    foreignKey: "id_programa"
});

module.exports = {
    Rol,
    Usuario,
    Facultad,
    Departamento,
    Usuario_rol,
    Firma,
    Periodo,
    Periodo_docente,
    Estado,
    Plan_estudio,
    Asignatura
};

