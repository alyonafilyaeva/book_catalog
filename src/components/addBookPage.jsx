import { Field, Formik } from "formik";
import React from "react";
import "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getFirestore, addDoc } from "firebase/firestore";

function AddBookPage() {
  const db = getFirestore();
  const nav = useNavigate()
  const addBook = async (values) => {

    console.log(values)
    const data = await addDoc(collection(db, "books"), {
      ISBN: values.ISBN,
      authors: values.authors.split(', '),
      createdAt: +values.createdAt,
      rating: +values.rating,
      title: values.title,
    }).then(() => {
        nav('/')
    })
    console.log('отправилсь')
  };

  return (
    <div className="add_page">
      <Formik
        initialValues={{
          title: "",
          authors: "",
          createdAt: "",
          rating: "",
          ISBN: "",
        }}
        onSubmit={(values) => addBook(values)}
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
            <button type="submit" onClick={handleSubmit}> Добавить книгу</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddBookPage;
