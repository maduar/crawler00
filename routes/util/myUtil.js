/**
 * Created by maduar on 10/02/2017.
 */
//验证单个邮箱地址
function verifyEmail(email) {
    var reg = /^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/;
    return email.match(reg) ? true : false;
}
module.exports = {
    //验证单个，或者以‘，’链接的多个邮箱地址
    verifyMultipleEmail: function(email) {
        var _result = false;
        var _temp = '';
        if(email.indexOf('\,') === (-1)) {
            _result = verifyEmail(email);
            return _result;
        }

        var _array = email.split("\,");
        if(_array.length === 0) return _result;
        _result = true;
        _array.forEach(function(value, index, full) {
            _temp = value.replace(' ', '');
            if(!verifyEmail(_temp)) {
                _result = false;
            }
        })
        return _result;
    }
}
module.exports.verifyEmail = verifyEmail;