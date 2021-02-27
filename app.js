/**
 * Module dependencies.
 */
const express = require('express');
const	path = require('path');
const	streams = require('./app/streams.js')();

const favicon = require('serve-favicon');
const	logger = require('morgan');
const	methodOverride = require('method-override');
const	bodyParser = require('body-parser');
const	errorHandler = require('errorhandler');

const app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// routing
require('./app/routes.js')(app, streams);

const server = app.listen(3000, function(){
  console.log('Express server listening on port ' + 3000);
});

const io = require('socket.io').listen(server);
/**
 * Socket.io event handling
 */
require('./app/socketHandler.js')(io, streams);