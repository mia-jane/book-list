const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: String,
    genre: {
        type: String,
        required: true
        },
    // genre: {
    //     type: Array,
    // },
    summary: {
        type: String,
        required: true
    },
    finished:{
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Book", bookSchema)