import React, { useState } from "react";
import Popup from "../components/Popup";
import "../css/book.css";

function Book(props) {
  const { title, author, summary, genre, imageUrl, _id, finished } = props;
  const [onEdit, setOnEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const closeEdit = () => setOnEdit(false);
  const handleEditSubmit = (updatedBook, bookId) => {
    props.edit(updatedBook, bookId);
  };
  const toggleBookDetails = () => setOpenDetails(!openDetails);
  return (
    <div className="book-display">
      {!onEdit ? (
        <>
          {imageUrl ? (
            <img
              src={imageUrl}
              className="book-cover book-cover-hover"
              alt="book cover"
              onClick={toggleBookDetails}
            />
          ) : (
            <div
              className="book-cover book-cover-default book-cover-hover"
              onClick={toggleBookDetails}
            >
              <p>{title}</p>
            </div>
          )}
          <div className="btns-container">
            <div className="x-edit-btn-container">
              <button className="xBtn" onClick={() => props.delete(props._id)}>
                x
              </button>
              <button className="editBtn" onClick={() => setOnEdit(true)}>
                edit
              </button>
            </div>
            <button
              className="finishBtn"
              onClick={() => props.edit({ finished: !finished }, _id)}
            >
              {props.finishBtn}
            </button>
          </div>
          <h5 className="book-title">{title}</h5>
          {openDetails && (
            <Popup
              popupType="bookDetails"
              handleClose={toggleBookDetails}
              cover={imageUrl}
              title={title}
              author={author}
              genre={genre}
              summary={summary}
              _id={_id}
            />
          )}
        </>
      ) : (
        <Popup
          btnText="edit"
          popupType="editBook"
          handleClose={closeEdit}
          submit={handleEditSubmit}
          finished={finished}
          title={title}
          author={author}
          imageUrl={imageUrl}
          summary={summary}
          genre={genre}
          _id={_id}
        />
      )}
    </div>
  );
}

export default Book;
