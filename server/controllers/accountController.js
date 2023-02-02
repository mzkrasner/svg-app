const {Account, Cookie} = require('../models/svgModels');
const bcrypt = require('bcryptjs');
const accountController = {};

accountController.createAccount = (req, res, next) => {
    //console.log(JSON.parse(req.body));
    //const newBody = JSON.parse(req.body);
    const { firstName, lastName, email, password} = JSON.parse(req.body);
    console.log(firstName)
    if(!firstName || !lastName || !email || !password){
      return next('Missing credentials');
    }
    Account.create({firstName, lastName, email, password})
      .then((data) => {
        console.log('we got into the create method');
        console.log(data);
        res.locals.newUser = {firstName, lastName};
        next();
      })
      .catch(err => {
        next({
          status: 400,
          err: { err: 'Error occurred in creating your account'}
        });
      });
  
  };

  accountController.checkUser = (req, res, next) => {
    const ObjectId = require('mongodb').ObjectId; 
    const id = req.cookies.ssid;     
    const o_id = new ObjectId(id);

    //console.log(req.cookies.ssid)
    
    Account.find({_id:o_id}).exec()
      .then((data) => {
        console.log('we got into the check user method');
        console.log(data);
        const {firstName, lastName, email} = data[0];
        res.locals.userSession = {firstName, lastName, email};
        next();
      })
      .catch(err => {
        next({
          status: 400,
          err: { err: err}
        });
      });
    
  };

  accountController.addSvg = (req, res, next) => {
    //convert svg to base64
    const { svg } = req.body;
    
    Account.create({username, password})
      .then((data) => {
        console.log('we got into the create method');
        console.log(data);
        next();
      })
      .catch(err => {
        next({
          status: 400,
          err: { err: err}
        });
      });
  
  };

accountController.getAccount = (req, res, next) => {

  Account.find({}).exec()
    .then(item => {
      console.log(item);
      return next();
    })
    .catch(err => {
      next({
        log: 'issue in SVG find controller',
        status: 400,
        err: { err: 'An error occurred in svg controller' }
      });
    });
    
};

accountController.verifyUser = (req, res, next) => {
    // write code here
    const {email, password} = JSON.parse(req.body);
    //console.log('we are here')
    console.log(req.body)
    const controller = (passPhrase) => {
      
      console.log(passPhrase, 'this is the password');
      Account.find({email}, 'password').exec()
        .then((data) =>{
          console.log(data);
          if(data.length === 0){
            res.locals.shouldRedirect = true; 
          }
          bcrypt.compare(passPhrase, data[0].password, function(err, res) {
            console.log(res, 'this is the res');
            if(!res){
              res.locals.shouldRedirect = true; 
            }
          });
          
          next();
        })
        .catch(err => {
          next({
            status: 400,
            err: { err: err}
          });
        });
    }
    
  
    // async function hashPassword(plaintextPassword) {
    //   const hash = await bcrypt.hash(plaintextPassword, SALT_WORK_FACTOR);
    //   controller(hash);
    // }
  
    
    controller(password);
    
  };



module.exports = accountController;
