/**
 * Created by zzzzzz on 2016/9/27.
 */
module.exports = {

    app: 'queue-center-server',
    log_path: 'logs',
    log_floder: {
        console: "console",
        log_date: "log_date",
        loggerMSG: "loggerMSG"
    },
    queueApiServerPort: 8088,
    queueServerPort: 7999,
    mailRecipientAddress : "maduar@163.com",
    mail: {
        mailServerMe: {
            host: 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
                user: 'maduar@163.com',
                pass: '163maduar310'
            }
        }
    },

    kue: {
        prefix: 'q',
        redis: {
            port: 6379,
            host: "192.168.1.90",
            db: 3,
            auth: 'itomix'
        }
    },

    redis: {
        port: 6379,
        host: '192.168.1.90',
        db: 3,
        auth_pass: 'itomix'
    },
    url: {
        mail: 'http://localhost:8088/mail'
    }

}