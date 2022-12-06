const moment = require("moment");
const { Periodo } = require("../models");

const listarPeriodos = async (req, res) => {
    const {limite = 20, desde = 0} = req.query;
    try {
        const periodos = await Periodo.findAndCountAll({
            attributes: { exclude: ["createdAt", "updatedAt"]},
            offset: Number(desde),
            limit: Number(limite)
        });
        periodos.rows.forEach((periodo) => {
            periodo.fecha_inicio = moment(periodo.fecha_inicio, "YYYY-MM-DD");
            periodo.fecha_limite = moment(periodo.fecha_limite, "YYYY-MM-DD");
        });
        res.status(200).json(periodos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarPeriodo = async (req, res) => {
    const {inicio, limite} = req.body;
    /*if(req.usuario.Rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }*/
    try {
        const fecha_inicio = moment(inicio, "YYYY-MM-DD");
        const fecha_limite = moment(limite, "YYYY-MM-DD");
        const anno = fecha_inicio.year();
        let semestre;
        if(fecha_inicio.month()+1 < 6){
            semestre = 1;
        } else{
            semestre = 2;
        }
        if(fecha_inicio.format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")){
            return res.status(400).json({
                msg: "La fecha de inicio no debe ser menor a la fecha actual",
                fecha_inicio,
                moment: moment().format("YYYY-MM-DD")
                
            });
        }
        if(fecha_limite < fecha_inicio){
            return res.status(400).json({
                msg: "La fecha limite no debe menor a la fecha inicio"
            });
        }
        const periodo = await Periodo.create({
            anno,
            semestre,
            fecha_inicio,
            fecha_limite
        });
        res.json({
            msg: "El periodo se ha registrado con exito",
            periodo,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const actualizarPeriodo = async (req, res) => {
    const {id} = req.params;
    const {limite} = req.body;
    /*if(req.usuario.Rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }*/
    try {
        const periodo = await Periodo.findByPk(id);
        const fecha_inicio = moment(periodo.fecha_inicio);
        const fecha_limite = moment(limite);
        if(fecha_limite < fecha_inicio){
            return res.status(400).json({
                msg: "La fecha limite no debe menor a la fecha inicio"
            });
        }
        await periodo.update({
            fecha_limite
        });
        res.json({
            msg: "El periodo se ha actualizado con exito",
            periodo
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const eliminarPeriodo = async (req, res) => {
    const {id} = req.params;
    /*if(req.usuario.Rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }*/
    try {
        const periodo = await Periodo.findByPk(id);
        await periodo.update({
            estado: false
        });
        res.status(201).json({
            msg: "Periodo eliminado con exito",
            periodo
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    registrarPeriodo,
    actualizarPeriodo,
    listarPeriodos,
    eliminarPeriodo
}