const {Router} = require("express");
const { check } = require("express-validator");

const { noExisteAsignaturaById, 
        noExisteProgramaById, 
        existeAsignaturaByNombre } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const { registrarAsignatura,
        actualizarAsignatura, 
        eliminarAsignatura, 
        //listarAsignaturas, 
        buscarAsignaturaByPlan_Estudio, 
        registrarVariasAsignaturas, 
        buscarAsignaturaById} = require("../controllers/asignaturas.controller");

const router = Router();

/*router.get("/", [
    validarJwt
], listarAsignaturas);*/

router.get("/programa/:id", [
    validarJwt,
    check("id", "El id del programa no es valido").isInt(),
    check("id").custom(noExisteProgramaById),
    check("habilitada", "Debes indicarme si quieres las materias habilitadas").notEmpty(),
    check("habilitada", "Debes indicarme si habilitada o no").isIn(["si", "no"]),
    validarCampos
], buscarAsignaturaByPlan_Estudio);

router.get("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteAsignaturaById),
    validarCampos
], buscarAsignaturaById);

router.post("/varias", [
    validarJwt,
    check("asignaturas.*.nombre", "El nombre es obligatorio").notEmpty(),
    check("asignaturas.*.descripcion", "La descripcion debe tener 150 caracteres").isLength({max:150}),
    check("asignaturas.*.creditos", "Los creditos son obligatorios").notEmpty(),
    check("asignaturas.*.creditos", "Los creditos deben ser un numero entero").isInt(),
    check("asignaturas.*.horas_teoricas", "Las horas teoricas son obligatorias").notEmpty(),
    check("asignaturas.*.horas_teoricas", "Las horas teoricas deben ser un numero entero").isInt(),
    check("asignaturas.*.horas_practicas", "Las horas practicas son obligatorias").notEmpty(),
    check("asignaturas.*.horas_practicas", "Las horas practicas deben ser un numero entero").isInt(),
    check("asignaturas.*.id_programa", "El id del programa es obligatorio").notEmpty(),
    check("asignaturas.*.id_programa", "El id del programa invalido").isInt(),
    check("asignaturas.*.id_programa").custom(noExisteProgramaById),
    validarCampos
], registrarVariasAsignaturas);

router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("nombre").custom((nombre, {req}) => existeAsignaturaByNombre(nombre, req)),
    check("descripcion", "La descripcion debe tener 150 caracteres").isLength({max:150}),
    check("creditos", "Los creditos son obligatorios").notEmpty(),
    check("creditos", "Los creditos deben ser un numero entero").isInt(),
    check("horas_teoricas", "Las horas teoricas son obligatorias").notEmpty(),
    check("horas_teoricas", "Las horas teoricas deben ser un numero entero").isInt(),
    check("horas_practicas", "Las horas practicas son obligatorias").notEmpty(),
    check("horas_practicas", "Las horas practicas deben ser un numero entero").isInt(),
    check("id_programa", "El id del programa es obligatorio").notEmpty(),
    check("id_programa", "El id del programa invalido").isInt(),
    check("id_programa").custom(noExisteProgramaById),
    validarCampos
], registrarAsignatura);

router.put("/:id", [
    validarJwt,
    check("id", "El id de la asignatura es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteAsignaturaById),
    check("nombre").custom((nombre, {req}) => existeAsignaturaByNombre(nombre, req)),
    check("descripcion", "La descripcion debe tener 150 caracteres").isLength({max:150}),
    check("creditos", "Los creditos deben ser un numero entero").isInt(),
    check("horas_teoricas", "Las horas teoricas deben ser un numero entero").isInt(),
    check("horas_practicas", "Las horas practicas deben ser un numero entero").isInt(),
    check("id_programa").optional().custom(noExisteProgramaById),
    validarCampos
], actualizarAsignatura);

router.delete("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteAsignaturaById),
    validarCampos
], eliminarAsignatura);

module.exports = router;