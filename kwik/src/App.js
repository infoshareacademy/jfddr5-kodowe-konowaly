
import React from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import MainPage from "./subpages/MainPage";
import Addmeme from "./subpages/Addmeme";
import Top from "./subpages/Top";
import Waitingroom from "./subpages/Waitingroom";
import { LoginRegister } from "./subpages/LoginRegister";

function App() {
  return (
    <nav />
    <BrowserRouter>
      <NavLink to="/">MainPage</NavLink>
      <NavLink to="/Topka">Topka</NavLink>
      <NavLink to="/Login/register">
        <button>Login</button>
      </NavLink>
      <NavLink to="/Poczekalnia">Poczekalnia</NavLink>
      <NavLink to="/AdKwik">Dodaj Kwika</NavLink>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/AddKwik" element={<Addmeme />} />
        <Route path="/Topka" element={<Top />} />
        <Route path="/Poczekalnia" element={<Waitingroom />} />
        <Route path="/Login/register" element={<LoginRegister />} />
      </Routes>
    </BrowserRouter>
  );
export default App;
