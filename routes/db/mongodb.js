/**
 * Created by maduar on 13/02/2017.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/blog', {
    user: 'maduar',
    pass: 'maduar00'
});

db.on('err', function(error) {
    console.log(error);
});

var Schema = mongoose.Schema;
var userlistScheMa = new Schema({
    user             : {type : String},
    password      : {type : String},
    email            : {type : String},
    phone           : {type : Number},
    create_date   : {type : String}
});

module.exports.userlist = db.model('users', userlistScheMa);
module.exports.db = db;