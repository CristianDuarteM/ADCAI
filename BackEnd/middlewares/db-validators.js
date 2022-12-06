const { Departamento, Rol, Periodo } = require("../models");

const existeDepartamento = async (id_departamento) => {
    const existeDepartamento = await Departamento.findByPk(id_departamento);
    if(!existeDepartamento){
        throw new Error("No existe departamento con ese id");
    }
};

const noExisteRol = async (rol="") => {
    const existeRol = await Rol.findOne({
        where: {
            nombre: rol
        }
    });
    if(!existeRol){
        throw new Error(`No existe rol con ese nombre ${rol}`);
    }
};

const existeRol = async (rol="") => {
    const existeRol = await Rol.findOne({
        where: {
            nombre: rol
        }
    });
    if(existeRol){
        throw new Error(`Existe rol con ese nombre ${rol}`);
    }
};

const noExistePeriodo = async (periodo) => {
    const existePeriodo = await Periodo.findByPk(periodo);
    if(!existePeriodo){
        throw new Error("No existe periodo con ese id");
    }
};

module.exports = {
    existeDepartamento,
    noExisteRol,
    existeRol,
    noExistePeriodo
}