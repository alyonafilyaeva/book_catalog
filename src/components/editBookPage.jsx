import { Field, Formik } from "formik";
import React, { useState } from "react";
import "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getFirestore, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

function EditBookPage({book}) {
  const location = useLocation();
  console.log(location.state.id)
  const db = getFirestore();
  const nav = useNavigate()

  const editBook = async (values) => {
    console.log(values)
    const data = await updateDoc(doc(db, "books", location.state.id), {
      "ISBN": values.ISBN,
      "authors": values.authors.split(', '),
      "createdAt": +values.createdAt,
      "rating": +values.rating,
      "title": values.title,
    }).then(() => {
        nav('/')
    })
    console.log('отправилсь')
  };

  
  return (
    <div className="add_page">
      <Formik
        initialValues={{
          title: location.state.title,
          authors: location.state.authors.toString(),
          createdAt: location.state.createdAt,
          rating: location.state.rating,
          ISBN: location.state.ISBN,
        }}
        onSubmit={(values) => editBook(values)}
      >
        {({ handleChange,handleSubmit, values }) => (
          <form className="form">
            <div className="input_item">
              <p>Название книги</p>
              <Field
                name="title"
                className="input"
                /* onChange={handleChange('title')} */
                value={values.title}
                placeholder="Название книги"
              />
            </div>
            <div className="input_item">
              <p>Автор</p>
              <Field
              name="authors"
                className="input"
                onChange={handleChange}
                value={values.authors}
                placeholder="Если авторов несколько, введите их через запятую"
              />
            </div>
            <div className="input_item">
              <p>Год публикации</p>
              <Field
              name="createdAt"
                className="input"
                onChange={handleChange}
                value={values.createdAt}
                placeholder="Год публикации"
              />
            </div>
            <div className="input_item">
              <p>Рейтинг</p>
              <Field
              name="rating"
                className="input"
                onChange={handleChange}
                value={values.rating}
                placeholder="Рейтинг"
              />
            </div>
            <div className="input_item">
              <p>ISBN</p>
              <Field
              name="ISBN"
                className="input"
                onChange={handleChange}
                value={values.ISBN}
                placeholder="ISBN"
              />
            </div>
            <button type="submit" onClick={handleSubmit}>Редактировать книгу</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditBookPage;
