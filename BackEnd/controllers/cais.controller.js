const moment = require("moment");

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
        Rol} = require("../models");
const enviarCorreo = require("../services/mailer");
const { registrarNotificacion } = require("./notificaciones.controller");

const listarCaisByUsuario = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id, desde=0, limite=20} = req.params;
    try {
        const cais = await Periodo_docente.findAndCountAll({
            where: {
                id_usuario: id
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
        });
        res.status(200).json(cais);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const listarCaisByDepartamento = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    const {desde=0, limite=20, paraEvaluar="no"} = req.query; 
    try {
        let query = {};
        if(paraEvaluar == "si"){
            const estado = await Estado.findOne({
                where: {
                    nombre: 'DILIGENCIADO'
                }
            });
            
            query = {
                id_estado: estado.id
            }
        }
        console.log(paraEvaluar, query)
        const cais = await Periodo_docente.findAndCountAll({
            where: query,
            include: [
                {
                    model: Usuario,
                    attributes: ["id", "nombre", "apellido", "codigo"],
                    where: {
                        id_departamento: id
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
        });
        res.status(200).json(cais);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const listarCaisByFacultad = async (req, res) => {
    if(req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        const {desde=0, limite=20, paraEvaluar="no"} = req.query;
        let query = {};
        if(paraEvaluar == "si"){
            const estado = await Estado.findOne({
                where: {
                    nombre: 'APROBADO DIRECTOR'
                }
            });
            query = {
                id_estado: estado.id
            }
        }
        const cais = await Periodo_docente.findAndCountAll({
            where: query,
            include: [
                {
                    model: Usuario,
                    attributes: ["id", "nombre", "apellido", "codigo"],
                    include: {
                        model: Departamento,
                        attributes: ["nombre"],
                        where:{
                            id_facultad: id
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
        });
        res.status(200).json(cais);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const consultarCaiById = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    try {
        
        let cai = await Periodo_docente.findByPk(id,{
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
                    attributes: ["nombre", "creditos", "horas_teoricas", "horas_practicas"],
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
                    attributes: ["nombre", "descripcion_horas", "horas_minimas", "horas_maximas"],
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
                }
            ],
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
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
        res.status(200).json({
            cai,
            retroalimentaciones
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
    if(!req.usuario.id_firma){
        return res.status(400).json({
            msg: "Debe registrar su firma digital"
        });
    }
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
        const {aprobado, docencia, investigacion, extension, representacion, otras} = req.body;
        const docente = await Usuario.findByPk(cai.id_usuario);
        if(docente.id_departamento !== req.usuario.id_departamento){
            return res.status(401).json({
                msg: "No puedes evaluar este cai porque es de otro departamento"
            });
        }
        if(aprobado){
            const estado = await Estado.findOne({
                where: {
                    nombre: "APROBADO DIRECTOR"
                }
            });
            await cai.update({
                id_estado: estado.id
            });
            //notificamos al docente de la aprobacion
            registrarNotificacion(docente.id, "Su CAI ha sido aprobado por el director de departamento");
            enviarCorreo(docente.correo, "Su CAI ha sido aprobado por el director de departamento");
            const departamento = await Departamento.findByPk(docente.id_departamento,{
                include: {
                    model: Facultad,
                    attributes: ["decano"]
                }
            });
            const decano = await Usuario.findByPk(departamento.facultad.decano);
            registrarNotificacion(decano.id, `CAI del docente ${docente.nombre} ${docente.apellido} para evaluar`);
            enviarCorreo(decano.correo, `CAI del docente ${docente.nombre} ${docente.apellido} para evaluar`); 
            await Periodo_docente_firma.create({
                id_periodo_docente: cai.id,
                id_firma: req.usuario.id_firma
            });
            return res.status(200).json({
                msg: "Cai de docente aprobado con exito"
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
        registrarNotificacion(docente.id, "Su CAI ha sido rechazado por el director de departamento");
        enviarCorreo(docente.correo, "Su CAI ha sido rechazado por el director de departamento");
        const retroalimentacion = await Retroalimentacion.create({
            id_usuario: req.usuario.id,
            id_periodo_docente: cai.id,
            docencia,
            investigacion,
            extension,
            representacion,
            otras,
            rol: "DIRECTOR"
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
    if(!req.usuario.id_firma){
        return res.status(400).json({
            msg: "Debe registrar su firma digital"
        });
    }
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
        const {aprobado, docencia, investigacion, extension, representacion, otras} = req.body;
        const docente = await Usuario.findByPk(cai.id_usuario,{
            include: {
                model: Departamento,
                attributes: ["id_facultad"]
            }
        });
        const departamento = await Departamento.findByPk(req.usuario.id_departamento);
        if(docente.departamento.id_facultad !== departamento.id_facultad){
            return res.status(401).json({
                msg: "No puedes evaluar este cai porque es de otro departamento",
            });
        }

        /*---------------------------------- Voy acá --------------------------------------------*/
        if(aprobado){
            const estado = await Estado.findOne({
                where: {
                    nombre: "APROBADO DIRECTOR"
                }
            });
            await cai.update({
                id_estado: estado.id
            });
            //notificamos al docente de la aprobacion
            registrarNotificacion(docente.id, "Su CAI ha sido aprobado por el director de departamento");
            enviarCorreo(docente.correo, "Su CAI ha sido aprobado por el director de departamento");
            const departamento = await Departamento.findByPk(docente.id_departamento,{
                include: {
                    model: Facultad,
                    attributes: ["decano"]
                }
            });
            const decano = await Usuario.findByPk(departamento.facultad.decano);
            registrarNotificacion(decano.id, `CAI del docente ${docente.nombre} ${docente.apellido} para evaluar`);
            enviarCorreo(decano.correo, `CAI del docente ${docente.nombre} ${docente.apellido} para evaluar`); 
            await Periodo_docente_firma.create({
                id_periodo_docente: cai.id,
                id_firma: req.usuario.id_firma
            });
            return res.status(200).json({
                msg: "Cai de docente aprobado con exito"
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
        registrarNotificacion(docente.id, "Su CAI ha sido rechazado por el director de departamento");
        enviarCorreo(docente.correo, "Su CAI ha sido rechazado por el director de departamento");
        const retroalimentacion = await Retroalimentacion.create({
            id_usuario: req.usuario.id,
            id_periodo_docente: cai.id,
            docencia,
            investigacion,
            extension,
            representacion,
            otras,
            rol: "DIRECTOR"
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
    const {dedicacion, asignaturas, investigacion, extension, administracion, representaciones, otras, observaciones, id_firma} = req.body;
    try {
        const fecha_diligenciamiento = moment(moment().format("YYYY-MM-DD")).subtract(5, "hours");
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
        const estado = await Estado.findOne({
            where: {
                nombre: "DILIGENCIADO"
            }
        });
        cai = await Periodo_docente.create({
            id_periodo: periodo.id,
            id_usuario: req.usuario.id,
            fecha_diligenciamiento,
            id_estado: estado.id,
            dedicacion
        });
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
            await registrarFirmaDocenteCai(id_firma, cai.id);
        }
        cai.observacion = observaciones;
        await cai.save();
        const departamento = await Departamento.findByPk(req.usuario.id_departamento);
        registrarNotificacion(departamento.director, `El usuario: ${req.usuario.nombre} ha registrado el cai.`);
        res.status(200).json({
            msg: "Cai registrado con exito",
            cai
        });
    } catch (error) {
        console.log(error);
        const cai = await Periodo_docente.findAll({
            where: {
                id_usuario: req.usuario.id,
            }
        });
        await cai.pop().destroy();
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
        const extension = await Actividad_extension.findByPk(actividad.id);
        const periodo = await Periodo_docente_actividad_extension.create({
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
        const administracion = await Actividad_administracion.findByPk(actividad.id);
        const periodo = await Periodo_docente_actividad_administracion.create({
            id_actividad_administracion: actividad.id,
            id_periodo_docente: id_cai,
            horas: actividad.horas,
            nombre: administracion.nombre
        });
        horas = horas + actividad.horas;
    }
    return horas;
}

const registarRepresentacionesCai = async (actividades = [], id_cai) => {
    let horas = 0;
    for(actividad of actividades){
        const act = await Tipo_representacion.findByPk(actividad.id);
        const periodo = await Periodo_docente_representacion.create({
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
        const act = await Actividad_otra.findByPk(actividad.id);
        const periodo = await Periodo_docente_otra.create({
            id_actividad_otra: actividad.id,
            id_periodo_docente: id_cai,
            horas: actividad.horas,
            nombre: actividad.nombre
        });
        horas = horas + actividad.horas;
    }
    return horas;
}

const registrarFirmaDocenteCai = async (if_firma, id_cai) => {
    const periodo = await Periodo_docente_firma.create({
        id_firma: if_firma,
        id_periodo_docente: id_cai,
    });
}

module.exports = {
    listarCaisByUsuario,
    listarCaisByDepartamento,
    listarCaisByFacultad,
    consultarCaiById,
    evaluarCaiDirector,
    evaluarCaiDecano,
    registrarCai
};