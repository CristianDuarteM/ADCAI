const { Op } = require("sequelize");

const { Facultad, Usuario, Rol, Usuario_rol, Departamento } = require("../models");
const enviarCorreo = require("../services/mailer");
const { registrarNotificacion } = require("./notificaciones.controller");

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

const buscarDecanoEnFacultad = async (req, res) => {
    if( (req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    try {
        const facultad = await Facultad.findOne({
            where: {
                decano: id
            },
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
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
    try {
        let {nombre, descripcion ="", correoDecano, realizaCai} = req.body;
        nombre = nombre.trim();
        if(nombre.length === 0){
            return res.status(400).json({
                msg: "El nombre no puede ser solamente espacios en blanco"
            });
        }
        let decano = await Usuario.findOne({
            where:{
                correo: correoDecano
            }
        });
        const rolDecano = await Rol.findOne({
            where: {
                nombre: "DECANO"
            }
        });
        if(decano){
            if(decano.id_departamento){
                return res.status(400).json({
                    msg: "Un docente no puede ser decano de una facultad a la cual no pertenece"
                });
            }
            const existeRolDecanoAsignado = await Usuario_rol.findOne({
                where:{
                    id_usuario: decano.id,
                    id_rol: rolDecano.id
                }
            });
            if(existeRolDecanoAsignado){
                return res.status(400).json({
                    msg: "Un docente no puede ser decano de dos facultades"
                });
            }
            const rolDocente = await Rol.findOne({
            where: {
                nombre: "DOCENTE"
                }
            });
            if(!rolDocente){
                await decano.addRols(rolDocente);
            }
            await decano.addRols(rolDecano);
            await decano.update({
                realizaCai
            });
            enviarCorreo(correoDecano, `Has sido registrado en ADCAI \n Por favor complete su registro ingresando al siguiente link: `);
        } else {
            decano = await Usuario.create({
                correo: correoDecano,
                realizaCai
            });
            const rolDocente = await Rol.findOne({
                where: {
                    nombre: "DOCENTE"
                    }
                });
            await decano.addRols(rolDocente);
            await decano.addRols(rolDecano);
            enviarCorreo(correoDecano, `Por favor complete su registro ingresando al siguiente link: `);
            enviarCorreo(correoDecano, `Has sido asignado como Decano de facultad puede ingresar al siguiente link: `);
        }
        registrarNotificacion(decano.id, "Has sido asignado como Decano de facultad", "DECANO");
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
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        const {nombre, descripcion, correoDecano, realizaCai} = req.body;
        if(req.body.nombre){
            req.body.nombre = req.body.nombre.toUpperCase();
            req.body.nombre = req.body.nombre.trim();
            if(req.body.nombre.length === 0){
                return res.status(400).json({
                    msg: "El nombre no puede ser solamente espacios en blanco"
                });
            }
        }
        const facultad = await Facultad.findByPk(id);
        const rolDecano = await Rol.findOne({
            where: {
                nombre: "DECANO"
            }
        });
        if(facultad.decano){
            await Usuario_rol.destroy({
                where:{
                    id_usuario: facultad.decano,
                    id_rol: rolDecano.id
                }
            });
        }
        if(correoDecano){
            let usuario = await Usuario.findOne({
                where: {
                    correo: correoDecano
                }
            });
            if(usuario){
                if(usuario.id_departamento){
                    const departamento = await Departamento.findByPk(usuario.id_departamento);
                    if(departamento.id_facultad !== facultad.id){
                        return res.status(400).json({
                            msg: "Un docente no puede ser decano de una facultad a la cual no pertenece"
                        });
                    }
                }
                const tieneRol = await Usuario_rol.findOne({
                    where: {
                        id_rol: rolDecano.id,
                        id_usuario: usuario.id
                    }
                });
                if(tieneRol){
                    return res.status(400).json({
                        msg: "Un docente no puede ser decano de dos facultads"
                    });
                }
                const rolDocente = await Rol.findOne({
                    where: {
                        nombre: "DOCENTE"
                        }
                    });
                if(!rolDocente){
                    await usuario.addRols(rolDocente);
                }
                await usuario.addRols(rolDecano);
                if(realizaCai !== null){
                    await usuario.update({
                        realizaCai
                    });
                }
                enviarCorreo(correoDecano, `Has sido asignado como Decano de facultad puede ingresar al siguiente link: `);
                registrarNotificacion(usuario.id, "Has sido asignado como Decano de Facultad", "DECANO");
            } else {
                usuario = await Usuario.create({
                    correo: correoDecano,
                    realizaCai
                });
                const rolDocente = await Rol.findOne({
                    where: {
                        nombre: "DOCENTE"
                        }
                    });
                await usuario.addRols(rolDocente);
                await usuario.addRols(rolDecano);
                enviarCorreo(correoDecano, `Por favor complete su registro ingresando al siguiente link: `);
                enviarCorreo(correoDecano, `Has sido asignado como Decano de facultad puede ingresar al siguiente link: `);
                registrarNotificacion(usuario.id, "Has sido asignado como Decano de Facultad", "DECANO");
            }
            await facultad.update({
                decano: usuario.id
            });
        }
        await facultad.update(req.body);
        res.status(200).json({
            msg: "Facultad actualizada con exito",
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
    eliminarFacultad,
    buscarDecanoEnFacultad
}