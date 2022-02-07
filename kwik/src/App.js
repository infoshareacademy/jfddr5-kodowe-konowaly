import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Header/nav";
import React from "react";
import AddKwik from "./components/AddKwik/AddKwik";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import db from "./db";
import RenderKwiks from "./components/RenderKwiks";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

function App() {
  const [kwikArray, setKwikArray] = useState([]);
  const [kwikFilteredArray, setKwikFilteredArray] = useState([]);
  const [kwikSortedArray, setKwikSortedArray] = useState([]);

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

    const kwikSortedList = [...kwikFilteredList].sort((a, b) => {
      return b.data.votes - a.data.votes;
    });
    console.log(kwikSortedList);
    setKwikArray(kwikList);
    setKwikFilteredArray(kwikFilteredList);
    setKwikSortedArray(kwikSortedList);
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
        <Route path="/AddKwik" element={<AddKwik fetchKwik={getKwik} />} />
        <Route
          path="/Top"
          element={
            <RenderKwiks
              kwikArray={kwikSortedArray}
              changeVotes={changeVotes}
            />
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

// return onSnapshot(doc(db, "Kwik", "fh4v7j1B0au8z3YVKsEq"), (doc) => {
//       console.log(doc.data());
//       const newKwikArray = kwikArray.map((kwik) =>
//         kwik.id === "fh4v7j1B0au8z3YVKsEq"
//           ? {
//               ...kwik,
//               data: { ...kwik.data, votes: doc.data().votes },
//             }
//           : kwik
//       );
//       kwikArray.length && setKwikArray(newKwikArray);
//     });
//   };

//   useEffect(() => {
//     const unsub = getKwik();
//     return unsub;
//   }, []);
