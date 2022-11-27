const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");


//Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create(req.body)
      res.redirect(`/dashboard/${req.body.user_id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update a post
router.put('/:id', async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete a post
router.delete('/:id', async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;