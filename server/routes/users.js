const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');
const { authUser } = require('../controllers/auth')

router.get('', UsersCtrl.getUsers);
router.get('/me', authUser ,UsersCtrl.getCurrentUser)
router.post ('/register',  UsersCtrl.register)
router.post ('/login',  UsersCtrl.login)
router.post('/logout', UsersCtrl.logout)


module.exports = router;
