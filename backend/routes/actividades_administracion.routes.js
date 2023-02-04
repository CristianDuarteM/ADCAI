const {Router} = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const { listarActividadAdministracion, buscarActividadAdministracionById, registrarActividadAdministracion, actualizarActividadAdministracion, eliminarActividadAdministracion } = require("../controllers/actividades_administracion.controller");
const { noExisteAAdministracionById, existeActividadAdministracionByNombre } = require("../helpers/db-validators");

const router = Router();

router.get("/", [
    validarJwt,
    check("habilitada", "Debes enviarme si son habilitadas").notEmpty(),
    check("habilitada", "Debes enviarme si o no").isIn(["si", "no"]),
    validarCampos
], listarActividadAdministracion);

router.get("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteAAdministracionById),
    validarCampos
], buscarActividadAdministracionById);

router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("nombre", "El nombre debe tener maximo 400 caracteres").isLength({max:400}),
    //check("nombre").custom(existeActividadAdministracionByNombre),
    check("descripcion", "La descripcion debe tener 150 caracteres").optional().isLength({max:400}),
    check("listar", "El campo debe ser un boolean").optional().isBoolean(),
    validarCampos
], registrarActividadAdministracion);

router.put("/:id", [
    validarJwt,
    check("id", "El id de la activiad de exntensión es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteAAdministracionById),
    check("nombre", "El nombre debe tener maximo 400 caracteres").optional().isLength({max:400}),
    //check("nombre").optional().custom(existeActividadAdministracionByNombre),
    check("descripcion", "La descripcion debe tener 400 caracteres").optional().isLength({max:400}),
    check("listar", "El campo debe ser un boolean").optional().isBoolean(),
    validarCampos
], actualizarActividadAdministracion);

router.delete("/:id", [
    validarJwt,
    check("id", "El id de la activiad de extensión es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteAAdministracionById),
    validarCampos
], eliminarActividadAdministracion);

module.exports = router;