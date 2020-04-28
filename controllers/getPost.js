const Post = require('../database/models/Post');

module.exports = async(req, res) => {
    const post = await (await Post.findById(req.params.id)).populated('author');
    res.render('post',{
        post
    })
}