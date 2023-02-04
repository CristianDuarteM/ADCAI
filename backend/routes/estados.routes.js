/*const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");
const { existeEstadobyNombre, 
        noExisteEstadoById } = require("../helpers/db-validators");

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
    check("nombre", "El nombre debe tener 50 caracteres").isLength({max: 50}),
    check("nombre").custom(existeEstadobyNombre),
    check("descripcion", "La descripcion debe tener 150 caracteres").optional().isLength({max: 150}),
    validarCampos
], registrarEstado);

router.put("/:id", [
    validarJwt,
    check("id", "El id es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteEstadoById),
    check("nombre", "El nombre debe tener 50 caracteres").optional().isLength({max: 50}),
    check("nombre").optional().custom(existeEstadobyNombre),
    check("descripcion", "La descripcion debe tener 150 caracteres").optional().isLength({max: 150}),
    validarCampos
], actualizarEstado);

router.delete("/:id", [
    validarJwt,
    check("id", "El id es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteEstadoById),
    validarCampos
], eliminarEstado);

module.exports = router;*/