const express = require('express');
const validate = require('../config/validate');
const authValidation = require('../validations/authValidation');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshToken), authController.refreshTokens);

// Ruta za generisanje gostujućeg tokena
router.get('/guest-token', authController.guestMode);

// Ruta za slanje poruka od strane gostiju sa validacijom
// router.post('/guest-messages', validate(authValidation.guestMessage), auth('guest'), authController.guestMessage);

module.exports = router;