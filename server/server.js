const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const accountRouter = require('./routes/account');
const accountController = require('./controllers/accountController');
const cookieParser = require('cookie-parser');
const mongoURI = "mongodb+srv://mzkrasner:element4313@cluster0.y0jsa0g.mongodb.net/?retryWrites=true&w=majority";
const bodyParser = require('body-parser')
const cors = require('cors');

// to change your ports for different cors stuff:
app.set('port', process.env.PORT || 3000);

app.use(cors({
  origin : "http://localhost:8080",
  credentials: true,
}))
mongoose.connect(mongoURI);

mongoose.connection.on('error', err => {
  logError(err);
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(bodyParser.text());


// statically serve everything in the build folder on the route '/build'
  
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });

  app.use('/account', accountRouter);

  app.use((err, req, res, next) => {
    const defaultErr = {
      status: 400,
      error: 'Express error handler caught unknown middleware error'
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


  app.listen(app.get('port'), function() { 
    console.log('we are listening on: ', 
    app.get('port'))
  });
module.exports = app;
