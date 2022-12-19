const moment = require("moment");
const { Notificacion } = require("../models");

const listarNotificacionesByUsuario = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {limite = 20, desde = 0, rol} = req.query;
        const id_usuario = req.params.id;
        let query = {};
        if(rol){
            query = {
                id_usuario,
                rol
            };
        }
        const notifiacaiones = await Notificacion.findAndCountAll({
            where: query,
            attributes: { exclude: ["updatedAt"]},
            order: [["createdAt", "DESC"]],
            offset: Number(desde),
            limit: Number(limite)
        });
        for(notificacion of notifiacaiones.rows){
            let x = await Notificacion.findByPk(notificacion.id);
            if(!x.leido){
                await x.update({
                    fecha_lectura: moment(moment().subtract(5, "hours").format("YYYY-MM-DD")),
                    leido: true,
                });
            }
        }
        res.json(notifiacaiones);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarNotificacion = async (id_usuario, mensaje, rol) => {
    try {
        await Notificacion.create({
            id_usuario: id_usuario,
            mensaje: mensaje,
            rol: rol
        });
    } catch (error) {
        console.log("No se pudo registrar notificacion", error);
    }
};

const marcarNotificacionLeida = async (req, res) => {
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
        const notificacion = await Notificacion.findByPk(id);
        const fecha_lectura = moment(moment().subtract(5, "hours").format("YYYY-MM-DD"));
        await notificacion.update({
            leido: true,
            fecha_lectura
        });
        return res.status(200).json({
            msg: "Notificacion marcada como leida",
            notificacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

module.exports = {
    listarNotificacionesByUsuario,
    registrarNotificacion,
    marcarNotificacionLeida
}