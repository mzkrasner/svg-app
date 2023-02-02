const cookieController = {};
const {Account, Cookie} = require('../models/svgModels');
/**
* setCookie - set a cookie with a random number
*/
cookieController.setCookie = (req, res, next) => {
  // write code here
  res.cookie('codesmith', 'hi');
  res.cookie('secret', Math.floor(Math.random() * 99));

  next();
}

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  const {  email, password} = JSON.parse(req.body);
  console.log('checking from SSID', email);
  
    
    Account.find({email}, '_id').exec()
      .then((data) =>{
        console.log(data[0]._id.toString(), 'this is to string');
        const id = data[0]._id.toString();
        res.cookie('ssid', id, { httpOnly: true });
        console.log(req.cookies.ssid, 'current cookie')
        res.locals.ssid = id;
        next();
      })
      .catch(err => {
        next({
          status: 400,
          err: { err: err}
        });
      });
   
}


module.exports = cookieController;
