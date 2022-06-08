import { useState } from "react";
import PropTypes from "prop-types";

const Book = ({ book, onUpdateBooklist }) => {
  const [shelfOfBook, setShelfOfBook] = useState(book.shelf ? book.shelf : "none");
  let authorArray = [];
  const authors = book.authors;
  if (book.authors) {
    authorArray = authors.map((author) => author);
  }

  let imgURL = "";

  if (book.imageLinks) {
    imgURL = book.imageLinks.thumbnail;
  }

  const handleChange = (book, value) => {
    let newShelf = value;
    onUpdateBooklist(book, newShelf);
    setShelfOfBook(newShelf);
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imgURL}")`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={shelfOfBook}
              onChange={(event) => handleChange(book, event.target.value)}
            >
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title ? book.title : "No Title"}</div>
        <div className="book-authors">
          {authors ? authorArray.join(", ") : "No Author"}
        </div>
      </div>
    </li>
  )
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
};

export default Book;