const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/auth')

const ThreadsCtrl = require('../controllers/threads');

router.get('', ThreadsCtrl.getThreads);
router.post('',authUser , ThreadsCtrl.createThread)


module.exports = router;
