const router = require('express').Router();
const { User } = require('../../models');


//Create new user and set session variables
router.post('/', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (userData === null) {
      //create user
      const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.user_name = userData.name;
        res.status(200).json(userData);
      });

    } else {
      res
        .status(400)
        .json({ message: "Username already exists, please try again" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});


//
//
//Checks user if already exists and set session variables
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect name or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect name or password, please try again" });
      return;
    }

    //Save session variables
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: "You are now logged in!" });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


//Destroy session at logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
  
});

module.exports = router;
