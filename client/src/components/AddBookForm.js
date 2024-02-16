import React, { useState, useEffect } from "react";
import EditBookForm from "./EditBookForm";
import "../css/form.css";

function AddBookForm(props) {
  const initBookInfo = {
    title: props.title || "",
    author: props.author || "",
    imageUrl: props.imageUrl || "",
    summary: props.summary || "",
    genre: props.genre || "",
    finished: props.finished,
  };

  const [apiKey, setApiKey] = useState(null);
  const [bookInfo, setBookInfo] = useState(initBookInfo);
  const { title, author, imageUrl, summary, genre } = bookInfo;
  const [error, setError] = useState(null);

  const [displaySearchResult, setDisplaySearchResult] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    async function fetchApiKey() {
      try {
        const response = await fetch("/apikeys/google-books-api-key");
        if (!response.ok) {
          throw new Error("Failed to fetch API key");
        }
        const data = await response.json();
        setApiKey(data.apiKey);
      } catch (error) {
        console.error("Error fetching API key:", error.message);
      }
    }

    fetchApiKey();
  }, []);

  const searchBooksApi = async (title, author) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          title
        )}+inauthor:${encodeURIComponent(author)}&key=${apiKey}`
      );
      const data = await response.json();
      console.log(data);

      if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
        console.log(book);
        const title = book.title;
        const author = book.authors ? book.authors.join(", ") : "Unknown";
        const genre = book.categories ? book.categories.join(",") : "Unknown";
        const summary = book.description
          ? book.description
          : "No summary available";
        const imageUrl = book.imageLinks?.thumbnail || "";

        setBookInfo((prevBookInfo) => ({
          ...prevBookInfo,
          summary,
          imageUrl,
          genre,
          author,
          title,
        }));
        setError(null);
        setDisplaySearchResult(true);
      } else {
        setError("Book not found, please manually enter the book's details");
        setDisplaySearchResult(false);
        setOpenEdit(true);
      }
    } catch (error) {
      setError(
        "Error fetching book information, please manually enter the book's details"
      );
      setDisplaySearchResult(false);
      setOpenEdit(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo((prevBookInfo) => ({
      ...prevBookInfo,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchBooksApi(bookInfo.title, bookInfo.author);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submit({ ...bookInfo }, props._id);
    setBookInfo(initBookInfo);
    setDisplaySearchResult(false);
    props.handleClose();
  };

  return (
    <div className="book-form-container">
      {!openEdit ? (
        <>
          <form className="book-form" onSubmit={handleSearch}>
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
              required
              placeholder="author"
              name="author"
              value={author}
              onChange={handleChange}
            />
            <button className="default-btn">Search</button>
          </form>

          {displaySearchResult && (
            <div className="book-preview">
              {imageUrl && (
                <img src={imageUrl} alt="Book Cover" className="book-cover" />
              )}
              <h2>{title}</h2>
              <h3>{author}</h3>
              <p className="book-genre">{genre}</p>
              <p className="book-summary">{summary}</p>
              <div className="buttons-container">
                <button
                  className="default-btn white-btn"
                  onClick={() => setOpenEdit(true)}
                >
                  edit details
                </button>
                <button className="default-btn" onClick={handleSubmit}>
                  add book
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {error && <p>{error}</p>}
          <EditBookForm
            btnText={props.btnText}
            submit={props.submit}
            handleClose={props.handleClose}
            finished={props.finished}
            title={title}
            author={author}
            imageUrl={imageUrl}
            summary={summary}
            genre={genre}
          />
        </>
      )}
    </div>
  );
}

export default AddBookForm;
