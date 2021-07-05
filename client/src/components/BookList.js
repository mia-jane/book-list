import React from 'react';
import Book from "./Book"

function BookList(props) {
    const {books} = props
    const mappedBooks = books.map(book => (<Book {...book} key={book._id} delete={props.delete} edit={props.edit} finishBtn={props.finishBtn} /> ))
    return (
        <div className="bookList">
            {mappedBooks}
        </div>
    );
}

export default BookList;