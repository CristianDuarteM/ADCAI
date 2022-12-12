const {request, response} = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const {Firma, Usuario} = require("../models");

const registrarFirma = async (req = request, res = response) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {archivo} = req.files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];
    const extensionValidas = ["png", "jpg", "jpeg", "JPG"];
    if(!extensionValidas.includes(extension)){
            return res.status(400).json({
                    msg: `La extensión ${extension} no es permitida - ${extensionValidas}`
                });
        }
    try {
        const usuario = await Usuario.findByPk(req.usuario.id);
        let firma = await Firma.build();
        const {tempFilePath} = req.files.archivo;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        if(usuario.id_firma){
            firma = await Firma.findByPk(usuario.id_firma);
            const nombreArr = firma.ruta_firma.split("/");
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split(".");
            cloudinary.uploader.destroy(public_id);
        }
        firma.ruta_firma = secure_url;
        await firma.save();
        await usuario.update({
            id_firma: firma.id
        });
        res.status(201).json({
            msg: `Firma guardada con éxito`,
            firma
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};
/*
const eliminarFirma = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.usuario;
    try {
        const usuario = await Usuario.findByPk(id);
        /*await usuario.update({
            id_firma: null
        });
        if(!usuario.id_firma){
            return res.json({
                msg: "El usuario no tiene una firma asociada"
            });
        }
        const firma = await Firma.findByPk(usuario.id_firma);
        await firma.destroy();
        res.json({
            msg: `firma eliminado con éxito`,
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
*/
module.exports = {
    registrarFirma,
    //eliminarFirma
};