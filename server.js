var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var session = require('express-session');
var flash = require('connect-flash');
var session = require('express-session');
var config = require('./config/database');
var passport = require('passport');
var bcrypt = require('bcryptjs');
let Administrator = require('./models/administrator');
const port = process.env.PORT || 3001;
const formidable = require('formidable');
const Binary = require('mongodb').Binary;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
};

/*
-------------------------------------------------------------------------
-----------------------DATABASE CONFIGURATION----------------------------
-------------------------------------------------------------------------
*/
var mongoose = require('mongoose');
mongoose.connect(config.database);
let db = mongoose.connection;

//Check connection to db

db.once('open', function () {
  console.log('Connected to mongoDB');
});

//check for db errors

db.on('error', function (err) {
  console.log(err);
});

/*
-------------------------------------------------------------------------
---------------------Declaration of the application----------------------
-------------------------------------------------------------------------
*/

var app = express();

app.listen(port, () => console.log(`Listening on port ${port}`));

/*
-------------------------------------------------------------------------
-----------------------------MIDDLEWARE----------------------------------
-------------------------------------------------------------------------
*/

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set static Path to public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Express validator middleware
app.use(expressValidator());



//Passport config
require('./config/passport')(passport);
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*',function(req,res,next){
	res.locals.user = req.user || null;
	next();
});

/*
-------------------------------------------------------------------------
---------------------------GLOBAL VARIABLES------------------------------
-------------------------------------------------------------------------
*/
app.use(function(req,res,next){
	res.locals.errors = null;
	next();
});

/*
-------------------------------------------------------------------------
---------------------------API------------------------------
-------------------------------------------------------------------------
*/

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


//Register process
app.post('/register',function(req,res){
  console.log(req);
  const username = req.body.username;
  const password = req.body.password;

  req.checkBody('username', 'El correo no puede ser vacio').notEmpty();
  req.checkBody('password', 'La contraseña no puede ser vacia').notEmpty();

  let errors = req.validationErrors();

  if(errors){
    console.log(errors)
  }
  else{
    let newAdministrator = new Administrator({
      username:username,
      password:password,
    });

    bcrypt.genSalt(10,function(err,salt){
      bcrypt.hash(newAdministrator.password,salt, function(err,hash){
        if(err){
          console.log(err);
        }
        else{
          newAdministrator.password = hash;
          newAdministrator.save(function(err){
            if(err){
              console.log(err);
            }
            else{
              res.redirect('login');
            }
          });

        }
      });
    });
  }
});

app.post('/new/user',function(req,res,next){
  passport.authenticate('local',{
    successRedirect:'/conjuntos',
    failureRedirect:'/administrators/login',
    failureFlash: true
  })(req,res,next);
});

app.post('/archivo',function(req,res,next){
  var form = new formidable.IncomingForm();
     form.parse(req, function (err, fields, files) {
       var data = files[0];
       var insert_data = {};
       insert_data.file_data= Binary(data);
       var collection = db.collection('archivos');
       collection.insert(insert_data, function(err, result){
        if (err) {
           console.log(err);
         } else{
           console.log('Exito');
         }
       });
       res.end();
     });
});

app.get('/archivos', (req, res) => {
   var collection = db.collection('archivos');
  collection.find().toArray(function (err, documents) {
    if (err) {
      console.log(err);
    }
    else {

    console.log(documents);
     res.send(documents);
    }
});

});
