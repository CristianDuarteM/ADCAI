const {Router} = require("express");
const { check } = require("express-validator");
const { signInGoogle } = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos.middleware");

const router = Router();

router.post("/login", [
    check("id_token", "id_token es necesario").notEmpty(),
    validarCampos
], signInGoogle);

module.exports = router;