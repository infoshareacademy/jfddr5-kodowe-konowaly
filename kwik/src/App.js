import Nav from "./Header/nav";
import React from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import MainPage from "./subpages/MainPage";
import Addmeme from "./subpages/Addmeme";
import Top from "./subpages/Top";
import Waitingroom from "./subpages/Waitingroom";
import { LoginRegister } from "./subpages/LoginRegister";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/AddKwik" element={<Addmeme />} />
        <Route path="/Top" element={<Top />} />
        <Route path="/WaitingRoom" element={<Waitingroom />} />
        <Route path="/Login/register" element={<LoginRegister />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
