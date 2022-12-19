const { Op } = require("sequelize");

const { Plan_estudio, Facultad} = require("../models");

const listarPlanEstudios = async (req, res) => {
    if( (req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {limite = 20, desde = 0, habilitado} = req.query;
    try {
        let query = {};
        if(habilitado == "si"){
            query = {
                estado: true
            }
        }
        const plan_estudios = await Plan_estudio.findAndCountAll({
            where: query,
            attributes: { exclude: ["createdAt", "updatedAt"]},
            include: {
                model: Facultad,
                attributes: ["id", "nombre"]
            },
            offset: Number(desde),
            limit: Number(limite)
        });
        res.status(200).json(plan_estudios);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarPlanEstudioByFacultad = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        const {habilitado} = req.query;
        let query = {};
        if(habilitado == "si"){
            query = {
                id_facultad: id,
                estado: true
            }
        } else {
            query = {
                id_facultad: id
            }
        }
        const plan_estudios = await Plan_estudio.findAll({
            where: query,
            attributes: { exclude: ["createdAt", "updatedAt"]},
        });
        res.status(200).json(plan_estudios);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarPlanEstudio = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {nombres, id_facultad} = req.body;
        const plan_estudios = [];
        for(let nombre of nombres){
            nombre = nombre.toUpperCase();
            const existePlan_estudio = await Plan_estudio.findOne({
                where: {
                    nombre
                }
            });
            if(!existePlan_estudio){
                const plan_estudio = await Plan_estudio.create({nombre, id_facultad});
                plan_estudios.push(plan_estudio);
            }
        }
        res.status(201).json({
            msg: "Planes de estudios creados con exito",
            plan_estudios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarPlanEstudio = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        if(req.body.nombre){
            req.body.nombre = req.body.nombre.toUpperCase();
        }
        const plan_estudio = await Plan_estudio.findByPk(id);
        await plan_estudio.update(req.body);
        res.status(201).json({
            msg: "plan de estudio actualizado con exito",
            plan_estudio
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const eliminarPlanEstudio = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        const plan_estudio = await Plan_estudio.findByPk(id);
        //await plan_estudio.destroy()
        await plan_estudio.update({
            estado: false
        });
        res.status(201).json({
            msg: "Plan de estudio deshabilitado con exito",
            plan_estudio
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    listarPlanEstudios,
    buscarPlanEstudioByFacultad,
    registrarPlanEstudio,
    actualizarPlanEstudio,
    eliminarPlanEstudio
};