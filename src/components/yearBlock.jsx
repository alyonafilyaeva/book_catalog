import React from "react";
import BookItem from "./bookItem";

function YearBlock({ year, books }) {
  let booksElements = books
    .sort((a, b) => {
      return b.title < a.title ? 1 : b.title > a.title ? -1 : 0;
    })
    .filter((book) => book.createdAt == year)
    .map((book) => <BookItem book={book} />);
  return (
    <div>
      <p className="year">
        {year ? `${year} год публикации` : "Книги без года публикации"}
      </p>
      <ul className="books">{booksElements}</ul>
    </div>
  );
}

export default YearBlock;
