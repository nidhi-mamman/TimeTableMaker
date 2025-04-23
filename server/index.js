const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
let PORT = process.env.PORT
const app = express()
app.use(cors)
app.use(express.json())
connectDB()
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})