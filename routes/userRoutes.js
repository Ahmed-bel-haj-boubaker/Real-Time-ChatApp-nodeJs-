const router = require('express').Router();
const userController = require('../controller/usersController')
router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/setAvatar/:id',userController.setAvatar);


module.exports = router;
