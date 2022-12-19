const fs = require("fs");
const path = require("path");

const moment = require("moment");
const { createPdf, errorPdfHtmlTemplate } = require("../helpers/generarPdf");

const { Periodo_docente,
        Periodo, 
        Estado, 
        Periodo_docente_asignatura, 
        Asignatura,
        Periodo_docente_actividad_investigacion, 
        Actividad_extension, 
        Actividad_administracion, 
        Periodo_docente_actividad_administracion, 
        Periodo_docente_actividad_extension, 
        Tipo_representacion, 
        Periodo_docente_representacion,        
        Actividad_otra,
        Periodo_docente_otra,
        Usuario,
        Departamento,
        Facultad,
        Plan_estudio,
        Actividad_investigacion,
        Periodo_docente_firma,
        Retroalimentacion,
        Rol,
        Firma,
        Notas,
        Periodo_docente_notas,
        Evidencia} = require("../models");

const enviarCorreo = require("../services/mailer");
const { registrarNotificacion } = require("./notificaciones.controller");
const { opciones } = require("../helpers/opciones");
const { response } = require("express");
const { Op } = require("sequelize");
const { btoa } = require("buffer");

const listarCaisByUsuario = async (req, res) => {
    if( (req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {usuario, rol, evaluar, desde=0, limite=20} = req.query;
        let query = {};
        console.log(req.params);
        if(rol == "docente"){
            query = {
            where: {
                id_usuario: usuario
            },
            order: [
                ["fecha_diligenciamiento", "DESC"]
            ],
            include: [
                {
                    model: Usuario,
                    attributes: ["id", "nombre", "apellido", "codigo"],
                    include: {
                        model: Departamento,
                        attributes: ["nombre"]
                    }
                },
                {
                    model: Periodo,
                    attributes: ["anno", "semestre"],
                },
            ],
            offset: Number(desde),
            limit: Number(limite)
            };
        } else if(rol == "director"){
            const u = await Usuario.findByPk(usuario);
            if(evaluar == "si"){
                const diligenciado = await Estado.findOne({
                    where: {
                        nombre: 'DILIGENCIADO'
                    }
                });
                const sinfirmardirector = await Estado.findOne({
                    where: {
                        nombre: 'SINFIRMADIRECTOR'
                    }
                });
                query = {
                    where: {
                        id_estado: {
                             [Op.or]: [diligenciado.id, sinfirmardirector.id]
                        }
                    },
                    include: [
                        {
                            model: Usuario,
                            attributes: ["id", "nombre", "apellido", "codigo"],
                            where: {
                                id_departamento: u.id_departamento
                            },
                            include: {
                                model: Departamento,
                                attributes: ["nombre"]
                            }
                        },
                        {
                            model: Periodo,
                            attributes: ["anno", "semestre"],
                        },
                    ],
                    offset: Number(desde),
                    limit: Number(limite)
                }
            } else {
                query = {
                    include: [
                        {
                            model: Usuario,
                            attributes: ["id", "nombre", "apellido", "codigo"],
                            where: {
                                id_departamento: u.id_departamento
                            },
                            include: {
                                model: Departamento,
                                attributes: ["nombre"]
                            }
                        },
                        {
                            model: Periodo,
                            attributes: ["anno", "semestre"],
                        },
                    ],
                    offset: Number(desde),
                    limit: Number(limite)
                }
            }
        } else {
            const u = await Usuario.findByPk(usuario);
            const departamento = await Departamento.findByPk(u.id_departamento);
            if(evaluar == "si"){
                const aprobadodirector = await Estado.findOne({
                    where: {
                        nombre: 'APROBADO DIRECTOR'
                    }
                });
                const sinfirmardecano = await Estado.findOne({
                    where: {
                        nombre: 'SINFIRMADECANO'
                    }
                });
                query = {
                    where: {
                        id_estado: {
                            [Op.or]: [aprobadodirector.id, sinfirmardecano.id]
                        }
                    },
                    include: [
                        {
                            model: Usuario,
                            attributes: ["id", "nombre", "apellido", "codigo"],
                            include: {
                                model: Departamento,
                                attributes: ["nombre"],
                                where:{
                                    id_facultad: departamento.id_facultad
                                },
                                include: {
                                    model: Facultad,
                                    attributes: ["nombre"]
                                },
                            },
                            required: true
                        },
                        {
                            model: Periodo,
                            attributes: ["anno", "semestre"],
                        },
                    ],
                    offset: Number(desde),
                    limit: Number(limite)
                }
            } else {
                query = {
                    include: [
                        {
                            model: Usuario,
                            attributes: ["id", "nombre", "apellido", "codigo"],
                            include: {
                                model: Departamento,
                                attributes: ["nombre"],
                                where:{
                                    id_facultad: departamento.id_facultad
                                },
                                include: {
                                    model: Facultad,
                                    attributes: ["nombre"]
                                },
                            },
                            required: true
                        },
                        {
                            model: Periodo,
                            attributes: ["anno", "semestre"],
                        },
                    ],
                    offset: Number(desde),
                    limit: Number(limite)
                }
            }
        }
        const cais = await Periodo_docente.findAndCountAll(query);
        res.status(200).json(cais);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const consultarCaiById = async (req, res) => {
    if( (req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    try {
        let cai = await consultarCai(id);
        const retroalimentaciones = await Retroalimentacion.findAll({
            where:{
                id_periodo_docente: cai.id
            },
            include: [
                {
                    model: Usuario,
                    attributes: ["nombre", "apellido"]
                }
            ]
        });
        const evidencia = await Evidencia.findOne({
            where: {
                id_periodo: cai.id
            }
        });
        res.status(200).json({
            cai,
            retroalimentaciones,
            evidencia
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const evaluarCaiDirector = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    /*if(!req.usuario.id_firma){
        return res.status(400).json({
            msg: "Debe registrar su firma digital"
        });
    }*/
    try {
        const {id} = req.params;
        const cai = await Periodo_docente.findByPk(id);
        let estado = await Estado.findOne({
            where: {
                nombre: 'DILIGENCIADO'
            }
        });
        if(cai.id_estado !== estado.id){
            return res.status(400).json({
                msg: "No puede evaluar este cai"
            });
        }
        const {aprobado, docencia, investigacion, extension, administracion, representacion, otras} = req.body;
        const docente = await Usuario.findByPk(cai.id_usuario);
        if(docente.id_departamento !== req.usuario.id_departamento){
            return res.status(401).json({
                msg: "No puedes evaluar este cai porque es de otro departamento"
            });
        }
        if(aprobado){
            const firmas_cai = await Periodo_docente_firma.findOne({
                where: {
                    id_periodo_docente: cai.id
                }
            });
            if(!firmas_cai){
                const estado = await Estado.findOne({
                    where: {
                        nombre: "SINFIRMADIRECTOR"
                    }
                });
                await cai.update({
                    id_estado: estado.id
                });
                return res.status(200).json({
                    msg: "Cai de docente aprobado sin firmas, debe subir el documento firmado \n para que lo pueda evaluar el Decano"
                });
            } else {
                const estado = await Estado.findOne({
                    where: {
                        nombre: "APROBADO DIRECTOR"
                    }
                });
                await cai.update({
                    id_estado: estado.id
                });
                const departamento = await Departamento.findByPk(docente.id_departamento,{
                    include: {
                        model: Facultad,
                        attributes: ["decano"]
                    }
                });
                const decano = await Usuario.findByPk(departamento.facultad.decano);
                let firmas = await Periodo_docente_firma.findOne({
                    where:{
                        id_periodo_docente: cai.id,
                        id_firma: req.usuario.id_firma,
                        rol: "DIRECTOR"
                    }
                });
                if(!firmas){
                    await registrarFirmaDocenteCai(req.usuario.id_firma, cai.id, "DIRECTOR");
                }
                //notificamos al docente de la aprobacion
                registrarNotificacion(docente.id, "Su CAI ha sido aprobado por el director de departamento", "DOCENTE");
                enviarCorreo(docente.correo, "Su CAI ha sido aprobado por el director de departamento: ");
                registrarNotificacion(decano.id, `CAI del docente ${docente.nombre} ${docente.apellido} para evaluar`, "DECANO");
                enviarCorreo(decano.correo, `CAI del docente ${docente.nombre} ${docente.apellido} para evaluar: `);
                return res.status(200).json({
                    msg: "Cai de docente aprobado con exito"
                });
            }
        }
        if(!docencia && !investigacion && !extension && !administracion && !representacion && !otras){
            return res.status(400).json({
                msg: "Debes enviarme al menos una retroalimentacion"
            });
        }
        estado = await Estado.findOne({
            where: {
                nombre: "RECHAZADO DIRECTOR"
            }
        });
        await cai.update({
            id_estado: estado.id
        });
        registrarNotificacion(docente.id, "Su CAI ha sido rechazado por el director de departamento", "DOCENTE");
        enviarCorreo(docente.correo, "Su CAI ha sido rechazado por el director de departamento: ");
        const retroalimentacion = await Retroalimentacion.create({
            id_usuario: req.usuario.id,
            id_periodo_docente: cai.id,
            docencia,
            investigacion,
            extension,
            administracion,
            representacion,
            otras,
            rol: "DIRECTOR DE DEPARTAMENTO"
        });
        res.status(200).json({
            msg: "Cai de docente rechazado con exito",
            retroalimentacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const evaluarCaiDecano = async (req, res) => {
    if(req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    /*if(!req.usuario.id_firma){
        return res.status(400).json({
            msg: "Debe registrar su firma digital"
        });
    }*/
    try {
        const {id} = req.params;
        const cai = await Periodo_docente.findByPk(id);
        let estado = await Estado.findOne({
            where: {
                nombre: 'APROBADO DIRECTOR'
            }
        });
        if(cai.id_estado !== estado.id){
            return res.status(400).json({
                msg: "No puede evaluar este cai"
            });
        }
        const {aprobado, docencia, investigacion, extension, administracion, representacion, otras} = req.body;
        const docente = await Usuario.findByPk(cai.id_usuario,{
            include: {
                model: Departamento,
                attributes: ["id_facultad", "director"]
            }
        });
        const departamento = await Departamento.findByPk(req.usuario.id_departamento);
        if(docente.departamento.id_facultad !== departamento.id_facultad){
            return res.status(401).json({
                msg: "No puedes evaluar este cai porque es de otro departamento",
            });
        }
        if(aprobado){
            const firmas_cai = await Periodo_docente_firma.findOne({
                where: {
                    id_periodo_docente: cai.id
                }
            });
            if(!firmas_cai){
                const estado = await Estado.findOne({
                    where: {
                        nombre: "SINFIRMADECANO"
                    }
                });
                await cai.update({
                    id_estado: estado.id
                });
                return res.status(200).json({
                    msg: "Cai de docente aprobado sin firmas, debe subir el documento firmado"
                });
            } else {
                const estado = await Estado.findOne({
                    where: {
                        nombre: "APROBADO DECANO"
                    }
                });
                await cai.update({
                    id_estado: estado.id
                });
                const director = await Usuario.findByPk(docente.departamento.director);
                let firmas = await Periodo_docente_firma.findOne({
                    where:{
                        id_periodo_docente: cai.id,
                        id_firma: req.usuario.id_firma,
                        rol: "DECANO"
                    }
                });
                if(!firmas){
                    await registrarFirmaDocenteCai(req.usuario.id_firma, cai.id, "DECANO");
                }
                //notificamos al docente de la aprobacion
                registrarNotificacion(docente.id, "Su CAI ha sido aprobado por el Decano de Facultad", "DOCENTE");
                enviarCorreo(docente.correo, "Su CAI ha sido aprobado por el Decano de Facultad: ");
                registrarNotificacion(director.id, `CAI del docente ${docente.nombre} ${docente.apellido} ha sido aprobado por el Decano de Facultad`, "DIRECTOR");
                //enviarCorreo(decano.correo, `CAI del docente ${docente.nombre} ${docente.apellido} para evaluar`);
                return res.status(200).json({
                    msg: "Cai de docente aprobado con exito"
                });
            }
        }
        if(!docencia && !investigacion && !extension && !administracion && !representacion && !otras){
            return res.status(400).json({
                msg: "Debes enviarme al menos una retroalimentacion",
                docencia,
                investigacion,
                extension,
                administracion,
                representacion,
                otras
            });
        }
        estado = await Estado.findOne({
            where: {
                nombre: "RECHAZADO DECANO"
            }
        });
        await cai.update({
            id_estado: estado.id
        });
        registrarNotificacion(docente.id, "Su CAI ha sido rechazado por el Decano de la Facultad", "DOCENTE");
        enviarCorreo(docente.correo, "Su CAI ha sido rechazado por el Decano de la Facultad: ");
        const director = await Usuario.findByPk(docente.departamento.director);
        registrarNotificacion(director.id, `CAI del docente ${docente.nombre} ${docente.apellido} ha sido rechazado por el Decano de Facultad`, "DIRECTOR");
        enviarCorreo(director.correo, `CAI del docente ${docente.nombre} ${docente.apellido} ha sido rechazado por el Decano de la Facultad: `);
        const retroalimentacion = await Retroalimentacion.create({
            id_usuario: req.usuario.id,
            id_periodo_docente: cai.id,
            docencia,
            investigacion,
            extension,
            administracion,
            representacion,
            otras,
            rol: "DECANO DE FACULTAD"
        });
        res.status(200).json({
            msg: "Cai de docente rechazado con exito",
            retroalimentacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarCai = async (req, res) => {
    if( (req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) ||
        (!req.usuario.realizaCai)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    if(!req.usuario.id_departamento){
        return res.status(400).json({
            msg: "El usuario no tiene asignado departamento"
        })
    }
    let bandera = false;
    try {
        const {dedicacion, asignaturas, investigacion, extension, administracion, representaciones, otras, observaciones, id_firma} = req.body;
        const fecha_diligenciamiento = moment(moment().subtract(5, "hours").format("YYYY-MM-DD"));
        const anno = fecha_diligenciamiento.year();
        let periodo = await Periodo.findAll({
            where: {
                anno,
                id_departamento: req.usuario.id_departamento
            }
        });
        if(periodo.length === 0){
            return res.status(400).json({
                msg: "No hay periodos para poder registrar el cai"
            });
        }
        periodo = periodo.pop();
        let cai = await Periodo_docente.findOne({
                where: {
                    id_periodo: periodo.id,
                    id_usuario: req.usuario.id,
                }
        });
        if(cai){
            return res.status(400).json({
                msg: "Ya has registrado un cai con anterioridad"
            });
        }
        if(moment(periodo.fecha_limite) < fecha_diligenciamiento){
            return res.status(400).json({
                msg: "La fecha limite para diligenciar el cai ya sucedio",
            });
        }
        let estado;
        if(id_firma){
            estado = await Estado.findOne({
                where: {
                    nombre: "DILIGENCIADO"
                }
            });
        } else {
            estado = await Estado.findOne({
                where: {
                    nombre: "SINFIRMADOCENTE"
                }
            });
        }
        cai = await Periodo_docente.create({
            id_periodo: periodo.id,
            id_usuario: req.usuario.id,
            fecha_diligenciamiento,
            id_estado: estado.id,
            dedicacion
        });
        bandera = true;
        cai.horas_totales = 0;
        if(asignaturas){
            cai.horas_lectivas_semanales = Number(await registrarAsignaturasCai(asignaturas, cai.id));
            cai.horas_totales += cai.horas_lectivas_semanales;
        }
        if(investigacion){
            cai.horas_investigacion = await registarInvestigacionCai(investigacion, cai.id);
            cai.horas_totales += cai.horas_investigacion;
        }
        if(extension){
            cai.horas_extension = await registarExtensionCai(extension, cai.id);
            cai.horas_totales += cai.horas_extension;
        }
        if(administracion){
            cai.horas_administracion = await registarAdministracionCai(administracion, cai.id);
            cai.horas_totales += cai.horas_administracion;
        }
        if(representaciones){
            cai.horas_representacion = await registarRepresentacionesCai(representaciones, cai.id);
            cai.horas_totales += cai.horas_representacion;
        }
        if(otras){
            cai.horas_otras = await registarOtrasCai(otras, cai.id);
            cai.horas_totales += cai.horas_otras;
        }
        if(id_firma){
            await registrarFirmaDocenteCai(id_firma, cai.id, "DOCENTE");
        }
        await registrarNotas(cai.id);
        cai.observacion = observaciones;
        await cai.save();
        if(!id_firma){
            res.status(200).json({
                msg: "Cai registrado con exito, estado sin firma docente es necesario subir pdf firmado",
                cai
            });
        } else {
            const departamento = await Departamento.findByPk(req.usuario.id_departamento);
            registrarNotificacion(departamento.director, `El usuario: ${req.usuario.nombre} ha registrado el CAI.`, "DIRECTOR");
            res.status(200).json({
                msg: "Cai registrado con exito",
                cai
            });
        }
    } catch (error) {
        console.log(error);
        if(bandera){
            const cai = await Periodo_docente.findAll({
                where: {
                    id_usuario: req.usuario.id,
                }
            });
            await cai.pop().destroy();
        }
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const actualizarCai = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) || (!req.usuario.realizaCai)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    if(!req.usuario.id_departamento){
        return res.status(400).json({
            msg: "El usuario no tiene asignado departamento"
        })
    }
    const {id_cai} = req.params
    const {dedicacion, asignaturas, investigacion, extension, administracion, representaciones, otras, observaciones, id_firma} = req.body;
    let bandera = false;
    try {
        const viejoCai = await Periodo_docente.findByPk(id_cai);
        const dirRech = await Estado.findOne({
            where: {
                nombre: "RECHAZADO DIRECTOR"
            }
        });
        const decRech = await Estado.findOne({
            where: {
                nombre: "RECHAZADO DECANO"
            }
        });
        if((viejoCai.id_estado !== dirRech.id) && (viejoCai.id_estado !== decRech.id)){
            return res.status(400).json({
                msg: "No puedes editar este cai por el estado"
            });
        }
        if(viejoCai.id_usuario !== req.usuario.id){
            return res.status(400).json({
                msg: "No puedes editar este cai por el usuario"
            });
        }
        const fecha_diligenciamiento = moment(viejoCai.fecha_diligenciamiento);
        const anno = fecha_diligenciamiento.year();
        let periodo = viejoCai.id_periodo;
        let estado;
        if(id_firma){
            estado = await Estado.findOne({
                where: {
                    nombre: "DILIGENCIADO"
                }
            });
        } else {
            estado = await Estado.findOne({
                where: {
                    nombre: "SINFIRMADOCENTE"
                }
            });
        }
        let nuevoCai = await Periodo_docente.create({
            id_periodo: periodo,
            id_usuario: req.usuario.id,
            fecha_diligenciamiento,
            id_estado: estado.id,
            dedicacion
        });
        bandera = true;
        nuevoCai.horas_totales = 0;
        if(asignaturas){
            nuevoCai.horas_lectivas_semanales = Number(await registrarAsignaturasCai(asignaturas, nuevoCai.id));
            nuevoCai.horas_totales += nuevoCai.horas_lectivas_semanales;
        }
        if(investigacion){
            nuevoCai.horas_investigacion = await registarInvestigacionCai(investigacion, nuevoCai.id);
            nuevoCai.horas_totales += nuevoCai.horas_investigacion;
        }
        if(extension){
            nuevoCai.horas_extension = await registarExtensionCai(extension, nuevoCai.id);
            nuevoCai.horas_totales += nuevoCai.horas_extension;
        }
        if(administracion){
            nuevoCai.horas_administracion = await registarAdministracionCai(administracion, nuevoCai.id);
            nuevoCai.horas_totales += nuevoCai.horas_administracion;
        }
        if(representaciones){
            nuevoCai.horas_representacion = await registarRepresentacionesCai(representaciones, nuevoCai.id);
            nuevoCai.horas_totales += nuevoCai.horas_representacion;
        }
        if(otras){
            nuevoCai.horas_otras = await registarOtrasCai(otras, nuevoCai.id);
            nuevoCai.horas_totales += nuevoCai.horas_otras;
        }
        if(id_firma){
            await registrarFirmaDocenteCai(id_firma, nuevoCai.id, "DOCENTE");
        }
        await registrarNotas(nuevoCai.id);
        nuevoCai.observacion = observaciones;
        const retroalimentaciones = await Retroalimentacion.findAll({
            where: {
                id_periodo_docente: viejoCai.id
            }
        });
        for(retroalimentacion of retroalimentaciones){
            const ret = await  Retroalimentacion.findByPk(retroalimentacion.id);
            await ret.update({
                id_periodo_docente: nuevoCai.id
            });
        }
        if(id_firma){
            const firmas = await Periodo_docente_firma.findAll({
                where: {
                    id_periodo_docente: viejoCai.id
                }
            });
            for(firma of firmas){
                const fir = await Periodo_docente_firma.findOne({
                    where:{
                        id_periodo_docente: firma.id_periodo_docente,
                        id_firma: firma.id_firma
                    }
                });
                await fir.update({
                    id_periodo_docente: nuevoCai.id
                });
            }
        }
        await nuevoCai.save();
        const evidencia = await Evidencia.findOne({
            where: {
                id_periodo: viejoCai.id
            }
        });
        if(evidencia){
            if(evidencia.path){
                const pathEvidencia = path.join(__dirname, "../uploads", "evidencias", evidencia.path);
                if(fs.existsSync(pathEvidencia)){
                    fs.unlinkSync(pathEvidencia);
                }
            }
        }
        await viejoCai.destroy();
        if(!id_firma){
            res.status(200).json({
                msg: "Cai actualizado con exito, estado sin firma docente es necesario subir pdf firmado",
                nuevoCai
            });
        } else {
            const departamento = await Departamento.findByPk(req.usuario.id_departamento);
            registrarNotificacion(departamento.director, `El usuario: ${req.usuario.nombre} ha actualizao el CAI.`, "DIRECTOR");
            const director = await Usuario.findByPk(departamento.director);
            enviarCorreo(director.correo, `El docente ${req.usuario.nombre} ${req.usuario.apellido} ha actualizaco el CAI: `);
            res.status(200).json({
                msg: "Cai actualizado con exito",
                nuevoCai
            });
        }
    } catch (error) {
        console.log(error);
        if(bandera){
            const cai = await Periodo_docente.findAll({
                where: {
                    id_usuario: req.usuario.id,
                }
            });
            await cai.pop().destroy();
        }
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarAsignaturasCai = async (asignaturas=[], id_cai) => {
    let horas = 0;
    for(asignatura of asignaturas){
        const materia = await Asignatura.findByPk(asignatura)
        let hl = materia.horas_teoricas + materia.horas_practicas;
        let phl = hl * 0.75;
        let ae = hl * 0.3;
        let ee = hl * 0.3
        await Periodo_docente_asignatura.create({
            id_asignatura: asignatura,
            id_periodo_docente: id_cai,
        });
        horas = horas + hl + phl + ae + ee;
    }
    return horas.toFixed(1);
};

const registarInvestigacionCai = async (actividades = [], id_cai) => {
    let horas = 0;
    for(actividad of actividades){
        await Periodo_docente_actividad_investigacion.create({
            id_actividad_investigacion: actividad.id,
            id_periodo_docente: id_cai,
            horas: actividad.horas
        });
        horas = horas + actividad.horas;
    }
    return horas;
}

const registarExtensionCai = async (actividades = [], id_cai) => {
    let horas = 0;
    for(actividad of actividades){
        await Periodo_docente_actividad_extension.create({
            id_actividad_extension: actividad.id,
            id_periodo_docente: id_cai,
            horas: actividad.horas,
            nombre: actividad.nombre
        });
        horas = horas + actividad.horas;
    }
    return horas;
}

const registarAdministracionCai = async (actividades = [], id_cai) => {
    let horas = 0;
    for(actividad of actividades){
        await Periodo_docente_actividad_administracion.create({
            id_actividad_administracion: actividad.id,
            id_periodo_docente: id_cai,
            horas: actividad.horas,
            nombre: actividad.nombre
        });
        horas = horas + actividad.horas;
    }
    return horas;
}

const registarRepresentacionesCai = async (actividades = [], id_cai) => {
    let horas = 0;
    for(actividad of actividades){
        await Periodo_docente_representacion.create({
            id_tipo_representacion: actividad.id,
            id_periodo_docente: id_cai,
            horas: actividad.horas,
            nombre: actividad.nombre
        });
        horas = horas + actividad.horas;
    }
    return horas;
}

const registarOtrasCai = async (actividades = [], id_cai) => {
    let horas = 0;
    for(actividad of actividades){
        await Periodo_docente_otra.create({
            id_actividad_otra: actividad.id,
            id_periodo_docente: id_cai,
            horas: actividad.horas,
            nombre: actividad.nombre
        });
        horas = horas + actividad.horas;
    }
    return horas;
}

const registrarFirmaDocenteCai = async (id_firma, id_cai, rol) => {
    await Periodo_docente_firma.create({
        id_firma: id_firma,
        id_periodo_docente: id_cai,
        rol: rol
    });
}

const registrarNotas = async (id_cai) => {
    const notas = await Notas.findAll({
        where: {
            estado: true
        }
    });
    for(nota of notas){
        await Periodo_docente_notas.create({
            id_notas: nota.id,
            id_periodo_docente: id_cai
        });
    }
};

const generarPdfCai = async (req, res = response) => {
    /*if( (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }*/
    try {
        const {id} = req.params;
        let cai = await consultarCai(id);
        const binaryResult = await createPdf(cai);
        const pathPdf = path.join(__dirname, "../uploads", "cais", binaryResult);
        if(fs.existsSync(pathPdf)){
            let pdf = `http://localhost:8080/pdfs/${binaryResult}`
            return res.json({
                msg: `${process.env.URLLOCAL}/pdfs/cais/${binaryResult}`
            });
        }
        res.status(400).json({
            msg: "No se encontro la ruta de la imagen"
        });
        //let prueba = btoa(binaryResult);
        //res.sendFile(prueba);
        /*res.json({
            msg:"aad",
            binaryResult
        });*/
        // const html = '<h1>Hola</h1>';
        /*res.setHeader('Content-disposition', 'inline; filename=report.pdf');
        res.type('pdf').send(binaryResult);*/
        //res.sendFile(prueba);
      } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
      };
};

const generarPdfPorDepartamento = async (req, res = response) => {
    /*if( (req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }*/
    try {
        const {id} = req.params;
        let periodo = await Periodo.findAll({
            where: {
                id_departamento: id
            }
        });
        periodo = periodo.pop();
        const estado = await Estado.findOne({
            where: {
                nombre: "APROBADO DECANO"
            }
        });
        const caisDepartamento = await Periodo_docente.findAll({
            where: {
                id_periodo: periodo.id,
                id_estado: estado.id
            }
        });
        let cais = [];
        for(c of caisDepartamento){
            const cai = await consultarCai(c.id);
            const binaryResult = await createPdf(cai);
            cais.push(binaryResult);
            res.setHeader('Content-disposition', 'download; filename=report.pdf');
            res.type('pdf').send(binaryResult);
        }
        // const html = '<h1>Hola</h1>';
        /*res.setHeader('Content-disposition', 'download; filename=report.pdf');
        res.type('pdf').send(cais);*/
      } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
      };
};

async function consultarCai (id_cai) {
    let cai = await Periodo_docente.findByPk(id_cai,{
        include: [
            {
                model: Periodo,
                attributes: ["anno", "semestre"]
            },
            {
                model: Usuario,
                attributes: ["nombre", "apellido", "codigo"],
                include: {
                    model: Departamento,
                    attributes: ["nombre"]
                }
            },
            {
                model: Asignatura,
                attributes: ["id","nombre", "creditos", "horas_teoricas", "horas_practicas"],
                through: {
                    attributes: []
                },
                include: {
                    model: Plan_estudio,
                    attributes: ["id","nombre"]
                }
            },
            {
                model: Actividad_investigacion,
                attributes: ["id", "nombre", "descripcion_horas", "horas_minimas", "horas_maximas"],
                through: {
                    attributes: ["horas",]
                },
            },
            {
                model: Actividad_extension,
                attributes: ["id", "nombre", "descripcion", "listar"],
                through: {
                    attributes: ["id", "horas", "nombre"],
                },
            },
            {
                model: Actividad_administracion,
                attributes: ["id", "nombre", "descripcion", "listar"],
                through: {
                    attributes: ["id", "horas", "nombre"],
                },
            },
            {
                model: Tipo_representacion,
                attributes: ["id", "nombre", "descripcion", "listar"],
                through: {
                    attributes: ["id", "horas", "nombre"],
                },
            },
            {
                model: Actividad_otra,
                attributes: ["id", "nombre", "descripcion", "listar"],
                through: {
                    attributes: ["id","horas", "nombre"],
                },
            },
            {
                model: Notas,
                attributes: ["id", "descripcion"],
                through: {
                    attributes: [],
                },
            },
            {
                model: Firma,
                attributes: ["id", "ruta_firma"],
                through: {
                    attributes: {exclude: ["createdAt", "updatedAt"]},
                },
            }
        ],
        attributes: { exclude: ["createdAt", "updatedAt"]}
    });
    return cai;
};

module.exports = {
    listarCaisByUsuario,
    consultarCaiById,
    evaluarCaiDirector,
    evaluarCaiDecano,
    registrarCai,
    actualizarCai,
    generarPdfCai,
    consultarCai,
    generarPdfPorDepartamento
};