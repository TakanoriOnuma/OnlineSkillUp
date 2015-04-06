var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users  = require('./routes/users');
var detail = require('./routes/detail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/detail', detail);

// ToDoスキーマの定義
var Schema = mongoose.Schema;
var todoSchema = new Schema({
  isCheck     : { type: Boolean, default: false },
  listName    : String,
  text        : String,
  createdDate : { type: Date, default: Date.now },
  limitDate   : Date
});
mongoose.model('Todo', todoSchema);
var todoListSchema = new Schema({
  listName : String
});
mongoose.model('TodoList', todoListSchema);

app.get('/test', function(req, res) {
  var listName = req.body.listName;
  var Todo = mongoose.model('Todo');
  Todo.find({listName: listName}, function(err, todos) {
    res.send(todos);
  });
});

app.get('/todo', function(req, res) {
  var TodoList = mongoose.model('TodoList');
  TodoList.find({}, function(err, todoLists) {
    res.send(todoLists);
  });
});

app.post('/todo', function(req, res) {
  var listName = req.body.listName;
  if(listName !== '') {
    var TodoList = mongoose.model('TodoList');
    var todoList = new TodoList();
    todoList.listName = listName;
    todoList.save();

    res.send(true);
  }
  else {
    res.send(false);
  }
});

app.get('/todoDetail', function(req, res) {
  var listName = req.body.listName;
  var Todo = mongoose.model('Todo');
  Todo.find({listName: listName}, function(err, todos) {
    res.send(todos);
  });
});

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
