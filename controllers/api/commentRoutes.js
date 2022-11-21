const router = require('express').Router();
const { Comment } = require('../../models');

//Create Comment
router.post('/', async (req, res) => {
  try {
    const commentData = Comment.create(req.body);
    res.status(200).jsonp(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
