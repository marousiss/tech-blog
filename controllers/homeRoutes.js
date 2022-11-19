const router = require('express').Router();
const { User, Post } = require("../models");

// Home route
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attribute: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {posts});
    //res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;