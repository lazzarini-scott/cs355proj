var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var qry = "SELECT * from user_names;"
    connection.query(qry, function(err, result){
        callback(err, result);
    });
}

exports.GetByEmail = function(email, passw, callback) {
    var query = 'CALL Account_GetByEmail(?, ?)';
    var query_data = [email, passw];

    connection.query(query, query_data, function(err, result) {
        if(err){
            callback(err, null);
        }

     else if(result[0].length == 1) {
    callback(err, result[0][0]);
    }
    else {
    callback(err, null);
    }
    });
}

exports.Having = function(avg_rating, callback) {
    console.log(avg_rating);
    var qry ="SELECT * FROM UserVeganView HAVING vegan_rating >" + avg_rating;
    console.log(qry);
   connection.query(qry, function (err, result) {
       if(err) {
           console.log(err);
           callback(true);
           return;
       }
       callback(false, result);
   });
}

exports.SignUp = function(username, fname, lname, email, passw, callback) {
    var values = [username, fname, lname, email, passw];
    connection.query('INSERT INTO user_names (username, fname, lname, email, passw) VALUES (?, ?, ?, ?, ?)', values,
        function (err, result){
            callback(err, result);
        });
    // var qry = 'INSERT INTO user_names (username, fname, lname, email, passw) VALUES (?, ?, ?, ?, ?)';
    // var query_data = [username, fname, lname, email, passw];
    // connection.query(qry, query_data, function(err, result){
    //     callback(err, result);
    // });
}

exports.Insert = function(username, fname, lname, email, passw, food, callback) {
    var values = [username, fname, lname, email, passw];
    connection.query('INSERT INTO user_names (username, fname, lname, email, passw) VALUES (?, ?, ?, ?, ?)', values,
        function (err, result) {

            if (err == null && food != null) {
                var food_qry_values = [];

                if(food instanceof Array) {
                    for (var i = 0; i < food.length; i++) {
                        food_qry_values.push([result.insertId, food[i]]);
                    }
                }
                else {
                    food_qry_values.push([result.insertId, food]);
                }

                console.log(food_qry_values);

                // var food_qry = 'INSERT INTO fav_foods (users_id, food_id) VALUES (?)', values;

                 var food_qry = 'INSERT INTO fav_foods (users_id, food_id) VALUES ?';

                connection.query(food_qry, [food_qry_values], function(err, food_result){
                    if(err) {
                        Delete(result.insertId, function() {
                            callback(err);
                        });
                    }
                    else {
                        callback(err);
                    }
                });
            }
            else {
                callback(err);
            }
        });
}



var Delete = function(users_id, callback) {
//function Delete(movie_id, callback) {
    var qry = 'DELETE FROM user_names WHERE users_id = ?';
    connection.query(qry, [users_id],
        function (err) {
            callback(err);
        });
}




exports.DeleteById = Delete;