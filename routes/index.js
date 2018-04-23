var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

var Product=require('../models/users');
//var db=require('../database');
var passport=require('passport');
mongoose.connect('mongodb://sample:123456@ds155299.mlab.com:55299/sastabazaar');

var product_chunks=3;


router.get('/', function(req, res, next) {
    var cart=[];
    let check=0;
  Product.find(function (err,docs) {
      for(var i=0;i<docs.length;i+=product_chunks)
      {
          cart.push(docs.slice(i,i+product_chunks));
          check=check+product_chunks;
          console.log(check);
          if(check===6) {
              res.render('index', {aj: cart});
          }
      }

  });
});

function isloggedIn(req,res,next){
    console.log("ok")
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
}

function notloggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}



router.use('/',notloggedIn,function (req,res,next) {
    next();
})
router.get('/signup',function (req,res) {
    var messages=req.flash('error');
    console.log(messages);
   res.render('signup',{messages:messages,hasErrors:messages.length>0});
});


router.post('/signup',passport.authenticate('local.signup', { successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true }));

router.get('/signin',function (req,res) {
    var messages1=req.flash('error');
    console.log(messages1);
    res.render('signin',{messages1:messages1,hasErrors1:messages1.length>0});
})
router.post('/signin',passport.authenticate('local.signin', { successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true }));


/*
router.get('/add-to-cart/:id',function (req,res,next) {
    console.log("aman");
   res.render("profile");
})
*/

module.exports = router;
