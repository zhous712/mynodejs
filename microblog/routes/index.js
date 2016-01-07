var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/u/:user', function (req, res) {
});

router.post('/post', function (req, res) {
});

router.get('/reg', function (req, res) {
});

router.post('/reg', function (req, res) {
});

router.get('/login', function (req, res) {
});

router.post('/login', function (req, res) {
});

router.post('/logout', function (req, res) {
});

router.get('/hello', function (req, res, next) {
  console.log('this is first hello');
  next();
});

router.get('/hello', function (req, res) {
  res.send('The time is ' + new Date().toString());
});

router.get('/list', function (req, res, next) {
  res.render('list', {
    title: 'List',
    items: [1991, 'zhous', 'express', 'Node.js']
  });
});

router.get('/helper', function (req, res) {
  res.render('helper', {
    title: 'Helpers'
  });
});

module.exports = router;
