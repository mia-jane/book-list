const express = require("express")
const bookRouter = express.Router()
const Book = require("../models/book")

//get finished books
bookRouter.get("/", (req, res, next) => {
    // const finished = req.query.finished === "true"
    Book.find({user: req.user._id, ...req.query}, (err, books) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(books)
    })
})

//post unfinished
bookRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newBook = new Book(req.body)
    // newBook.finished = true
    newBook.save((err, savedBook) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedBook)
    })
})


bookRouter.put("/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
        if(book.finished === false){
            book.finished = !book.finished
            book.save(err => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(book)
            })
        } else if(book.finished === true){
            book.finished = !book.finished
            book.save(err => {
                if(err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(book)
            })
        }
    })
})



bookRouter.put("/:bookId", (req, res, next ) => {
    Book.findOneAndUpdate(
        {_id: req.params.bookId, user: req.user._id },
        req.body,
        {new: true},
        (err, updatedBook) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedBook)
        }
    )
})

bookRouter.delete("/:bookId", (req, res, next) => {
    Book.findOneAndDelete({_id: req.params.bookId, user: req.user._id}, (err, deletedBook) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(deletedBook)
    })
})

module.exports = bookRouter