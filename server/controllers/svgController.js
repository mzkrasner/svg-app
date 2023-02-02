const {Account, Cookie, SvItem} = require('../models/svgModels');

const svgController = {};



    svgController.addSvg = (req, res, next) => {
    //convert svg to base64
    const {  svField, labelName, user } = req.body;
    
    SvItem.create({svField, labelName, user})
      .then((data) => {
        console.log('we got into the save SVG method');
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

  svgController.getSVGs = (req, res, next) => {
    //convert svg to base64
    const user = req.cookies.ssid;  
    console.log('hello')
    
    console.log('from getting', user)
    SvItem.find({user}, 'svField')
      .then((data) => {
        console.log('we got into the get SVG method');
        res.locals.svgs = data;
        next();
      })
      .catch(err => {
        next({
          status: 400,
          err: { err: err}
        });
      });
  
  };




module.exports = svgController;
