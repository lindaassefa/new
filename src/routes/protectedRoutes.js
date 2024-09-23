const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.json({
      message: 'Welcome to your health support dashboard',
      user: {
        id: req.user.id,
        username: req.user.username,
      }
    });
  });
  

router.get('/test', (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;