import "./App.css";
import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import SearchBooks from "./SearchBooks";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";

const App = () => {

  const [allBooks, setAllBooks] = useState([]);

  const getAllBooks = async () => {
    const res = await BooksAPI.getAll();
    setAllBooks(res);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const updateAPI = (book, newShelf) => {
    const update = async () => {
      BooksAPI
        .update(book, newShelf)
        .then((response) => {
          if (response) {
            getAllBooks();
          }
        })
        .catch((e) => {
          console.log(e.error);
        });;
    }
    update();
  }

  return (
    <Routes>
      <Route
        path="/search"
        element={
          <SearchBooks allBooks={allBooks} onUpdateAPI={updateAPI} />
        }
      />
      <Route
        exact
        path="/"
        element={
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf allBooks={allBooks} onUpdateAPI={updateAPI} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" className="">Add a book</Link>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
