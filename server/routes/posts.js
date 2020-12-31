const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/auth')

const PostsCtrl = require('../controllers/posts');

router.get('', PostsCtrl.getPosts);
router.post('', authUser, PostsCtrl.createPost)

module.exports = router;
