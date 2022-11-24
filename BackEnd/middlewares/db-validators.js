const { Departamento, Rol } = require("../models");

const existeDepartamento = async (id_departamento) => {
    const existeDepartamento = await Departamento.findByPk(id_departamento);
    if(!existeDepartamento){
        throw new Error("No existe departamento con ese id");
    }
};

const existeRol = async (rol="") => {
    const existeRol = await Rol.findOne({
        where: {
            nombre: rol
        }
    });
    if(!existeRol){
        throw new Error(`No existe rol con ese nombre ${rol}`);
    }
};

module.exports = {
    existeDepartamento,
    existeRol
}