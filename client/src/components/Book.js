import React, {useState} from 'react';
import Popup from '../components/Popup';
import "../css/book.css"


function Book(props) {
    const {title, summary, genre, imageUrl, _id, finished } = props
    const [onEdit, setOnEdit] = useState(false)

    const closeEdit = () => setOnEdit(false)
    
    const handleEditSubmit = ( updatedBook, bookId) => {
        props.edit(updatedBook, bookId)
    }

    return (
        <div className="book-display">
            { !onEdit ? 
                <>
                <img src={imageUrl} alt="book cover" />
                <div className="btns-container">
                    <div className="x-edit-btn-container">
                        <button className="xBtn" onClick={() => props.delete(props._id)}>x</button>
                        <button className="editBtn" onClick={()=> setOnEdit(true)}>edit</button>
                    </div>
                    {/* <button className="finishBtn" onClick={() => props.edit({title, summary, genre, imageUrl, finished: !finished}, _id)}>{props.finishBtn}</button> */}
                    <button className="finishBtn" onClick={() => props.edit({finished: !finished}, _id)}>{props.finishBtn}</button>
                </div>
                <h5 className="book-title">{title}</h5>
                <p className="book-genre">{genre}</p>
                <p className="book-summary">{summary}</p>
                
                </>
                :
                <>
                    <Popup 
                        btnText="edit"
                        handleClose={closeEdit}
                        submit={handleEditSubmit}
                        finished={finished}
                        title={title}
                        imageUrl={imageUrl}
                        summary={summary}
                        genre={genre}
                        _id={_id}
                    />
                </>
            }
           
        </div>
    );
}

export default Book;