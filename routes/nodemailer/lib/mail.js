/**
 * Created by danny on 16/9/21.
 */
var nodemailer = require('nodemailer');
var config = require('../../config');

module.exports = {
    sendMail: function(configue, _obj, callback) {
        var _mailServer = nodemailer.createTransport(configue);

        var _senderInfo = config[_obj.type][_obj.type + "Server" + _obj.typeMessage].auth.user;

        // set sender
        _obj.from = _senderInfo;

        _mailServer.sendMail(_obj, function(err, info) {
            callback(err, info);
        });
    }
}