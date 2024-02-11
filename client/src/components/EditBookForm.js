import React, { useState } from "react";
import "../css/form.css";

function EditBookForm(props) {
  const initBookInfo = {
    title: props.title || "",
    author: props.author || "",
    imageUrl: props.imageUrl || "",
    summary: props.summary || "",
    genre: props.genre || "",
    finished: props.finished,
  };

  const [bookInfo, setBookInfo] = useState(initBookInfo);
  const { title, author, imageUrl, summary, genre } = bookInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo((prevBookInfo) => ({
      ...prevBookInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submit({ ...bookInfo }, props._id);
    setBookInfo(initBookInfo);
    props.handleClose();
  };

  return (
    <div className="book-form-container">
      <form className="book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="cover image url"
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
        />
        <input
          type="text"
          required
          placeholder="author"
          name="author"
          value={author}
          onChange={handleChange}
        />
        <input
          type="text"
          required
          placeholder="genre"
          name="genre"
          value={genre}
          onChange={handleChange}
        />
        <div className="summary-area">
          <p style={{ fontSize: 25 }}>summary:</p>
          <textarea
            className="summary"
            required
            type="text"
            name="summary"
            value={summary}
            onChange={handleChange}
          />
        </div>
        <div className="add-btn-container">
          <button className="default-btn">save</button>
        </div>
      </form>
    </div>
  );
}

export default EditBookForm;