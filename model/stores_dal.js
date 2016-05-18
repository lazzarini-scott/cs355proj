var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var qry = "SELECT * from stores;"
    connection.query(qry, function(err, result){
        callback(err, result);
    });
}

exports.GetByStore = function(stores_id, avg_rating, callback) {
    var query = 'CALL food_get_best_loc(?, ?)';
    var query_data = [stores_id, avg_rating];

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

// exports.Insert = function(stores_name, callback) {
//     var qry = "INSERT INTO stores (stores_name) VALUES (?)";
//     connection.query(qry, stores_name, function(err, result){
//         callback(err, result);
//     });
// }