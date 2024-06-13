const express = require('express');
const router = express.Router();
const validate = require('../config/validate');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation')


router.route('/')
    .post(validate(userValidation.CreateUser), userController.createUser)
    .get(validate(userValidation.GetUsers), userController.getUsers);

router.route('/:userId')
    .get(validate(userValidation.GetUser), userController.getUser)
    .put(validate(userValidation.updateUser), userController.updateUser)
    .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;