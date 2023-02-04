const { Op } = require("sequelize");

const { Notas } = require("../models");

const listarNotas = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {habilitada} = req.query;
        let query = {};
        if(habilitada == "si"){
            query = {
                estado: true
            };
        }
        const notas = await Notas.findAll({
            where:query,
            attributes: { exclude: ["createdAt", "updatedAt"]},
        });
        res.status(200).json(notas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarNotasById = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        const nota = await Notas.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
        res.status(200).json(nota);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarNota = async (req, res) => {
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        let { descripcion} = req.body;
        descripcion = descripcion.trim();
        if(descripcion.length === 0){
            return res.status(400).json({
                msg: "La descripcion no puede ser solamente espacios en blanco"
            });
        }
        const nota = await Notas.create({
            descripcion
        });
        res.status(201).json({
            msg: "Nota creada con éxito",
            nota
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarNota = async (req, res) => {
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        if(req.body.descripcion){
            req.body.descripcion = req.body.descripcion.trim();
            if(req.body.descripcion.length === 0){
                return res.status(400).json({
                    msg: "La nota no puede ser solamente espacios en blanco"
                });
            }
        }
        const nota = await Notas.findByPk(id);
        await nota.update(req.body);
        res.status(201).json({
            msg: "Nota actualizada con éxito",
            nota
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const eliminarNota = async (req, res) => {
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        const nota = await Notas.findByPk(id);
        //await asignatura.destoy();
        await nota.update({
            estado: false
        });
        res.status(201).json({
            msg: "Nota deshabilitada con éxito",
            nota
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    listarNotas,
    buscarNotasById,
    registrarNota,
    actualizarNota,
    eliminarNota
};