const {Router} = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");
const { noExisteFacultadById, noExistePlanEstudioById, existePlanEstudioByNombre } = require("../helpers/db-validators");

const { listarPlanEstudios, 
        buscarPlanEstudioByFacultad, 
        registrarPlanEstudio,
        actualizarPlanEstudio,
        eliminarPlanEstudio} = require("../controllers/plan_estudios.controller");

const router = Router();

router.get("/", [
    validarJwt
], listarPlanEstudios);

router.get("/facultad/:id", [
    validarJwt,
    check("id", "El id de la facultad no es valido").isInt(),
    check("id").custom(noExisteFacultadById),
    validarCampos
], buscarPlanEstudioByFacultad);

router.post("/", [
    validarJwt,
    check("nombres", "Debe ingresar al menos un nombre de plan de estudio").notEmpty(),
    check("nombres.*", "El nombre debe de tener maximo 50 caracteres").isLength({max: 50}),
    check("id_facultad", "El facultad es obligatorio").notEmpty(),
    check("id_facultad", "Id facultad invalido").isInt(),
    check("id_facultad").custom(noExisteFacultadById),
    validarCampos
], registrarPlanEstudio);

router.put("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExistePlanEstudioById),
    check("nombre").optional().custom(existePlanEstudioByNombre),
    check("nombre", "El nombre debe de tener maximo 50 caracteres").optional().isLength({max: 50}),
    check("id_facultad").optional().custom(noExisteFacultadById),
    validarCampos
], actualizarPlanEstudio);

router.delete("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExistePlanEstudioById),
    validarCampos
], eliminarPlanEstudio);

module.exports = router;