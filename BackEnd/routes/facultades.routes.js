const {Router} = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");
const { noExisteFacultadById, existeFacultadByNombre, noExisteUsuarioById } = require("../helpers/db-validators");

const { registrarFacultad,
        actualizarFacultad,
        eliminarFacultad,
        listarFacultades,
        buscarFacultadById,
        buscarDecanoEnFacultad} = require("../controllers/facultades.controller");


const router = Router();


router.get("/buscarFacultad/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteUsuarioById),
    validarCampos
], buscarDecanoEnFacultad);

router.get("/", [
    validarJwt
], listarFacultades);

router.get("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteFacultadById),
    validarCampos
], buscarFacultadById);


router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("nombre", "El nombre debe tener máximo 50 caracteres").isLength({max: 50}),
    check("nombre").custom(existeFacultadByNombre),
    check("descripcion", "La descripcion debe tener máximo 150 caracteres").optional().isLength({max: 150}),
    check("correoDecano", "El correo del decano es obligatorio").notEmpty(),
    check("correoDecano", "El correo es invalido").isEmail(),
    check("realizaCai", "realizaCai es obligatorio").notEmpty(),
    check("realizaCai").isBoolean(),
    validarCampos
], registrarFacultad);

router.put("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteFacultadById),
    check("nombre", "El nombre debe tener máximo 50 caracteres").optional().isLength({max: 50}),
    check("nombre").optional().custom(existeFacultadByNombre),
    check("descripcion", "La descripcion debe tener máximo 150 caracteres").optional().isLength({max: 150}),
    check("correoDecano", "El correo es invalido").optional().isEmail(),
    check("realizaCai").optional().isBoolean(),
    validarCampos
], actualizarFacultad);

router.delete("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteFacultadById),
    validarCampos
], eliminarFacultad);

module.exports = router;