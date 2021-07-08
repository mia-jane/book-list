import React, {useContext, useEffect, useState} from 'react';
import BookList from "../components/BookList"
import {UserContext} from "../context/UserProvider"
import "../css/bookPages.css"
import Popup from '../components/Popup';

function Unread(props) {
    const {filters, getBooks, addBook, deleteBook, editBook} = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false)
    const togglePopup = () => setIsOpen(!isOpen)

    useEffect(() => { 
        getBooks({finished: false})
    }, [])
    return (
        <div className="lists">
            <h1>to read</h1>
            <div className="popupBtnContainer">
                <button className="popupBtn" onClick={togglePopup}>add book</button>
            </div>
            {isOpen && <Popup btnText="add" handleClose={togglePopup} submit={addBook} finished={false} />}
            <BookList books={filters.unreadBooks} delete={deleteBook} edit={editBook} finishBtn="finished" />
        </div>
    );
}

export default Unread;