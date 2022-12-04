const {request, response} = require("express");
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
    const {nombre, descripcion = ""} = req.body;
    if(req.usuario.Rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const rol = await Rol.create({
            nombre: nombre.toUpperCase(),
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
    if(req.usuario.Rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const rol = await Rol.findByPk(id);
        if(!rol){
            return res.status(400).json({
                msg: `No existe rol con ese id`
            });;
        }
        if(req.body.nombre){
            const existeRol = await Rol.findOne({
                where:{
                    nombre: req.body.nombre.toUpperCase()
                } 
            });
            if(existeRol){
                return res.status(400).json({
                    msg: `Ya existe un rol con ese nombre`
                });;
            }
            req.body.nombre = req.body.nombre.toUpperCase();
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
    if(req.usuario.Rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
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