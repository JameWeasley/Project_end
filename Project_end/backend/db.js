const mysql = require('mysql2')
const crypto = require('crypto')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '34972',
    database: 'project',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})

exports.md5 = (content) => {  
    return crypto.createHash('md5').update(content).digest('hex')
}

exports.loginAuth = async (username , password) => {
    const MySQL = pool.promise()
    try {
       
        if (MySQL) {
            const hash_password = exports.md5(password)
            const [ results ] = await MySQL.query("SELECT user_name , user_password FROM users_tb WHERE user_name = ? AND user_password = ?",[
                username,
                hash_password
            ])

            if (results.length > 0) {
                return true
            }
        }

    }catch(err) {
        console.log(err);
    }

    return false
}