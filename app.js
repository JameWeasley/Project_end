const express = require('express')
const cors = require("cors")
const path = require("path")
const cookieSession = require('cookie-session')
const bk_login = require("./backend/db")

const app = express()

app.use(cookieSession({
    name: 'session',
    keys: ['sha256' , 'james'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('views'));
app.use("/" , express.static(path.join(__dirname , 'views')))
app.set('views', path.join(__dirname, 'views'));
app.set("view engine" , 'ejs')

app.get("/" , async (req ,res) => {

    const lastTime = new Date()
    const detail = await bk_login.getNowDetail(`${lastTime.getFullYear()}-${ (lastTime.getMonth() + 1).toString().padStart(2 , '0') }-${lastTime.getDate().toString().padStart(2,'0')}` , req.session?.username)

    return res.render("index" , {
        username: req.session?.username,
        detail: detail
    })
})

app.get("/login" , async (req , res) => {
    if (req.session?.username) {
        return res.redirect("/")
    }
    return res.render("login");
})

app.get("/backend" , async (req, res) => {
    if (req.session?.roles && req.session.roles) {
        const dataUsers = await bk_login.getUsers()
        const dataDetail = await bk_login.getAllDetail()
        return res.render("backend", {
            dataUsers: dataUsers,
            dataDetail: dataDetail

        })
    }
    return res.redirect("/notfound")
})

app.get("/logout" , async (req ,res) => {
    if (req.session?.username) {
        req.session = null
    }
    return res.redirect("/login")
})

app.post("/loginAuth" , async (req , res) => {
    const { username , password } = req.body
    const loggedin = await bk_login.loginAuth(username , password)

    if (req.session?.username) {
        return res.redirect("/")
    }

    if (loggedin) {
        req.session.username = username
        req.session.roles = loggedin.roles

        if (req.session.roles) {
            return res.redirect("/backend")
        }

        return res.redirect("/")
    }

    return res.render("login" , {
        error: "ไม่สามารถเข้าสู่ระบบได้กรุณาตรวจสอบไอดีและพาสเวิด"
    })
})

// รับงาน
app.post("/addDetail" , async (req , res) => {
    const { username , detail , timestart , timeend } = req.body
    await bk_login.addDetail(username , detail , timestart , timeend)

    return res.redirect("/backend")
})

app.get("/getDetail" , async (req , res) => {
    const { time } = req.query
    if (time) {
        return res.send(await bk_login.getNowDetail(time , req.session?.username))
    }
   
})

const port = 80
app.listen(80 , async () => {
    console.log(`running port ${port}`);
})