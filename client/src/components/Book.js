import React, {useState} from 'react';
import AddBookForm from "../components/AddBookForm"
import "../css/book.css"


function Book(props) {
    const {title, summary, genre, imageUrl, _id, finished } = props
    const [onEdit, setOnEdit] = useState(false)

    const handleEditSubmit = ( updatedBook, bookId) => {
        props.edit(updatedBook, bookId)
            .then(() => setOnEdit(false))
    }

    return (
        <div className="book">
            { !onEdit ? 
                <>
                 <img src={imageUrl} alt="book cover" />
                <h5>{title}</h5>
                <p>{genre}</p>
                <p>{summary}</p>
                <div className="btns-container">
                    <button className="xBtn" onClick={() => props.delete(props._id)}>x</button>
                    <button className="editBtn" onClick={()=> setOnEdit(true)}>Edit</button>
                    <button className="finishBtn" onClick={() => props.edit({title, summary, genre, imageUrl, finished: !finished}, _id)}>{props.finishBtn}</button>
                </div>
                
                </>
                :
                <>
                    <AddBookForm 
                        btnText="submit edit" 
                        submit={handleEditSubmit}
                        title={title}
                        imageUrl={imageUrl}
                        summary={summary}
                        genre={genre}
                        _id={_id}
                    />
                    <button className="close-btn" onClick={() => setOnEdit(false)}>close</button>
                </>
            }
           
        </div>
    );
}

export default Book;