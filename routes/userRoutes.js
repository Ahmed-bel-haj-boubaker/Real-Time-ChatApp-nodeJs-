const router = require('express').Router();
const userController = require('../controller/usersController')
router.post('/register',userController.register);



module.exports = router;
