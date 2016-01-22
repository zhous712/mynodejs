var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/u/:user', function (req, res) {
});

router.post('/post', function (req, res) {
});

router.get('/reg', function (req, res) {
    res.render('reg', { title: '用户注册' });
});

router.post('/reg', function (req, res) {
    //检验用户两次输入的口令是否一致
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', '两次输入的口令不一致');
        console.log('两次输入的口令不一致');
        return res.redirect('/reg');
    }
    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var newUser = new User({
        name: req.body.username,
        password: password,
    });
    //检查用户名是否已经存在
    User.get(newUser.name, function (err, user) {
        if (user)
            err = 'Username already exists.';
        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }
        //如果不存在则新增用户
        newUser.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            req.session.user = newUser;
            req.flash('success', '注册成功');
            res.redirect('/');
        });
    });
});

router.get('/login', function (req, res) {
    res.render('login', { title: '用户登入' });
});

router.post('/login', function (req, res) {
    if (req.body.username == '' || req.body.password == '') {
        req.flash('error', '用户和密码不能为空');
        return res.redirect('/login');
    }
      //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    User.get(req.body.username, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', '用户口令错误');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', '登入成功');
        res.redirect('/');
    });
});

router.post('/logout', function (req, res) {
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/');
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
