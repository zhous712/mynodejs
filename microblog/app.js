var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var partials = require('express-partials');
app.use(partials());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: settings.cookieSecret,
    key: settings.db,//cookie name
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },//30 days
    store: new MongoStore({
        db: settings.db,
        url: 'mongodb://localhost'
    }, function () {
        console.log('connect mongodb success...');
    })
}));
app.use(express.static(path.join(__dirname, 'public')));

var util = require('util');
app.use(function (req, res, next) {
    res.locals.inspect = function (obj) {
        return util.inspect(obj, true);
    }
    res.locals.headers = req.headers;
    next();
});

var flash = require('connect-flash');
app.use(flash());

app.use('/', routes);
app.use('/u/:user', routes);
app.use('/post', routes)
app.use('/reg', routes)
app.use('/login', routes);
app.use('/logout', routes);
app.use('/hello', routes);
app.use('/list', routes);
app.use('/helper', routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
app.listen(3000);
app.set('port', process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.get('port'),
    app.get('env'));