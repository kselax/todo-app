var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const Config = require('config')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const io = require('socket.io')()
const mysql = require('mysql2/promise')

const DB = require('./core/my_db/DB')
const graphqlTodo = require('./schema/todo') 

const dbOptions = {
  connectionLimit: Config.DB.CONNECTIONLIMIT,
  host: Config.DB.HOST,
  user: Config.DB.USER,
  password: Config.DB.PASSWORD,
  database: Config.DB.DATABASE,
}
DB.setOptions(dbOptions, mysql)


var app = express();

// a graphql API router
app.use('/graphql', graphqlHTTP({
  schema: graphqlTodo.schema,
  rootValue: graphqlTodo.root,
  graphiql: true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

server = require('http').Server(app)
io.attach(server)

require('./socket/')(io)


module.exports = { app, server, io };
