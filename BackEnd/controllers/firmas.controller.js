const {request, response} = require("express");
const {Firma, Usuario} = require("../models");

const registrarFirma = async (req = request, res = response) => {
    const {ruta_firma} = req.body;
    try {
        const usuario = await Usuario.findByPk(req.usuario.id);
        if(usuario.id_firma){
            const firma = await Firma.findByPk(usuario.id_firma);
            await firma.destroy();
        }
        const firma = await Firma.create({
            ruta_firma
        });
        await usuario.update({
            id_firma: firma.id
        });
        res.status(201).json({
            msg: `Firma guardada con exito`,
            firma,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const eliminarFirma = async (req, res) => {
    const {id} = req.usuario;
    try {
        const usuario = await Usuario.findByPk(id);
        /*await usuario.update({
            id_firma: null
        });*/
        if(!usuario.id_firma){
            return res.json({
                msg: "El usuario no tiene una firma asociada"
            });
        }
        const firma = await Firma.findByPk(usuario.id_firma);
        await firma.destroy();
        res.json({
            msg: `firma eliminado con exito`,
            firma,
            //usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

module.exports = {
    registrarFirma,
    eliminarFirma
};