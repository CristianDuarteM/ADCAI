const path = require("path");
const fs = require("fs");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Evidencia, Periodo_docente, Estado, Departamento, Usuario, Facultad } = require("../models");
const { registrarNotificacion } = require("./notificaciones.controller");
const enviarCorreo = require("../services/mailer");
const { response } = require("express");

const cargarEvidencia = async (req, res) => {
    if( (req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        let evidencia = await Evidencia.findOne({
            where: {
                id_periodo: id
            }
        });
        if(evidencia){
            if(evidencia.path){
                const pathEvidencia = path.join(__dirname, "../uploads", "evidencias", evidencia.path);
                console.log("antes de eliminar", pathEvidencia);
                if(fs.existsSync(pathEvidencia)){
                    console.log("dentro de eliminar");
                    fs.unlinkSync(pathEvidencia);
                }
                const pathCompleto = await subirArchivo(req.files, ["pdf"], "evidencias");
                await evidencia.update({
                    path: pathCompleto
                });
            }
        } else {
            const pathCompleto = await subirArchivo(req.files, ["pdf"], "evidencias");
            evidencia = await Evidencia.create({
                path: pathCompleto,
                id_periodo: id
            });
        }
        res.json({
            msg: "Evidencia registrada con exito",
            evidencia
        });
    } catch (msg) {
        console.log(msg);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const cargarSinFirma = async (req, res) => {
    if( (req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        const {rol} = req.query;
        let evidencia = await Evidencia.findOne({
            where: {
                id_periodo: id
            }
        });
        if(rol == "DOCENTE"){
            const cai = await Periodo_docente.findByPk(id);
            const actual = await Estado.findOne({
                where: {
                    nombre: "SINFIRMADOCENTE"
                }
            });
            if(cai.id_estado !== actual.id){
                return res.status(400).json({
                    msg: "No puedes cargar evidencias a este cai"
                });
            }
        } else if(rol == "DIRECTOR"){
            const cai = await Periodo_docente.findByPk(id);
            const actual = await Estado.findOne({
                where: {
                    nombre: "SINFIRMADIRECTOR"
                }
            });
            if(cai.id_estado !== actual.id){
                return res.status(400).json({
                    msg: "No puedes cargar evidencias a este cai"
                });
            }
        } else {
            const cai = await Periodo_docente.findByPk(id);
            const actual = await Estado.findOne({
                where: {
                    nombre: "SINFIRMADECANO"
                }
            });
            if(cai.id_estado !== actual.id){
                return res.status(400).json({
                    msg: "No puedes cargar evidencias a este cai"
                });
            }
        }
        if(evidencia){
            if(evidencia.path){
                const pathEvidencia = path.join(__dirname, "../uploads", "evidencias", evidencia.path);
                if(fs.existsSync(pathEvidencia)){
                    fs.unlinkSync(pathEvidencia);
                }
                const pathCompleto = await subirArchivo(req.files, ["pdf"], "evidencias");
                await evidencia.update({
                    path: pathCompleto
                });
            }
        } else {
            const pathCompleto = await subirArchivo(req.files, ["pdf"], "evidencias");
            evidencia = await Evidencia.create({
                path: pathCompleto,
                id_periodo: id
            });
        }
        if(rol == "DOCENTE"){
            const cai = await Periodo_docente.findByPk(id);
            const estado = await Estado.findOne({
                where: {
                    nombre: "DILIGENCIADO"
                }
            });
            await cai.update({
                id_estado: estado.id
            });
            const departamento = await Departamento.findByPk(req.usuario.id_departamento);
            registrarNotificacion(departamento.director, `El usuario: ${req.usuario.nombre} ha registrado el CAI.`, "DIRECTOR");
        } else if(rol == "DIRECTOR"){
            const cai = await Periodo_docente.findByPk(id);
            const estado = await Estado.findOne({
                where: {
                    nombre: "APROBADO DIRECTOR"
                }
            });
            await cai.update({
                id_estado: estado.id
            });
            const docente = await Usuario.findByPk(cai.id_usuario);
            const departamento = await Departamento.findByPk(req.usuario.id_departamento);
            const facultad = await Facultad.findByPk(departamento.id_facultad);
            const decano = await Usuario.findByPk(facultad.decano);
            registrarNotificacion(docente.id, "Su CAI ha sido aprobado por el director de departamento", "DOCENTE");
            enviarCorreo(docente.correo, "Su CAI ha sido aprobado por el director de departamento: ");
            registrarNotificacion(decano.id, `CAI del docente ${docente.nombre} ${docente.apellido} para evaluar`, "DECANO");
            enviarCorreo(decano.correo, `CAI del docente ${docente.nombre} ${docente.apellido} para evaluar: `);
        } else {
            const cai = await Periodo_docente.findByPk(id);
            const estado = await Estado.findOne({
                where: {
                    nombre: "APROBADO DECANO"
                }
            });
            await cai.update({
                id_estado: estado.id
            });
            const docente = await Usuario.findByPk(cai.id_usuario);
            const departamento = await Departamento.findByPk(docente.id_departamento);
            const director = await Usuario.findByPk(departamento.director);
            registrarNotificacion(docente.id, "Su CAI ha sido aprobado por el Decano de Facultad", "DOCENTE");
            enviarCorreo(docente.correo, "Su CAI ha sido aprobado por el Decano de Facultad: ");
            registrarNotificacion(director.id, `CAI del docente ${docente.nombre} ${docente.apellido} ha sido aprobado por el Decano de Facultad`, "DIRECTOR");
        }
        res.json({
            msg: "CAI registrado con exito, los usarios correspondientes han sido notificados",
            evidencia
        });
    } catch (msg) {
        console.log(msg);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const mostrarEvidencia = async (req, res = response) => {
    if( (req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        let evidencia = await Evidencia.findOne({
            where: {
                id_periodo: id
            }
        });
        if(!evidencia){
            return res.status(400).json({
                msg: "No hay evidencia para ese CAI"
            });
        }
        if(!evidencia.path){
            return res.status(400).json({
                msg: "La ruta del archivo no existe"
            });
        }
        const pathEvidencia = path.join(__dirname, "../uploads", "evidencias", evidencia.path);
        if(fs.existsSync(pathEvidencia)){
            //return res.sendFile(pathEvidencia);
            return res.json({
                msg: `${process.env.URLLOCAL}/pdfs/evidencias/${evidencia.path}`
            });
        }
        res.json({
            msg: "No se encontro la ruta del archivo"
        });
    } catch (msg) {
        console.log(msg);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    cargarEvidencia,
    cargarSinFirma,
    mostrarEvidencia
};