var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal');
var foodDal = require('../model/food_dal');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/join', function(req, res) {
//   foodDal.GetAll( function(err, result){
//     if(err) {
//       res.send("Error: " + err);
//     }
//     else {
//       res.render('user/userFormCreate.ejs', {food: result});
//     }
//   });
//
// });

// router.get('/insert_user', function(req, res) {
//
//   userDal.Insert(req.query.username, req.query.fname, req.query.lname, req.query.email, req.query.passw, req.query.food_id,
//       function(err, result){
//           var response = {};
//      
//         if(err){
//             response.message = err.message;
//         } else {
//             response.message = 'Success!';
//         }
//           res.json(response);
//       });
//    
// });

router.get('/join', function(req, res) {
    res.render('user/user_signup.ejs');
});

router.get('/find', function(req, res) {
    res.render('user/userHaving.ejs');
});

router.get('/having_user', function(req, res){
    userDal.Having(req.query.avg_rating, function (err, result) {
        if (err) throw err;
        
        res.render('user/displayHaving.ejs', {rs: result, avg_rating: req.query.avg_rating });
    });
});

router.get('/sign_up', function(req, res) {
    userDal.SignUp(req.query.username, req.query.fname, req.query.lname, req.query.email, req.query.passw, function (err, result){
            var response = {};
            if(err){
                response.message = err.message;
            }
            else {
                response.message = 'Success!';
            }
            res.json(response);
        });

});

router.post('/insert_user', function(req, res) {
    console.log(req.body);
    userDal.Insert(req.body.username, req.body.fname, req.body.lname, req.body.email, req.body.passw, req.body.food_id,
        function(err, result){
            

            if(err){
                res.send('Fail!<br />' + err);
            } else {
                res.send('Success!');
            }
            
        });

});



module.exports = router;
