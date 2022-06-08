import PropTypes from "prop-types";
import Booklist from "./Booklist";

const Bookshelf = ({ allBooks, onUpdateAPI }) => {

  const listOfShelves = [
    { "title": "Currently Reading", "type": "currentlyReading" },
    { "title": "Future Reading", "type": "wantToRead" },
    { "title": "Past Reading", "type": "read" }
  ]

  const updateBookshelf = (book, newShelf) => {
    onUpdateAPI(book, newShelf);
  }

  return (
    <div>
      {allBooks && listOfShelves.map((shelf) =>
        <div key={shelf.type} className="bookshelf">
          <h2 className="bookshelf-title">{shelf.title}</h2>
          <div className="bookshelf-books">
            <Booklist
              key={shelf.type}
              booksInList={allBooks.filter(
                (book) => book.shelf === shelf.type
              )}
              onUpdateBookshelf={updateBookshelf}
            />
          </div>
        </div>
      )}
    </div>
  );
};
Bookshelf.propTypes = {
  allBooks: PropTypes.array.isRequired,
};
export default Bookshelf;