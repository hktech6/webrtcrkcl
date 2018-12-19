var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var cons = require('consolidate');



app.locals.pretty = true;
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + '/app/server/views');
app.engine('html', cons.swig);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'html');

//app.set('view engine', 'html');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/server/routes')(app);   

server.listen(3001);
// WARNING: app.listen(80) will NOT work here!


//app.get('/', function (req, res) {
//  res.sendFile(__dirname + '/index.html');
//});

require('./app/server/modules/chat-manager')(io);
//io.on('connection', function (socket) {
//	console.log('s');
//  //socket.emit('news', { hello: 'world' });
//  //socket.emit('message', { hello: 'fdsfsfdsf' });
// socket.on('message', function (data) {
//    console.log(data);
//  });
//});