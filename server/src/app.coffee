# imports
express       = require 'express'
path          = require 'path'
favicon       = require 'serve-favicon'
logger        = require 'morgan'
cookieParser  = require 'cookie-parser'
bodyParser    = require 'body-parser'
hbs           = require 'hbs'


# route imports
viewRoutes    = require './routes/view_routes'
serviceRoutes = require './routes/service_routes'

app = express();

# view render helpers
hbs.registerHelper 'raw', (options)  ->
  options.fn this


# view engine setup
app.set 'views', path.join __dirname, '/../../web/build/views'
app.set 'view engine', 'html'
app.engine 'html', hbs.__express

# uncomment after placing your favicon in /public
# app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

# middlewares
app.use logger('dev')
app.use bodyParser.json()
app.use bodyParser.urlencoded({ extended: false })
app.use cookieParser()
app.use require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
})
app.use express.static(path.join(__dirname, '/../../web/build/static'))
app.use express.static(path.join(__dirname, '/../../node_modules'))

#route mounts
app.use '/', viewRoutes
app.use '/serviceRoutes', serviceRoutes

# catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error 'Not Found'
  err.status = 404;
  next err
  return


# error handler
app.use (err, req, res, next) ->
  # set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = if req.app.get('env') == 'development' then err else  {}

  # render the error page
  res.status err.status || 500
  res.render 'error'
  return

module.exports = app;
