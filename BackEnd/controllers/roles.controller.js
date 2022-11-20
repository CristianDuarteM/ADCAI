const {request, response} = require("express");
const Rol = require("../models/rol.model");

const listarRoles = async (req = request, res = response) => {
    try {
        const roles = await Rol.findAll();

        return res.json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarRol = async (req = request, res = response) => {
    const {nombre, descripcion = ""} = req.body;
    try {
        const existeRol = await Rol.findOne({
            where: {
                nombre
            }
        });
        if(existeRol){
            return res.status(400).json({
                msg: `El rol ${nombre} ya se encuentra registrado`
            });
        }
        const rol = await Rol.create({
            nombre,
            descripcion
        });
        res.status(201).json({
            msg: `Rol creado con exito`,
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
        if(!rol){
            return res.status(400).json({
                msg: `No existe rol`
            });;
        }
        await rol.update(req.body)
        return res.json({
            msg: `Actualizado con exito`,
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
        if(!rol){
            return res.status(400).json({
                msg: `No existe rol con ese id`
            });
        }
        await rol.destroy();
        res.json({
            msg: `Rol eliminado con exito`,
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
};