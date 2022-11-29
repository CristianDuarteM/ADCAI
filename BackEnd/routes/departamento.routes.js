const {Router} = require("express");
const { check } = require("express-validator");

const { registrarDepartamento,
        actualizarDepartamento,
        eliminarDepartamento, 
        listarDepartamentos,
        buscarDepartamentoById,
        buscarDepartamentoByFacultad,
    } = require("../controllers/departamento.controller");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [
    validarJwt
], listarDepartamentos);

router.get("/facultad/:id", [
    validarJwt,
    check("id", "El id de la facultad no es valido").isInt(),
    validarCampos
], buscarDepartamentoByFacultad);

router.get("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    validarCampos
], buscarDepartamentoById);

router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("id_facultad", "El facultad es obligatorio").notEmpty(),
    check("id_facultad", "Id facultad invalido").isInt(),
    validarCampos
], registrarDepartamento);

router.put("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    validarCampos
], actualizarDepartamento);

router.delete("/:id", [
    //validarJwt,
    check("id", "El id no es valido").isInt(),
    validarCampos
], eliminarDepartamento);

module.exports = router;