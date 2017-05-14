var express = require('express');
var router = express.Router();

// var test = require('../handlers/test')(app);

router.use(function (req, res, next) {
  console.log('router time:', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Home'
  });
});

router.get('/about', function(req, res) {
  res.render('about', {
    title: 'About'
  });
});

router.get('/contact', function(req, res) {
  res.render('contact', {
    title: 'Contact'
  });
});

// router.get('/test', test.index);

module.exports = router;
