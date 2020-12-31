const Thread = require('../models/threads');
const Post = require('../models/posts');
exports.getPosts = function(req, res) {
  const threadId = req.query.threadId;

  Post.find({'thread': threadId})
        .populate('user')
        .exec((errors, posts) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(posts);
  });
}

exports.createPost = function(req,res){
  const postData = req.body
  const post = new Post(postData)
  post.user = req.user

  post.save((errors, createPost) => {
    if(errors) {
    return res.status(422).send({errors})
  }

  Thread.update({ _id:createPost.thread }, {$push:{posts:createPost}},() =>{
    return res.json(createPost)
  })
})
}
