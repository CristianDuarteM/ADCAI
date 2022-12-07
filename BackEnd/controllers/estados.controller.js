const {request, response} = require("express");
const {Estado} = require("../models");

const listarEstados = async (req = request, res = response) => {
    try {
        const estados = await Estado.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
        return res.json(estados);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarEstado = async (req = request, res = response) => {
    const {nombre, descripcion = ""} = req.body;
    /*if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }*/
    try {
        const estado = await Estado.create({
            nombre: nombre.toUpperCase(),
            descripcion
        });
        res.status(201).json({
            msg: `Estado creado con exito`,
            estado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const actualizarEstado = async (req, res) => {
    const {id} = req.params;
    /*if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }*/
    try {
        const estado = await Estado.findByPk(id);
        if(!estado){
            return res.status(400).json({
                msg: `No existe estado con ese id`
            });
        }
        if(req.body.nombre){
            const existeEstado = await Estado.findOne({
                where:{
                    nombre: req.body.nombre.toUpperCase()
                } 
            });
            if(existeEstado){
                return res.status(400).json({
                    msg: `Ya existe un estado con ese nombre`
                });
            }
            req.body.nombre = req.body.nombre.toUpperCase();
        }
        await estado.update(req.body)
        return res.json({
            msg: `Actualizado con exito`,
            estado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const eliminarEstado = async (req, res) => {
    const {id} = req.params;
    /*if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }*/
    try {
        const estado = await Estado.findByPk(id);
        if(!estado){
            return res.status(400).json({
                msg: `No existe estado con ese id`
            });
        }
        await estado.destroy();
        res.json({
            msg: `Estado eliminado con exito`,
            estado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

module.exports = {
    listarEstados,
    registrarEstado,
    actualizarEstado,
    eliminarEstado
};