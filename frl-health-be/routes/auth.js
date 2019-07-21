let models  = require('../models');
let express = require('express');
let router = express.Router();

/* POST register */
router.post("/register", (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.json({
      code: 0,
      message: 'Password not match',
    })
  }
  return models.Users.create({
    username: req.body.username,
    password: req.body.password,
  }).then((result) => {
    res.json({
      code: 1,
      data: result
    })
  }).catch((error) => {
    res.json({
      code: 0,
      message: error.errors && error.errors[0] && error.errors[0].message,
      type: error.errors && error.errors[0] && error.errors[0].type,
    });
  });
});

/* POST login */
router.post('/login', (req, res) => {
  models.Users.findOne({
    where: {
      username: req.body.username,
      password: req.body.password,
    }
  }).then((result) => {
    res.json({
      code: result ? 1 : 0,
      data: result
    })
  }).catch((error) => {
    res.json({
      code: 0,
      message: error.errors && error.errors[0] && error.errors[0].message,
      type: error.errors && error.errors[0] && error.errors[0].type,
    });
  });
});

module.exports = router;
