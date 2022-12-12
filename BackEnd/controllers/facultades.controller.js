const { Op } = require("sequelize");

const { Facultad, Usuario, Rol, Usuario_rol } = require("../models");
const enviarCorreo = require("../services/mailer");

const listarFacultades = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {limite = 20, desde = 0} = req.query;
    try {
        const facultades = await Facultad.findAndCountAll({
            attributes: { exclude: ["createdAt", "updatedAt"]},
            offset: Number(desde),
            limit: Number(limite)
        });
        for(facultad of facultades.rows){
            if(facultad.decano){
                const decano = await Usuario.findByPk(facultad.decano, {
                    attributes: ["id","nombre", "apellido", "correo", "realizaCai"]
                });
                facultad.decano = decano
            }
        }
        res.json(facultades);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarFacultadById = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    try {
        const facultad = await Facultad.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
        if(facultad.decano){
            const decano = await Usuario.findByPk(facultad.decano, {
                attributes: ["id","nombre", "apellido", "correo", "realizaCai"]
            });
            facultad.decano = decano
        }
        res.json(facultad);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarFacultad = async (req, res) => {
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {nombre, descripcion ="", correoDecano, realizaCai} = req.body;
    try {
        let decano = await Usuario.findOne({
            where:{
                correo: correoDecano
            }
        });
        if(!decano){
            decano = await Usuario.create({
                correo: correoDecano,
                realizaCai
            });
            const rolDocente = await Rol.findOne({
                where: {
                    nombre: "docente"
                }
            });
            await decano.addRols(rolDocente);
            enviarCorreo(correoDecano, `Has sido registrado en ADCAI \n Por favor complete su registro ingresando al siguiente link:  `);
        }
        const rolDecano = await Rol.findOne({
            where: {
                nombre: "decano"
            }
        });
        const existeRolDecanoAsignado = await Usuario_rol.findOne({
            where:{
                id_usuario: decano.id,
                id_rol: rolDecano.id
            }
        });
        if(!existeRolDecanoAsignado){
            await decano.addRols(rolDecano);
            enviarCorreo(correoDecano, `Has sido asignado como Decano de facultad puede ingresar al siguiente link: `);
        }
        await decano.update({
            realizaCai
        });
        const facultad = await Facultad.create({
            nombre: nombre.toUpperCase(),
            descripcion,
            decano: decano.id,
        });
        res.status(201).json({
            msg: "Facultad creada con éxito",
            facultad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarFacultad = async (req, res) => {
    const {id} = req.params;
    const {correoDecano, realizaCai} = req.body;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const facultad = await Facultad.findByPk(id);
        if(facultad.decano && correoDecano){
            const rol = await Rol.findOne({
                where: {
                    nombre: "decano"
                }
            });
            const usuarioRol = await Usuario_rol.findOne({
                where: {
                    id_rol: rol.id,
                    id_usuario: facultad.decano
                }
            });
            if(usuarioRol){
                await usuarioRol.destroy();
            }
        }
        if(correoDecano){
            if(realizaCai === null){
                return res.status(400).json({
                    msg: "De especificar si el decano realiza el cai"
                });
            }
            let decano = await Usuario.findOne({
                where:{
                    correo: correoDecano
                }
            });
            if(!decano){
                decano = await Usuario.create({
                    correo: correoDecano,
                    realizaCai
                });
                const rolDocente = await Rol.findOne({
                    where: {
                        nombre: "docente"
                    }
                });
                await decano.addRols(rolDocente);
                enviarCorreo(correoDecano, `Por favor complete su registro ingresando al siguiente link: `);
            }
            const rolDecano = await Rol.findOne({
                where: {
                    nombre: "decano"
                }
            });
            const existeRolDecanoAsignado = await Usuario_rol.findOne({
                where:{
                    id_usuario: decano.id,
                    id_rol: rolDecano.id
                }
            });
            if(!existeRolDecanoAsignado){
                await decano.addRols(rolDecano);
                enviarCorreo(correoDecano, `Has sido asignado como Decano de facultad puede ingresar al siguiente link: `);
            }
            await decano.update({
                realizaCai
            });
            req.body.decano = decano.id;
        }
        if(req.body.nombre){
            req.body.nombre = req.body.nombre.toUpperCase();
        }
        await facultad.update(req.body);
        res.status(201).json({
            msg: "Facultad actualizada con éxito",
            facultad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const eliminarFacultad = async (req, res) => {
    const {id} = req.params;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const facultad = await Facultad.findByPk(id);
        //await facultad.destroy();
        await facultad.update({
            estado: false
        });
        res.status(201).json({
            msg: "Facultad deshabilitada con éxito",
            facultad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    listarFacultades,
    buscarFacultadById,
    registrarFacultad,
    actualizarFacultad,
    eliminarFacultad
}