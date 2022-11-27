const router = require('express').Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Home - Get post
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
    res.render('homepage', {posts, logged_in: req.session.logged_in, user_id: req.session.user_id});
    //res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get post and comments for the post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attribute: ["name"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    commentData = await Comment.findAll({
        where: {
          post_id: req.params.id
        }
    });
    
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render("post", {
      post, comments,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', (req, res) => {
  if (!req.session.logged_in) {
    res.render("login"); 
  }
  res.render('homepage');
});


//Dashboard - Get all posts for the current user
router.get('/dashboard/:user_id', withAuth, async (req, res) => {
  try {
    const userPostData = await Post.findAll(
      {
        where: {
          user_id: req.params.user_id
        }
      },
      {
        include: [
          {
            model: User,
            attribute: ['name']
          }
        ]
      }
    );
    const posts = userPostData.map((userPost) => userPost.get({ plain: true }));
    res.render("dashboard", { posts, logged_in: req.session.logged_in, user_id: req.session.user_id, user_name: req.session.user_name });
    //res.status(200).json(userPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to add new post page
router.get("/addnewpost", withAuth, (req, res) => {
  res.render(
    "newpost", {logged_in: req.session.logged_in,
    user_id: req.session.user_id,
    user_name: req.session.user_name});
});

//Route to update post page
router.get("/updatepost/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attribute: ["name"],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("updatepost", {post,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
    });

  } catch (err) {
    res.status(500).res(err);
  }
});

// Route to sign up page
router.get("/signUp", (req, res) => {
  // If the user is already logged in, redirect the request to home page
  if (req.session.logged_in) {
    res.render('homepage');
    //res.redirect("/");
    //return;
  }
  res.render("signUp");
});

//Route to login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to home page
  if (req.session.logged_in) {
    //res.redirect("/");
    //return;
    res.render('homepage');
  }
  res.render("login");
});

module.exports = router;