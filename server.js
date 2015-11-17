var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var passport = require("passport");
var session = require('express-session');
var mongoose = require('mongoose');
require('./models/AppModel');
require('./models/ComModel');
require('./models/MsgModel');
require('./models/JobsModel');
require('./models/User');
require('./config/passport');
require('./config/auth');


mongoose.connect('mongodb://localhost/smartsamaritan');


app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

passport.initialize();
//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(session({ secret: 'mysecret' })); //add for GithubStrategy
app.use(session({ secret: 'IhaveAsecret',cookie: { secure: false } }));
app.use(passport.initialize());
app.use(passport.session());

// Route Links
var appRoutes = require('./routes/AppRoutes');
var comRoutes = require('./routes/ComRoutes');
var jobsRoutes = require('./routes/JobsRoutes');
var msgRoutes = require('./routes/MsgRoutes');
var userRoutes = require('./routes/UserRoutes');
var resetRoutes = require('./routes/ResetPassRoute');

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

// API
app.use('/api/app', appRoutes);
app.use('/api/com', comRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/msg', msgRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reset', resetRoutes);

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});
