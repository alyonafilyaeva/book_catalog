import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import React from "react";
import { NavLink } from "react-router-dom";

function BookItem({ book }) {
  const db = getFirestore();
  const deleteBook = async(id) => {
    await deleteDoc(doc(db, "books", book.id));
};
  return (
    <div className="book">
      <div>
        <p>{book?.title}</p>
        {!!book?.authors && <p>Автор: {book?.authors.toString()}</p>}
        {!!book?.createdAt && <p>Год публикации: {book?.createdAt}</p>}
        {!!book?.rating && <p>Рейтинг: {book?.rating}</p>}
        {!!book?.ISBN && <p>ISBN: {book?.ISBN}</p>}
      </div>

      <div className="btns">
        <NavLink className="btn edit" to="/editBook" state={book}>Редактировать</NavLink>
        <p className="btn delete" onClick={() => deleteBook()}>Удалить</p>
      </div>
    </div>
  );
}

export default BookItem;
