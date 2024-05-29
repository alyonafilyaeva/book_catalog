import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import MainPage from "./components/mainPage";
import AddBookPage from "./components/addBookPage";
import EditBookPage from "./components/editBookPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink to="/">Главная страница</NavLink>
          <NavLink to="/addBook">Добавить книгу</NavLink>
        </div>
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/addBook" element={<AddBookPage />} />
            <Route path="/editBook" element={<EditBookPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
