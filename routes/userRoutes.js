const router = require('express').Router();
const userController = require('../controller/usersController')
router.post('/register',userController.register);
router.post('/login',userController.login);


module.exports = router;
