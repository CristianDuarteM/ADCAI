const {Router} = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

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
    validarCampos
], buscarPlanEstudioByFacultad);

router.post("/", [
    validarJwt,
    check("nombres", "Debe ingresar al menos un nombre de plan de estudio").notEmpty(),
    check("id_facultad", "El facultad es obligatorio").notEmpty(),
    check("id_facultad", "Id facultad invalido").isInt(),
    validarCampos
], registrarPlanEstudio);

router.put("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    validarCampos
], actualizarPlanEstudio);

router.delete("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    validarCampos
], eliminarPlanEstudio);

module.exports = router;