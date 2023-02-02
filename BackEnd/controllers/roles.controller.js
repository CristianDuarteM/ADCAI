/*const {request, response} = require("express");
const {Rol} = require("../models");

const listarRoles = async (req = request, res = response) => {
    try {
        const roles = await Rol.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
        return res.json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarRol = async (req = request, res = response) => {
    try {
        let {nombre, descripcion = ""} = req.body;
        nombre = nombre.trim();
        if(nombre.length === 0){
            return res.status(404).json({
                msg: "El nombre no puede ser solo espacios en blanco"
            });
        }
        const rol = await Rol.create({
            nombre: nombre.toUpperCase(),
            descripcion
        });
        res.status(201).json({
            msg: `Rol creado con éxito`,
            rol
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const actualizarRol = async (req, res) => {
    const {id} = req.body;
    try {
        const rol = await Rol.findByPk(id);
        if(req.body.nombre){
            req.body.nombre = req.body.nombre.toUpperCase();
        }
        await rol.update(req.body)
        return res.json({
            msg: `Actualizado con éxito`,
            rol
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const eliminarRol = async (req, res) => {
    const {id} = req.params;
    try {
        const rol = await Rol.findByPk(id);
        await rol.destroy();
        res.json({
            msg: `Rol eliminado con éxito`,
            rol
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

module.exports = {
    listarRoles,
    registrarRol,
    actualizarRol,
    eliminarRol
};*/