var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var qry = "SELECT * from food;"
    connection.query(qry, function(err, result){
        callback(err, result);
    });
}

exports.GetRateProcedure = function(users_id, food_id, callback) {
    var query = 'CALL find_user_rate(' + users_id + ',' + food_id + ')';
    var query_data = [users_id, food_id];

    connection.query(query, function(err, result) {
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

exports.Subquery = function(callback) {
    var qry = "SELECT food_id, food_name FROM food WHERE food_id NOT IN(SELECT DISTINCT food_id FROM food_rating)";
    connection.query(qry, function(err, result){
        if(err) {
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    });
};

exports.GetByID = function(food_id, callback) {

    console.log(food_id);
    var query = 'SELECT * FROM food_info_view WHERE food_id=' + food_id;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};

exports.Insert = function(food_id, food_name, diet, category, price, calories, sugar, protein, fat, sodium, carbohydrates, stores, food_rating, users_id, callback) {
    var values = [food_name, diet, category, price, calories, sugar, protein, fat, sodium, carbohydrates];
    connection.query('INSERT INTO food (food_name, diet, category, price, calories, sugar, protein, fat, sodium, carbohydrates) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values,
        function (err, result) {

            if (err == null && stores != null) {
                var stores_qry_values = [];


                if(stores instanceof Array) {
                    for (var i = 0; i < stores.length; i++) {
                        stores_qry_values.push([result.insertId, stores[i]]);
                    }
                }
                else {
                    stores_qry_values.push([result.insertId, stores]);
                }

                console.log(stores_qry_values);

                // var values2 = [food_rating, food_id, users_id];
                // connection.query('INSERT INTO food_rating (food_rating, food_id, users_id) VALUES (?, ?, ?)', values2,
                //     function (err, rating_result) {
                //         callback(err, result);
                //     });
                
                var stores_qry = 'INSERT INTO food_location (food_id, stores_id) VALUES ?';
                

                connection.query(stores_qry, [stores_qry_values], function(err, stores_result){
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


var Delete = function(food_id, callback) {
    var qry = 'DELETE FROM food WHERE food_id = ?';
    connection.query(qry, [food_id],
        function (err) {
            callback(err);
        });
}


exports.InsertRating = function(food_rating, food_id, users_id, callback) {
    console.log(food_rating, food_id, users_id);
    var values = [food_rating, food_id, users_id];

    connection.query('INSERT INTO food_rating (food_rating, food_id, users_id) VALUES (?, ?, ?)', values,
        function (err, result) {
            callback(err, result);
        });

}

exports.DeleteById = Delete;