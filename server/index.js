const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const HODRouter = require('./router/index')
const TimeTableRouter = require('./router/timetable')

let PORT = process.env.PORT
const app = express()
// Middlewares
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', HODRouter)
app.use('/api/timetable', TimeTableRouter)

connectDB()

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})