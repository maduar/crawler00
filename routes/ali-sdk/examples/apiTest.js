/**
 * Module dependencies.
 */

ApiClient = require('../index.js').ApiClient;

var client = new ApiClient({
    'appkey':'12497914',
    'appsecret':'4b0f28396e072d67fae169684613bcd1',
    'url':'https://eco.taobao.com/router/rest',
});

client.execute('taobao.user.get',
    {
        'tpwd_param':{'url':'https://detail.tmall.com/'}
    },
    function (error,response) {
        console.log("====================taobao.user.get=========================")
        if(!error)
            console.log(response);
        else
            console.log(error);
    })

