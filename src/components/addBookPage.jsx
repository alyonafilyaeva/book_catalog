import { Field, Formik } from "formik";
import React from "react";
import "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getFirestore, addDoc } from "firebase/firestore";

function AddBookPage() {
  const db = getFirestore();
  const nav = useNavigate();
  const date = new Date()
  const addBook = async (values) => {
    if (!values.title || !values.authors || values.createdAt <=1800 || values.rating <0 || values.rating > 10) {
      alert("Проверьте корректность введенных данных");
    } else {
      const data = await addDoc(collection(db, "books"), {
        ISBN: values.ISBN,
        authors: values.authors.split(", "),
        createdAt: +values.createdAt,
        rating: +values.rating,
        title: values.title,
      }).then(() => {
        nav("/");
      });
    }

    console.log("отправилсь");
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
        {({ handleChange, handleSubmit, values }) => (
          <form className="form">
            <div className="input_item">
              <p>Название книги</p>
              <Field
                name="title"
                className="input"
                /* onChange={handleChange('title')} */
                value={values.title}
                placeholder="Название книги"
                maxLength={100}
                required
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
                required
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
                type="number"
              />
              {(values.createdAt <1800 || values.createdAt > date.getFullYear()) && <p style={{color: "#F21F39", fontSize: "14px"}}>Год публикации должен быть не раньше 1800</p>}
            </div>
            <div className="input_item">
              <p>Рейтинг</p>
              <Field
                name="rating"
                className="input"
                onChange={handleChange}
                value={values.rating}
                placeholder="Рейтинг"
                type="number"
                pattern="[0-9]*"
              />
              {(values.rating <0 || values.rating > 10) && <p style={{color: "#F21F39", fontSize: "14px"}}>Рейтинг должен быть от 0 до 10</p>}
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
            <button type="submit" onClick={handleSubmit}>
              {" "}
              Добавить книгу
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddBookPage;
