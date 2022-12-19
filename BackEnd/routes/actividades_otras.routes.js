const {Router} = require("express");
const { check } = require("express-validator");

const { listarOtraActividad, buscarOtraActividadById, registrarOtraActividad, actualizarOtraActivdad, eliminarOtraActividad } = require("../controllers/actividades_otras.controller");
const { noExisteOtraActividadById } = require("../helpers/db-validators");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [
    validarJwt,
    check("habilitada", "Debes enviarme si son habilitadas").notEmpty(),
    check("habilitada", "Debes enviarme si o no").isIn(["si", "no"]),
    validarCampos
], listarOtraActividad);

router.get("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteOtraActividadById),
    validarCampos
], buscarOtraActividadById);

router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("nombre", "El nombre debe tener maximo 100 caracteres").isLength({max:100}),
    check("descripcion", "La descripcion debe tener 100 caracteres").optional().isLength({max:100}),
    check("listar", "El campo debe ser un boolean").optional().isBoolean(),
    validarCampos
], registrarOtraActividad);

router.put("/:id", [
    validarJwt,
    check("id", "El id de la activiad de exntensión es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteOtraActividadById),
    check("nombre", "El nombre debe tener maximo 100 caracteres").optional().isLength({max:100}),
    check("descripcion", "La descripcion debe tener 100 caracteres").optional().isLength({max:100}),
    check("listar", "El campo debe ser un boolean").optional().isBoolean(),
    validarCampos
], actualizarOtraActivdad);

router.delete("/:id", [
    validarJwt,
    check("id", "El id de la activiad de extensión es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteOtraActividadById),
    validarCampos
], eliminarOtraActividad);

module.exports = router;