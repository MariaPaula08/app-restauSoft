const express = require('express');
const router = express.Router();
const {
    signupValidator,
    signinValidator,
    validatorResult,
} = require('../middleware/validator');
const { signupController, signinController } = require('../controllers/auth');

router.post('/registrarse', signupValidator, validatorResult, signupController);
router.post('/iniciarSesion', signinValidator, validatorResult, signinController);

module.exports = router;
