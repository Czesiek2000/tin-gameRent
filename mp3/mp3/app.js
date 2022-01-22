const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const i18n = require('i18n');
const cors = require('cors');

const indexRouter = require('./routes/index');
const userRoute = require('./routes/userRoute');
const gameRoute = require('./routes/gameRoute');
const gameRentRoute = require('./routes/gameRentRoute');

const app = express();

i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  defaultLocale: 'pl',
  cookie: 'game-rent-lang',
});

// add session
const session = require('express-session');
app.use(session({
  secret: 'my_secret_password',
  resave: false,
  saveUninitialized: false,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(i18n.init);
app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  // console.log(loggedUser);
  // console.log(req.session.loggedUser);
  // res.locals.loggedUser = { id: 5, email: 'a@a.com', firstname: 'admin', lastname: 'admin', phonenumber: '123456789', password: '12345'  };  
  res.locals.loggedUser = loggedUser;

  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }

  // console.log('lang',res.locals.lang);
  if(!res.locals.lang) {
    const currentLang = req.cookies['game-rent-lang'];
    res.locals.lang = currentLang;
  }

  next();
});

const authUtils = require('./util/authUtlis');

app.use('/', indexRouter);
app.use('/users', userRoute)
app.use('/games', gameRoute)
app.use('/gameRent', gameRentRoute)

const userApiRouter = require('./routes/api/userApiRoute');
app.use('/api/users', userApiRouter);

const gameApiRouter = require('./routes/api/gameApiRoute');
app.use('/api/games', gameApiRouter);

const gameRentRouter = require('./routes/api/gameRentRoute');
app.use('/api/gameRent', gameRentRouter);

const authApiRouter = require('./routes/api/authApiRoute');
app.use('/api/auth', authApiRouter);

const historyApiRouter = require('./routes/api/historyApiRoute');
app.use('/api/history', historyApiRouter);

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

module.exports = app;
