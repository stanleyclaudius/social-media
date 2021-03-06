const Comment = require('./../models/Comment');
const Post = require('./../models/Post');

const commentCtrl = {
  createComment: async(req, res) => {
    try {
      const {content, tag, reply, postId} = req.body;
      if (!content)
        return res.status(400).json({msg: 'Comment content can\'t be empty.'});

      const post = await Post.findOne({_id: postId});
      if (!post)
        return res.status(404).json({msg: 'Post not found.'});

      const newComment = new Comment({
        content,
        tag,
        reply,
        user: req.user._id,
        postId
      });

      await Post.findOneAndUpdate({_id: postId}, {
        $push: {
          comments: newComment._id
        }
      }, {new: true});

      await newComment.save();

      res.status(200).json({newComment});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  editComment: async(req, res) => {
    try {
      const {content} = req.body;
      const newComment = await Comment.findOneAndUpdate({_id: req.params.id, user: req.user._id}, {content});
      if (!newComment)
        return res.status(400).json({msg: 'Can\'t edit comment that not own by current authenticated user.'})

      res.status(200).json({newComment});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  likeComment: async(req, res) => {
    try {
      const isLike = await Comment.find({_id: req.params.id, likes: req.user._id});
      if (isLike.length > 0)
        return res.status(400).json({msg: 'You have liked this comment.'});

      await Comment.findOneAndUpdate({_id: req.params.id}, {
        $push: {
          likes: req.user._id
        }
      }, {new: true});

      res.status(200).json({
        msg: 'Comment liked.'
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  unlikeComment: async(req, res) => {
    try {
      await Comment.findOneAndUpdate({_id: req.params.id}, {
        $pull: {
          likes: req.user._id
        }
      }, {new: true});

      res.status(200).json({
        msg: 'Comment unliked.'
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  deleteComment: async(req, res) => {
    try {
      await Comment.findOneAndDelete({_id: req.params.id});

      res.status(200).json({
        msg: 'Comment deleted'
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
};

module.exports = commentCtrl;