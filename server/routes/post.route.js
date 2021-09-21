const router = require('express').Router();
const postCtrl = require('./../controllers/postCtrl');
const isAuthenticated = require('./../middlewares/auth');

router.route('/post')
  .post(isAuthenticated, postCtrl.createPost)
  .get(isAuthenticated, postCtrl.getPosts);

router.route('/post/:id').patch(isAuthenticated, postCtrl.editPost);

router.route('/post/like/:id').patch(isAuthenticated, postCtrl.likePost);
router.route('/post/unlike/:id').patch(isAuthenticated, postCtrl.unlikePost);

module.exports = router;