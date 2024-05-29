import React, { useEffect, useState } from "react";
import YearBlock from "./yearBlock";
import "../firebase";
import { collection, getFirestore, addDoc, getDocs } from "firebase/firestore";
import BookItem from "./bookItem";

function MainPage() {
  const [books, setBooks] = useState();
  const db = getFirestore();
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const arr = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      arr.push({ id, ...data });
    });
    setBooks(arr);
    console.log(books);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const years = [...new Set(books?.map((book) => book.createdAt))].sort(
    (a, b) => b - a
  );
  console.log(years);
  let yearsElements = years.map((year) => (
    <YearBlock year={year} books={books} />
  ));
  let date = new Date();
  let goodBooks = books?.filter(
    (book) => book.createdAt !== 0 && book.createdAt < date.getFullYear() - 3
  );
  console.log(goodBooks)
  let maxRating = Math.max.apply(
    null,
    goodBooks?.map((book) => book.rating)
  );
  let recommendBooks = goodBooks?.filter((book) => book.rating == maxRating);
  let random = Math.floor(Math.random() * (recommendBooks?.length - 0) + 0);
  let recommendBook = recommendBooks?.[random];

  return (
    <div>
      <p className="year">Рекомендуемая книга</p>
      <BookItem book={recommendBook} />
      <ul>{yearsElements}</ul>
    </div>
  );
}

export default MainPage;
