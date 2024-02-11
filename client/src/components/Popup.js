import React from "react";
import AddBookForm from "./AddBookForm";
import EditBookForm from "./EditBookForm";
import "../css/popup.css";

function Popup(props) {
  return (
    <div className="popupBox">
      <div className="box">
        <div className="close-icon-container">
          <button className="closeIcon" onClick={props.handleClose}>
            x
          </button>
        </div>
        {props.popupType === "addNewBook" ? (
          <AddBookForm
            btnText={props.btnText}
            submit={props.submit}
            handleClose={props.handleClose}
            finished={props.finished}
            title={props.title}
            author={props.author}
            imageUrl={props.imageUrl}
            summary={props.summary}
            genre={props.genre}
            _id={props._id}
          />
        ) : props.popupType === "editBook" ? (
          <EditBookForm
            btnText={props.btnText}
            submit={props.submit}
            handleClose={props.handleClose}
            finished={props.finished}
            title={props.title}
            author={props.author}
            imageUrl={props.imageUrl}
            summary={props.summary}
            genre={props.genre}
            _id={props._id}
          />
        ) : (
          <div class="book-details">
            <img src={props.cover} class="book-cover"  alt="book cover"></img>
            <h2 className="title">{props.title}</h2>
            <h3 className="author">{props.author}</h3>
            <p className="book-genre">{props.genre}</p>
            <p className="book-summary">{props.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Popup;
