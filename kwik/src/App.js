import Nav from "./Header/nav";
import React from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import MainPage from "./subpages/MainPage";
import Addmeme from "./subpages/Addmeme";
import Top from "./subpages/Top";
import Waitingroom from "./subpages/Waitingroom";
import { LoginRegister } from "./subpages/LoginRegister";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "./db";
import up from "./img/up.png";
import down from "./img/down.png";

function App() {
  const [kwikArray, setKwikArray] = useState([]);

  const getKwik = async () => {
    const kwikCollection = collection(db, "Kwik");
    const kwikDocuments = await getDocs(kwikCollection);

    const kwikList = kwikDocuments.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    setKwikArray(kwikList);
  };

  useEffect(() => {
    getKwik();
  }, []);

  const incrementVotes = (id) => {
    const kwik = kwikArray.find((kwik) => kwik.id === id);
    const ref = doc(db, "Kwik", id);
    updateDoc(ref, {
      Votes: kwik.data.Votes + 1,
    }).then(getKwik);
  };

  const decrementVotes = (id) => {
    const kwik = kwikArray.find((kwik) => kwik.id === id);
    const ref = doc(db, "Kwik", id);
    updateDoc(ref, {
      Votes: kwik.data.Votes - 1,
    }).then(getKwik);
  };

  const renderKwik = () =>
    kwikArray.map((KwikElement) => (
      <div key={KwikElement.id}>
        <div>{KwikElement.data.Title}</div>
        <img style={{ width: "400px" }} src={KwikElement.data.URL} />
        <p>{KwikElement.data.Votes}</p>

        <img
          style={{ width: "30px" }}
          src={up}
          onClick={() => incrementVotes(KwikElement.id)}
        ></img>
        <img
          style={{ width: "30px" }}
          src={down}
          onClick={() => decrementVotes(KwikElement.id)}
        ></img>
        <hr />
      </div>
    ));
  console.log(kwikArray);

  return (
    <BrowserRouter>
      <Nav />
      <NavLink to="/">MainPage</NavLink>
      <NavLink to="/Topka">Topka</NavLink>
      <NavLink to="/Login/register">Login</NavLink>
      <NavLink to="/Poczekalnia">Poczekalnia</NavLink>
      <NavLink to="/AddKwik">Dodaj Kwika</NavLink>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/AddKwik" element={<Addmeme fetchKwik={getKwik} />} />
        <Route path="/Topka" element={<Top />} />
        <Route path="/Poczekalnia" element={<Waitingroom />} />
        <Route path="/Login/register" element={<LoginRegister />} />
      </Routes>
      <div> {renderKwik()}</div>
    </BrowserRouter>
  );
}

export default App;
