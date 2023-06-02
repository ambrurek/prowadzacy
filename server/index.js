const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const teacherRoutes = require('./routes/teacherRoutes')
const roomRoutes = require('./routes/roomRoutes')
const eventRoutes = require('./routes/eventRoutes')
const cors = require('cors');




require('./auth/auth');

const app = express();
app.use(cors());
app.use(express.json())

const dbURI = "mongodb://localhost:8001";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


//template engine configuration
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

const Teacher = require('./models/teacher');
const Room = require('./models/room');


function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
});

app.use('/auth',authRoutes);
app.use('/teacher',teacherRoutes);
app.use('/room',roomRoutes);
app.use('/event',eventRoutes);


app.get('/set/setup',isLoggedIn,(req,res)=>{
  data = require('./teachers.json');
  Teacher.insertMany(data)
  res.redirect('/')
})

app.get('/set/setup2',isLoggedIn,(req,res)=>{
  data = require('./rooms.json');
  Room.insertMany(data)
  res.redirect('/')
})





app.listen(5000, () => console.log('listening on port: 5000'));
