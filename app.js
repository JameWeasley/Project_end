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
    return res.render("index" , {
        username: req.session?.username
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
        return res.render("backend")
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

const port = 80
app.listen(80 , async () => {
    console.log(`running port ${port}`);
})