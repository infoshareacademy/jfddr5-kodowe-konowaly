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
import up from "./img/up.svg";
import down from "./img/down.svg";
import s from "./App.module.css";

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
      votes: kwik.data.votes + 1,
    }).then(getKwik);
  };

  const decrementVotes = (id) => {
    const kwik = kwikArray.find((kwik) => kwik.id === id);
    const ref = doc(db, "Kwik", id);
    updateDoc(ref, {
      votes: kwik.data.votes - 1,
    }).then(getKwik);
  };

  const renderKwik = () =>
    kwikArray.map((KwikElement) => (
      <>
        <div className={s.displayMeme} key={KwikElement.id}>
          <div className={s.titleName}>{KwikElement.data.title}</div>

          <img className={s.image} src={KwikElement.data.url} />
          <div className={s.tagName}>{KwikElement.data.nameTag}</div>
          <p className={s.votesNumber}>
            Ilość głosów: {KwikElement.data.votes}
          </p>
          <div className={s.likes}>
            <img
              className={s.thumbUp}
              src={up}
              onClick={() => incrementVotes(KwikElement.id)}
            ></img>
            <img
              className={s.thumbDown}
              src={down}
              onClick={() => decrementVotes(KwikElement.id)}
            ></img>
          </div>
        </div>
        <hr />
      </>
    ));
  console.log(kwikArray);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/AddKwik" element={<Addmeme fetchKwik={getKwik} />} />
        <Route path="/Top" element={<Top />} />
        <Route path="/WaitingRoom" element={<Waitingroom />} />
        <Route path="/Login" element={<LoginRegister />} />
        <Route path="/Register" element={<LoginRegister />} />
      </Routes>
      <div> {renderKwik()}</div>
    </BrowserRouter>
  );
}
export default App;
