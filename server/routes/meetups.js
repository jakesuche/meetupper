const express = require('express');
const router = express.Router();

const MeetupsCtrl = require('../controllers/meetups');
const { authUser } = require('../controllers/auth')
console.log(!!authUser)

router.get('', MeetupsCtrl.getMeetups);
router.get('/secret', authUser, MeetupsCtrl.getSecret);
router.get('/:id', MeetupsCtrl.getMeetupById);
router.post('', authUser, MeetupsCtrl.createMeetup);
router.post('/:id/join', authUser, MeetupsCtrl.joinMeetup)
router.post('/:id/leave', authUser,MeetupsCtrl.leaveMeetup )

router.patch('/:id', authUser, MeetupsCtrl.updateMeetup)
module.exports = router;
