const express = require('express');
const router = express.Router();

const MeetupsCtrl = require('../controllers/meetups');
const { authUser } = require('../controllers/auth')
console.log(!!authUser)

router.get('', MeetupsCtrl.getMeetups);
router.get('/secret', authUser, MeetupsCtrl.getSecret);
router.get('/:id', MeetupsCtrl.getMeetupById);

module.exports = router;
