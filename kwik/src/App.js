import Nav from "./Header/nav";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./subpages/MainPage";
import Addmeme from "./subpages/Addmeme";
import Top from "./subpages/Top";
import Waitingroom from "./subpages/Waitingroom";
import { LoginRegister } from "./subpages/LoginRegister";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "./db";
import RenderKwiks from "./components/RenderKwiks";

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

  const changeVotes = (id, number) => {
    const kwik = kwikArray.find((kwik) => kwik.id === id);
    const ref = doc(db, "Kwik", id);
    updateDoc(ref, {
      votes: increment(number),
    }).then(getKwik);
  };

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/AddKwik" element={<Addmeme fetchKwik={getKwik} />} />
        <Route
          path="/Top"
          element={<Top kwikArray={kwikArray} changeVotes={changeVotes} />}
        />
        <Route path="/WaitingRoom" element={<Waitingroom />} />
        <Route path="/Login" element={<LoginRegister />} />
        <Route path="/Register" element={<LoginRegister />} />
      </Routes>
      <RenderKwiks kwikArray={kwikArray} changeVotes={changeVotes} />
    </BrowserRouter>
  );
}
export default App;
