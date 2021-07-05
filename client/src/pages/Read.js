import React, {useContext, useEffect, useState} from "react"
import BookList from "../components/BookList"
import AddBookForm from "../components/AddBookForm"
import {UserContext} from "../context/UserProvider"
import "../css/bookPages.css"
import Popup from "../components/Popup"

function Read(props) {
    const {filters, getBooks, addBook, deleteBook, editBook} = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false)

    const togglePopup = () => setIsOpen(!isOpen)

    useEffect(() => {
        getBooks({finished: true})
    }, [])

    return (
        <div className="lists">
            <h1>finished</h1>
            <button onClick={togglePopup}>add book</button>
            {isOpen && <Popup handleClose={togglePopup} />}
            <AddBookForm submit={addBook} finished btnText="add" />
            <BookList books={filters.readBooks} delete={deleteBook} edit={editBook} finishBtn="reread" />
        </div>
    );
}

export default Read;