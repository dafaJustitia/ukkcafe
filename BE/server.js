const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

app.use(express.static(__dirname))

const user = require("./router/user")
app.use("/cafe/user", user)

const meja = require("./router/meja")
app.use("/cafe/meja", meja)

const menu = require("./router/menu")
app.use("/cafe/menu", menu)

app.listen(4040, () => {
    console.log("Server run on port 4040")
})