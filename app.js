// TODO: separate hbs files into partials  DONE!

// TODO: do something using fileserve   DONE!

// TODO: do something using handlers and rendering a view

// TODO: get webpack

// TODO: https://coderwall.com/p/zpjrra/async-waterfall-in-nodejs

var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var sassMiddleware  = require('node-sass-middleware');
var index           = require('./routes/index');
var weather         = require('./handlers/weather')(app);
var hbs             = require('hbs');
var fs              = require('fs');
var app             = express();

hbs.registerPartial('scripts', fs.readFileSync(__dirname + '/views/partials/_scripts.hbs', 'utf8'));
hbs.registerPartial('header', fs.readFileSync(__dirname + '/views/partials/_header.hbs', 'utf8'));
hbs.registerPartial('footer', fs.readFileSync(__dirname + '/views/partials/_footer.hbs', 'utf8'));
hbs.registerPartial('leftNav', fs.readFileSync(__dirname + '/views/partials/_leftNav.hbs', 'utf8'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  console.log('app time:', Date.now());
  next();
});

app.use(weather.scrape);

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
})

module.exports = app;
