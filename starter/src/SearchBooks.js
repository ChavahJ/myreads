import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import Booklist from "./Booklist";

const SearchBooks = ({ allBooks, onUpdateAPI }) => {
  const [query, setQuery] = useState([]);

  const [booksInSearch, setBooksInSearch] = useState([]);

  const searchBooks = (event) => {
    let query = event.target.value;
    setQuery(query);
    BooksAPI
      .search(query, 20)
      .then((response) => {
        if (!response.error) {
          response.forEach((bookInSearch) => {
            allBooks.forEach((book) => {
              if (book.id === bookInSearch.id) {
                bookInSearch.shelf = book.shelf;
              }
            })
          });
        }
        setBooksInSearch(response);
      })
      .catch((e) => {
        setBooksInSearch([]);
      });
  }
  const updateBookshelf = (book, newShelf) => {
    booksInSearch.forEach((bookInSearch) => {
      if (book.id === bookInSearch.id) {
        bookInSearch.shelf = newShelf;
      }
    });
    onUpdateAPI(book, newShelf);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          to="/"
          className="close-search"
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => searchBooks(event)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <Booklist booksInList={booksInSearch} onUpdateBookshelf={updateBookshelf} />
      </div>
    </div>
  )
}

SearchBooks.propTypes = {
  allBooks: PropTypes.array.isRequired,
};

export default SearchBooks;