const express = require("express")
const app = express()
app.use(express.json())
const user = require("../models/index").user
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "inipunyakasir"
//const auth = require("../auth")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", async (req, res)  => {
    user.findAll()
    .then(result => {
        res.json({
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/:id", async (req, res) => {
    let param = {
        id_user: req.params.id
    }
    user.findOne({ where: param})
    .then(result => {
     res.json({
        data: result
     })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", async (req, res) => {
    let data = {
        nama_user: req.body.nama_user,
        role: req.body.role,
        username: req.body.username,
        password: md5(req.body.password)
    }
    user.create(data)
    .then(result => {
        res.json ({
            message: "Data Berhasil Ditambahkan",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", async (req, res) => {
    let param = {
        id_user: req.body.id_user
    }
    let data = {
        nama_user: req.body.nama_user,
        role: req.body.role,
        username: req.body.username,
        password: md5(req.body.password)
    }
    user.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data Berhasil Diperbarui",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id", async (req, res) => {
    let param = {
        id_user: req.params.id
    }
    user.destroy({ where: param })
    .then(result => {
        res.json({
            message: "Data Berhasil Dihapus",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//Login admin
app.post("/login", async (req, res) => {
    let param = {
        username: req.body.username,
        password: md5(req.body.password)
    }
    let result = await user.findOne({ where: param })
    if (result) {
        let payload = JSON.stringify(result)
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token:token
        })
    } else {
        res.json({
            logged: false,
            message: "username atau password salah"
        })
    }
})

  
  
  module.exports = app