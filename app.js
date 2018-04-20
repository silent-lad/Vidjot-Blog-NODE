const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

const app = express();

//Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//Passport Config
require('./config/passport.js')(passport);
//DB Config
const db = require('./config/database');

// Connect to mongoose
mongoose.connect(db.mongoURI).then(()=>{
  console.log('MongoDb connected');
}).catch((err)=>{
  console.log('err');
});

//Handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static middleware
app.use(express.static(path.join(__dirname,'public')));

//Method Overide Middleware
app.use(methodOverride('_method'));

//Express-session Middleware
app.use(session({
  secret:'secret',
  resave: true,
  saveUninitialized: true
}));

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Flash middleware
app.use(flash());

//Global Variable
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

// Index Route
app.get('/',(req,res)=>{
  const title = 'Divyansh'
  res.render('index',{
    title
  });

});

// About Route
app.get('/about',(req,res)=>{
  res.render('abouts');
});


//Use routes
app.use('/ideas',ideas);
app.use('/users',users);

//nada
app.get('*',(req,res)=>{
  res.send('404');
})

const port = process.env.PORT||5000;

app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
});
