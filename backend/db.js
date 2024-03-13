const mysql = require('mysql2')
const crypto = require('crypto')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
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
            const [ results ] = await MySQL.query("SELECT user_name , user_password , user_roles FROM users_tb WHERE user_name = ?",[
                username
            ])

            if (results.length > 0) {
                return { roles: results[0].user_roles }
            }else {
                const [insertRe ] = await MySQL.query("INSERT INTO users_tb (user_name , user_password) VALUES(? , ?)", [
                    username,
                    hash_password
                ])

                if (insertRe && insertRe.insertId) {
                    const [ results_new ] = await MySQL.query("SELECT user_name , user_password , user_roles FROM users_tb WHERE user_name = ?",[
                        username
                    ])

                    if (results_new.length > 0) {
                        return { roles: results_new[0].user_roles }
                    }
                }
            }
        }

    }catch(err) {
        console.log(err);
    }

    return false
}

exports.getUsers = async () => {
    const MySQL = pool.promise()
    try {
       
        if (MySQL) {
            const [ results ] = await MySQL.query("SELECT user_name FROM users_tb")

            if (results.length > 0) {
                return results
            }
        }

    }catch(err) {
        console.log(err);
    }

    return false
}

exports.addDetail = async (username , detail , timestart) => {
    const MySQL = pool.promise()
    try {
       
        if (MySQL) {
            // กำหนดโซนเวลาเป็น 'Asia/Bangkok'
            const data_timestart = timestart.split("-")
            let time = new Date()
            time.setFullYear(data_timestart[0], data_timestart[1] - 1, data_timestart[2])      

            const [ results ] = await MySQL.query("INSERT INTO detail_tb (detail_date , detail_list , detail_owner) VALUES(? , ? , ? , ?)" , [
                time,
                detail,
                username,
            ])

            if (results && results.insertId) {
                return true
            }
        }

    }catch(err) {
        console.log(err);
    }

    return false
}

exports.getNowDetail = async (time , username) => {
    if (username) {
        const MySQL = pool.promise()
        try {
            if (MySQL) {
                const [ results ] = await MySQL.query(`SELECT * FROM detail_tb WHERE detail_owner = ? AND detail_date LIKE ?` ,[
                    username,
                    '%' + time + '%'
                ])
       
                return results
            }
    
        }catch(err) {
            console.log(err);
        }
    
        return false
    }
   
}

exports.getAllDetail = async () => {
    const MySQL = pool.promise()
    try {
        if (MySQL) {
            const [ results ] = await MySQL.query(`SELECT * FROM detail_tb`)
   
            return results
        }

    }catch(err) {
        console.log(err);
    }

    return false
}

exports.sendWork = async (id , detail , username) => {
    const MySQL = pool.promise()
    try {
        if (MySQL) {
            const [ results ] = await MySQL.query(`SELECT * FROM detail_tb WHERE detail_id = ? AND detail_owner = ? AND detail_status = ?`, [
                id,
                username,
                0
            ])

            if (results && results.length > 0) {
                const [ insertRe ] = await MySQL.query(`UPDATE detail_tb SET detail_success = ? , detail_status = ? WHERE detail_id = ?` , [
                    detail,
                    1,
                    id
                ])

                if (insertRe) {
                    return true
                }
            }

        }

    }catch(err) {
        console.log(err);
    }

    return false
}