var express = require('express');
var router = express.Router();
var foodDal = require('../model/food_dal');
var storesDal = require('../model/stores_dal');

router.get('/best', function(req, res) {
    storesDal.GetAll( function(err, result){
        if(err) {
            res.send("Error: " + err);
        }
        else {
            res.render('stores/bestProcedure.ejs', {stores: result});
        }
    });

});

router.get('/bestProcedure', function(req, res) {
    console.log(req.body);
    storesDal.GetByStore(req.query.stores_id, req.query.avg_rating, function (err, stores_id) {
        //var response = {};
        if (err) {
            res.send(err);
        }
        else if (stores_id == null) {
            res.send("Store not found.");
            //res.json(response);
        }
        else {


            res.send("success");

            // response.message = 'Success!';
            // req.session.username = username;
            // if(req.session.originalUrl = '/login') {
            //     req.session.originalUrl = '/'; //don't send user back to login, instead forward them to the homepage.
            // }
            //res.redirect(req.session.originalUrl);
            //res.json()

        }

    });
});

//     storesDal.GetByEmail(req.query.stores_name, req.query.avg_rating, function (err, stores_name) {
//         //var response = {};
//         if (err) {
//             res.send(err);
//         }
//         else if (stores_name == null) {
//             res.send("User not found.");
//             //res.json(response);
//         }
//         else {
//
//
//             res.send("success");
//
//             // response.message = 'Success!';
//             // req.session.username = username;
//             // if(req.session.originalUrl = '/login') {
//             //     req.session.originalUrl = '/'; //don't send user back to login, instead forward them to the homepage.
//             // }
//             //res.redirect(req.session.originalUrl);
//             //res.json()
//
//         }
//
//     });
// });











module.exports = router;