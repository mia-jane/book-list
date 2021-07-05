import React, {useContext, useEffect, useState} from 'react';
import BookList from "../components/BookList"
import {UserContext} from "../context/UserProvider"
import "../css/bookPages.css"
import Popup from '../components/Popup';

function Unread(props) {
    const {filters, getBooks, addBook, deleteBook, editBook, markFinished} = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false)
    const togglePopup = () => setIsOpen(!isOpen)

    useEffect(() => { 
        getBooks({finished: false})
    }, [])
    return (
        <div className="lists">
            <h1 style={{color: '#2b2d42'}}>to read</h1>
            <div className="popupBtnContainer">
                <button className="popupBtn" onClick={togglePopup}>Add Book</button>
            </div>
            {isOpen && <Popup handleClose={togglePopup} />}
            <BookList books={filters.unreadBooks} delete={deleteBook} edit={editBook} toggleFinished={markFinished} finishBtn="finished" />
        </div>
    );
}

export default Unread;