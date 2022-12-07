const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { existeEstado } = require("../middlewares/db-validators");
const { validarJwt } = require("../middlewares/validar-jwt");

const { listarEstados,
        registrarEstado, 
        actualizarEstado,
        eliminarEstado} = require("../controllers/estados.controller");

const router = Router();

router.get("/", [
    validarJwt
], listarEstados);

router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("nombre").custom(existeEstado),
    validarCampos
], registrarEstado);

router.put("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id", "El id es obligatorio").notEmpty(),
    validarCampos
], actualizarEstado);

router.delete("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    validarCampos
], eliminarEstado);

module.exports = router;