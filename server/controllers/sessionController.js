const Session = require('../models/sessionModel');
const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  const id = req.cookies.ssid;
  
  Session.find({cookieId: id}).exec()
    .then((data) =>{
      if(data.length === 0){
        console.log('this fired & ssid not exist');
        res.locals.shouldRedirect = true;
      }else{
        console.log('this fired & ssid exists');
        res.locals.shouldRedirect = false;
      }
      next();
    })
    .catch(err => {
      next({
        status: 400,
        err: { err: err}
      });
    });
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  //write code here
  Session.create({cookieId: res.locals.ssid})
    .then((data) => {
      console.log('successfully created session document');
      res.locals.ssid = data;
      next();
    })
    .catch(err => {
      next({
        status: 400,
        err: { err: err}
      });
    });
}


module.exports = sessionController;
