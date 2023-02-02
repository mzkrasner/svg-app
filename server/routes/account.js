const express = require('express');
const accountController = require('../controllers/accountController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const svgController = require('../controllers/svgController');
const router = express.Router();
const  { createProxyMiddleware } = require("http-proxy-middleware");



router.post('/log', accountController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession,
  (req, res) => {
    if(res.locals.shouldRedirect){
      return res.status(400).json(res.locals.shouldRedirect);
    }else{
      return res.status(201).json(res.locals.ssid);
    }
    
  });

  router.get('/svg', svgController.getSVGs, 
  (req, res) => {
    res.status(201).send(res.locals.svgs);
  });

  router.post('/upload', svgController.addSvg, 
  (req, res) => {
    res.status(201).send({ users: res.locals.newUser });
  });

router.post('/', accountController.createAccount, cookieController.setSSIDCookie, sessionController.startSession,
  (req, res) => {
    return res.status(201).json(res.locals.newUser);
  });

  router.get('/', accountController.checkUser,
  (req, res) => {
    return res.status(200).json(res.locals.userSession);
  });

  



module.exports = router;
