/**
 * Created by maduar on 07/03/2017.
 */
$(document).ready(function (  ) {



    $('#sendZhiHu').on('click', function () {
        var email = $('#zhihuEmail').val(),
            reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email === undefined || email === '' || !reg.test(email)) return alert("邮件内容必须填写, 格式必须正确");

        $.ajax({
            url: '/getZhihuDailyHot?email_url=' + email,
            method: 'GET',
            beforeSend: function () {
                $('#sendZhiHu').prop('readonly', true);
            },
            success: function ( data ) {

                var result = parseData(data);

                $('#sendZhiHu').prop('readonly', false);
                if (result && result.status === 'success') return alert("邮件发送成功");

                return alert("邮件发送失败");
            },
            error: function ( err ) {
                $('#sendZhiHu').prop('readonly', false);
                return alert("邮件发送失败");
            }
        })
    });

    $('#sendCnBlog').on('click', function () {
        var email = $('#cnBlogEmail').val(),
            reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email === undefined || email === '' || !reg.test(email)) return alert("邮件内容必须填写, 格式必须正确");

        $.ajax({
            url: '/getCnblogsPages?email_url=' + email,
            method: 'GET',
            beforeSend: function () {
                $('#sendZhiHu').prop('readonly', true);
            },
            success: function ( data ) {

                var result = parseData(data);

                $('#sendZhiHu').prop('readonly', false);
                if (result && result.status === 'success') return alert("邮件发送成功");

                return alert("邮件发送失败");
            },
            error: function ( err ) {
                $('#sendZhiHu').prop('readonly', false);
                return alert("邮件发送失败");
            }
        })
    });

    function parseData(data) {

        var reg = /\{.+\}/;

        if (typeof data === 'string' && data !== '' && reg.test(data)) return JSON.parse(data);

        return data;
    }


})