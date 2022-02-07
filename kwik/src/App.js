import Nav from "./Header/nav";
import React from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
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
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "./db";
import up from "./img/up.png"
import down from "./img/down.png"
import { async } from "@firebase/util";

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
      votes: increment(1),
    }).then(getKwik);
  };

  const decrementVotes = (id) => {
    const kwik = kwikArray.find((kwik) => kwik.id === id);
    const ref = doc(db, "Kwik", id);
    updateDoc(ref, {
      votes: increment(-1),
    }).then(getKwik);
  };

  const renderKwik = () =>
    kwikArray.map((kwikElement) => (
      <div key={kwikElement.id}>
        <div>{kwikElement.data.title}</div>
        <img style={{ width: "400px" }} src={kwikElement.data.url} />
        <p>{kwikElement.data.votes}</p>

        <img
          style={{ width: "30px" }}
          src={up}
          onClick={() => incrementVotes(kwikElement.id)}
        ></img>
        <img
          style={{ width: "30px" }}
          src={down}
          onClick={() => decrementVotes(kwikElement.id)}
        ></img>
        <hr />
      </div>
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
