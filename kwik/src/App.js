
import Nav from "./Header/nav";
import React from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import MainPage from "./subpages/MainPage";
import Addmeme from "./subpages/Addmeme";
import Top from "./subpages/Top";
import Waitingroom from "./subpages/Waitingroom";
import { LoginRegister } from "./subpages/LoginRegister";

import { collection, getDocs, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "./db";

function App() {
  const [Kwik, setKwik] = useState([]);

  const getKwik = async () => {
    const KwikCollection = collection(db, "Kwik");
    const KwikDocuments = await getDocs(KwikCollection);

    const KwikList = KwikDocuments.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    setKwik(KwikList);
  };

  useEffect(() => {
    getKwik();
  }, []);

  const renderKwik = () =>
    Kwik.map((KwikElement) => (
      <div key={KwikElement.id}>
        <div>{KwikElement.data.Title}</div>
        <img style={{ width: "400px" }} src={KwikElement.data.URL} />
        <hr />
      </div>
    ));
  console.log(Kwik);

  return (
    <BrowserRouter>
    <nav />
      <NavLink to="/">MainPage</NavLink>
      <NavLink to="/Topka">Topka</NavLink>
      <NavLink to="/Login/register">Login</NavLink>
      <NavLink to="/Poczekalnia">Poczekalnia</NavLink>
      <NavLink to="/AddKwik">Dodaj Kwika</NavLink>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/AddKwik" element={<Addmeme />} />
        <Route path="/Topka" element={<Top />} />
        <Route path="/Poczekalnia" element={<Waitingroom />} />
        <Route path="/Login/register" element={<LoginRegister />} />
      </Routes>
      <div> {renderKwik()}</div>
    </BrowserRouter>
  );

}

export default App;
