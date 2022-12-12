const {Router} = require("express");
const { check } = require("express-validator");

const { noExisteFacultadById,
        noExisteDepartamentoById, 
        existeDepartamentoByNombre} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const { registrarDepartamento,
        actualizarDepartamento,
        eliminarDepartamento, 
        listarDepartamentos,
        buscarDepartamentoById,
        buscarDepartamentoByFacultad,
    } = require("../controllers/departamentos.controller");

const router = Router();

router.get("/", [
    validarJwt
], listarDepartamentos);

router.get("/facultad/:id", [
    validarJwt,
    check("id", "El id de la facultad no es valido").isInt(),
    check("id").custom(noExisteFacultadById),
    validarCampos
], buscarDepartamentoByFacultad);

router.get("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteDepartamentoById),
    validarCampos
], buscarDepartamentoById);

router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("nombre", "El nombre no debe ser mayor a  50 caracteres").isLength({max: 50}),
    check("nombre").custom(existeDepartamentoByNombre),
    check("descripcion", "La descripcion no debe ser mayor a  150 caracteres").optional().isLength({max: 150}),
    check("id_facultad", "El id de la facultad es obligatorio").notEmpty(),
    check("id_facultad", "Id facultad invalido").isInt(),
    check("id_facultad").custom(noExisteFacultadById),
    check("correoDirector", "El correo del director es obligatorio").notEmpty(),
    check("correoDirector", "El correo es invalido").isEmail(),
    check("realizaCai", "realizaCai es obligatorio").notEmpty(),
    check("realizaCai").isBoolean(),
    validarCampos
], registrarDepartamento);

router.put("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteDepartamentoById),
    check("nombre", "El nombre debe tener máximo 50 caracteres").optional().isLength({max: 50}),
    check("nombre").optional().custom(existeDepartamentoByNombre),
    check("descripcion", "La descripcion no debe ser mayor a  150 caracteres").optional().isLength({max: 150}),
    check("id_facultad").optional().custom(noExisteFacultadById),
    check("correoDecano", "El correo es invalido").optional().isEmail(),
    check("realizaCai").optional().isBoolean(),
    validarCampos
], actualizarDepartamento);

router.delete("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteDepartamentoById),
    validarCampos
], eliminarDepartamento);

module.exports = router;