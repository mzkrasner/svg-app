const {Account, Cookie, SvItem} = require('../models/svgModels');

const svgController = {};



    svgController.addSvg = (req, res, next) => {
    //convert svg to base64
    const {  svField, labelName } = JSON.parse(req.body);
    user = req.cookies.ssid;
    console.log('checking')
    console.log(svField)
    console.log(labelName)
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

  svgController.checkDeleteSVG = (req, res, next) => {
    //convert svg to base64
    const {  id } = JSON.parse(req.body);
    const user = req.cookies.ssid
   console.log(id, user, 'this is from delete');

   const ObjectId = require('mongodb').ObjectId;    
    const o_id = new ObjectId(id);

   SvItem.find({_id:o_id})
      .then((data) => {
        console.log('we got into the delete SVG method');
        console.log(data, 'checking once more');
        //console.log(data, 'this is the data')
        if(data[0].user === user){
          console.log('matches');
          next();
        } else {
          next({
            status: 400,
            err: { err: 'could not delete'}
          });
        }
        
      })
      .catch(err => {
        next({
          status: 400,
          err: { err: err}
        });
      });
   
  
  };

  //svgController.deleteSVG updateSVG

  svgController.updateSVG = (req, res, next) => {
    //convert svg to base64
    const {  id, newName } = JSON.parse(req.body);
    const ObjectId = require('mongodb').ObjectId;    
    const o_id = new ObjectId(id);


    console.log('success making it into update', newName)
    SvItem.findOneAndUpdate({_id:o_id}, {labelName:newName}).exec()
    .then((data) => {
      console.log('successful update of Name');
      res.locals.updated = data;
      next();
    })
    .catch(err => {
      next({
        status: 400,
        err: { err: err}
      });
    });
  
  };

  svgController.deleteSVG = (req, res, next) => {
    //convert svg to base64
    const {  id } = JSON.parse(req.body);
    const ObjectId = require('mongodb').ObjectId;    
    const o_id = new ObjectId(id);

   SvItem.deleteOne({_id:o_id}).exec()
   .then((data) => {
     console.log('successful delete');
     res.locals.deleted = data;
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
    SvItem.find({user}, ['svField', 'labelName'])
      .then((data) => {
        console.log('we got into the get SVG method');
        console.log(data)
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
