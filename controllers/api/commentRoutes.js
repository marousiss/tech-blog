const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Create Comment
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    res.redirect(`/post/${req.body.post_id}`);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
