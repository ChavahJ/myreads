import Book from "./Book";

const Booklist = ({ booksInList, onUpdateBookshelf }) => {

  const updateBooklist = (book, newShelf) => {
    onUpdateBookshelf(book, newShelf);
  }

  return (
    <ol className="books-grid">
      {
        Array.isArray(booksInList) && booksInList.map((book) => {
          return (
            <Book
              key={book.id}
              book={book}
              onUpdateBooklist={updateBooklist}
            />
          )
        })
      }
    </ol>
  )
};

export default Booklist;