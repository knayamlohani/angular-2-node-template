var app, bodyParser, cookieParser, express, favicon, hbs, logger, path, serviceRoutes, viewRoutes;

express = require('express');

path = require('path');

favicon = require('serve-favicon');

logger = require('morgan');

cookieParser = require('cookie-parser');

bodyParser = require('body-parser');

hbs = require('hbs');

viewRoutes = require('./routes/view_routes');

serviceRoutes = require('./routes/service_routes');

app = express();

hbs.registerHelper('raw', function(options) {
  return options.fn(this);
});

app.set('views', path.join(__dirname, '/../../web/build/views'));

app.set('view engine', 'html');

app.engine('html', hbs.__express);

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express["static"](path.join(__dirname, '/../../web/build/static')));

app.use(express["static"](path.join(__dirname, '/../../node_modules')));

app.use('/', viewRoutes);

app.use('/serviceRoutes', serviceRoutes);

app.use(function(req, res, next) {
  var err;
  err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
