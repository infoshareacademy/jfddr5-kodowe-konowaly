import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Header/nav";
import React from "react";
import AddKwik from "./components/AddKwik/AddKwik";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import {db} from "./db";
import RenderKwiks from "./components/RenderKwiks";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import {auth} from "./db";
import Regulamin from "./Regulamin"
import Polityka from "./Polityka";

function App() {
  const [kwikMainPageArray, setKwikMainPageArray] = useState([]);
  const [kwikTopPageArray, setKwikTopPageArray] = useState([]);
  const [kwikWaitingRoomArray, setKwikWaitingRoomArray] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  

  useEffect(()=>{
    auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.warn("authChange", user)
    })
  }, [])

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

    const kwikWaitingRoomList = kwikList.filter((kwik) => {
      return kwik.data.votes <= 20;
    });

    const kwikSortedList = [...kwikFilteredList].sort((a, b) => {
      return b.data.votes - a.data.votes;
    });

    setKwikMainPageArray(kwikFilteredList);
    setKwikWaitingRoomArray(kwikWaitingRoomList);
    setKwikTopPageArray(kwikSortedList);
    
  };

  useEffect(() => {
    getKwik();
  }, []);

  const changeVotes = (id, number, arr, setArr) => {
    const ref = doc(db, "Kwik", id);
    updateDoc(ref, {
      votes: increment(number),
    }).then(() => {
      const oneKwik = arr.find((kwik) => {
        return kwik.id === id;
      });
      oneKwik.data.votes = oneKwik.data.votes + number;
      setArr([...arr]);
    });
  };

  return (
    <BrowserRouter>
      <Nav currentUser={currentUser}/>
      <Routes>
        <Route
          path="/"
          element={
            <RenderKwiks
              kwikArray={kwikMainPageArray}
              changeVotes={changeVotes}
              setKwikMainPageArray={setKwikMainPageArray}
            />
          }
        />
        <Route path="/AddKwik" element={<AddKwik fetchKwik={getKwik} />} />
        <Route
          path="/Top"
          element={
            <RenderKwiks
              kwikArray={kwikTopPageArray}
              changeVotes={changeVotes}
              setKwikMainPageArray={setKwikTopPageArray}
            />
          }
        />
        <Route
          path="/WaitingRoom"
          element={
            <RenderKwiks
              kwikArray={kwikWaitingRoomArray}
              changeVotes={changeVotes}
              setKwikMainPageArray={setKwikWaitingRoomArray}
            />
          }
        />
        <Route path="/Login" element={<LoginRegister currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/Register" element={<LoginRegister />} />
        <Route path="/Regulamin" element={<Regulamin />} />
        <Route path="/Polityka" element={<Polityka />} />
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
