//DECLARATION
var express = require('express');
var bodyParser = require('body-parser');
var expSession = require('express-session');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var login = require('./controllers/login');
var admin = require('./controllers/admin');
var member = require('./controllers/member');
var home = require('./controllers/home');


var logout = require('./controllers/logout');
var app = express();


//CONFIGURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(expSession({secret:'my top secret value', saveUninitialized:true, resave: false}));
app.use(cookieParser());
app.use('/abc', express.static('xyz'))
app.use('/login', login);
app.use('/home', home);
app.use('/admin', admin);
app.use('/member', member);



app.use('/logout', logout);


//ROUTER
app.get('/', function(request, response){
	response.redirect('/login');
	
});





//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 3000...');
});