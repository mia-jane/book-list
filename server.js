const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const morgan = require("morgan")
const expressJwt = require("express-jwt")


app.use("/", express.json())
app.use(morgan("dev"))


mongoose.connect("mongodb://localhost:27017/booksdb", 
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

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    res.send({errMsg: err.message})
})

app.listen(9000, () => {
    console.log("server is running")
})
