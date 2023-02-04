const {Router} = require("express");
const { check } = require("express-validator");
const { listarNotas, buscarNotasById, registrarNota, actualizarNota, eliminarNota } = require("../controllers/notas.controller");

const { noExisteNotaById } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [
    validarJwt,
    check("habilitada", "Debes indicarme si quieres las actividades habilitadas").notEmpty(),
    check("habilitada", "Debes indicarme si habilitada o no").isIn(["si", "no"]),
    validarCampos
], listarNotas);

router.get("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteNotaById),
    validarCampos
], buscarNotasById);

router.post("/", [
    validarJwt,
    check("descripcion", "Descripcion obligatoria").notEmpty(),
    check("descripcion", "La descripcion debe tener menos de 1000 caracteres").isLength({max:1000}),
    validarCampos
], registrarNota);

router.put("/:id", [
    validarJwt,
    check("id", "El id de la nota es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteNotaById),
    check("descripcion", "La descripcion debe tener menos de 1000 caracteres").optional().isLength({max:1000}),
    validarCampos
], actualizarNota);

router.delete("/:id", [
    validarJwt,
    check("id", "El id de la nota es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteNotaById),
    validarCampos
], eliminarNota);

module.exports = router;