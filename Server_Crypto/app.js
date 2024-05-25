var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Routes
var usersRouter = require('./routes/users');
var googleRouter = require('./routes/google')


var app = express();
const port = 3000;
const cors = require('cors');

// Options de configuration pour Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestion',
      version: '1.0',
      description: 'API ',
    },
    servers: [
      {
        url: 'http://localhost:3000'
      },
      {
        url: 'http://172.16.70.204:3000'
      }
    ],
  },
  apis: ['./routes/*.js'], // Emplacement de tes fichiers de routes pour la documentation
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Vue Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', usersRouter);
app.use('/google', googleRouter);



// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
