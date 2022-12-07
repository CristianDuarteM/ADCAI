const { Op } = require("sequelize");

const { Plan_estudio, Facultad} = require("../models");

const listarPlanEstudios = async (req, res) => {
    const {limite = 20, desde = 0} = req.query;
    try {
        const plan_estudios = await Plan_estudio.findAndCountAll({
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
    const {id} = req.params;
    try {
        const existeFacultad = await Facultad.findByPk(id);
        if(!existeFacultad){
            return res.status(400).json({
                msg: "No existe facultad registrada con ese id"
            });
        }
        const plan_estudios = await Plan_estudio.findAll({
            where: {
                id_facultad: id
            },
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
    const {nombres, id_facultad} = req.body;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const plan_estudios = [];
    try {
        const existeFacultad = await Facultad.findByPk(id_facultad);
        if(!existeFacultad){
            return res.status(400).json({
                msg: `No se encuentra facultad con ese id`
            });
        }
        for(let nombre of nombres){
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
            msg: "Plan de estudio creado con exito",
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
    const {id} = req.params;
    const {id_facultad, nombre} = req.body;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        if(id_facultad){
            const existeFacultad = await Facultad.findByPk(id_facultad);
            if(!existeFacultad){
                return res.status(400).json({
                    msg: `No se encuentra facultad con ese id`
                });
            }
        }
        if(nombre){
            const existePlan_estudio = await Plan_estudio.findOne({
                where: {
                    nombre
                }
            });
            if(existePlan_estudio){
                return res.status(400).json({
                    msg: `Existe un plan de estudio registrado con ese nombre ${nombre}`
                });
            }
        }
        const plan_estudio = await Plan_estudio.findByPk(id);
        if(!plan_estudio){
            return res.status(400).json({
                msg: `No existe plan de estudio con ese id`
            });
        }
        await plan_estudio.update(req.body);
        res.status(201).json({
            msg: "plan de estudio actualizada con exito",
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
    const {id} = req.params;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const plan_estudio = await Plan_estudio.findByPk(id);
        if(!plan_estudio){
            return res.status(400).json({
                msg: `No existe plan de estudio con ese id`
            });
        }
        await plan_estudio.destroy()
        /*await plan_estudio.update({
            estado: false
        });*/
        res.status(201).json({
            msg: "Plan de estudio eliminado con exito",
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