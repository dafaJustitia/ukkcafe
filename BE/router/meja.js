const express = require("express")
const app = express()
const meja = require("../models/index").meja

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", async (req, res) => {
  meja.findAll()
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
    id_meja: req.params.id
  }
  meja.findOne({ where: param })
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
    nomor_meja: req.body.nomor_meja,
    status: req.body.status
  }
  meja.create(data)
    .then(result => {
      res.json({
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
    id_meja: req.body.id_meja
  }
  let data = {
    nomor_meja: req.body.nomor_meja,
    status: req.body.status
  }
  meja.update(data, { where: param })
    .then(result => {
      res.json({
        message: "Data Berhasil Diperbarui"
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
    id_meja: req.params.id
  }
  meja.destroy({ where: param })
    .then(result => {
      res.json({
        message: "Data Berhasil Dihapus"
      })
    })
    .catch(error => {
      res.json({
        message: error.message
      })
    })
})

module.exports = app