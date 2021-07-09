const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")
const mongoose = require("mongoose")
const morgan = require("morgan")
const expressJwt = require("express-jwt")

app.use(express.static(path.resolve(__dirname, "client", "build")))
app.use(express.json())
app.use(morgan("dev"))

mongoose.connect(process.env.CONNECTION_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => {
        console.log("connected to the books database")
    }
)
app.use("/auth", require("./routes/authRouter"))
app.use("/api", expressJwt( { secret: process.env.SECRET, algorithms: ['HS256']} )) //creates req.user (payload)
app.use("/api/books", require("./routes/bookRouter"))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    res.send({errMsg: err.message})
})
app.listen(process.env.PORT, () => {
    console.log("server is running")
})