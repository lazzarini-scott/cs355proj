var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title : 'Vegefoods'
  }
  if(req.session.username == undefined) {
    res.render('index', data);
  }
  else {
    data.users_id = req.session.username.users_id;
    data.fname = req.session.username.fname;
    res.render('index', data);
  }
});


// router.get('/authenticate', function(req, res) {
//   userDal.GetByEmail(req.query.email, req.query.passw, function (err, username) {
//
//     if (err) {
//       res.send(err);
//     }
//     else if (username == null) {
//       res.send("User not found.");
//     }
//     else {
//       req.session.username = username;
//       if(req.session.originalUrl = '/login') {
//         req.session.originalUrl = '/'; //don't send user back to login, instead forward them to the homepage.
//       }
//       res.redirect(req.session.originalUrl);
//     }
//   });
// });

router.get('/authenticate', function(req, res) {
  userDal.GetByEmail(req.query.email, req.query.passw, function (err, username) {
    var response = {};
    if (err) {
      response.message = err.message;
    }
    else if (username == null) {
      response.message = "User not found.";
      //res.json(response);
    }
    else {
      response.message = 'Success!';
      req.session.username = username;
      if(req.session.originalUrl = '/login') {
        req.session.originalUrl = '/'; //don't send user back to login, instead forward them to the homepage.
      }
      //res.redirect(req.session.originalUrl);
      //res.json()

    }
     res.json(response);
  });
});

// router.get('/join', function(req, res) {
//   res.render('authentication/signup.ejs');
// });
//
// router.get('/signup', function(req, res) {
//   userDal.Signup(req.query.username, req.query.fname, req.query.lname, req.query.email, req.query.passw,
//       function (err, result){
//         var response = {};
//         if(err){
//           response.message = err.message;
//         } 
//         else {
//           response.message = 'Success!';
//         }
//         res.json(response);
//       });
//
// });

router.get('/login_go', function(req, res){
  userDal.GetByEmail(req.query.email, req.query.passw, function (err, username) {
    if (err) {
      res.send(err);
    }
    else if (username == null) {
      res.send("User not found.");
    }
    else {
      res.send("Success");
    }
  });
});
//
// router.get('/login_insert', function(req, res){
//   userDal.Insert(req.query.email, req.query.passw, function(err, result){
//     var response = {}; 
//     if(err) {
//       response.message = err.message;
//     }
//     else {
//       response.message = 'Success!';
//     }
//     res.json(response);
//   });
// });

router.get('/login', function(req, res) {
  res.render('authentication/login.ejs');
});

router.get('/logout', function(req, res) {
  req.session.destroy( function(err) {
    res.render('authentication/logout.ejs');
  });
});


module.exports = router;
