const {Router} = require("express");
const { check, query } = require("express-validator");

const {existeAInvestigacionByNombre, noExisteAInvestigacionById} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const { registrarActividadInvestigacion, actualizarActividadInvestigacion, eliminarActividadInvestigacion, listarActividadInvestigacion, buscarActividadInvestigacionById } = require("../controllers/actividades_investigacion.controller");

const router = Router();

router.get("/", [
    validarJwt,
    query("habilitada", "Debes indicarme si quieres las actividades habilitadas").notEmpty(),
    check("habilitada", "Debes indicarme si habilitada o no").isIn(["si", "no"]),
    validarCampos
], listarActividadInvestigacion);

router.get("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteAInvestigacionById),
    validarCampos
], buscarActividadInvestigacionById);

router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("nombre", "El nombre debe tener maximo 200 caracteres").isLength({max:200}),
    //check("nombre").custom(existeAInvestigacionByNombre),
    check("descripcion", "La descripcion debe tener 150 caracteres").optional().isLength({max:150}),
    check("horas_minimas", "Las horas minimas deben ser un numero entero").isInt(),
    check("horas_maximas", "Las horas teoricas son obligatorias").notEmpty(),
    check("horas_maximas", "Las horas maximas deben ser un numero entero").isInt(),
    check("descripcion_horas", "La descripcion de las horas es obligatoria").notEmpty(),
    check("descripcion_horas", "La descripcion de las horas debe tener maximo 200 caracteres").isLength({max:200}),
    validarCampos
], registrarActividadInvestigacion);

router.put("/:id", [
    validarJwt,
    check("id", "El id de la activiad de investigacion es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteAInvestigacionById),
    check("nombre", "El nombre debe tener maximo 200 caracteres").optional().isLength({max:200}),
    //check("nombre").optional().custom(existeAInvestigacionByNombre),
    check("descripcion", "La descripcion debe tener 150 caracteres").optional().isLength({max:150}),
    check("horas_minimas", "Las horas minimas deben ser un numero entero").optional().isInt(),
    check("horas_maximas", "Las horas maximas deben ser un numero entero").optional().isInt(),
    check("descripcion_horas", "La descripcion de las horas debe tener maximo 200 caracteres").optional().isLength({max:200}),
    validarCampos
], actualizarActividadInvestigacion);

router.delete("/:id", [
    validarJwt,
    check("id", "El id de la activiad de investigacion es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteAInvestigacionById),
    validarCampos
], eliminarActividadInvestigacion);

module.exports = router;