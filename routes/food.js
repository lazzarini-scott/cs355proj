var express = require('express');
var router = express.Router();
var foodDal = require('../model/food_dal');
var storesDal = require('../model/stores_dal');
var userDal = require('../model/user_dal');

router.get('/all', function(req, res) {
    foodDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('food/foodViewAll.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    console.log(req.query.food_id);
    if(req.query.food_id == null){
        res.redirect('/food/all')
    }
    else {
        foodDal.GetByID(req.query.food_id, function (err, result) {
                if (err) {
                    res.send("Error: " + err);
                    return;
                }
                console.log(result);
                res.render('food/foodInfo.ejs', {rs: result, food_id: req.query.food_id});
            }
        );
    }
});

router.get('/subq', function(req, res){
    foodDal.GetByID(req.query.food_id, function (err, result) {
            if (err) throw err;

            res.render('food/subqRating.ejs', {rs: result, food_id: req.query.food_id});
        }
    );
});

router.post('/subq_rating', function(req, res){
console.log(req.body);
foodDal.InsertRating(req.body.food_rating, req.body.food_id, req.session.username.users_id,
    function (err) {
        if(err) {
            res.send('Fail!<br />' + err);

        }
        else {
            res.send('Success!')
        }

    });
});

router.get('/rating', function(req, res) {
    foodDal.GetAll(function (err, result) {
        if(err) {
            res.send("Error: " + err);
        }
        else {
            res.render('food/foodRating.ejs', {rs: result});
        }
        
    });
});

router.get('/findrate', function(req, res) {
    
    userDal.GetAll(function (err, result) {
        if(err) {
            res.send("Error: " + err);
        }
        else {
            foodDal.GetAll(function (err, food_result) {
                res.render('food/foodRateProcedure.ejs', {rs: result, food: food_result});
            })
            
        }

    });
});

router.get('/rateResults', function(req, res) {
    foodDal.GetRateProcedure(req.query.users_id, req.query.food_id, function (err, result) {
        if (err) {
            res.send(err);
        }
        else if (result == null) {
            // res.send("User rate not found!");
            res.render('food/sorry.ejs');
        }
        else {

            res.render('food/displayRateProcedure.ejs', {rs: result});
        }
        
    });
});


router.get('/without', function(req, res) {
    foodDal.Subquery( function(err, result){
        if(err) {
            res.send("Error: " + err);
        }
        else {
            res.render('food/withoutRating.ejs', {rs: result});
        }
            
    });
});

router.get('/create', function(req, res) {
    storesDal.GetAll( function(err, result){
        if(err) {
            res.send("Error: " + err);
        }
        else {
            res.render('food/createFood.ejs', {stores: result});
        }
    });

});

router.post('/insert_food', function(req, res) {
    console.log(req.body);
    foodDal.Insert(req.body.food_id, req.body.food_name, req.body.diet, req.body.category, req.body.price, req.body.calories, req.body.sugar,
        req.body.protein, req.body.fat, req.body.sodium, req.body.carbohydrates, req.body.stores_id, req.body.food_rating, req.session.username.users_id,
        function(err){
            if(err){
                res.send('Fail!<br />' + err);
            } else {
                res.send('Success!')
            }
        });


});

router.post('/insert_rating', function(req, res){
    console.log(req.body);
    foodDal.InsertRating(req.body.food_rating, req.body.food_id, req.session.username.users_id,
        function (err) {
            if(err) {
                res.send('Fail!<br />' + err);
                
            }
            else {
                res.send('Success!')
            }
            
        });
});

router.get('/delete', function(req, res){
    console.log(req.query);
    foodDal.GetByID(req.query.food_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            foodDal.DeleteById(req.query.food_id, function (err) {
                res.send(result[0].food_name + ' Successfully Deleted');
            });
        }
        else {
            res.send('Food does not exist in the database.');
        }
    });
});


module.exports = router;