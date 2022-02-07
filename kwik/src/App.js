import Nav from "./Header/nav";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addmeme from "./subpages/Addmeme";
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
  const [kwikFilteredArray, setKwikFilteredArray] = useState([]);

  const getKwik = async () => {
    const kwikCollection = collection(db, "Kwik");
    const kwikDocuments = await getDocs(kwikCollection);

    const kwikList = kwikDocuments.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    const kwikFilteredList = kwikList.filter((kwik) => {
      return kwik.data.votes > 20;
    });

    setKwikArray(kwikList);
    setKwikFilteredArray(kwikFilteredList);
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
        <Route
          path="/"
          element={
            <RenderKwiks
              kwikArray={kwikFilteredArray}
              changeVotes={changeVotes}
            />
          }
        />
        <Route path="/AddKwik" element={<Addmeme fetchKwik={getKwik} />} />
        <Route
          path="/Top"
          element={
            <RenderKwiks kwikArray={kwikArray} changeVotes={changeVotes} />
          }
        />
        <Route
          path="/WaitingRoom"
          element={
            <RenderKwiks kwikArray={kwikArray} changeVotes={changeVotes} />
          }
        />
        <Route path="/Login" element={<LoginRegister />} />
        <Route path="/Register" element={<LoginRegister />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
