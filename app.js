var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var util = require('util');
var WebSocketServer = require("ws").Server

var mongoose = require('mongoose');
require('./models/feeds');
require('./models/users');
require('./config/passport');
require('./config/passport')(passport);
mongoose.connect('mongodb://heroku_dlb85pxc:qq2f0g0ks67p5vjmikm70fqr52@ds047325.mongolab.com:47325/heroku_dlb85pxc');

var routes = require('./routes/index');
var users = require('./routes/users');
var feeds = require('./routes/feeds');
var auth = require('./routes/auth');

var app = express();
var http = require('http');
var server = http.createServer(app);
server.listen(3000);
/*var io = require('socket.io').listen(server);
server.listen(3000);
io.on('connection', function(socket) {
    socket.on('new_status', function(status) {
        var newFeed = {'status':status};
        var Feed = mongoose.model('Feed');
        var feed = new Feed(newFeed);
        feed.save();
        socket.emit('new_update', status);
    });
});*/
var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/feeds', feeds);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
